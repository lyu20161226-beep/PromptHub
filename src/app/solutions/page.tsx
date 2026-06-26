import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, CheckCircle2, Layers3, Search } from "lucide-react";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Solution Hub - PromptHub",
  description: "按任务组织 AI 工作流：SaaS 启动、小红书增长、产品发布、SEO 内容、简历优化和跨境电商。"
};

export default function SolutionsPage() {
  return (
    <main className="bg-zinc-50 text-zinc-950">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <Link className="text-sm font-semibold text-emerald-700 hover:text-emerald-800" href="/">
            返回首页
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
                <Boxes className="h-4 w-4" aria-hidden="true" />
                Solution Hub
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
                选择你想完成的任务，而不是搜索一条 Prompt
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
                PromptHub 把 Prompt、Pack、Workflow 和输出模板组合成解决方案。用户先选择目标，再进入完整工作流。
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm font-bold text-zinc-950">为什么做 Solution Hub？</p>
              <div className="mt-4 grid gap-3">
                {["用户按任务找答案", "Prompt 组合成 Workflow", "Pack 更像可购买产品", "SEO 页面更容易覆盖真实搜索词"].map((item) => (
                  <div className="flex gap-3 text-sm text-zinc-600" key={item}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">I want to...</p>
              <h2 className="mt-2 text-3xl font-bold">首批 6 个任务型解决方案</h2>
            </div>
            <Link className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800" href="/packs">
              查看 Workflow Packs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {solutions.map((solution) => (
              <article className="flex min-h-full flex-col rounded-lg border border-zinc-200 bg-white p-5 shadow-sm" key={solution.slug}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">{solution.category}</p>
                    <h3 className="mt-2 text-2xl font-bold">{solution.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-zinc-500">{solution.subtitle}</p>
                  </div>
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-bold text-zinc-600">{solution.difficulty}</span>
                </div>

                <p className="mt-4 text-sm leading-6 text-zinc-600">{solution.description}</p>

                <div className="mt-5 rounded-md bg-zinc-50 p-4">
                  <p className="text-xs font-bold text-zinc-500">Workflow Steps</p>
                  <div className="mt-3 space-y-2">
                    {solution.steps.slice(0, 4).map((step, index) => (
                      <div className="flex gap-2 text-sm text-zinc-700" key={step.title}>
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">{index + 1}</span>
                        <span>{step.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-md border border-zinc-200 p-3">
                    <p className="text-xs text-zinc-500">Prompts</p>
                    <p className="mt-1 font-bold">{solution.promptCount} 个推荐</p>
                  </div>
                  <div className="rounded-md border border-zinc-200 p-3">
                    <p className="text-xs text-zinc-500">Pack</p>
                    <p className="mt-1 font-bold">1 个主推</p>
                  </div>
                </div>

                <Link className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 text-sm font-bold text-white hover:bg-emerald-700" href={`/solutions/${solution.slug}`}>
                  查看解决方案
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white py-10">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            { icon: Search, title: "从搜索词升级为任务", text: "覆盖 build saas、grow xiaohongshu、launch product 等更接近用户意图的页面。" },
            { icon: Layers3, title: "从单条 Prompt 升级为 Workflow", text: "每个解决方案都按步骤组织 Prompt，让用户知道先做什么、后做什么。" },
            { icon: Boxes, title: "从展示站升级为资产库", text: "解决方案天然连接 Pack、模板和案例，更适合未来商业化。" }
          ].map((item) => (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5" key={item.title}>
              <item.icon className="h-5 w-5 text-emerald-600" aria-hidden="true" />
              <h3 className="mt-3 font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
