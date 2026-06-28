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
  "AI Workflow 的可信参考指南。记录来源、验证日期、适用模型、失败边界、替代方案和版本更新，帮助你更快找到当前靠谱的 AI 工作方法。";
