import Link from "next/link";
import { ArrowRight, Clock3, Layers3, Sparkles } from "lucide-react";
import { EmailCapture } from "@/components/EmailCapture";
import { packs } from "@/data/packs";

const featuredPacks = packs.filter((pack) => pack.status === "featured");
const comingSoonPacks = packs.filter((pack) => pack.status === "coming-soon");

const categories = [
  {
    title: "内容营销",
    description: "小红书、短视频、SEO 和落地页内容。",
    query: "内容营销"
  },
  {
    title: "商业分析",
    description: "产品验证、竞品分析、定价和商业计划。",
    query: "商业"
  },
  {
    title: "个人效率",
    description: "周报、会议纪要、简历和学习计划。",
    query: "办公"
  }
];

const beforeAfter = [
  {
    title: "小红书产品笔记",
    before: "这款咖啡机很好用，适合上班族。",
    after: "打工人早八续命神器，我把咖啡店搬进了工位。"
  },
  {
    title: "产品验证",
    before: "这个 AI 合同审查工具想法不错。",
    after: "输出痛点假设、竞品矩阵、访谈问题、Landing Page 和 30 天验证计划。"
  },
  {
    title: "跨境 Listing",
    before: "Wireless headphones with good sound.",
    after: "按通勤、会议和运动场景组织标题、Bullet、A+ Content 与广告文案。"
  }
];

const pricing = [
  { name: "单个 Pack", price: "¥9–29", description: "解决一个明确高频任务" },
  { name: "核心合集", price: "¥49–99", description: "包含多个相关 Workflow Packs" },
  { name: "终身访问", price: "¥199以内", description: "完整资产与后续更新" }
];

export function PromptOSHome() {
  return (
    <>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Curated AI Workflow Packs
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-zinc-950 sm:text-6xl">
              精选 AI 工作流提示词包
            </h1>
            <p className="mt-5 max-w-3xl text-xl font-semibold leading-8 text-zinc-700">
              不只是提示词，而是一套可直接使用的 AI 工作流包。
            </p>
            <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">
              每个 Pack 包含 Prompt、步骤、Before / After 案例、输出模板和检查清单，帮助你更快完成内容、营销、产品和商业分析任务。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-zinc-950 px-6 text-sm font-bold text-white hover:bg-emerald-700" href="/packs">
                浏览 Packs <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link className="inline-flex min-h-12 items-center justify-center rounded-md border border-zinc-300 px-6 text-sm font-bold text-zinc-700 hover:border-emerald-500 hover:text-emerald-700" href="/prompts">
                查看免费 Prompt
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-emerald-700">高频问题分类</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {categories.map((category) => (
              <Link
                className="rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-emerald-400 hover:shadow-sm"
                href={`/prompts?q=${encodeURIComponent(category.query)}`}
                key={category.title}
              >
                <h2 className="text-xl font-bold text-zinc-950">{category.title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{category.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                  查看免费 Prompt <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">精选 Packs</p>
              <h2 className="mt-2 text-3xl font-bold text-zinc-950">先用 3 个完整产品解决具体问题</h2>
            </div>
            <Link className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700" href="/packs">
              查看全部 Packs <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {featuredPacks.map((pack) => (
              <article className="flex h-full flex-col rounded-lg border border-zinc-200 bg-zinc-50 p-5" key={pack.slug}>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">{pack.category}</span>
                  <span className="text-xs font-semibold text-zinc-500">{pack.promptIds.length} 个 Prompt</span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-zinc-950">{pack.title}</h3>
                <p className="mt-3 font-bold leading-6 text-emerald-700">{pack.promise}</p>
                <p className="mt-3 text-sm leading-6 text-zinc-600">适合：{pack.audience}</p>
                <div className="mt-5 rounded-md border border-zinc-200 bg-white p-3">
                  <p className="text-xs font-bold text-zinc-500">解决问题</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-700">{pack.problem}</p>
                </div>
                <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                  <div>
                    <p className="text-xs text-zinc-400">验证价</p>
                    <p className="text-2xl font-bold text-zinc-950">¥{pack.price}</p>
                  </div>
                  <Link className="inline-flex min-h-10 items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-bold text-white hover:bg-emerald-700" href={`/packs/${pack.slug}`}>
                    查看详情
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {comingSoonPacks.map((pack) => (
              <div className="flex items-center justify-between gap-4 rounded-md border border-zinc-200 bg-white p-4" key={pack.slug}>
                <div>
                  <p className="text-xs font-bold text-amber-700">COMING SOON</p>
                  <p className="mt-1 font-bold text-zinc-950">{pack.shortTitle}</p>
                </div>
                <Clock3 className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-950 py-12 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold text-emerald-300">为什么不是普通 Prompt？</p>
            <h2 className="mt-2 text-3xl font-bold">用户买的是更快完成任务</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              一句话 Prompt 很容易被复制。真正有价值的是经过验证的流程、案例、模板、检查清单和执行经验。
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
              <p className="text-sm font-bold text-zinc-400">普通 Prompt</p>
              <p className="mt-3 text-xl font-bold">一句话指令</p>
              <p className="mt-2 text-sm text-zinc-400">输出不稳定，需要用户自己反复试错。</p>
            </div>
            <div className="rounded-lg border border-emerald-800 bg-zinc-900 p-5">
              <p className="text-sm font-bold text-emerald-300">Workflow Pack</p>
              <p className="mt-3 text-xl font-bold">Prompt + 流程 + 案例 + 模板</p>
              <p className="mt-2 text-sm text-zinc-400">输入清晰，输出可复用，并附带 Checklist。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-emerald-700">Before / After</p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-950">先看结果，再决定是否获取</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {beforeAfter.map((item) => (
              <article className="rounded-lg border border-zinc-200 bg-zinc-50 p-5" key={item.title}>
                <h3 className="font-bold text-zinc-950">{item.title}</h3>
                <div className="mt-4 rounded-md border border-red-100 bg-white p-3">
                  <p className="text-xs font-bold text-red-600">Before</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{item.before}</p>
                </div>
                <div className="mt-3 rounded-md border border-emerald-100 bg-white p-3">
                  <p className="text-xs font-bold text-emerald-700">After</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{item.after}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Layers3 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <h2 className="text-3xl font-bold text-zinc-950">简单定价</h2>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {pricing.map((tier) => (
              <div className="rounded-lg border border-zinc-200 bg-white p-5" key={tier.name}>
                <h3 className="font-bold text-zinc-950">{tier.name}</h3>
                <p className="mt-2 text-3xl font-bold text-emerald-700">{tier.price}</p>
                <p className="mt-2 text-sm text-zinc-600">{tier.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold text-emerald-700">PromptHub Weekly</p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-950">每周领取一个免费 Workflow</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">每封邮件只讲一个具体问题、完整步骤和可复制 Prompt。</p>
          </div>
          <EmailCapture source="homepage-weekly" />
        </div>
      </section>
    </>
  );
}
