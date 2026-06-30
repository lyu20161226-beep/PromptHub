export type WorkflowPack = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  status: "featured" | "coming-soon";
  promise: string;
  audience: string;
  description: string;
  price: number;
  icon: "social" | "commerce" | "education" | "creator" | "research" | "visual";
  promptIds: readonly string[];
  includes: readonly string[];
};

export const workflowPacks: readonly WorkflowPack[] = [
  {
    slug: "xiaohongshu-growth",
    title: "小红书爆款内容工作流包",
    shortTitle: "小红书爆文包",
    category: "内容营销",
    status: "featured",
    promise: "完成一篇结构完整、可人工修改的小红书笔记草稿",
    audience: "品牌运营、自媒体、小商家",
    description: "从选题、标题、正文、标签到评论区引导和复盘，形成一套可重复使用的内容流程。",
    price: 9,
    icon: "social",
    promptIds: ["chatgpt-001", "writing-001", "writing-003", "writing-004", "marketing-005"],
    includes: ["7 个小红书内容 Prompt", "Before / After 案例", "爆款标题与正文模板", "评论区引导模板", "发布复盘清单"]
  },
  {
    slug: "cross-border-commerce",
    title: "跨境电商商品文案工作流包",
    shortTitle: "跨境 Listing 包",
    category: "跨境电商",
    status: "featured",
    promise: "统一生成商品 Listing、A+ 内容和广告文案草稿",
    audience: "跨境卖家、电商运营、品牌团队",
    description: "围绕关键词、标题、Bullet Points、A+ Content、广告和 Review 回复，统一商品内容口径。",
    price: 29,
    icon: "commerce",
    promptIds: ["visual-001", "midjourney-001", "marketing-002", "marketing-003", "marketing-004"],
    includes: ["6 个跨境商品 Prompt", "Amazon Listing 输出模板", "A+ Content 模块模板", "广告文案模板", "Review 回复与合规避坑"]
  },
  {
    slug: "teacher-lesson",
    title: "教师教案与课堂设计工作流包",
    shortTitle: "教师教案包",
    category: "教育教学",
    status: "coming-soon",
    promise: "快速完成一套可执行、可检查的课堂方案",
    audience: "中小学教师、培训讲师、课程设计者",
    description: "从教学目标、互动活动到练习与反馈，帮助教师更快形成可执行、可检查的课堂方案。",
    price: 19,
    icon: "education",
    promptIds: ["chatgpt-008", "learning-001", "learning-002", "learning-003", "office-004"],
    includes: ["5 个教学设计工作流", "课堂输入输出案例", "适用年级调整方法", "常见教学目标错误", "教案与练习输出模板"]
  },
  {
    slug: "creator-editorial",
    title: "自媒体选题与内容生产工作流包",
    shortTitle: "自媒体选题包",
    category: "内容创作",
    status: "coming-soon",
    promise: "一小时完成一周选题、脚本和发布排期",
    audience: "公众号、短视频、个人品牌创作者",
    description: "把选题、深度文章、口播脚本、品牌叙事和内容推广串成稳定的编辑流程。",
    price: 19,
    icon: "creator",
    promptIds: ["writing-002", "writing-003", "writing-004", "chatgpt-003", "marketing-001"],
    includes: ["5 个创作工作流", "选题到发布的完整示例", "渠道使用场景说明", "同质化内容避坑指南", "周度编辑排期模板"]
  },
  {
    slug: "indie-product-research",
    title: "独立开发者产品调研工作流包",
    shortTitle: "产品调研包",
    category: "产品创业",
    status: "featured",
    promise: "把产品想法整理成可执行的市场验证计划",
    audience: "独立开发者、产品经理、创业者",
    description: "从想法出发，整理用户假设、竞品事实、Landing Page、定价实验和冷启动步骤。",
    price: 29,
    icon: "research",
    promptIds: ["chatgpt-005", "chatgpt-006", "marketing-003", "marketing-002", "office-005"],
    includes: ["6 个产品验证 Prompt", "竞品矩阵模板", "用户访谈问题库", "Landing Page 文案模板", "30 天冷启动计划"]
  },
  {
    slug: "ai-visual-style",
    title: "AI 绘图商业风格工作流包",
    shortTitle: "AI 绘图风格包",
    category: "视觉设计",
    status: "coming-soon",
    promise: "把模糊需求变成可复用的商业视觉提示词",
    audience: "设计师、电商运营、内容创作者",
    description: "覆盖产品主视觉、Logo、新中式海报和餐饮摄影，用可控制的构图、材质与光线参数组织提示词。",
    price: 29,
    icon: "visual",
    promptIds: ["midjourney-001", "midjourney-002", "visual-001", "visual-002", "visual-005"],
    includes: ["5 个原创视觉工作流", "构图与风格示例", "模型适配说明", "文字变形与画面失控避坑", "视觉需求输入模板"]
  }
] as const;

export const featuredWorkflowPacks = workflowPacks.filter((pack) =>
  ["xiaohongshu-growth", "indie-product-research", "ai-visual-style"].includes(pack.slug)
);

export function getPackForWorkflow(workflowId: string) {
  return workflowPacks.find((pack) => pack.promptIds.includes(workflowId));
}
