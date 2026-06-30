export type PackModelRecommendation = {
  model: string;
  fit: string;
  status: "recommended" | "compatible" | "not-tested";
};

export type PackDeepDive = {
  slug: string;
  goal: string;
  promise: string;
  requiredInputs: readonly string[];
  expectedBenefits: readonly string[];
  evidenceNote: string;
  recommendedModels: readonly PackModelRecommendation[];
  fullWorkflow: readonly string[];
  prompts: readonly string[];
  beforeAfter: {
    input: string;
    before: string;
    after: readonly string[];
  };
  demoSteps: readonly string[];
  outputTemplate: readonly string[];
  mistakes: readonly string[];
  limitations: readonly string[];
};

export const packDeepDives: Record<string, PackDeepDive> = {
  "xiaohongshu-growth": {
    slug: "xiaohongshu-growth",
    goal: "把产品信息整理成一套可修改、可发布、可复盘的小红书内容草稿。",
    promise: "从选题、标题、正文、标签、评论区到复盘，形成完整内容生产闭环。",
    requiredInputs: ["产品与真实卖点", "目标用户", "使用场景", "品牌语气"],
    expectedBenefits: ["减少重复改写", "让内容结构更完整", "保留人工审核与平台适配"],
    evidenceNote: "当前案例为结构演示，尚未形成可公开的真实发布效果数据。",
    recommendedModels: [
      { model: "DeepSeek Chat", fit: "中文初稿与结构整理", status: "compatible" },
      { model: "ChatGPT", fit: "多版本改写与语气调整", status: "not-tested" },
      { model: "Claude", fit: "长文审校与一致性检查", status: "not-tested" },
    ],
    fullWorkflow: ["选题定位", "标题测试", "开头钩子", "正文结构", "标签组合", "评论区引导", "发布复盘"],
    prompts: ["选题 Prompt", "标题 Prompt", "开头钩子 Prompt", "正文 Prompt", "标签 Prompt", "评论区 Prompt", "复盘 Prompt"],
    beforeAfter: {
      input: "产品：便携咖啡机；用户：办公室白领；卖点：3 分钟出咖啡、免安装、适合工位。",
      before: "这款咖啡机很好用，适合上班族，操作简单，推荐大家购买。",
      after: [
        "标题：打工人早八续命神器，我把咖啡店搬进了工位",
        "正文：先写排队买咖啡的时间成本，再写 3 分钟出咖啡的场景体验。",
        "标签：#办公室好物 #咖啡机推荐 #打工人续命 #小家电",
        "CTA：评论区引导用户留下预算，再按价位整理选购建议。",
      ],
    },
    demoSteps: ["输入产品与目标用户", "选择内容角度", "生成标题与正文草稿", "人工核对事实与语气", "发布后按复盘清单记录结果"],
    outputTemplate: ["标题候选", "正文结构", "标签组合", "评论区引导", "发布检查清单", "复盘问题清单"],
    mistakes: ["只写产品功能，不写用户场景。", "标题太像广告，缺少具体情境。", "把 AI 生成的体验描述当作真实经历。", "标签过泛，无法承接目标搜索意图。"],
    limitations: ["不能替代真实产品体验。", "不能保证流量或转化结果。", "发布前仍需检查平台规则、事实和品牌口径。"],
  },
  "cross-border-commerce": {
    slug: "cross-border-commerce",
    goal: "把商品参数整理成关键词、Listing、A+ 内容、广告和售后回复草稿。",
    promise: "让商品页各模块共享同一组事实、卖点和目标场景，减少内容前后不一致。",
    requiredInputs: ["真实商品参数", "目标市场", "目标用户与场景", "禁用表达与合规要求"],
    expectedBenefits: ["统一商品卖点", "减少跨文档复制", "更容易进行合规复核"],
    evidenceNote: "当前案例为结构演示，不代表 Amazon 审核、排名或销售结果。",
    recommendedModels: [
      { model: "DeepSeek Chat", fit: "参数整理与中文工作底稿", status: "compatible" },
      { model: "ChatGPT", fit: "英文 Listing 多版本草拟", status: "not-tested" },
      { model: "Claude", fit: "长上下文一致性与风险检查", status: "not-tested" },
    ],
    fullWorkflow: ["参数核对", "关键词聚类", "标题草拟", "Bullet Points", "A+ Content", "广告与 Review 回复"],
    prompts: ["参数核对 Prompt", "关键词 Prompt", "标题 Prompt", "五点描述 Prompt", "A+ 内容 Prompt", "广告与回复 Prompt"],
    beforeAfter: {
      input: "产品：无线降噪耳机；市场：美国；卖点：低延迟、长续航、通勤降噪。",
      before: "Wireless headphones with noise cancelling, long battery life and good sound quality.",
      after: [
        "Title：Wireless Noise Cancelling Earbuds for Commuting, Low Latency Bluetooth Headphones with 36H Battery",
        "Bullet：按通勤、会议、运动场景组织卖点，而不是堆叠功能词。",
        "A+：输出模块标题、图片说明、对比表和 FAQ 草稿。",
        "Review：区分物流、质量、使用误解三类回复模板，并标出需要人工确认的承诺。",
      ],
    },
    demoSteps: ["填写商品事实与目标市场", "核对参数和禁用表达", "生成关键词与 Listing 草稿", "统一 A+ 和广告口径", "人工完成平台合规复核"],
    outputTemplate: ["参数事实表", "关键词簇", "Amazon 标题", "Bullet Points", "A+ Content 模块", "广告与 Review 回复草稿"],
    mistakes: ["标题堆关键词导致可读性差。", "Bullet 只写参数，不写场景利益。", "使用无法证明的第一、最好等绝对化表达。", "Review 回复过度承诺，带来合规风险。"],
    limitations: ["不能替代平台政策和法律审查。", "不能编造认证、参数或用户评价。", "关键词与文案需要按站点和类目重新核对。"],
  },
  "indie-product-research": {
    slug: "indie-product-research",
    goal: "把产品想法转成用户假设、访谈、竞品、定价和冷启动验证计划。",
    promise: "先区分事实与假设，再设计低成本实验，避免一开始就进入功能开发。",
    requiredInputs: ["产品想法", "目标用户", "现有证据", "时间与预算边界"],
    expectedBenefits: ["明确待验证假设", "减少无证据决策", "形成下一步实验清单"],
    evidenceNote: "当前案例为方法演示，不构成市场规模、需求强度或商业成功证明。",
    recommendedModels: [
      { model: "DeepSeek Chat", fit: "假设拆解与中文访谈提纲", status: "compatible" },
      { model: "ChatGPT", fit: "实验方案与文案多版本", status: "not-tested" },
      { model: "Claude", fit: "长材料归纳与证据冲突检查", status: "not-tested" },
    ],
    fullWorkflow: ["定义问题", "拆分假设", "竞品研究", "用户访谈", "Landing Page", "定价实验", "冷启动计划"],
    prompts: ["Idea 筛选 Prompt", "假设拆解 Prompt", "竞品分析 Prompt", "访谈 Prompt", "Landing Page Prompt", "定价与冷启动 Prompt"],
    beforeAfter: {
      input: "想法：给自由职业者做 AI 合同审查工具；目标：英文市场；预算：低成本验证。",
      before: "这个想法不错，可以做一个网站，然后推广给自由职业者。",
      after: [
        "问题假设：先验证高频风险是付款条款、责任边界还是版权归属。",
        "竞品研究：记录 LegalZoom、DocuSign 与独立 AI 合同工具的入口、定价和承诺。",
        "Landing Page：输出首屏标题、三项问题、等待名单 CTA，并标记待验证表述。",
        "冷启动：列出 Reddit、Indie Hackers、LinkedIn 的 14 天访谈与发布计划。",
      ],
    },
    demoSteps: ["输入产品想法与已有证据", "拆解目标用户和关键假设", "整理竞品事实与未知项", "生成访谈和 Landing Page 草稿", "选择一个最低成本实验"],
    outputTemplate: ["假设清单", "访谈提纲", "竞品矩阵", "差异化机会", "Landing Page 文案", "定价与冷启动实验"],
    mistakes: ["先写代码，后找用户。", "竞品分析只看功能，不看获客和定价。", "把 AI 推测当作真实市场数据。", "实验没有成功标准和停止条件。"],
    limitations: ["不能替代真实访谈和一手数据。", "不能凭空生成可信市场规模。", "法律、财务和行业结论需要专业复核。"],
  },
};
