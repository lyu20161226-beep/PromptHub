export type CaseStudy = {
  slug: string;
  workflowId: string;
  title: string;
  summary: string;
  disclosure: string;
  challenge: string;
  input: string;
  process: readonly string[];
  output: string;
  result: readonly string[];
  limitations: readonly string[];
  lessons: readonly string[];
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "nextjs-hydration-debugging",
    workflowId: "coding-002",
    title: "如何定位 Next.js 页面水合失败",
    summary: "把一条模糊的 Hydration failed 报错拆成可证伪假设，并形成最小修复与回归检查。",
    disclosure: "PromptHub 内部验证案例。输入来自可复现的技术场景，不代表外部客户项目。",
    challenge: "页面刷新时稳定出现水合失败，但错误信息没有直接指出产生差异的组件。盲目修改可能掩盖根因，并制造新的服务端与客户端不一致。",
    input: "Next.js 15 App Router；组件在服务端和客户端都渲染 new Date().toLocaleTimeString()；刷新必现 Hydration failed。",
    process: ["固定框架版本、页面与刷新复现步骤", "把服务端和客户端输出差异列为最高概率假设", "用固定字符串替换动态时间进行最小验证", "确认错误消失后，只调整时间渲染路径", "补充首次加载、时区差异与禁用 JavaScript 的回归检查"],
    output: "根因是服务端与客户端在不同时间生成了不同文本。建议由服务端传入固定 ISO 时间，或先渲染稳定占位符，再在 useEffect 中设置客户端时间。",
    result: ["从多个猜测收敛到一个可复现根因", "修复范围限定在动态时间渲染，不改动无关组件", "形成三项明确回归检查"],
    limitations: ["没有覆盖第三方浏览器扩展修改 DOM 的情况", "未在多个地区时区的真实设备上完成兼容性测试"],
    lessons: ["先证明根因，再写补丁", "每个假设都应配一条最小验证", "修复完成不等于任务结束，必须补回归条件"]
  },
  {
    slug: "seo-topic-cluster-planning",
    workflowId: "chatgpt-003",
    title: "如何把一个 SEO 关键词拆成 50 个选题",
    summary: "不从批量生成标题开始，而是先建立搜索意图、决策阶段和主题集群，再扩展可执行选题。",
    disclosure: "PromptHub 内部验证案例。示例用于验证工作流结构，搜索量与排名数据必须由真实工具补充。",
    challenge: "围绕“AI 创业”直接生成大量标题，很容易重复、堆关键词，也无法判断每篇内容服务哪类读者和业务目标。",
    input: "核心主题：AI 创业；读者：准备第一次做 AI 产品的独立开发者；目标：帮助读者判断机会并开始需求验证。",
    process: ["区分信息型、比较型、验证型与行动型搜索意图", "按机会识别、用户研究、MVP、成本、获客建立五个主题集群", "每个集群设计十个不同问题，形成 50 个选题位置", "为每个选题标注读者阶段、证据需求与推荐内链", "删除意图重复或缺乏真实证据来源的题目"],
    output: "形成 5×10 的选题矩阵，并优先发布 AI 创业机会判断、7 天需求验证、API 成本测算、首批用户访谈和 MVP 范围五篇支柱内容。",
    result: ["50 个选题有明确意图归属，不是标题同义改写", "每篇文章都能回链到主题集群与下一步行动", "明确标出需要真实数据、访谈或案例支持的位置"],
    limitations: ["没有接入关键词搜索量与竞争度数据", "没有验证这些选题在真实搜索结果中的排名表现"],
    lessons: ["选题数量不是目标，覆盖不同决策问题才是目标", "模型不能替你编造搜索量和趋势", "先做内容简报，再进入正文生产"]
  },
  {
    slug: "resume-impact-rewrite",
    workflowId: "chatgpt-009",
    title: "如何把简历职责改写成可核验成果",
    summary: "不虚构数字，把模糊职责拆成动作、范围、结果与证据缺口，形成可用于面试追问的表达。",
    disclosure: "PromptHub 内部验证案例。没有真实投递与面试转化数据，因此不宣称提升面试率。",
    challenge: "“负责活动运营和数据复盘”无法体现候选人的具体动作、工作范围和结果，也容易诱导模型编造漂亮数字。",
    input: "原始经历：负责每周内容活动，协调设计与销售，整理活动数据并进行复盘。现有事实：连续执行 12 周，每周 3 个渠道，有完整报表，但暂未确认转化提升比例。",
    process: ["提取周期、渠道和协作对象等已知范围", "把负责改写为策划、协调、监测和复盘等具体动作", "将未知的转化结果标为待补证据，不让模型猜测", "生成简历短句与面试展开版两种表达", "建立可补充指标清单，回到原始报表核对"],
    output: "连续 12 周策划并执行每周内容活动，协调设计与销售覆盖 3 个渠道，建立活动数据报表与周复盘机制；转化变化待依据历史报表补充。",
    result: ["职责描述变成有周期、范围和动作的成果表达", "未知数字被明确标记，没有虚构增长比例", "同时得到面试时可继续解释的证据清单"],
    limitations: ["没有真实招聘方评价或投递结果", "最终数字仍需候选人从原始记录中核对"],
    lessons: ["可核验比夸张更重要", "没有数字时先量化范围、频率和复杂度", "简历中的每个结果都应经得住面试追问"]
  }
] as const;

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
