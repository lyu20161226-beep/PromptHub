import promptData from "@/data/prompts.json";

export type PromptPlatform = "midjourney" | "jimeng" | "chatgpt";

export type MockPrompt = {
  id: string;
  slug: string;
  title: string;
  description: string;
  platform: PromptPlatform;
  platformName: string;
  useCase: string;
  tags: string[];
  content: string;
};

export const mockPrompts = promptData as MockPrompt[];

export function getPromptsByPlatform(platform: PromptPlatform) {
  return mockPrompts.filter((prompt) => prompt.platform === platform);
}

export function getPromptBySlug(slug: string) {
  return mockPrompts.find((prompt) => prompt.slug === slug);
}
