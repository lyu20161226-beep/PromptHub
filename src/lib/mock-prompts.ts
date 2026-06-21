import promptData from "@/data/prompts.json";
import { contentPrompts } from "@/data/content-prompts";
import { expandedPrompts } from "@/data/expanded-prompts";
import { topWorkflowDefinitions } from "@/data/top-workflows";

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
  models: string[];
  exampleInput: string;
  exampleOutput: string;
  tips: string[];
  workflow?: WorkflowDetails;
};

export type WorkflowDetails = {
  tier: "S" | "A";
  problem: string;
  solution: string;
  steps: readonly string[];
  caseTitle: string;
  caseInput: string;
  caseOutput: string;
  commonErrors: readonly string[];
  optimizationTips: readonly string[];
  models: readonly string[];
  params: readonly string[];
};

const workflowByPromptId = new Map<string, WorkflowDetails>(
  topWorkflowDefinitions.map(({ promptId, ...workflow }) => [promptId, workflow as WorkflowDetails])
);

function inferCategory(prompt: (typeof promptData)[number]): PromptCategory {
  const text = [prompt.title, prompt.description, prompt.useCase, ...prompt.tags].join(" ");

  if (prompt.platform === "midjourney" || prompt.platform === "jimeng") return "绘图";
  if (/代码|编程|程序|开发|SQL|API|产品需求/.test(text)) return "编程";
  if (/营销|广告|销售|品牌|电商|用户|竞品/.test(text)) return "营销";
  if (/学习|课程|知识|教学|面试/.test(text)) return "学习";
  if (/会议|邮件|周报|办公|汇报|计划/.test(text)) return "办公";
  return "写作";
}

type BasePrompt = Omit<MockPrompt, "models" | "exampleInput" | "exampleOutput" | "tips"> &
  Partial<Pick<MockPrompt, "models" | "exampleInput" | "exampleOutput" | "tips">>;

function enrichPrompt(prompt: BasePrompt): MockPrompt {
  const models = prompt.models ?? (prompt.platform === "midjourney" ? ["Midjourney", "Flux"] : prompt.platform === "jimeng" ? ["即梦"] : ["ChatGPT", "Claude", "DeepSeek"]);

  return {
    ...prompt,
    models,
    exampleInput: prompt.exampleInput ?? `主题：${prompt.title}；目标：用于${prompt.useCase}；请根据实际信息替换方括号变量。`,
    exampleOutput: prompt.exampleOutput ?? `生成一份围绕“${prompt.title}”的结构化结果，包含明确重点、可直接使用的内容和下一步建议。`,
    tips: prompt.tips ?? [
      "先替换提示词中的方括号变量，再发送给模型。",
      "第一轮结果用于确定方向，第二轮补充真实信息并要求精修。",
      "公开使用前核对事实、数字、版权和平台规则。"
    ],
    workflow: workflowByPromptId.get(prompt.id)
  };
}

const legacyPrompts: MockPrompt[] = promptData.map((prompt) =>
  enrichPrompt({
    ...prompt,
    platform: prompt.platform as PromptPlatform,
    category: inferCategory(prompt)
  })
);

const combinedPrompts: MockPrompt[] = [
  ...legacyPrompts,
  ...(contentPrompts as unknown as BasePrompt[]).map(enrichPrompt),
  ...(expandedPrompts as unknown as BasePrompt[]).map(enrichPrompt)
];

const usedSlugs = new Set<string>();

export const mockPrompts = combinedPrompts.map((prompt) => {
  const slug = usedSlugs.has(prompt.slug) ? `${prompt.slug}-${prompt.id}` : prompt.slug;
  usedSlugs.add(slug);
  return { ...prompt, slug };
});

export const topWorkflowPrompts = mockPrompts.filter((prompt) => Boolean(prompt.workflow));

export function getPromptsByPlatform(platform: PromptPlatform) {
  return mockPrompts.filter((prompt) => prompt.platform === platform);
}

export function getPromptBySlug(slug: string) {
  return mockPrompts.find((prompt) => prompt.slug === slug);
}

export function getPromptById(id: string) {
  return mockPrompts.find((prompt) => prompt.id === id);
}
