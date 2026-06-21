import promptData from "@/data/prompts.json";
import { contentPrompts } from "@/data/content-prompts";

export type PromptPlatform = "midjourney" | "jimeng" | "chatgpt";
export type PromptCategory = "写作" | "编程" | "营销" | "绘图" | "学习" | "办公";

export type MockPrompt = {
  id: string;
  slug: string;
  title: string;
  description: string;
  platform: PromptPlatform;
  platformName: string;
  category: PromptCategory;
  useCase: string;
  tags: string[];
  content: string;
};

function inferCategory(prompt: (typeof promptData)[number]): PromptCategory {
  const text = [prompt.title, prompt.description, prompt.useCase, ...prompt.tags].join(" ");

  if (prompt.platform === "midjourney" || prompt.platform === "jimeng") return "绘图";
  if (/代码|编程|程序|开发|SQL|API|产品需求/.test(text)) return "编程";
  if (/营销|广告|销售|品牌|电商|用户|竞品/.test(text)) return "营销";
  if (/学习|课程|知识|教学|面试/.test(text)) return "学习";
  if (/会议|邮件|周报|办公|汇报|计划/.test(text)) return "办公";
  return "写作";
}

const legacyPrompts: MockPrompt[] = promptData.map((prompt) => ({
  ...prompt,
  platform: prompt.platform as PromptPlatform,
  category: inferCategory(prompt)
}));

export const mockPrompts: MockPrompt[] = [
  ...legacyPrompts,
  ...(contentPrompts as unknown as MockPrompt[])
];

export function getPromptsByPlatform(platform: PromptPlatform) {
  return mockPrompts.filter((prompt) => prompt.platform === platform);
}

export function getPromptBySlug(slug: string) {
  return mockPrompts.find((prompt) => prompt.slug === slug);
}

export function getPromptById(id: string) {
  return mockPrompts.find((prompt) => prompt.id === id);
}
