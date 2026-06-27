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
  "把 AI 对话变成可复用的工作流资产。提供结构化 Prompt、执行步骤、真实案例、输出模板与质量检查，帮助你稳定完成内容、营销、产品和商业任务。";
