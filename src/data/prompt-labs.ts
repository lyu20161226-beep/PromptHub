export type PromptLab = {
  slug: string;
  title: string;
  category: string;
  problem: string;
  weakPrompt: string;
  failureReasons: readonly string[];
  iterations: readonly {
    version: string;
    change: string;
    reason: string;
  }[];
  finalPrompt: string;
  result: string;
  lessons: readonly string[];
  promptSlug: string;
};

export const promptLabs: readonly PromptLab[] = [
  {
    slug: "seo-outline-evolution",
    title: "SEO 大纲：从“写篇文章”到搜索意图工作流",
    category: "SEO",
    problem: "普通指令会直接生成一篇看似完整、但没有搜索意图、关键词层级和内链策略的文章。",
    weakPrompt: "围绕 AI 创业写一篇 SEO 文章。",
    failureReasons: [
      "没有定义读者和搜索意图",
      "没有区分核心关键词与相关问题",
      "没有规定内容结构和证据标准",
      "没有发布前检查与内链建议",
    ],
    iterations: [
      { version: "V1", change: "补充目标读者与搜索意图", reason: "先明确用户为什么搜索，再决定写什么。" },
      { version: "V2", change: "加入关键词簇与 H2/H3 结构", reason: "让内容覆盖主题，而不是机械重复关键词。" },
      { version: "V3", change: "加入 FAQ、证据要求和内链建议", reason: "提高完整性、可信度与站内关联。" },
    ],
    finalPrompt:
      "你是一名 SEO 内容策略师。请围绕核心关键词 {{核心关键词}}，面向 {{目标读者}}，先判断搜索意图，再输出：关键词簇、标题候选、H2/H3 大纲、每节要回答的问题、需要引用的证据、FAQ、内链建议和发布前检查清单。不要堆砌关键词；所有无法确认的数据标记为“待验证”。",
    result: "得到一份可直接交给作者执行的 SEO 内容简报，而不是一篇缺少依据的通用文章。",
    lessons: ["先判断搜索意图，再组织内容", "把输出从“文章”改成“可执行简报”", "让模型主动标记待验证信息"],
    promptSlug: "seo-content-brief",
  },
  {
    slug: "bug-root-cause-evolution",
    title: "程序报错：从猜答案到可验证的根因分析",
    category: "编程",
    problem: "只贴一行错误信息，模型容易过早下结论，给出看似正确却无法验证的修复建议。",
    weakPrompt: "这个 TypeError 怎么修？",
    failureReasons: [
      "缺少运行环境和依赖版本",
      "没有最小复现步骤",
      "没有区分事实、假设和猜测",
      "修复后没有回归测试",
    ],
    iterations: [
      { version: "V1", change: "加入报错、环境和复现步骤", reason: "给模型足够的诊断上下文。" },
      { version: "V2", change: "要求按可能性列出根因", reason: "避免把第一个猜测当成事实。" },
      { version: "V3", change: "为每个根因补充验证方法", reason: "让诊断可以被执行和排除。" },
    ],
    finalPrompt:
      "你是一名故障排查工程师。根据报错 {{报错信息}}、运行环境 {{运行环境}}、复现步骤 {{复现步骤}} 和最近改动 {{最近改动}}，输出：已知事实、仍缺信息、按可能性排序的 3 个根因、每个根因的最小验证方法、最小修复方案、回归测试清单。不要把假设写成结论。",
    result: "输出从单一修复建议升级为一份可以逐项执行、排除和复盘的诊断方案。",
    lessons: ["诊断的关键是可验证，不是语气确定", "区分事实与假设", "修复方案必须附带回归测试"],
    promptSlug: "debug-root-cause",
  },
  {
    slug: "landing-page-evolution",
    title: "落地页：从产品介绍到转化决策路径",
    category: "营销",
    problem: "普通文案只会罗列功能，无法回答用户为什么现在行动、为什么相信你、为什么不选替代方案。",
    weakPrompt: "帮我的 SaaS 写一个高转化落地页。",
    failureReasons: [
      "没有目标用户与核心场景",
      "功能没有转化为用户收益",
      "缺少可信证据与风险逆转",
      "CTA 与用户决策阶段不匹配",
    ],
    iterations: [
      { version: "V1", change: "补充用户、痛点和使用场景", reason: "让文案针对具体决策者。" },
      { version: "V2", change: "把功能改写为可感知收益", reason: "用户购买结果，而不是功能列表。" },
      { version: "V3", change: "加入证据、异议处理和 CTA", reason: "降低信任成本与行动阻力。" },
    ],
    finalPrompt:
      "你是一名转化文案顾问。请为 {{产品}} 面向 {{目标用户}}，围绕 {{核心痛点}} 和 {{可信证据}}，设计落地页：价值主张、问题场景、核心收益、工作原理、Before/After、证据、常见异议、风险逆转和 CTA。不得虚构客户、数字或效果；缺少证据时明确列出需要补充的材料。",
    result: "获得一条从问题认知、价值理解、信任建立到行动转化的完整页面路径。",
    lessons: ["先设计决策路径，再写句子", "功能必须翻译成用户收益", "禁止模型虚构社会证明"],
    promptSlug: "landing-page-copy",
  },
];
