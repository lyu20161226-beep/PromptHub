export type PackDeepDive = {
  slug: string;
  goal: string;
  promise: string;
  fullWorkflow: readonly string[];
  prompts: readonly string[];
  beforeAfter: {
    input: string;
    before: string;
    after: readonly string[];
  };
  demoSteps: readonly string[];
  testimonial: {
    quote: string;
    role: string;
  };
  roi: {
    traditional: string;
    withPack: string;
    saved: string;
    weeklyValue: string;
  };
  outputTemplate: readonly string[];
  mistakes: readonly string[];
};

export const packDeepDives: Record<string, PackDeepDive> = {
  "xiaohongshu-growth": {
    slug: "xiaohongshu-growth",
    goal: "帮助用户 30 分钟完成一篇可发布的小红书爆款笔记。",
    promise: "从选题、标题、正文、标签、评论区到复盘，形成完整内容生产闭环。",
    fullWorkflow: ["选题定位", "标题测试", "开头钩子", "正文结构", "标签组合", "评论区引导", "发布复盘"],
    prompts: ["选题Prompt", "标题Prompt", "开头钩子Prompt", "正文Prompt", "标签Prompt", "评论区Prompt", "复盘Prompt"],
    beforeAfter: {
      input: "产品：便携咖啡机；用户：办公室白领；卖点：3分钟出咖啡、免安装、适合工位。",
      before: "这款咖啡机很好用，适合上班族，操作简单，推荐大家购买。",
      after: [
        "标题：打工人早八续命神器，我把咖啡店搬进了工位",
        "正文：用痛点开场，先写排队买咖啡的时间成本，再写3分钟出咖啡的场景体验。",
        "标签：#办公室好物 #咖啡机推荐 #打工人续命 #小家电",
        "CTA：评论区引导用户留下预算，生成不同价位推荐。"
      ]
    },
    demoSteps: ["输入产品与目标用户", "选择小红书种草工作流", "生成标题与正文", "复制到小红书草稿", "用复盘 Prompt 优化下一篇"],
    testimonial: {
      quote: "原来一篇笔记要反复改标题和正文，现在可以先拿到完整结构，再做人味化修改。",
      role: "小红书家居博主"
    },
    roi: {
      traditional: "2-3 小时找选题、拆爆文、写正文、改标题",
      withPack: "30 分钟完成一篇可发布笔记",
      saved: "每篇节省约 75% 时间",
      weeklyValue: "每周发布 5 篇，可节省 7-10 小时"
    },
    outputTemplate: ["爆款标题 x 10", "正文结构", "标签组合", "评论区引导", "发布时间建议", "复盘问题清单"],
    mistakes: ["只写产品功能，不写用户场景", "标题太像广告，缺少情绪钩子", "正文无转化结构", "标签过泛，无法承接搜索流量"]
  },
  "cross-border-commerce": {
    slug: "cross-border-commerce",
    goal: "帮助跨境卖家把一个商品快速拆成 Listing、主图、广告和售后内容。",
    promise: "从关键词到 Review 回复，覆盖商品页每天都会用到的核心内容资产。",
    fullWorkflow: ["关键词分析", "标题生成", "Bullet Points", "A+ Content", "广告文案", "Review回复"],
    prompts: ["关键词Prompt", "标题Prompt", "五点描述Prompt", "A+内容Prompt", "广告文案Prompt", "Review回复Prompt"],
    beforeAfter: {
      input: "产品：无线降噪耳机；市场：美国；卖点：低延迟、长续航、通勤降噪。",
      before: "Wireless headphones with noise cancelling, long battery life and good sound quality.",
      after: [
        "Title：Wireless Noise Cancelling Earbuds for Commuting, Low Latency Bluetooth Headphones with 36H Battery",
        "Bullet：按照通勤、会议、运动三个场景组织卖点，而不是堆功能词。",
        "A+：输出模块标题、图片说明、对比表和FAQ。",
        "Review：区分物流、质量、使用误解三类回复模板。"
      ]
    },
    demoSteps: ["填写产品参数", "生成关键词簇", "输出 Listing 与五点描述", "生成主图需求", "生成广告与 Review 回复"],
    testimonial: {
      quote: "最有价值的是它把 Listing、主图和广告文案串起来了，不用在几个文档里来回复制。",
      role: "Amazon 3C 配件卖家"
    },
    roi: {
      traditional: "1 天完成商品页初稿，反复切换关键词、文案和视觉需求",
      withPack: "90 分钟完成第一版 Listing + 主图需求 + 广告文案",
      saved: "每个 SKU 节省约 6 小时",
      weeklyValue: "每周上新 3 个 SKU，可节省 18 小时"
    },
    outputTemplate: ["关键词簇", "Amazon 标题", "Bullet Points", "A+ Content 模块", "广告文案", "Review 回复模板"],
    mistakes: ["标题堆关键词导致可读性差", "Bullet只写参数，不写场景利益", "A+内容缺少视觉说明", "Review回复过度承诺，带来合规风险"]
  },
  "indie-product-research": {
    slug: "indie-product-research",
    goal: "帮助独立开发者从想法出发，完成市场验证、竞品分析、Landing Page、定价和冷启动。",
    promise: "降低只凭直觉做产品的风险，把一个 Idea 变成可验证的 30 天 MVP 计划。",
    fullWorkflow: ["Idea", "市场验证", "竞品分析", "Landing Page", "定价", "冷启动营销"],
    prompts: ["Idea筛选Prompt", "市场验证Prompt", "竞品分析Prompt", "Landing Page Prompt", "定价Prompt", "冷启动营销Prompt"],
    beforeAfter: {
      input: "想法：给自由职业者做一个 AI 合同审查工具；目标：英文市场；预算：低成本验证。",
      before: "这个想法不错，可以做一个网站，然后推广给自由职业者。",
      after: [
        "市场验证：先验证高频痛点是付款条款、责任边界还是版权归属。",
        "竞品分析：拆解 LegalZoom、DocuSign、独立AI合同工具的定价和入口。",
        "Landing Page：输出首屏标题、3个痛点模块、等待名单CTA。",
        "冷启动：列出 Reddit、Indie Hackers、LinkedIn 的 14 天发帖计划。"
      ]
    },
    demoSteps: ["输入产品 Idea", "拆解目标用户与痛点", "生成竞品矩阵", "输出 Landing Page", "制定 30 天冷启动计划"],
    testimonial: {
      quote: "它逼我先验证用户和渠道，而不是马上开写代码，这一点非常值钱。",
      role: "独立开发者"
    },
    roi: {
      traditional: "1-2 周做零散调研，容易陷入做功能而不是验证需求",
      withPack: "半天完成验证框架和 Landing Page 初稿",
      saved: "验证阶段节省 3-5 天",
      weeklyValue: "减少错误 MVP 方向，避免数周开发浪费"
    },
    outputTemplate: ["用户画像", "竞品矩阵", "差异化机会", "Landing Page 文案", "定价假设", "30天冷启动计划"],
    mistakes: ["先写代码，后找用户", "竞品分析只看功能，不看获客和定价", "Landing Page 没有明确等待名单CTA", "定价没有和目标用户预算匹配"]
  }
};
