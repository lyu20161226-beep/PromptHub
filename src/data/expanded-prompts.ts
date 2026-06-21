type Category = "写作" | "编程" | "营销" | "绘图" | "学习" | "办公";

type Topic = {
  name: string;
  slug: string;
  audience: string;
  sample: string;
};

type Workflow = {
  name: string;
  slug: string;
  goal: string;
  deliverable: string;
};

const topics: Record<Category, Topic[]> = {
  写作: [
    { name: "小红书", slug: "xiaohongshu", audience: "内容创作者与品牌运营", sample: "一款适合通勤的降噪耳机" },
    { name: "微信公众号", slug: "wechat", audience: "公众号作者与行业专家", sample: "AI 如何改变小团队工作方式" },
    { name: "短视频口播", slug: "short-video", audience: "短视频创作者", sample: "普通人如何建立稳定阅读习惯" },
    { name: "知乎回答", slug: "zhihu", audience: "知识型创作者", sample: "转行产品经理需要哪些准备" },
    { name: "品牌故事", slug: "brand-story", audience: "创业者与品牌团队", sample: "一家坚持产地直采的咖啡品牌" },
    { name: "产品说明", slug: "product-copy", audience: "产品与电商团队", sample: "面向自由职业者的时间管理应用" },
    { name: "新品新闻稿", slug: "press-release", audience: "市场与公关团队", sample: "企业知识库产品正式发布" },
    { name: "播客节目", slug: "podcast", audience: "播客主理人与嘉宾", sample: "独立开发者的第一年" },
    { name: "邮件通讯", slug: "newsletter", audience: "社群与内容运营", sample: "本周值得关注的五个 AI 工具" },
    { name: "在线课程", slug: "course-copy", audience: "讲师与教育团队", sample: "零基础数据分析入门课" }
  ],
  编程: [
    { name: "Next.js 应用", slug: "nextjs-app", audience: "全栈开发者", sample: "带搜索与收藏的内容网站" },
    { name: "Python 自动化", slug: "python-automation", audience: "Python 开发者", sample: "批量整理 Excel 文件" },
    { name: "REST API", slug: "rest-api", audience: "后端开发者", sample: "订单与退款接口" },
    { name: "SQL 数据分析", slug: "sql-analytics", audience: "数据分析师", sample: "计算月度留存率" },
    { name: "React 组件", slug: "react-component", audience: "前端开发者", sample: "可访问的组合框组件" },
    { name: "Node.js 服务", slug: "node-service", audience: "服务端开发者", sample: "异步任务处理服务" },
    { name: "数据处理管道", slug: "data-pipeline", audience: "数据工程师", sample: "每日用户行为聚合任务" },
    { name: "命令行工具", slug: "cli-tool", audience: "工程效率团队", sample: "批量检查项目配置" },
    { name: "自动化测试", slug: "test-suite", audience: "测试与开发工程师", sample: "结算流程回归测试" },
    { name: "系统架构", slug: "system-design", audience: "架构师与技术负责人", sample: "支持十万用户的通知系统" }
  ],
  营销: [
    { name: "SaaS 新品", slug: "saas-launch", audience: "SaaS 增长团队", sample: "团队协作型 AI 助手" },
    { name: "电商大促", slug: "ecommerce-campaign", audience: "电商运营", sample: "夏季家电促销活动" },
    { name: "私域运营", slug: "private-domain", audience: "社群与私域团队", sample: "母婴品牌新客社群" },
    { name: "品牌升级", slug: "brand-refresh", audience: "品牌市场团队", sample: "十年餐饮品牌年轻化" },
    { name: "本地门店", slug: "local-store", audience: "本地生活商家", sample: "新开精品咖啡店" },
    { name: "B2B 获客", slug: "b2b-leads", audience: "企业销售团队", sample: "制造业数字化解决方案" },
    { name: "社区增长", slug: "community-growth", audience: "社区产品运营", sample: "设计师交流社区" },
    { name: "线下活动", slug: "offline-event", audience: "活动策划团队", sample: "城市 AI 创作者大会" },
    { name: "用户留存", slug: "user-retention", audience: "产品增长团队", sample: "学习应用七日留存提升" },
    { name: "竞品突围", slug: "competitive-growth", audience: "市场策略团队", sample: "新消费茶饮品牌进入成熟市场" }
  ],
  绘图: [
    { name: "电商产品", slug: "ecommerce-product", audience: "电商设计师", sample: "便携式咖啡机" },
    { name: "品牌海报", slug: "brand-poster", audience: "品牌设计师", sample: "春季新品发布海报" },
    { name: "新中式人像", slug: "chinese-portrait", audience: "摄影与视觉创作者", sample: "现代宋制审美人物写真" },
    { name: "美食摄影", slug: "food-photo", audience: "餐饮品牌团队", sample: "现烤可颂与手冲咖啡" },
    { name: "室内空间", slug: "interior-space", audience: "室内设计师", sample: "自然光下的小户型客厅" },
    { name: "应用插画", slug: "app-illustration", audience: "产品设计师", sample: "团队协作功能插画" },
    { name: "产品包装", slug: "packaging", audience: "包装与品牌设计师", sample: "东方草本护肤礼盒" },
    { name: "旅行海报", slug: "travel-poster", audience: "文旅内容团队", sample: "秋日杭州城市海报" },
    { name: "科技发布", slug: "tech-launch", audience: "科技品牌设计师", sample: "轻薄 AI 笔记本电脑" },
    { name: "儿童绘本", slug: "picture-book", audience: "插画师与教育团队", sample: "小女孩寻找星星的故事" }
  ],
  学习: [
    { name: "英语口语", slug: "spoken-english", audience: "英语学习者", sample: "海外酒店入住沟通" },
    { name: "Python 入门", slug: "python-learning", audience: "编程初学者", sample: "用循环处理一组销售数据" },
    { name: "数据分析", slug: "data-analysis", audience: "职场学习者", sample: "分析电商转化漏斗" },
    { name: "产品经理", slug: "product-management", audience: "产品新人", sample: "撰写一个搜索功能 PRD" },
    { name: "AI 工具", slug: "ai-tools", audience: "知识工作者", sample: "建立个人 AI 工作流" },
    { name: "公开演讲", slug: "public-speaking", audience: "演讲练习者", sample: "五分钟项目路演" },
    { name: "财务基础", slug: "finance-basics", audience: "非财务管理者", sample: "理解利润表与现金流" },
    { name: "中文写作", slug: "chinese-writing", audience: "写作爱好者", sample: "用细节写好人物故事" },
    { name: "资格考试", slug: "exam-prep", audience: "备考学生", sample: "四周复习核心知识点" },
    { name: "研究方法", slug: "research-methods", audience: "大学生与研究者", sample: "设计一份用户访谈研究" }
  ],
  办公: [
    { name: "会议管理", slug: "meeting", audience: "项目负责人", sample: "产品版本评审会" },
    { name: "周报汇报", slug: "weekly-report", audience: "职场人士与管理者", sample: "增长团队本周工作" },
    { name: "项目启动", slug: "project-kickoff", audience: "项目经理", sample: "官网改版项目" },
    { name: "OKR 管理", slug: "okr", audience: "团队负责人", sample: "季度用户增长目标" },
    { name: "客户跟进", slug: "client-followup", audience: "销售与客户成功", sample: "企业客户试用反馈" },
    { name: "招聘面试", slug: "recruiting", audience: "招聘经理", sample: "高级前端工程师面试" },
    { name: "预算申请", slug: "budget-request", audience: "部门负责人", sample: "年度内容营销预算" },
    { name: "风险汇报", slug: "risk-report", audience: "项目与管理团队", sample: "核心供应商延期风险" },
    { name: "跨部门协作", slug: "cross-team", audience: "业务负责人", sample: "市场与产品联合发布" },
    { name: "工作交接", slug: "handover", audience: "岗位交接人员", sample: "运营负责人离岗交接" }
  ]
};

