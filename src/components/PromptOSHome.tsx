import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  Check,
  Clock3,
  Code2,
  GraduationCap,
  Megaphone,
  Search,
  Sparkles,
  Store,
} from "lucide-react";
import { EmailCapture } from "@/components/EmailCapture";
import { HomepageValueSections } from "@/components/HomepageValueSections";

const stats = [
  { value: "20", label: "可运行免费 Prompt" },
  { value: "6", label: "垂直 Workflow Packs" },
  { value: "8", label: "高频任务分类" },
  { value: "4", label: "主流模型兼容" },
];

const audiences = [
  { title: "内容创作者", description: "选题、标题、正文与发布复盘", query: "写作", icon: Megaphone },
  { title: "独立开发者", description: "产品验证、竞品分析与冷启动", query: "商业", icon: Code2 },
  { title: "跨境卖家", description: "Listing、广告文案与 Review 回复", query: "赚钱", icon: Store },
  { title: "职场人士", description: "简历、周报、会议纪要与汇报", query: "办公", icon: BriefcaseBusiness },
  { title: "学生与教师", description: "学习计划、论文润色与教案设计", query: "学习", icon: GraduationCap },
];

const featuredPacks = [
  {
    slug: "xiaohongshu-growth",
    category: "内容营销",
    title: "小红书爆款内容工作流包",
    promise: "30 分钟完成一篇可发布的小红书笔记",
    before: "只说产品好用，内容平淡、没有场景，也没有转化动作。",
    after: "从用户痛点到标题钩子、正文结构、标签和评论区引导，一次生成完整内容。",
    price: "¥9",
  },
  {
    slug: "cross-border-commerce",
    category: "跨境电商",
    title: "跨境电商商品文案工作流包",
    promise: "用一套信息生成完整 Listing 资产",
    before: "标题、五点描述和广告文案分别编写，关键词与卖点不一致。",
    after: "统一生成关键词簇、标题、Bullet Points、A+ Content 和广告文案。",
    price: "¥29",
  },
  {
    slug: "indie-product-research",
    category: "产品增长",
    title: "独立开发者产品调研工作流包",
    promise: "把产品想法变成 30 天验证计划",
    before: "凭直觉开发，缺少用户证据、竞品判断和明确的成功指标。",
    after: "输出痛点假设、竞品矩阵、访谈问题、定价实验和冷启动计划。",
    price: "¥29",
  },
];

const proofPoints = [
  "不是一句模糊指令，而是拆解好的执行步骤",
  "包含真实输入、输出示例和 Before / After",
  "通过变量适配你的产品、用户与业务场景",
  "附带输出模板、检查清单和常见错误",
];

