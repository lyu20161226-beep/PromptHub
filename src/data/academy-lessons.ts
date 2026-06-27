export type AcademyLesson = {
  slug: string;
  title: string;
  category: string;
  question: string;
  principle: string;
  whenToUse: string;
  workflow: readonly string[];
  deliverable: string;
  promptStarter: string;
};

export const academyLessons: readonly AcademyLesson[] = [
  {
    slug: "value-based-pricing",
    title: "价值定价：不要只看成本",
    category: "定价",
    question: "一个新产品应该卖多少钱，用户为什么愿意付费？",
    principle: "价格不只由成本决定，也取决于用户感知到的价值、替代方案和购买风险。",
    whenToUse: "新产品定价、套餐设计、涨价评估或促销策略制定。",
    workflow: ["定义目标用户", "量化核心收益", "分析替代方案", "设计价格锚点", "制定验证实验"],
    deliverable: "用户价值表、价格区间、三档套餐与两周定价实验。",
    promptStarter: "请根据目标用户、核心收益、替代方案和购买风险，设计一套价值定价方案。",
  },
  {
    slug: "business-model",
    title: "商业模式：从收入到现金流",
    category: "商业模式",
    question: "一个看起来不错的产品，怎样变成可持续经营的生意？",
    principle: "商业模式需要同时回答客户是谁、价值是什么、如何获客、如何收费以及成本如何发生。",
    whenToUse: "创业构想验证、业务复盘、融资材料或新业务设计。",
    workflow: ["识别付费客户", "明确价值主张", "拆解收入来源", "估算成本结构", "检查现金流风险"],
    deliverable: "商业模式画布、关键假设、风险清单与验证优先级。",
    promptStarter: "请把这个产品构想拆成客户、价值、渠道、收入、成本和关键风险六个部分。",
  },
  {
    slug: "growth-flywheel",
    title: "增长飞轮：让每次获客产生下一次增长",
    category: "增长",
    question: "如何避免一直花钱买流量，让用户行为推动后续增长？",
    principle: "真正的增长飞轮会把一次使用产生的内容、口碑、数据或协作关系变成下一轮获客动力。",
    whenToUse: "内容产品、SaaS、社区、电商和个人品牌增长设计。",
    workflow: ["找到高价值行为", "识别可沉淀资产", "设计分享触点", "缩短反馈周期", "定义飞轮指标"],
    deliverable: "增长飞轮图、关键行为、触发机制和每周实验计划。",
    promptStarter: "请基于产品的核心用户行为，设计一个可以自我增强的增长飞轮。",
  },
  {
    slug: "competitive-decision",
    title: "竞品分析：不是罗列功能",
    category: "决策",
    question: "看完一堆竞品后，怎样形成真正可执行的产品判断？",
    principle: "竞品分析的目的不是收集信息，而是识别用户选择标准、市场空白和自己的取舍。",
    whenToUse: "产品立项、市场进入、功能规划或定位调整。",
    workflow: ["定义决策问题", "选择有效竞品", "比较用户场景", "分析价值与价格", "形成差异化假设"],
    deliverable: "竞品矩阵、机会地图、差异化假设和下一步验证动作。",
    promptStarter: "请围绕用户为什么选择某个方案，完成竞品分析并给出三个可验证的差异化机会。",
  },
  {
    slug: "opportunity-cost",
    title: "机会成本：决定什么不做",
    category: "决策",
    question: "资源有限时，哪些事情应该优先，哪些事情应该停止？",
    principle: "选择一个方案的真实成本，包括因此放弃的最好替代方案及其潜在收益。",
    whenToUse: "功能优先级、营销渠道选择、项目排期和个人时间分配。",
    workflow: ["列出候选方案", "统一评价标准", "估算收益与风险", "识别放弃成本", "设置停止条件"],
    deliverable: "决策矩阵、推荐顺序、放弃理由和复盘日期。",
    promptStarter: "请比较这些候选方案的收益、风险、资源投入和机会成本，并给出取舍建议。",
  },
  {
    slug: "compound-system",
    title: "复利系统：让一次工作持续产生价值",
    category: "效率",
    question: "如何把一次完成的任务，变成以后可以重复使用的资产？",
    principle: "复利来自可重复积累：模板、数据、内容、流程和反馈都可以降低下一次工作的边际成本。",
    whenToUse: "内容生产、销售、学习、项目管理和个人知识管理。",
    workflow: ["识别重复任务", "提取稳定结构", "建立输入模板", "保存输出资产", "用反馈持续升级"],
    deliverable: "可复用 SOP、变量模板、资产目录和迭代规则。",
    promptStarter: "请把这项重复工作拆成可复用流程，并标出可以模板化、自动化和持续积累的部分。",
  },
];
