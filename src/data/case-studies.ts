export type CaseVerificationStatus = "verified" | "source-linked" | "unverified";
export type ModelTestStatus = "tested" | "not-tested";

export type CuratedCase = {
  id: string;
  slug: string;
  title: string;
  sourcePlatform: string;
  sourceUrl: string | null;
  sourceAuthor: string | null;
  sourceDate: string | null;
  category: string;
  useCase: string;
  problem: string;
  originalPrompt: string;
  workflowSteps: readonly string[];
  inputSummary: string;
  outputSummary: string;
  resultClaim: string;
  metrics: {
    likes: number | null;
    comments: number | null;
    views: number | null;
    bookmarks: number | null;
  };
  reusableTemplate: string;
  tags: readonly string[];
  verificationStatus: CaseVerificationStatus;
  curatorNote: string;
  evidence: {
    summary: string;
    testedAt: string | null;
    testedModels: readonly string[];
    reproducibility: "high" | "medium" | "low" | "not-tested";
  };
  whyItWorks: readonly {
    principle: string;
    explanation: string;
  }[];
  failureCases: readonly {
    symptom: string;
    cause: string;
    fix: string;
  }[];
  modelComparison: readonly {
    model: string;
    status: ModelTestStatus;
    score: number | null;
    note: string;
  }[];
  decision: {
    recommendedWhen: readonly string[];
    avoidWhen: readonly string[];
    alternatives: readonly string[];
  };
  evolution: readonly {
    version: string;
    date: string;
    changes: string;
    status: "current" | "deprecated";
  }[];
  promptSlug: string;
  relatedPackSlugs: readonly string[];
};

const emptyMetrics = {
  likes: null,
  comments: null,
  views: null,
  bookmarks: null,
} as const;

const unverifiedEvidence = {
  summary: "当前只有 PromptHub 编辑演示，没有外部来源、完整运行记录或可复核结果。",
  testedAt: null,
  testedModels: [],
  reproducibility: "not-tested",
} as const;

const untestedModelComparison = ["GPT", "Claude", "Gemini", "DeepSeek"].map((model) => ({
  model,
  status: "not-tested" as const,
  score: null,
  note: "待使用同一输入、输出标准和测试轮次进行人工验证。",
}));

const demoEvolution = [
  {
    version: "v0.1",
    date: "2026-06",
    changes: "建立结构演示，尚未完成真实来源、跨模型和重复运行验证。",
    status: "current" as const,
  },
];

