import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { packs } from "@/data/packs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 4 * 1024;
const RETENTION_SECONDS = 365 * 24 * 60 * 60;
const DAILY_LIMIT = 5;
const packSlugs = new Set(packs.map((pack) => pack.slug));

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

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function redisCommand(command: Array<string | number>) {
  const config = redisConfig();
  if (!config) return null;

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${config.token}`,
      "content-type": "application/json"
    },
    body: JSON.stringify(command),
    cache: "no-store",
    signal: AbortSignal.timeout(3_000)
  });

  if (!response.ok) throw new Error(`Waitlist store returned ${response.status}`);
  return (await response.json()) as { result?: unknown };
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "不允许跨站提交。" }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "请求格式不正确。" }, { status: 415 });
  }

  const declaredSize = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredSize) && declaredSize > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "请求内容过大。" }, { status: 413 });
  }

  if (!redisConfig()) {
    return NextResponse.json(
      { error: "等待名单暂时不可用，请稍后再试。" },
      { status: 503, headers: { "retry-after": "300" } }
    );
  }

  try {
    const body = (await request.json()) as {
      email?: unknown;
      packSlug?: unknown;
      source?: unknown;
    };
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const packSlug = typeof body.packSlug === "string" ? body.packSlug.trim() : "";
    const source = typeof body.source === "string" ? body.source.trim().slice(0, 100) : "unknown";

    if (email.length > 160 || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "请输入有效邮箱。" }, { status: 400 });
    }
    if (!packSlugs.has(packSlug)) {
      return NextResponse.json({ error: "Playbook 不存在。" }, { status: 400 });
    }

    const ipHash = createHash("sha256").update(getClientIp(request)).digest("hex");
    const day = new Date().toISOString().slice(0, 10);
    const limitKey = `waitlist:limit:${ipHash}:${day}`;
    const limitResult = await redisCommand(["INCR", limitKey]);
    const count = Number(limitResult?.result ?? 0);
    if (count === 1) await redisCommand(["EXPIRE", limitKey, 86_400]);
    if (count > DAILY_LIMIT) {
      return NextResponse.json({ error: "今天提交次数较多，请明天再试。" }, { status: 429 });
    }

    const emailHash = createHash("sha256").update(email).digest("hex");
    const record = JSON.stringify({
      email,
      packSlug,
      source,
      createdAt: new Date().toISOString()
    });
    await redisCommand([
      "SET",
      `waitlist:pack:${packSlug}:${emailHash}`,
      record,
      "EX",
      RETENTION_SECONDS
    ]);

    return NextResponse.json({ accepted: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "提交失败，请稍后再试。" }, { status: 500 });
  }
}
