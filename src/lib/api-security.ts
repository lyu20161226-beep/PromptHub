import { NextResponse } from "next/server";

const MAX_BODY_BYTES = 32 * 1024;
const MINUTE_LIMIT = 5;
const DAILY_LIMIT = 10;
const MAX_CONCURRENT_REQUESTS = 20;
const UPSTREAM_TIMEOUT_MS = 30_000;

type WindowEntry = { count: number; resetAt: number };
type LimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  backend: "upstash" | "memory";
};

type GuardResult =
  | { ok: true; rateLimit: LimitResult }
  | { ok: false; response: NextResponse };

const memoryWindows = new Map<string, WindowEntry>();
let activeRequests = 0;

function hasDurableRateLimit() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() &&
      process.env.UPSTASH_REDIS_REST_TOKEN?.trim(),
  );
}

function requiresDurableRateLimit() {
  return process.env.NODE_ENV === "production";
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

function cleanupMemoryWindows(now: number) {
  if (memoryWindows.size < 1_000) return;
  for (const [key, entry] of memoryWindows) {
    if (entry.resetAt <= now) memoryWindows.delete(key);
  }
}

function useMemoryWindow(key: string, limit: number, windowSeconds: number): LimitResult {
  const now = Date.now();
  cleanupMemoryWindows(now);
  const current = memoryWindows.get(key);
  const entry =
    current && current.resetAt > now
      ? current
      : { count: 0, resetAt: now + windowSeconds * 1_000 };

  entry.count += 1;
  memoryWindows.set(key, entry);

  return {
    allowed: entry.count <= limit,
    limit,
    remaining: Math.max(0, limit - entry.count),
    resetAt: entry.resetAt,
    backend: "memory",
  };
}

async function runUpstashCommand(command: Array<string | number>) {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
    signal: AbortSignal.timeout(2_500),
  });

  if (!response.ok) throw new Error(`Rate limit store returned ${response.status}`);
  return (await response.json()) as { result?: number };
}

async function useDistributedWindow(key: string, limit: number, windowSeconds: number) {
  const result = await runUpstashCommand(["INCR", key]);
  if (!result) return null;

  const count = Number(result.result ?? 0);
  if (count === 1) await runUpstashCommand(["EXPIRE", key, windowSeconds]);

  return {
    allowed: count <= limit,
    limit,
    remaining: Math.max(0, limit - count),
    resetAt: Date.now() + windowSeconds * 1_000,
    backend: "upstash" as const,
  };
}

async function checkWindow(key: string, limit: number, windowSeconds: number) {
  try {
    return (
      (await useDistributedWindow(key, limit, windowSeconds)) ??
      useMemoryWindow(key, limit, windowSeconds)
    );
  } catch (error) {
    if (requiresDurableRateLimit()) throw error;
    return useMemoryWindow(key, limit, windowSeconds);
  }
}

function rateLimitHeaders(result: LimitResult) {
  return {
    "x-ratelimit-limit": String(result.limit),
    "x-ratelimit-remaining": String(result.remaining),
    "x-ratelimit-reset": String(Math.ceil(result.resetAt / 1_000)),
    "x-ratelimit-backend": result.backend,
  };
}

export async function guardAiRequest(request: Request): Promise<GuardResult> {
  if (requiresDurableRateLimit() && !hasDurableRateLimit()) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "AI 服务保护配置尚未完成，请稍后再试。" },
        { status: 503, headers: { "retry-after": "300" } },
      ),
    };
  }

  if (!isSameOrigin(request)) {
    return {
      ok: false,
      response: NextResponse.json({ error: "不允许跨站调用此接口。" }, { status: 403 }),
    };
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return {
      ok: false,
      response: NextResponse.json({ error: "请求必须使用 application/json。" }, { status: 415 }),
    };
  }

  const declaredSize = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredSize) && declaredSize > MAX_BODY_BYTES) {
    return {
      ok: false,
      response: NextResponse.json({ error: "请求内容过大。" }, { status: 413 }),
    };
  }

  const ip = getClientIp(request);
  const now = new Date();
  const minuteBucket = Math.floor(now.getTime() / 60_000);
  const dayBucket = now.toISOString().slice(0, 10);
  const minute = await checkWindow(`ratelimit:ai:${ip}:minute:${minuteBucket}`, MINUTE_LIMIT, 60);

  if (!minute.allowed) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "请求过于频繁，请稍后再试。" },
        { status: 429, headers: rateLimitHeaders(minute) },
      ),
    };
  }

  const daily = await checkWindow(`ratelimit:ai:${ip}:day:${dayBucket}`, DAILY_LIMIT, 86_400);
  if (!daily.allowed) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "今日匿名试用额度已用完。" },
        { status: 429, headers: rateLimitHeaders(daily) },
      ),
    };
  }

  return { ok: true, rateLimit: daily };
}

export async function readLimitedJson<T>(request: Request): Promise<T> {
  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    throw new Error("请求内容过大。");
  }
  if (!rawBody.trim()) throw new Error("请求体不能为空。");

  try {
    return JSON.parse(rawBody) as T;
  } catch {
    throw new Error("请求格式不是有效 JSON。");
  }
}

export function acquireAiRequestSlot() {
  if (activeRequests >= MAX_CONCURRENT_REQUESTS) return null;
  activeRequests += 1;
  let released = false;

  return () => {
    if (released) return;
    released = true;
    activeRequests = Math.max(0, activeRequests - 1);
  };
}

export function upstreamSignal() {
  return AbortSignal.timeout(UPSTREAM_TIMEOUT_MS);
}

export function withRateLimitHeaders(response: NextResponse, result: LimitResult) {
  for (const [name, value] of Object.entries(rateLimitHeaders(result))) {
    response.headers.set(name, value);
  }
  return response;
}