export const caseStudies: readonly CuratedCase[] = [
  {
    id: "case-demo-001",
    slug: "nextjs-hydration-debugging",
    title: "Next.js 水合错误排查工作流",
    sourcePlatform: "PromptHub Demo",
    sourceUrl: null,
    sourceAuthor: null,
    sourceDate: null,
    category: "编程",
    useCase: "定位服务端与客户端渲染结果不一致的问题。",
    problem: "只看最后一行报错容易盲目修改代码，无法证明真正根因。",
    originalPrompt: "这个 Hydration failed 怎么修？",
    workflowSteps: ["固定环境与复现步骤", "列出可证伪假设", "执行最小验证", "实施最小修复", "补充回归检查"],
    inputSummary: "Next.js 15 App Router 页面在服务端和客户端分别生成动态时间文本。",
    outputSummary: "识别动态时间导致文本不一致，并给出稳定占位、客户端更新与回归检查方案。",
    resultClaim: "Demo 输出结构，不代表真实项目修复结果。",
    metrics: emptyMetrics,
    reusableTemplate: "根据报错、环境、复现步骤和最近改动，列出已知事实、待补信息、三个根因假设、验证方式、最小修复与回归清单。",
    tags: ["Next.js", "Debug", "根因分析"],
    verificationStatus: "unverified",
    curatorNote: "该案例用于演示统一案例结构。接入真实案例时需补充公开来源或可核验记录。",
    evidence: unverifiedEvidence,
    whyItWorks: [
      { principle: "假设驱动调试", explanation: "先列出可证伪假设，再用最小实验缩小问题范围。" },
      { principle: "事实与推测分离", explanation: "明确区分日志、复现结果和仍待验证的判断。" },
    ],
    failureCases: [
      { symptom: "修改多处后错误暂时消失", cause: "没有建立最小复现，无法确认真正根因。", fix: "回退到最小改动，并逐项记录验证结果。" },
      { symptom: "模型给出通用修复清单", cause: "缺少环境、堆栈和最近改动。", fix: "补充版本、完整错误和稳定复现步骤。" },
    ],
    modelComparison: untestedModelComparison,
    decision: {
      recommendedWhen: ["错误可以稳定复现", "能够提供完整堆栈、版本和最近改动"],
      avoidWhen: ["生产事故仍在扩大且需要先止损", "缺少日志与复现条件"],
      alternatives: ["先执行回滚或隔离故障", "使用框架官方调试指南建立最小复现"],
    },
    evolution: demoEvolution,
    promptSlug: "debug-root-cause",
    relatedPackSlugs: ["indie-product-research"],
  },
  {
    id: "case-demo-002",
    slug: "seo-topic-cluster-planning",
    title: "从一个 SEO 关键词到主题集群",
    sourcePlatform: "PromptHub Demo",
    sourceUrl: null,
    sourceAuthor: null,
    sourceDate: null,
    category: "内容营销",
    useCase: "为一个主题规划搜索意图、内容集群和发布顺序。",
    problem: "直接批量生成标题会产生重复选题，也无法判断内容服务哪个用户阶段。",
    originalPrompt: "围绕 AI 创业给我 50 个 SEO 标题。",
    workflowSteps: ["判断搜索意图", "拆解决策阶段", "建立主题集群", "标记证据需求", "安排发布顺序"],
    inputSummary: "主题为 AI 创业，读者是第一次验证 AI 产品的独立开发者。",
    outputSummary: "形成按机会、验证、MVP、成本和获客组织的内容矩阵。",
    resultClaim: "未接入搜索量和排名数据，不宣称获得真实 SEO 增长。",
    metrics: emptyMetrics,
    reusableTemplate: "围绕核心关键词、目标读者和业务目标，输出搜索意图、主题集群、内容缺口、证据需求、内链关系与发布顺序。",
    tags: ["SEO", "内容集群", "搜索意图"],
    verificationStatus: "unverified",
    curatorNote: "真实发布前必须使用搜索工具补充关键词数据，并人工核验搜索结果页。",
    evidence: unverifiedEvidence,
    whyItWorks: [
      { principle: "搜索意图优先", explanation: "先判断用户要学习、比较还是购买，再决定页面类型。" },
      { principle: "主题集群", explanation: "通过支柱页与子主题减少重复内容，并建立清晰内链。" },
    ],
    failureCases: [
      { symptom: "生成大量相似标题", cause: "只要求数量，没有约束搜索意图和内容边界。", fix: "按意图、漏斗阶段和证据需求去重。" },
      { symptom: "选题看起来合理但没有流量", cause: "没有接入真实关键词与 SERP 数据。", fix: "发布前人工验证搜索量、竞争度和结果类型。" },
    ],
    modelComparison: untestedModelComparison,
    decision: {
      recommendedWhen: ["已有明确主题与目标读者", "愿意使用真实关键词工具复核"],
      avoidWhen: ["需要即时热点稿件", "没有搜索需求或业务目标"],
      alternatives: ["先做用户访谈确定问题", "用 Search Console 数据更新已有内容"],
    },
    evolution: demoEvolution,
    promptSlug: "seo-content-brief",
    relatedPackSlugs: ["xiaohongshu-growth", "indie-product-research"],
  },
  {
    id: "case-demo-003",
    slug: "resume-impact-rewrite",
    title: "把简历职责改成可核验成果",
    sourcePlatform: "PromptHub Demo",
    sourceUrl: null,
    sourceAuthor: null,
    sourceDate: null,
    category: "求职",
    useCase: "将模糊职责改写成有范围、有动作且可追问的经历。",
    problem: "模型容易为了显得专业而虚构增长数字和项目影响。",
    originalPrompt: "帮我把这段简历写得更厉害。",
    workflowSteps: ["提取已知事实", "识别动作与范围", "标记证据缺口", "生成简历短句", "准备面试追问"],
    inputSummary: "连续 12 周执行内容活动，覆盖三个渠道，但没有确认转化提升比例。",
    outputSummary: "保留可核验周期、渠道和协作信息，对未知结果明确标记待补。",
    resultClaim: "没有真实投递或面试数据，不宣称提高面试率。",
    metrics: emptyMetrics,
    reusableTemplate: "依据岗位 JD 和真实经历，按行动、范围、方法、结果改写；禁止虚构数字，缺少证据时列出需要补充的问题。",
    tags: ["简历", "求职", "成果量化"],
    verificationStatus: "unverified",
    curatorNote: "案例强调可核验表达，不把文案优化等同于招聘结果。",
    evidence: unverifiedEvidence,
    whyItWorks: [
      { principle: "可核验表达", explanation: "只强化真实动作、范围和影响，不编造结果数字。" },
      { principle: "岗位对齐", explanation: "将经历与目标岗位能力对应，降低招聘者理解成本。" },
    ],
    failureCases: [
      { symptom: "简历数字很亮眼但无法解释", cause: "模型为了增强说服力虚构指标。", fix: "未知数字标记待补，面试前准备证据。" },
      { symptom: "每条经历都像同一个模板", cause: "没有保留任务差异和个人贡献。", fix: "补充角色、约束、协作对象和决策过程。" },
    ],
    modelComparison: untestedModelComparison,
    decision: {
      recommendedWhen: ["已有真实经历但表达模糊", "目标岗位和 JD 已明确"],
      avoidWhen: ["希望凭空补齐项目或业绩", "经历真实性无法核验"],
      alternatives: ["先整理项目证据与工作记录", "请行业导师进行人工简历审阅"],
    },
    evolution: demoEvolution,
    promptSlug: "resume-impact-rewrite",
    relatedPackSlugs: [],
  },
  {
    id: "case-demo-004",
    slug: "xiaohongshu-coffee-machine",
    title: "咖啡机小红书内容工作流",
    sourcePlatform: "PromptHub Demo",
    sourceUrl: null,
    sourceAuthor: null,
    sourceDate: null,
    category: "内容营销",
    useCase: "把产品卖点转化为场景化笔记、标题和评论区互动。",
    problem: "只罗列产品功能，内容像广告且缺少具体使用场景。",
    originalPrompt: "帮咖啡机写一篇小红书文案。",
    workflowSteps: ["定义目标用户", "选择痛点场景", "生成标题钩子", "组织正文证据", "补充标签与互动"],
    inputSummary: "产品是入门咖啡机，目标用户为办公室白领，卖点是操作简单和快速出咖啡。",
    outputSummary: "输出标题候选、场景化正文、标签、评论区问题与发布检查清单。",
    resultClaim: "没有真实发布数据，不宣称成为爆款或提升转化率。",
    metrics: emptyMetrics,
    reusableTemplate: "根据产品、用户、核心卖点、价格和真实体验，生成标题、正文、标签、评论区引导和发布前检查。",
    tags: ["小红书", "种草", "产品内容"],
    verificationStatus: "unverified",
    curatorNote: "真实案例需要补充原帖链接、发布时间和平台公开数据。",
    evidence: unverifiedEvidence,
    whyItWorks: [
      { principle: "场景先于卖点", explanation: "先让目标用户看见自己的问题，再解释产品如何介入。" },
      { principle: "完整发布闭环", explanation: "标题、正文、标签、互动和复盘使用同一用户假设。" },
    ],
    failureCases: [
      { symptom: "内容像硬广告", cause: "只有产品功能，没有真实场景和使用证据。", fix: "补充痛点时刻、使用过程与可核验体验。" },
      { symptom: "标题吸引但正文无法承接", cause: "标题和正文由不同角度独立生成。", fix: "先固定单一内容承诺，再统一生成各模块。" },
    ],
    modelComparison: untestedModelComparison,
    decision: {
      recommendedWhen: ["产品体验和卖点真实", "目标用户与发布场景明确"],
      avoidWhen: ["没有亲自体验产品", "需要伪造口碑或夸张功效"],
      alternatives: ["先采集真实用户访谈", "从 FAQ 或评论问题制作教育型内容"],
    },
    evolution: demoEvolution,
    promptSlug: "xiaohongshu-product-note",
    relatedPackSlugs: ["xiaohongshu-growth"],
  },
  {
    id: "case-demo-005",
    slug: "saas-landing-page",
    title: "独立开发者 SaaS 落地页工作流",
    sourcePlatform: "PromptHub Demo",
    sourceUrl: null,
    sourceAuthor: null,
    sourceDate: null,
    category: "产品增长",
    useCase: "围绕单一用户、问题和行动目标组织产品发布页。",
    problem: "页面堆叠功能，却没有解释用户为什么现在行动和为什么相信产品。",
    originalPrompt: "给我的 SaaS 写一个高转化落地页。",
    workflowSteps: ["明确用户与 CTA", "写价值主张", "组织使用场景", "列出可信证据缺口", "处理异议与 FAQ"],
    inputSummary: "产品帮助内容创作者复用 AI 工作流，CTA 为免费浏览。",
    outputSummary: "形成首屏、问题、方案、场景、证据、FAQ 和 CTA 的完整页面结构。",
    resultClaim: "没有真实访问和转化数据，不宣称高转化。",
    metrics: emptyMetrics,
    reusableTemplate: "围绕目标用户、核心问题、产品差异、真实证据和唯一 CTA，生成落地页结构；缺少证据时列出待补材料。",
    tags: ["SaaS", "落地页", "转化"],
    verificationStatus: "unverified",
    curatorNote: "上线后应记录访问、CTA 点击和注册数据，再判断页面效果。",
    evidence: unverifiedEvidence,
    whyItWorks: [
      { principle: "单一用户与行动", explanation: "围绕一个目标用户和一个 CTA，避免页面信息互相竞争。" },
      { principle: "证据缺口显式化", explanation: "没有客户数据时列出待补材料，而不是生成虚假社会证明。" },
    ],
    failureCases: [
      { symptom: "页面功能很多但价值不清楚", cause: "从产品功能而不是用户任务组织内容。", fix: "用问题、结果和使用场景重排信息。" },
      { symptom: "文案承诺过度", cause: "缺少真实证据却要求模型写高转化文案。", fix: "降低承诺，并建立证据采集清单。" },
    ],
    modelComparison: untestedModelComparison,
    decision: {
      recommendedWhen: ["已经定义单一用户和单一 CTA", "能够提供真实产品证据"],
      avoidWhen: ["产品定位尚未确认", "同时服务多个完全不同的用户群"],
      alternatives: ["先运行产品验证工作流", "用用户访谈重写问题陈述"],
    },
    evolution: demoEvolution,
    promptSlug: "landing-page-copy",
    relatedPackSlugs: ["indie-product-research"],
  },
  {
    id: "case-demo-006",
    slug: "amazon-headphones-listing",
    title: "无线耳机跨境 Listing 工作流",
    sourcePlatform: "PromptHub Demo",
    sourceUrl: null,
    sourceAuthor: null,
    sourceDate: null,
    category: "跨境电商",
    useCase: "统一商品关键词、标题、五点描述和广告文案。",
    problem: "不同模块分别生成，关键词、卖点和合规边界不一致。",
    originalPrompt: "写一个无线耳机 Amazon Listing。",
    workflowSteps: ["整理商品事实", "建立关键词簇", "区分功能与收益", "按场景写模块", "执行合规检查"],
    inputSummary: "美国市场无线降噪耳机，覆盖通勤、会议和运动场景。",
    outputSummary: "输出关键词簇、标题、五点描述、A+ 模块和广告文案草稿。",
    resultClaim: "没有真实商品页面、销量或广告数据，不宣称提升销售。",
    metrics: emptyMetrics,
    reusableTemplate: "根据商品参数、市场、用户、场景、卖点和禁用表达，生成关键词、标题、Bullet Points、A+ Content 与合规检查。",
    tags: ["Amazon", "Listing", "跨境电商"],
    verificationStatus: "unverified",
    curatorNote: "真实发布前需由卖家核验产品事实、关键词工具数据和平台规则。",
    evidence: unverifiedEvidence,
    whyItWorks: [
      { principle: "商品事实优先", explanation: "先锁定参数、受众、场景和禁用表达，再生成销售内容。" },
      { principle: "跨模块一致", explanation: "关键词、标题、卖点和广告共享同一定位与证据。" },
    ],
    failureCases: [
      { symptom: "Listing 出现错误参数", cause: "模型根据品类常识补全了未提供的信息。", fix: "要求未知字段留空，并由卖家逐项确认。" },
      { symptom: "关键词堆砌影响可读性", cause: "只要求覆盖关键词，没有设定优先级。", fix: "划分核心词、场景词和补充词，并限制密度。" },
    ],
    modelComparison: untestedModelComparison,
    decision: {
      recommendedWhen: ["商品参数与目标市场完整", "卖家能够执行合规复核"],
      avoidWhen: ["产品事实不完整", "需要模型自行猜测认证或功效"],
      alternatives: ["先完成商品信息表", "使用平台官方 Listing 指南人工撰写"],
    },
    evolution: demoEvolution,
    promptSlug: "landing-page-copy",
    relatedPackSlugs: ["cross-border-commerce"],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
