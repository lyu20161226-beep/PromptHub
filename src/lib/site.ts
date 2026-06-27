const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || vercelUrl || "http://localhost:3000").replace(/\/$/, "");
export const siteName = "PromptHub";
export const siteDescription = "精选 AI 工作流提示词包，包含 Prompt、步骤、案例、模板和检查清单，帮助用户更快完成具体任务。";