export function PromptOSHome() {
  return (
    <>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              AI Systems Learning Platform
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-zinc-950 sm:text-6xl">
              从一句 Prompt，到一个可复用的 AI 系统
            </h1>
            <p className="mt-5 max-w-3xl text-xl font-semibold leading-8 text-zinc-700">
              学会理解、修改和组合高质量 Prompt，把 AI 从聊天工具变成真正的生产力系统。
            </p>
            <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">
              不只给你一段可复制的文字。每个 Pack 都包含原理解析、变量、Workflow、案例、输出模板和自检标准。
            </p>

            <form action="/prompts" className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
              <label className="relative flex-1">
                <span className="sr-only">搜索你想完成的任务</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
                <input
                  className="min-h-12 w-full rounded-md border border-zinc-300 bg-white pl-12 pr-4 text-base outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  name="q"
                  placeholder="搜索任务，例如：写小红书、分析竞品、优化简历"
                  type="search"
                />
              </label>
              <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-zinc-950 px-6 text-sm font-bold text-white hover:bg-emerald-700" type="submit">
                免费开始 <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500">
              <span>无需登录</span>
              <span>支持变量填写</span>
              <span>可直接运行与复制</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-950 py-8 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 sm:grid-cols-4">
          {stats.map((stat) => (
            <div className="bg-zinc-950 px-5 py-5" key={stat.label}>
              <p className="text-3xl font-bold text-emerald-300">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold text-emerald-700">为什么 PromptHub 存在？</p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-950">AI 最大的成本，是反复试错却无法稳定复现</h2>
            <p className="mt-4 leading-7 text-zinc-600">
              直接问模型往往只能得到一次性的答案。PromptHub 把专业经验整理成可复用流程，让同一类任务每次都有清晰输入、固定步骤和可检查的输出。
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-red-100 bg-red-50 p-5">
              <p className="text-sm font-bold text-red-700">以前</p>
              <p className="mt-3 font-bold text-zinc-950">随便提问 → 反复修改 → 输出不可用</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">每次从零开始，把时间花在提示、补充和纠错上。</p>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-sm font-bold text-emerald-800">使用 Workflow Pack</p>
              <p className="mt-3 font-bold text-zinc-950">填写变量 → 按步骤执行 → 获得结构化结果</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">流程可以保存、复用和持续优化，不再依赖临场发挥。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-emerald-700">按你的工作开始</p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-950">不是找 Prompt，而是完成任务</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {audiences.map(({ title, description, query, icon: Icon }) => (
              <Link
                className="group rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-emerald-400 hover:shadow-sm"
                href={`/prompts?q=${encodeURIComponent(query)}`}
                key={title}
              >
                <Icon className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                <h3 className="mt-4 font-bold text-zinc-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                  查看方案 <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-emerald-700">精选 Workflow Packs</p>
              <h2 className="mt-2 text-3xl font-bold text-zinc-950">先看结果，再决定是否获取</h2>
            </div>
            <Link className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700" href="/packs">
              浏览全部 Packs <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {featuredPacks.map((pack) => (
              <article className="flex h-full flex-col rounded-lg border border-zinc-200 bg-zinc-50 p-5" key={pack.slug}>
                <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">{pack.category}</span>
                <h3 className="mt-5 text-xl font-bold text-zinc-950">{pack.title}</h3>
                <p className="mt-3 font-bold leading-6 text-emerald-700">{pack.promise}</p>
                <div className="mt-5 space-y-3">
                  <div className="rounded-md border border-red-100 bg-white p-3">
                    <p className="text-xs font-bold text-red-600">Before</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">{pack.before}</p>
                  </div>
                  <div className="rounded-md border border-emerald-100 bg-white p-3">
                    <p className="text-xs font-bold text-emerald-700">After</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">{pack.after}</p>
                  </div>
                </div>
                <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                  <div>
                    <p className="text-xs text-zinc-500">体验价格</p>
                    <p className="text-2xl font-bold text-zinc-950">{pack.price}</p>
                  </div>
                  <Link className="inline-flex min-h-10 items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-bold text-white hover:bg-emerald-700" href={`/packs/${pack.slug}`}>
                    免费预览
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-950 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold text-emerald-300">为什么不是普通 Prompt？</p>
            <h2 className="mt-2 text-3xl font-bold">Prompt 是文字，Workflow 是可复用资产</h2>
            <p className="mt-4 leading-7 text-zinc-400">
              一次设计，重复使用。真正有价值的不是“问什么”，而是如何稳定地从输入走到结果。
            </p>
          </div>
          <div className="grid gap-3">
            {proofPoints.map((point) => (
              <div className="flex gap-3 rounded-md border border-zinc-800 bg-zinc-900 p-4" key={point}>
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                <p className="text-sm font-semibold text-zinc-200">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomepageValueSections />

      <section className="border-b border-zinc-200 bg-emerald-50 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
          <div>
            <BookOpenCheck className="h-6 w-6 text-emerald-700" aria-hidden="true" />
            <p className="mt-4 text-sm font-bold text-emerald-700">AI 实战学院</p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-950">不只学会提问，更要学会做判断</h2>
            <p className="mt-4 leading-7 text-zinc-600">
              把商业方法与 AI 工作流结合。每一课讲清为什么、什么时候用、如何执行，以及最后能带走什么成果。
            </p>
            <Link
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-bold text-white hover:bg-emerald-700"
              href="/academy"
            >
              进入 AI 实战学院 <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["价值定价", "从用户收益而不是成本出发设计价格"],
              ["增长飞轮", "让一次用户行为推动下一轮增长"],
              ["机会成本", "用统一标准决定优先做什么、不做什么"],
            ].map(([title, description], index) => (
              <div className="rounded-lg border border-emerald-200 bg-white p-5" key={title}>
                <span className="font-mono text-xs font-bold text-emerald-700">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-bold text-zinc-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Clock3 className="mx-auto h-6 w-6 text-emerald-700" aria-hidden="true" />
            <p className="mt-4 text-sm font-bold text-emerald-700">PromptHub 品牌主张</p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-950">Build AI Systems, Not Just Prompts.</h2>
            <p className="mt-4 leading-7 text-zinc-600">
              我们不以 Prompt 数量作为成功标准。真正重要的是：用户完成了多少真实工作、节省了多少时间，以及沉淀了多少可以持续复用的 AI 能力。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold text-emerald-700">PromptHub Weekly</p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-950">每周领取一个免费 AI 工作流</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              每封邮件只解决一个具体问题，包含完整步骤、可复制 Prompt 和使用建议。
            </p>
          </div>
          <EmailCapture source="homepage-weekly" />
        </div>
      </section>
    </>
  );
}
