export function normalizeDeepSeekApiKey(rawKey: string | undefined) {
  return rawKey?.trim().replace(/^Bearer\s+/i, "").replace(/^["']|["']$/g, "") ?? "";
}

export function validateDeepSeekApiKey(apiKey: string) {
  const lowerKey = apiKey.toLowerCase();

  if (!apiKey) {
    return "未配置 DEEPSEEK_API_KEY，请在 .env.local 或 Vercel 环境变量中添加。";
  }

  if (lowerKey === "deepseek-chat" || lowerKey.includes("deepseek-chat")) {
    return "DEEPSEEK_API_KEY 填成了模型名 deepseek-chat。请把 sk- 开头的真实 Key 填到 DEEPSEEK_API_KEY，把 deepseek-chat 填到 DEEPSEEK_MODEL。";
  }

  if (!apiKey.startsWith("sk-")) {
    return "DEEPSEEK_API_KEY 格式不正确。它应该是 sk- 开头的真实 DeepSeek API Key，不是模型名、项目名或其它文本。";
  }

  return "";
}

export function validateDeepSeekModel(rawModel: string | undefined) {
  const model = rawModel?.trim() || "deepseek-chat";

  if (model.startsWith("sk-")) {
    return {
      model: "deepseek-chat",
      error: "DEEPSEEK_MODEL 填成了 API Key。请把 sk- 开头的 Key 填到 DEEPSEEK_API_KEY，把 deepseek-chat 填到 DEEPSEEK_MODEL。"
    };
  }

  return { model, error: "" };
}

export async function formatDeepSeekError(response: Response) {
  const detail = await response.text();

  try {
    const parsed = JSON.parse(detail) as { error?: { message?: string; type?: string; code?: string } };
    const message = parsed.error?.message ?? detail;

    if (response.status === 401 || parsed.error?.type === "authentication_error" || /Authentication Fails/i.test(message)) {
      return [
        "DeepSeek 认证失败：API Key 无效。",
        "请检查 Vercel 环境变量 DEEPSEEK_API_KEY 是否为 sk- 开头的真实 Key。",
        "不要把 deepseek-chat 填到 DEEPSEEK_API_KEY；deepseek-chat 是模型名，应放在 DEEPSEEK_MODEL。",
        `原始错误：${message}`
      ].join("\n");
    }
  } catch {
    // Fall through to the generic message below.
  }

  return `DeepSeek 调用失败：${detail.slice(0, 300)}`;
}