const workflows: Record<Category, Workflow[]> = {
  写作: [
    { name: "选题规划", slug: "topic-plan", goal: "找到有读者价值且可持续的内容方向", deliverable: "选题矩阵与发布优先级" },
    { name: "标题创作", slug: "headline", goal: "用具体利益和信息差吸引目标读者", deliverable: "多角度标题与测试建议" },
    { name: "完整初稿", slug: "first-draft", goal: "产出结构完整、语气自然的可编辑初稿", deliverable: "带结构标记的正文" },
    { name: "编辑优化", slug: "edit", goal: "提升逻辑、节奏和表达可信度", deliverable: "优化稿与修改说明" }
  ],
  编程: [
    { name: "需求拆解", slug: "requirements", goal: "把模糊需求转成可实现、可验收的技术任务", deliverable: "需求边界、任务清单与验收标准" },
    { name: "方案设计", slug: "design", goal: "形成兼顾风险、扩展性和成本的技术方案", deliverable: "架构方案、接口与取舍" },
    { name: "代码实现", slug: "implementation", goal: "生成遵循工程约束的可运行实现", deliverable: "代码、注释与运行说明" },
    { name: "审查调试", slug: "review-debug", goal: "定位缺陷并给出最小可靠修复", deliverable: "问题清单、补丁与测试" }
  ],
  营销: [
    { name: "用户洞察", slug: "insight", goal: "识别真实动机、阻力和购买触发点", deliverable: "用户洞察与待验证假设" },
    { name: "策略规划", slug: "strategy", goal: "明确目标、渠道、节奏和资源优先级", deliverable: "阶段营销计划" },
    { name: "内容创意", slug: "creative", goal: "产出可测试的多角度营销内容", deliverable: "创意矩阵与素材文案" },
    { name: "数据复盘", slug: "analysis", goal: "从数据定位问题并安排下一轮实验", deliverable: "复盘结论与实验清单" }
  ],
  绘图: [
    { name: "视觉策划", slug: "art-direction", goal: "明确主体、构图、光线与品牌情绪", deliverable: "视觉方向与参考关键词" },
    { name: "商业主视觉", slug: "hero-visual", goal: "生成主体清晰、可用于传播的高完成度画面", deliverable: "可直接使用的绘图 Prompt" },
    { name: "系列变体", slug: "series", goal: "保持视觉一致性并生成多场景变体", deliverable: "四组统一风格 Prompt" },
    { name: "画面优化", slug: "refine", goal: "诊断画面问题并精确调整生成参数", deliverable: "问题诊断与改进 Prompt" }
  ],
  学习: [
    { name: "学习路线", slug: "roadmap", goal: "建立目标清晰且可持续的学习节奏", deliverable: "阶段计划与验收任务" },
    { name: "概念讲解", slug: "explain", goal: "从直觉、原理和案例三个层次理解知识", deliverable: "分层讲解与误区" },
    { name: "刻意练习", slug: "practice", goal: "用递进任务形成可迁移能力", deliverable: "练习题与反馈规则" },
    { name: "复盘测验", slug: "review", goal: "发现知识漏洞并安排针对性复习", deliverable: "诊断、测验与复习建议" }
  ],
  办公: [
    { name: "信息整理", slug: "organize", goal: "从杂乱材料中提取事实、决定与待办", deliverable: "结构化摘要与行动项" },
    { name: "专业文稿", slug: "document", goal: "生成清晰、简洁、适合职场沟通的文稿", deliverable: "可直接发送的文档" },
    { name: "决策分析", slug: "decision", goal: "透明比较方案并给出带条件的建议", deliverable: "决策表与推荐结论" },
    { name: "执行跟进", slug: "follow-up", goal: "明确责任、时间、风险和验收方式", deliverable: "执行计划与跟进模板" }
  ]
};

