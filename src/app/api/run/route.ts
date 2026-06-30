import { NextResponse } from "next/server";
import {
  acquireAiRequestSlot,
  guardAiRequest,
  readLimitedJson,
  upstreamSignal,
  withRateLimitHeaders,
} from "@/lib/api-security";
import { formatDeepSeekError, resolveDeepSeekConfig, validateDeepSeekApiKey, validateDeepSeekModel } from "@/lib/deepseek";

type RunRequest = {
  promptId?: string;
  template?: string;
  variables?: Record<string, unknown>;
};

function normalizeVariables(variables: RunRequest["variables"]) {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(variables ?? {})) {
    result[key] = typeof value === "string" ? value : String(value ?? "");
  }

  return result;
}

function fillTemplate(template: string, variables: Record<string, string>) {
  return template.replace(/{{(.*?)}}/g, (_, key: string) => {
    const variableName = key.trim();
    const value = variables[variableName]?.trim();
    return value || `未填写 ${variableName}`;
  });
}

function fallbackResult(finalPrompt: string) {
  return [
    "当前未配置 DEEPSEEK_API_KEY，已返回可测试的模拟结果。",
    "",
    "最终 Prompt：",
    finalPrompt,
    "",
    "模拟输出：",
    "1. 已识别你的任务目标，并把变量合并到完整 Prompt 中。",
    "2. 你可以直接复制这段 Prompt 到 DeepSeek、ChatGPT 或 Claude 使用。",
    "3. 配置 DEEPSEEK_API_KEY 后，此按钮会直接返回真实模型结果。"
  ].join("\n");
}

export async function POST(request: Request) {
  const guard = await guardAiRequest(request);
  if (!guard.ok) return guard.response;

  let body: RunRequest;

  try {
    body = await readLimitedJson<RunRequest>(request);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "请求解析失败" }, { status: 400 });
  }

  const template = body.template?.trim();

  if (!template) {
    return NextResponse.json({ error: "缺少 prompt 模板，请刷新页面后重试。" }, { status: 400 });
  }

  if (template.length > 8_000) {
    return NextResponse.json({ error: "Prompt 模板不能超过 8000 个字符。" }, { status: 413 });
  }

  const variableEntries = Object.entries(body.variables ?? {});
  if (variableEntries.length > 30) {
    return NextResponse.json({ error: "变量数量不能超过 30 个。" }, { status: 413 });
  }

  if (variableEntries.some(([key, value]) => key.length > 100 || String(value ?? "").length > 2_000)) {
    return NextResponse.json({ error: "变量名称或内容过长。" }, { status: 413 });
  }

  const variables = normalizeVariables(body.variables);
  const finalPrompt = fillTemplate(template, variables);
  if (finalPrompt.length > 12_000) {
    return NextResponse.json({ error: "合并后的 Prompt 不能超过 12000 个字符。" }, { status: 413 });
  }
  const { apiKey, model, warning } = resolveDeepSeekConfig(process.env);

  if (!apiKey) {
    return withRateLimitHeaders(
      NextResponse.json({ result: fallbackResult(finalPrompt), finalPrompt, provider: "mock" }),
      guard.rateLimit,
    );
  }

  const apiKeyError = validateDeepSeekApiKey(apiKey);
  const modelError = validateDeepSeekModel(model);

  if (apiKeyError) {
    return NextResponse.json({ error: apiKeyError }, { status: 500 });
  }

  if (modelError) {
    return NextResponse.json({ error: modelError }, { status: 500 });
  }

  let response: Response;
  const release = acquireAiRequestSlot();

  if (!release) {
    return NextResponse.json({ error: "当前请求较多，请稍后再试。" }, { status: 503 });
  }

  try {
    response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "你是 PromptHub 的 AI 工作流执行引擎。请直接完成用户任务，输出结构化、可复制、适合中文用户使用的结果。"
          },
          {
            role: "user",
            content: finalPrompt
          }
        ],
        temperature: 0.7
      }),
      signal: upstreamSignal(),
    });
  } catch {
    return NextResponse.json({ error: "无法连接 DeepSeek API，请检查 Vercel 网络或稍后重试。" }, { status: 502 });
  } finally {
    release();
  }

  if (!response.ok) {
    return NextResponse.json({ error: await formatDeepSeekError(response) }, { status: response.status === 401 ? 401 : 502 });
  }

  try {
    const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const result = data.choices?.[0]?.message?.content?.trim();

    if (!result) {
      return NextResponse.json({ error: "DeepSeek 未返回有效内容，请稍后重试。" }, { status: 502 });
    }

    return withRateLimitHeaders(
      NextResponse.json({ result, finalPrompt, provider: "deepseek", model, warning }),
      guard.rateLimit,
    );
  } catch {
    return NextResponse.json({ error: "DeepSeek 返回内容解析失败，请稍后重试。" }, { status: 502 });
  }
}
