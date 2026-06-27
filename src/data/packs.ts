import { packDeepDives, type PackDeepDive } from "@/data/pack-deep-dives";
import { workflowPacks, type WorkflowPack } from "@/data/workflow-packs";

export type PackFaq = {
  q: string;
  a: string;
};

export type PackProduct = WorkflowPack & {
  problem: string;
  timeSaved: string;
  promptPreview: string;
  faq: readonly PackFaq[];
  deepDive?: PackDeepDive;
};

const productContent: Record<string, Pick<PackProduct, "problem" | "timeSaved" | "promptPreview">> = {
  "xiaohongshu-growth": {
    problem: "不会选题、标题普通、正文没有转化，发布后也不知道如何复盘。",
    timeSaved: "每篇节省约 75% 时间",
    promptPreview: "你是一名小红书内容增长顾问。请根据产品、用户画像和核心卖点，生成选题、标题、正文、标签与评论区引导..."
  },
  "cross-border-commerce": {
    problem: "Listing、主图需求和广告文案分散生产，关键词与卖点无法保持一致。",
    timeSaved: "每个 SKU 节省约 6 小时",
    promptPreview: "你是一名跨境电商 Listing 专家。请根据商品参数、目标市场和核心卖点，生成关键词簇、标题、五点描述与 A+ Content..."
  },
  "indie-product-research": {
    problem: "凭直觉开发产品，缺少用户证据、竞品判断、定价假设和冷启动计划。",
    timeSaved: "验证阶段节省 3-5 天",
    promptPreview: "你是一名产品验证顾问。请根据产品 Idea、目标用户和预算，输出痛点假设、竞品矩阵、访谈问题与 30 天验证计划..."
  }
};

const defaultFaq: readonly PackFaq[] = [
  { q: "适合新手吗？", a: "适合。每个步骤都会说明需要填写的信息，并提供案例和输出模板。" },
  { q: "支持哪些模型？", a: "核心工作流可用于 DeepSeek、ChatGPT、Claude 和 Gemini。" },
  { q: "现在会扣款吗？", a: "不会。当前只收集购买意向和首发通知邮箱。" },
  { q: "免费预览包含什么？", a: "开放约 30% 内容，包括案例、工作流结构和前两个 Prompt 页面。" }
];

export const packs: readonly PackProduct[] = workflowPacks.map((pack) => {
  const deepDive = packDeepDives[pack.slug];
  const content = productContent[pack.slug];

  return {
    ...pack,
    problem: content?.problem ?? pack.description,
    timeSaved: content?.timeSaved ?? "上线后公布实测数据",
    promptPreview: content?.promptPreview ?? "完整 Prompt 正在打磨，加入等待名单后可接收首发通知。",
    faq: defaultFaq,
    deepDive
  };
});

export function getPackProduct(slug: string) {
  return packs.find((pack) => pack.slug === slug);
}