const categoryConfig: Record<Category, { code: string; platform: "chatgpt" | "midjourney"; platformName: string; models: string[] }> = {
  写作: { code: "write", platform: "chatgpt", platformName: "ChatGPT", models: ["ChatGPT", "Claude", "DeepSeek"] },
  编程: { code: "code", platform: "chatgpt", platformName: "ChatGPT", models: ["ChatGPT", "Claude", "DeepSeek", "Gemini"] },
  营销: { code: "market", platform: "chatgpt", platformName: "ChatGPT", models: ["ChatGPT", "Claude", "DeepSeek"] },
  绘图: { code: "visual", platform: "midjourney", platformName: "Midjourney", models: ["Midjourney", "即梦", "Flux"] },
  学习: { code: "learn", platform: "chatgpt", platformName: "ChatGPT", models: ["ChatGPT", "Claude", "Gemini"] },
  办公: { code: "office", platform: "chatgpt", platformName: "ChatGPT", models: ["ChatGPT", "Claude", "DeepSeek"] }
};

function buildPrompt(category: Category, topic: Topic, workflow: Workflow) {
  if (category === "绘图") {
    return `你是一名商业视觉总监。请为「${topic.name}」任务制定${workflow.name}方案。\n\n项目输入：\n- 具体对象：[填写产品、人物或场景]\n- 核心信息：[填写要传达的卖点或故事]\n- 品牌调性：[填写风格与品牌色]\n- 投放尺寸：[填写比例和平台]\n\n工作流程：\n1. 提炼唯一视觉焦点，删除无关元素。\n2. 明确前景、中景、背景和视觉动线。\n3. 指定光线、镜头、材质、色彩与情绪。\n4. 写出适配 Midjourney、即梦或 Flux 的完整 Prompt。\n5. 给出负面约束，避免文字乱码、比例错误和廉价素材感。\n6. 提供四组只改变一个变量的版本，便于对比。\n\n目标：${workflow.goal}。最终输出：${workflow.deliverable}。画面示例方向：${topic.sample}。`;
  }

  return `你是一名资深${category}工作流顾问。请完成「${topic.name}${workflow.name}」任务。\n\n背景信息：\n- 具体主题：[填写主题]\n- 目标对象：${topic.audience}\n- 当前材料：[粘贴已有信息，没有则写“无”]\n- 目标结果：${workflow.goal}\n- 限制条件：[时间、字数、预算、技术栈或语气]\n\n执行流程：\n1. 先复述任务目标，列出缺失但会影响结果的信息。\n2. 基于现有信息提出3个关键判断，不编造事实或数据。\n3. 将任务拆成有先后关系的步骤，并说明每步产出。\n4. 生成${workflow.deliverable}，内容要具体、可执行、便于直接修改。\n5. 主动检查逻辑漏洞、遗漏、风险和不切实际的假设。\n6. 输出“立即行动”清单，按优先级标注今天可以完成的事项。\n\n参考示例：${topic.sample}。如果信息不足，请先用“待确认”标注，而不是自行虚构。`;
}

