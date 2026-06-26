export type WorkflowPack = {
  slug: string;
  title: string;
  shortTitle: string;
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
    audience: "品牌运营、自媒体、小商家",
    description: "帮助用户 30 分钟完成一篇可发布的小红书爆款笔记，从选题、标题、正文、标签到评论区引导和复盘形成完整闭环。",
    price: 9,
    icon: "social",
    promptIds: ["chatgpt-001", "writing-001", "writing-003", "writing-004", "marketing-005"],
    includes: ["7 个小红书内容 Prompt", "Before / After 案例", "爆款标题与正文模板", "评论区引导模板", "发布复盘清单"]
  },
  {
    slug: "cross-border-commerce",
    title: "跨境电商商品文案工作流包",
    shortTitle: "跨境 Listing 包",
    audience: "跨境卖家、电商运营、品牌团队",
    description: "围绕关键词、标题、Bullet Points、A+ Content、广告文案和 Review 回复，完成跨境卖家每天都会用到的商品内容资产。",
    price: 29,
    icon: "commerce",
    promptIds: ["visual-001", "midjourney-001", "marketing-002", "marketing-003", "marketing-004"],
    includes: ["6 个跨境商品 Prompt", "Amazon Listing 输出模板", "A+ Content 模块模板", "广告文案模板", "Review 回复与合规避坑"]
  },
  {
    slug: "teacher-lesson",
    title: "教师教案与课堂设计工作流包",
    shortTitle: "教师教案包",
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
    audience: "独立开发者、产品经理、创业者",
    description: "从 Idea、市场验证、竞品分析、Landing Page、定价到冷启动营销，帮助独立开发者把想法变成可验证的 MVP。",
    price: 29,
    icon: "research",
    promptIds: ["chatgpt-005", "chatgpt-006", "marketing-003", "marketing-002", "office-005"],
    includes: ["6 个产品验证 Prompt", "竞品矩阵模板", "用户访谈问题库", "Landing Page 文案模板", "30 天冷启动计划"]
  },
  {
    slug: "ai-visual-style",
    title: "AI 绘图商业风格工作流包",
    shortTitle: "AI 绘图风格包",
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
