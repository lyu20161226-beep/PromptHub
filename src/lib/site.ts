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
  "精选可复用的 AI 工作流。每个案例都展示来源、问题、步骤、Prompt、输出与证据边界，帮助你少走弯路并稳定完成真实任务。";
