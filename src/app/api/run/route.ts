import { NextResponse } from "next/server";

type RunRequest = {
  promptId?: string;
  template?: string;
  variables?: Record<string, string>;
};

function fillTemplate(template: string, variables: Record<string, string>) {
  return template.replace(/{{(.*?)}}/g, (_, key: string) => {
    const value = variables[key.trim()]?.trim();
    return value || `未填写${key.trim()}`;
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
  try {
    const body = (await request.json()) as RunRequest;
    const template = body.template?.trim();
    const variables = body.variables ?? {};

    if (!template) {
      return NextResponse.json({ error: "缺少 prompt 模板" }, { status: 400 });
    }

    const finalPrompt = fillTemplate(template, variables);
    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ result: fallbackResult(finalPrompt), finalPrompt, provider: "mock" });
    }

    const response = await fetch("https://api.deepseek.com/chat/completions", {
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
            content: "你是 PromptHub 的 AI 工作流执行引擎。请直接完成用户任务，输出结构化、可复制、适合中文用户使用的结果。"
          },
          {
            role: "user",
            content: finalPrompt
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      return NextResponse.json({ error: `DeepSeek 调用失败：${detail.slice(0, 200)}` }, { status: 502 });
    }

    const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const result = data.choices?.[0]?.message?.content?.trim();

    if (!result) {
      return NextResponse.json({ error: "DeepSeek 未返回有效内容" }, { status: 502 });
    }

    return NextResponse.json({ result, finalPrompt, provider: "deepseek" });
  } catch {
    return NextResponse.json({ error: "运行请求解析失败" }, { status: 400 });
  }
}
