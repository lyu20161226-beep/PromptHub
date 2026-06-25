import { NextResponse } from "next/server";
import { resolveDeepSeekConfig, validateDeepSeekApiKey, validateDeepSeekModel } from "@/lib/deepseek";

function maskApiKey(apiKey: string) {
  if (!apiKey) return "";
  if (apiKey.length <= 10) return "长度过短";
  return `${apiKey.slice(0, 3)}...${apiKey.slice(-4)}`;
}

export async function GET() {
  const { apiKey, model, warning } = resolveDeepSeekConfig(process.env);
  const apiKeyError = validateDeepSeekApiKey(apiKey);
  const modelError = validateDeepSeekModel(model);
  const error = apiKeyError || modelError;

  return NextResponse.json({
    ok: !error,
    provider: "deepseek",
    model,
    keyPreview: maskApiKey(apiKey),
    warning,
    checks: {
      hasApiKey: Boolean(apiKey),
      keyLooksValid: !apiKeyError,
      modelLooksValid: !modelError,
      recoveredSwappedEnv: Boolean(warning)
    },
    message: error || "DeepSeek 环境变量格式看起来正常。请继续用 /api/chat 做真实调用测试。"
  });
}
