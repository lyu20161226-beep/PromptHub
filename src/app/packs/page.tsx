import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, CheckCircle2, Copy, FileOutput, ShieldAlert } from "lucide-react";
import { workflowPacks } from "@/data/workflow-packs";
import { getPromptById } from "@/lib/mock-prompts";

export const metadata: Metadata = {
  title: "AI 提示词包与工作流",
  description: "PromptHub 原创 AI 提示词包：围绕小红书、电商、教学、内容创作、产品调研和 AI 绘图，提供案例、场景、常见错误与输出模板。",
  alternates: { canonical: "/packs" }
};

const valueLayers = [
  { title: "可复制 Prompt", description: "不是一句泛泛指令，而是包含变量、约束与交付格式的完整工作流。", icon: Copy },
  { title: "真实输入输出", description: "先看案例是否接近你的任务，再决定是否使用，而不是盲目复制。", icon: CheckCircle2 },
  { title: "使用场景", description: "说明适合谁、解决什么问题，以及开始前需要准备哪些信息。", icon: BookOpenCheck },
  { title: "错误与边界", description: "标出常见误用、事实风险和不应交给模型决定的事项。", icon: ShieldAlert },
  { title: "输出模板", description: "把结果约束成可交付结构，方便继续编辑、评审和复用。", icon: FileOutput }
];

export default function PacksPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-semibold text-emerald-700">PromptHub Packs</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">不卖一段文字，提供一套能完成工作的模板</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">每个包围绕一个垂直任务组织原创内容，包含 Prompt、示例、使用场景、常见错误和输出模板。计划采用一次性购买，不做复杂的作者市场。</p>
          <div className="mt-7 flex flex-wrap gap-3"><Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-emerald-700" href="#packs">查看工作流包 <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-300 px-5 text-sm font-semibold text-zinc-700 hover:border-emerald-500 hover:text-emerald-700" href="/workflows">先浏览免费工作流</Link></div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-emerald-50">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div><p className="text-sm font-bold text-zinc-950">原创重组</p><p className="mt-1 text-sm leading-6 text-zinc-600">借鉴优秀产品的组织方式，不复制第三方付费 Prompt 或商品文案。</p></div>
          <div><p className="text-sm font-bold text-zinc-950">先看再决定</p><p className="mt-1 text-sm leading-6 text-zinc-600">所有包均开放内容目录与首个工作流，先验证是否适合你的任务。</p></div>
          <div><p className="text-sm font-bold text-zinc-950">一次购买计划</p><p className="mt-1 text-sm leading-6 text-zinc-600">当前价格仅用于意愿测试；未来优先一次性购买，不强制订阅。</p></div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-950 py-10 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-emerald-300">一个工作流的五层价值</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">{valueLayers.map(({ title, description, icon: Icon }) => <div key={title}><Icon className="h-5 w-5 text-emerald-300" aria-hidden="true" /><h2 className="mt-3 font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p></div>)}</div>
        </div>
      </section>

      <section className="py-12 sm:py-16" id="packs">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><p className="text-sm font-semibold text-emerald-700">首批 6 个垂直合集</p><h2 className="mt-2 text-3xl font-bold text-zinc-950">按真实任务选择，而不是按模型选择</h2><p className="mt-3 text-sm leading-7 text-zinc-600">内容全部来自 PromptHub 现有原创数据的精选重组。下列价格用于验证付费意愿，支付功能尚未开放。</p></div>
          <div className="mt-8 space-y-6">
            {workflowPacks.map((pack) => {
              const prompts = pack.promptIds.map(getPromptById).filter(Boolean);
              return (
                <article className="scroll-mt-24 border-y border-zinc-200 bg-white px-5 py-7 sm:rounded-lg sm:border sm:p-8" id={pack.slug} key={pack.slug}>
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
                    <div><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">{pack.audience}</span><span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">{pack.promptIds.length} 个原创工作流</span></div><h3 className="mt-4 text-2xl font-bold text-zinc-950">{pack.title}</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">{pack.description}</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{prompts.map((prompt) => prompt && <Link className="flex items-center justify-between gap-3 rounded-md border border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-800 hover:border-emerald-400 hover:text-emerald-800" href={`/prompts/${prompt.slug}`} key={prompt.id}><span>{prompt.title}</span><ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>)}</div></div>
                    <aside className="border-t border-zinc-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"><p className="text-xs text-zinc-400">计划一次性价格</p><p className="mt-1 text-3xl font-bold text-zinc-950">¥{pack.price}</p><p className="mt-1 text-xs text-zinc-500">无订阅 · 支付尚未开放</p><ul className="mt-5 space-y-3">{pack.includes.map((item) => <li className="flex gap-2 text-sm leading-6 text-zinc-700" key={item}><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />{item}</li>)}</ul><Link className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-emerald-700" href={`/prompts/${prompts[0]?.slug}`}>免费查看第一个工作流</Link></aside>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
