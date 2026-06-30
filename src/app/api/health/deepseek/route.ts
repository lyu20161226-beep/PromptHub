import { NextResponse } from "next/server";
import { resolveDeepSeekConfig, validateDeepSeekApiKey, validateDeepSeekModel } from "@/lib/deepseek";

export async function GET() {
  const { apiKey, model, warning } = resolveDeepSeekConfig(process.env);
  const apiKeyError = validateDeepSeekApiKey(apiKey);
  const modelError = validateDeepSeekModel(model);
  const error = apiKeyError || modelError;

  return NextResponse.json({
    ok: !error,
    provider: "deepseek",
    model,
    checks: {
      hasApiKey: Boolean(apiKey),
      keyLooksValid: !apiKeyError,
      modelLooksValid: !modelError,
      recoveredSwappedEnv: Boolean(warning)
    },
    message: error ? "DeepSeek 服务配置异常。" : "DeepSeek 服务配置正常。"
  });
}
