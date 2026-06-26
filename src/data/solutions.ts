export type SolutionStep = {
  title: string;
  description: string;
  promptId: string;
};

export type Solution = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  audience: string[];
  outcome: string;
  category: string;
  difficulty: "Starter" | "Growth" | "Advanced";
  promptCount: number;
  recommendedPackSlug: string;
  recommendedPackTitle: string;
  steps: SolutionStep[];
  recommendedPromptIds: string[];
  outputTemplates: string[];
  cta: string;
};

export const solutions: Solution[] = [
  {
    slug: "build-saas",
    title: "Build SaaS",
    subtitle: "SaaS 启动工作流",
    description: "从产品想法、用户痛点、竞品分析到 Landing Page 和冷启动营销，帮助独立开发者把想法变成可验证的 MVP。",
    audience: ["独立开发者", "产品经理", "AI 创业者"],
    outcome: "得到一套可执行的 SaaS 验证方案、落地页文案和 30 天冷启动计划。",
    category: "创业",
    difficulty: "Advanced",
    promptCount: 8,
    recommendedPackSlug: "indie-product-research",
    recommendedPackTitle: "独立开发者产品调研工作流包",
    recommendedPromptIds: ["product-research", "competitor-analysis", "landing-page-copy", "cold-email"],
    steps: [
      { title: "Idea Validation", description: "把模糊想法拆成目标用户、痛点、替代方案和付费假设。", promptId: "product-research" },
      { title: "Competitor Map", description: "列出直接竞品、间接竞品、价格区间和差异化机会。", promptId: "competitor-analysis" },
      { title: "Landing Page", description: "生成首屏价值主张、功能模块、FAQ 和 CTA。", promptId: "landing-page-copy" },
      { title: "Cold Start", description: "规划 Reddit、X、小红书、邮件和社群冷启动动作。", promptId: "cold-email" }
    ],
    outputTemplates: ["MVP 验证表", "竞品分析矩阵", "Landing Page 文案", "30 天冷启动计划"],
    cta: "复制 SaaS 启动 Workflow"
  },
  {
    slug: "grow-xiaohongshu",
    title: "Grow Xiaohongshu",
    subtitle: "小红书增长工作流",
    description: "把选题、标题、正文、标签、评论区引导和复盘串成完整流程，适合品牌、个体商家和内容创作者。",
    audience: ["小红书博主", "品牌运营", "本地商家", "带货团队"],
    outcome: "30 分钟内生成一篇结构完整、可发布、可复盘的小红书笔记。",
    category: "内容增长",
    difficulty: "Starter",
    promptCount: 7,
    recommendedPackSlug: "xiaohongshu-growth",
    recommendedPackTitle: "小红书增长工作流包",
    recommendedPromptIds: ["xhs-product-note", "douyin-script", "headline-generator", "comment-reply"],
    steps: [
      { title: "Topic Finder", description: "根据产品、人群和平台趋势找到更容易出互动的选题角度。", promptId: "xhs-product-note" },
      { title: "Title Hook", description: "生成痛点型、结果型、反差型和清单型标题。", promptId: "headline-generator" },
      { title: "Note Writer", description: "把卖点写成自然的使用体验、场景和转化结构。", promptId: "xhs-product-note" },
      { title: "Comment Loop", description: "设计评论区提问、私信引导和复盘指标。", promptId: "comment-reply" }
    ],
    outputTemplates: ["爆款标题库", "正文排版模板", "标签组合", "评论区引导模板"],
    cta: "复制小红书增长 Workflow"
  },
  {
    slug: "launch-product",
    title: "Launch Product",
    subtitle: "产品发布工作流",
    description: "围绕发布前预热、发布页、社媒内容、邮件通知和发布后复盘，帮助团队更系统地完成新品发布。",
    audience: ["创业团队", "产品经理", "增长负责人"],
    outcome: "得到一套从预热到复盘的发布计划和多渠道文案。",
    category: "增长",
    difficulty: "Growth",
    promptCount: 9,
    recommendedPackSlug: "indie-product-research",
    recommendedPackTitle: "独立开发者产品调研工作流包",
    recommendedPromptIds: ["landing-page-copy", "marketing-campaign", "cold-email", "seo-outline"],
    steps: [
      { title: "Positioning", description: "明确产品面向谁、解决什么问题、为什么现在需要。", promptId: "product-research" },
      { title: "Launch Page", description: "输出发布页首屏、功能、证据、价格和 FAQ。", promptId: "landing-page-copy" },
      { title: "Channel Copy", description: "生成 X、小红书、社群、邮件和 Product Hunt 发布文案。", promptId: "marketing-campaign" },
      { title: "Post-launch Review", description: "整理数据、反馈、转化问题和下一轮迭代动作。", promptId: "weekly-report" }
    ],
    outputTemplates: ["发布计划表", "多渠道发布文案", "FAQ 模板", "发布后复盘表"],
    cta: "复制产品发布 Workflow"
  },
  {
    slug: "write-seo-content",
    title: "Write SEO Content",
    subtitle: "SEO 内容工作流",
    description: "从关键词、搜索意图、内容大纲、正文生成到内链和 FAQ，帮助网站持续生产可收录内容。",
    audience: ["SEO 从业者", "独立站站长", "内容运营"],
    outcome: "得到关键词地图、SEO 大纲、文章结构和发布前检查清单。",
    category: "SEO",
    difficulty: "Growth",
    promptCount: 6,
    recommendedPackSlug: "creator-editorial",
    recommendedPackTitle: "自媒体选题与内容生产工作流包",
    recommendedPromptIds: ["seo-outline", "article-writer", "keyword-cluster", "content-refresh"],
    steps: [
      { title: "Keyword Cluster", description: "把一个主题拆成主关键词、长尾词和内容集群。", promptId: "keyword-cluster" },
      { title: "Search Intent", description: "判断用户想买、想比较、想学习还是想解决问题。", promptId: "seo-outline" },
      { title: "Article Outline", description: "生成 H2/H3、FAQ、内部链接和案例结构。", promptId: "seo-outline" },
      { title: "Publish Check", description: "检查标题、描述、结构、内链和转化入口。", promptId: "content-refresh" }
    ],
    outputTemplates: ["关键词地图", "SEO 文章大纲", "FAQ Schema 草稿", "发布前检查清单"],
    cta: "复制 SEO 内容 Workflow"
  },
  {
    slug: "improve-resume",
    title: "Improve Resume",
    subtitle: "简历优化工作流",
    description: "把普通经历改写成可量化成果，并针对岗位 JD 做匹配分析、项目亮点和面试回答准备。",
    audience: ["求职者", "应届生", "转行人群", "职场晋升者"],
    outcome: "得到更有结果感的简历 bullet、岗位匹配建议和面试故事库。",
    category: "求职",
    difficulty: "Starter",
    promptCount: 5,
    recommendedPackSlug: "creator-editorial",
    recommendedPackTitle: "自媒体选题与内容生产工作流包",
    recommendedPromptIds: ["resume-impact", "interview-prep", "career-story", "cover-letter"],
    steps: [
      { title: "JD Analysis", description: "拆解目标岗位需要的能力、关键词和证明材料。", promptId: "resume-impact" },
      { title: "Impact Rewrite", description: "把职责描述改成动作、指标、结果和业务影响。", promptId: "resume-impact" },
      { title: "Project Story", description: "为每个项目准备背景、行动、结果和复盘。", promptId: "career-story" },
      { title: "Interview Prep", description: "生成高频问题、STAR 回答和追问准备。", promptId: "interview-prep" }
    ],
    outputTemplates: ["简历成果量化模板", "JD 匹配表", "STAR 面试故事", "自我介绍模板"],
    cta: "复制简历优化 Workflow"
  },
  {
    slug: "cross-border-ecommerce",
    title: "Cross-border Ecommerce",
    subtitle: "跨境电商文案工作流",
    description: "把关键词、标题、五点描述、A+ Content、广告文案和 Review 回复串成跨境卖家日常内容生产流程。",
    audience: ["Amazon 卖家", "独立站运营", "跨境品牌团队"],
    outcome: "得到一套可直接改写上架的 Listing、广告和客服回复资产。",
    category: "电商",
    difficulty: "Growth",
    promptCount: 7,
    recommendedPackSlug: "cross-border-commerce",
    recommendedPackTitle: "跨境电商文案包",
    recommendedPromptIds: ["amazon-listing", "ad-copy", "review-reply", "product-photo-prompt"],
    steps: [
      { title: "Keyword Brief", description: "整理核心关键词、竞品词、场景词和禁用词。", promptId: "amazon-listing" },
      { title: "Listing Copy", description: "生成标题、Bullet Points、描述和购买理由。", promptId: "amazon-listing" },
      { title: "A+ Content", description: "规划图文模块、卖点顺序和场景化说明。", promptId: "product-photo-prompt" },
      { title: "Ads & Reviews", description: "生成广告文案、差评回复和售后说明。", promptId: "review-reply" }
    ],
    outputTemplates: ["Amazon Listing 模板", "A+ Content 模块", "广告文案组", "Review 回复模板"],
    cta: "复制跨境电商 Workflow"
  }
];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
