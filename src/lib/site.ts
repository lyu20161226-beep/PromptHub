const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  vercelUrl ||
  "http://localhost:3000"
).replace(/\/$/, "");

export const siteName = "PromptHub";
export const siteDescription =
  "Verified AI Workflows。筛选、验证并持续维护真正可复现的 AI 工作方法，记录来源、适用模型、失败边界、替代方案和版本更新。";
