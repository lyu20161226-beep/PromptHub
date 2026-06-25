import { NextResponse } from "next/server";
import { normalizeDeepSeekApiKey, validateDeepSeekApiKey } from "@/lib/deepseek";

function maskApiKey(apiKey: string) {
  if (!apiKey) return "";
  if (apiKey.length <= 10) return "长度过短";
  return `${apiKey.slice(0, 3)}...${apiKey.slice(-4)}`;
}

export async function GET() {
  const apiKey = normalizeDeepSeekApiKey(process.env.DEEPSEEK_API_KEY);
  const model = process.env.DEEPSEEK_MODEL?.trim() || "deepseek-chat";
  const apiKeyError = validateDeepSeekApiKey(apiKey);

  return NextResponse.json({
    ok: !apiKeyError,
    provider: "deepseek",
    model,
    keyPreview: maskApiKey(apiKey),
    checks: {
      hasApiKey: Boolean(apiKey),
      keyLooksValid: !apiKeyError,
      modelLooksValid: model === "deepseek-chat" || model.startsWith("deepseek-")
    },
    message: apiKeyError || "DeepSeek 环境变量格式看起来正常。请继续用 /api/chat 做真实调用测试。"
  });
}
