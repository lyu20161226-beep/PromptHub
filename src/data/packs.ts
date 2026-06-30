import { packDeepDives, type PackDeepDive } from "@/data/pack-deep-dives";
import { workflowPacks, type WorkflowPack } from "@/data/workflow-packs";

export type PackFaq = {
  q: string;
  a: string;
};

export type PromptFramework = {
  role: string;
  goal: string;
  context: string;
  constraints: string;
  workflow: string;
  outputFormat: string;
  examples?: string;
  evaluation?: string;
};

export type PackProduct = WorkflowPack & {
  problem: string;
  timeSaved: string;
  promptPreview: string;
  promptFramework: PromptFramework;
  faq: readonly PackFaq[];
  deepDive?: PackDeepDive;
};

const productContent: Record<string, Pick<PackProduct, "problem" | "timeSaved" | "promptPreview" | "promptFramework">> = {
  "xiaohongshu-growth": {
    problem: "不会选题、标题普通、正文没有转化，发布后也不知道如何复盘。",
    timeSaved: "减少重复改写与结构遗漏",
    promptPreview: "你是一名小红书内容增长顾问。请根据产品、用户画像和核心卖点，生成选题、标题、正文、标签与评论区引导...",
    promptFramework: {
      role: "你是一名熟悉小红书搜索流量、内容钩子和种草转化的小红书增长顾问。",
      goal: "围绕用户提供的产品信息，生成一篇可直接修改发布的小红书产品笔记。",
      context: "产品名称、核心卖点、目标用户、价格区间、使用场景和品牌语气。",
      constraints: "不虚构体验；避免绝对化承诺；标题不超过 20 字；正文保持自然口语感。",
      workflow: "提炼用户痛点 → 选择内容角度 → 生成标题 → 搭建正文 → 添加标签与评论区引导 → 发布复盘。",
      outputFormat: "Markdown；依次输出标题候选、正文、标签、评论区引导和发布检查清单。",
      examples: "输入便携咖啡机、办公室白领、3 分钟出咖啡，输出完整种草笔记。",
      evaluation: "检查标题吸引力、卖点可信度、场景具体度、转化动作和平台合规性。"
    }
  },
  "cross-border-commerce": {
    problem: "Listing、主图需求和广告文案分散生产，关键词与卖点无法保持一致。",
    timeSaved: "减少跨文档复制与口径不一致",
    promptPreview: "你是一名跨境电商 Listing 专家。请根据商品参数、目标市场和核心卖点，生成关键词簇、标题、五点描述与 A+ Content...",
    promptFramework: {
      role: "你是一名熟悉 Amazon 搜索、Listing 转化和平台合规的跨境电商内容专家。",
      goal: "为目标市场生成关键词一致、可读且强调使用场景的商品内容资产。",
      context: "商品参数、目标市场、核心卖点、目标用户、竞品信息和禁用表达。",
      constraints: "不堆砌关键词；不使用无法证明的第一或最佳；区分功能、利益和使用场景。",
      workflow: "分析商品定位 → 聚类关键词 → 生成标题 → 编写 Bullet Points → 规划 A+ Content → 生成广告与 Review 回复。",
      outputFormat: "表格加 Markdown；输出关键词簇、标题、五点描述、A+ 模块、广告文案和回复模板。",
      examples: "输入美国市场无线降噪耳机，输出通勤、会议、运动三类场景文案。",
      evaluation: "检查关键词覆盖、可读性、场景利益、合规风险和不同模块的一致性。"
    }
  },
  "indie-product-research": {
    problem: "凭直觉开发产品，缺少用户证据、竞品判断、定价假设和冷启动计划。",
    timeSaved: "减少无证据开发与重复调研",
    promptPreview: "你是一名产品验证顾问。请根据产品 Idea、目标用户和预算，输出痛点假设、竞品矩阵、访谈问题与 30 天验证计划...",
    promptFramework: {
      role: "你是一名服务独立开发者的产品验证顾问，擅长低成本需求验证和冷启动。",
      goal: "把一个产品 Idea 转成可以在 30 天内验证的市场、用户、定价和获客计划。",
      context: "产品想法、目标用户、目标市场、启动预算、团队能力和期望验证周期。",
      constraints: "区分事实与假设；不虚构市场数据；优先提出低成本可执行实验；每个结论注明验证方式。",
      workflow: "定义问题 → 提出痛点假设 → 分析竞品 → 设计访谈 → 制作 Landing Page → 测试定价 → 制定冷启动计划。",
      outputFormat: "Markdown；输出假设清单、竞品矩阵、访谈问题、Landing Page 草稿、定价实验和 30 天计划。",
      examples: "输入自由职业者 AI 合同审查工具，输出英文市场低成本验证方案。",
      evaluation: "检查证据等级、实验成本、成功指标、时间边界和下一步行动是否明确。"
    }
  }
};

const defaultFaq: readonly PackFaq[] = [
  { q: "适合新手吗？", a: "适合。每个步骤都会说明需要填写的信息，并提供案例和输出模板。" },
  { q: "支持哪些模型？", a: "详情页会分别标注已测试推荐、结构兼容和未测试。未测试模型不会被描述为已经验证。" },
  { q: "现在会扣款吗？", a: "不会。当前只收集购买意向和首发通知邮箱。" },
  { q: "免费预览包含什么？", a: "开放约 30% 内容，包括案例、工作流结构和前两个 Prompt 页面。" }
];

const defaultFramework: PromptFramework = {
  role: "定义完成该任务所需的专业角色。",
  goal: "明确需要交付的具体结果。",
  context: "填写业务背景、用户信息和已有数据。",
  constraints: "规定边界、质量标准和禁止事项。",
  workflow: "把任务拆成可执行步骤。",
  outputFormat: "指定可直接使用的输出结构。",
  examples: "提供一个输入和期望输出示例。",
  evaluation: "检查事实、逻辑、完整性并修正。"
};

export const packs: readonly PackProduct[] = workflowPacks.map((pack) => {
  const deepDive = packDeepDives[pack.slug];
  const content = productContent[pack.slug];

  return {
    ...pack,
    problem: content?.problem ?? pack.description,
    timeSaved: content?.timeSaved ?? "上线后公布实测数据",
    promptPreview: content?.promptPreview ?? "完整 Prompt 正在打磨，加入等待名单后可接收首发通知。",
    promptFramework: content?.promptFramework ?? defaultFramework,
    faq: defaultFaq,
    deepDive
  };
});

export function getPackProduct(slug: string) {
  return packs.find((pack) => pack.slug === slug);
}
