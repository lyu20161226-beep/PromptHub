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
  "全球实用的 AI 提示词、工作流与系统学习平台。通过原理解析、结构化 Prompt、真实案例和执行步骤，帮助你把 AI 从聊天工具变成可复用的生产力系统。";