function buildExampleOutput(category: Category, topic: Topic, workflow: Workflow) {
  const prefix = category === "绘图" ? "视觉方向已明确" : "任务已拆解为目标、步骤和验收标准";
  return `${prefix}。围绕“${topic.sample}”输出了一份${workflow.deliverable}，包含3项关键判断、分步执行方案、风险检查和下一步行动清单。`;
}

export const expandedPrompts = (Object.keys(topics) as Category[]).flatMap((category, categoryIndex) => {
  const config = categoryConfig[category];

  return topics[category].flatMap((topic, topicIndex) =>
    workflows[category].map((workflow, workflowIndex) => {
      const sequence = categoryIndex * 40 + topicIndex * 4 + workflowIndex + 1;

      return {
        id: `workflow-${String(sequence).padStart(3, "0")}`,
        slug: `${config.code}-${topic.slug}-${workflow.slug}`,
        title: `${topic.name}${workflow.name}工作流`,
        description: `面向${topic.audience}，系统完成${workflow.goal}，输出${workflow.deliverable}。`,
        category,
        platform: config.platform,
        platformName: config.platformName,
        useCase: `${topic.name}、${workflow.name}、${topic.audience}`,
        tags: [topic.name, workflow.name, category],
        content: buildPrompt(category, topic, workflow),
        models: config.models,
        exampleInput: `主题：${topic.sample}；目标：${workflow.goal}；限制：一周内完成第一版。`,
        exampleOutput: buildExampleOutput(category, topic, workflow),
        tips: [
          "先补充目标对象和限制条件，结果会比只输入一个主题稳定。",
          `首次使用后保留${workflow.deliverable}，第二轮只针对最弱的部分继续追问。`,
          "涉及数据、案例或政策时，必须人工核对来源后再公开使用。"
        ]
      };
    })
  );
});
