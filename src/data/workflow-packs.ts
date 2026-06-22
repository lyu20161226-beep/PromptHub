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
    audience: "品牌运营、自媒体与小商家",
    description: "从产品卖点提炼、标题测试到正文与短视频脚本，完成一套可复用的小红书内容生产流程。",
    price: 19,
    icon: "social",
    promptIds: ["chatgpt-001", "writing-001", "writing-003", "writing-004", "marketing-005"],
    includes: ["5 个原创内容工作流", "示例输入与结构化输出", "标题与正文使用场景", "常见空泛表达避坑清单", "可直接改写的发布模板"]
  },
  {
    slug: "cross-border-commerce",
    title: "跨境卖家商品内容工作流包",
    shortTitle: "跨境商品文案包",
    audience: "跨境卖家、电商运营与品牌团队",
    description: "围绕商品定位、主图、落地页、竞品分析与邮件培育组织内容，减少不同渠道之间的重复劳动。",
    price: 29,
    icon: "commerce",
    promptIds: ["visual-001", "midjourney-001", "marketing-002", "marketing-003", "marketing-004"],
    includes: ["5 个商品增长工作流", "视觉与文案协同示例", "不同渠道的使用说明", "事实与合规检查项", "商品页交付模板"]
  },
  {
    slug: "teacher-lesson",
    title: "教师教案与课堂设计工作流包",
    shortTitle: "教师教案包",
    audience: "中小学教师、培训讲师与课程设计者",
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
    audience: "公众号、短视频与个人品牌创作者",
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
    audience: "独立开发者、产品经理与创业者",
    description: "从竞品、用户访谈和市场定位出发，再连接落地页与决策记录，降低只凭直觉做产品的风险。",
    price: 29,
    icon: "research",
    promptIds: ["chatgpt-005", "chatgpt-006", "marketing-003", "marketing-002", "office-005"],
    includes: ["5 个产品验证工作流", "访谈与分析示例", "定性研究使用场景", "证据不足与幻觉提醒", "产品机会评估模板"]
  },
  {
    slug: "ai-visual-style",
    title: "AI 绘图商业风格工作流包",
    shortTitle: "AI 绘图风格包",
    audience: "设计师、电商运营与内容创作者",
    description: "覆盖产品主视觉、Logo、新中式海报和餐饮摄影，以可控制的构图、材质与光线参数组织提示词。",
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
