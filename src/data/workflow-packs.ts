export type WorkflowPack = {
  slug: string;
  title: string;
  shortTitle: string;
  audience: string;
  description: string;
  price: number;
  icon: "code" | "growth" | "career";
  workflowIds: readonly string[];
  includes: readonly string[];
};

export const workflowPacks: readonly WorkflowPack[] = [
  {
    slug: "developer-toolkit",
    title: "程序员 AI 工程工作流包",
    shortTitle: "程序员工作流包",
    audience: "开发工程师与技术负责人",
    description: "从定位报错、生成测试到安全重构遗留代码，把 AI 接入可验证的工程流程。",
    price: 29,
    icon: "code",
    workflowIds: ["coding-002", "coding-004", "coding-005"],
    includes: ["3 个完整工程工作流", "3 组真实输入输出案例", "常见误区与验证清单", "模型配置与复制模板"]
  },
  {
    slug: "growth-strategy",
    title: "增长与商业分析工作流包",
    shortTitle: "增长策略工作流包",
    audience: "运营、市场与产品经理",
    description: "覆盖 SEO 策划、落地页转化、竞品分析与整合营销，围绕真实业务结果组织输出。",
    price: 29,
    icon: "growth",
    workflowIds: ["chatgpt-003", "marketing-002", "chatgpt-005", "marketing-001"],
    includes: ["4 个增长与策略工作流", "4 组结构化实测案例", "事实核查与避坑指南", "可复用输出框架"]
  },
  {
    slug: "career-workplace",
    title: "求职与职场效率工作流包",
    shortTitle: "求职职场工作流包",
    audience: "求职者、管理者与客服团队",
    description: "把经历改写、会议讨论和客户问题转化为清晰、有证据、可直接行动的结果。",
    price: 19,
    icon: "career",
    workflowIds: ["chatgpt-009", "chatgpt-010", "chatgpt-004"],
    includes: ["3 个高频职场工作流", "3 组完整输入输出示例", "表达错误与边界提醒", "复制即用的交付模板"]
  }
] as const;

export function getPackForWorkflow(workflowId: string) {
  return workflowPacks.find((pack) => pack.workflowIds.includes(workflowId));
}
