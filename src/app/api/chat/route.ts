import { NextResponse } from "next/server";

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

  const apiKey = process.env.DEEPSEEK_API_KEY?.trim();

  if (!apiKey) {
    return NextResponse.json({ error: "未配置 DEEPSEEK_API_KEY，请在 .env.local 或 Vercel 环境变量中添加。" }, { status: 500 });
  }

  if (apiKey === "deepseek-chat") {
    return NextResponse.json({ error: "DEEPSEEK_API_KEY 不能填写模型名 deepseek-chat，请填写 sk- 开头的真实 API Key。" }, { status: 500 });
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
        model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
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
    const detail = await response.text();
    return NextResponse.json({ error: `DeepSeek 调用失败：${detail.slice(0, 300)}` }, { status: 502 });
  }

  try {
    const data = (await response.json()) as DeepSeekResponse;
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json({ error: "DeepSeek 未返回有效内容，请稍后重试。" }, { status: 502 });
    }

    return NextResponse.json({ reply, provider: "deepseek", model: process.env.DEEPSEEK_MODEL || "deepseek-chat" });
  } catch {
    return NextResponse.json({ error: "DeepSeek 返回内容解析失败，请稍后重试。" }, { status: 502 });
  }
}
