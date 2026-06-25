import { NextResponse } from "next/server";
import { formatDeepSeekError, resolveDeepSeekConfig, validateDeepSeekApiKey, validateDeepSeekModel } from "@/lib/deepseek";

type ChatRequest = {
  message?: unknown;
};

type DeepSeekResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

async function parseChatRequest(request: Request): Promise<ChatRequest> {
  const rawBody = await request.text();

  if (!rawBody.trim()) {
    throw new Error("请求体为空，请输入 message 后重试。");
  }

  try {
    return JSON.parse(rawBody) as ChatRequest;
  } catch {
    throw new Error("请求格式不是有效 JSON，请刷新页面后重试。");
  }
}

export async function POST(request: Request) {
  let body: ChatRequest;

  try {
    body = await parseChatRequest(request);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "请求解析失败" }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json({ error: "缺少 message，请输入要发送给 DeepSeek 的内容。" }, { status: 400 });
  }

  const { apiKey, model, warning } = resolveDeepSeekConfig(process.env);
  const apiKeyError = validateDeepSeekApiKey(apiKey);
  const modelError = validateDeepSeekModel(model);

  if (apiKeyError) {
    return NextResponse.json({ error: apiKeyError }, { status: 500 });
  }

  if (modelError) {
    return NextResponse.json({ error: modelError }, { status: 500 });
  }

  let response: Response;

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
            content: "你是 PromptHub 的中文 AI 助手。请用清晰、可执行的中文回答用户。"
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7
      })
    });
  } catch {
    return NextResponse.json({ error: "无法连接 DeepSeek API，请检查网络或稍后重试。" }, { status: 502 });
  }

  if (!response.ok) {
    return NextResponse.json({ error: await formatDeepSeekError(response) }, { status: response.status === 401 ? 401 : 502 });
  }

  try {
    const data = (await response.json()) as DeepSeekResponse;
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json({ error: "DeepSeek 未返回有效内容，请稍后重试。" }, { status: 502 });
    }

    return NextResponse.json({ reply, provider: "deepseek", model, warning });
  } catch {
    return NextResponse.json({ error: "DeepSeek 返回内容解析失败，请稍后重试。" }, { status: 502 });
  }
}
