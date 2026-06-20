const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || vercelUrl || "http://localhost:3000").replace(/\/$/, "");

export const siteName = "PromptHub";
export const siteDescription = "收录 Midjourney、即梦、ChatGPT 高质量提示词，支持搜索、分类和一键复制。";
