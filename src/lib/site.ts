const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || vercelUrl || "http://localhost:3000").replace(/\/$/, "");

export const siteName = "PromptHub";
export const siteDescription = "解决真实工作的中文 AI 工作流库，覆盖编程、营销、求职与商业分析，提供可复制 Prompt、实测案例、错误清单和输出模板。";
