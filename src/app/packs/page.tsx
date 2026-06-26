import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, FileOutput, GitBranch, Star } from "lucide-react";
import { PackInterestButton } from "@/components/PackInterestButton";
import { packDeepDives } from "@/data/pack-deep-dives";
import { workflowPacks } from "@/data/workflow-packs";

export const metadata: Metadata = {
  title: "PromptHub Workflow Packs - 精选 AI 工作流资产包",
  description: "PromptHub 精选垂直 AI 工作流 Packs，包含 Prompt、案例、Before/After、ROI、输出模板和使用指南。",
  alternates: { canonical: "/packs" }
};

const detailPackSlugs = new Set(["xiaohongshu-growth", "indie-product-research", "cross-border-commerce"]);

const packStructure = [
  ["问题", "明确这个 Pack 解决什么痛点，适合谁使用。"],
  ["案例", "展示 Before / After，让用户先看到结果。"],
  ["流程", "用 Workflow 图说明从输入到输出的完整步骤。"],
  ["资产", "提供 Prompt、模板、避坑指南和更新说明。"]
];

const pricing = [
  { name: "Starter", price: "¥9", description: "解锁单个高频 Workflow Pack" },
  { name: "Professional", price: "¥29", description: "解锁前三个核心 Packs" },
  { name: "Lifetime", price: "¥99", description: "解锁后续全部 Workflow Packs" }
];

export default function PacksPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-semibold text-emerald-700">PromptHub Workflow Packs</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">
            不要只买 Prompt，购买一套可复用的 AI 工作流资产
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">
            每个 Pack 都按“问题、方案、案例、Prompt、模板”的结构组织。用户先看到结果，再决定是否留下购买意向。
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              ["传统方式", "2小时"],
              ["使用后", "15分钟"],
              ["效率提升", "87%"]
            ].map(([label, value]) => (
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4" key={label}>
                <p className="text-sm font-semibold text-zinc-500">{label}</p>
                <p className="mt-1 text-3xl font-bold text-zinc-950">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-emerald-700" href="#packs">
              查看 Packs <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-300 px-5 text-sm font-semibold text-zinc-700 hover:border-emerald-500 hover:text-emerald-700" href="/">
              免费运行 Prompt
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-950 py-10 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-emerald-300">每个 Pack 的固定结构</p>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {packStructure.map(([title, description]) => (
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5" key={title}>
                <h2 className="font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16" id="packs">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-emerald-700">首批 6 个垂直 Packs</p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-950">先把 3 个做到极致，再扩充数量</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              免费 Prompt Library 负责 SEO 流量，Workflow Pack 负责验证付费意向。现在优先打磨小红书、跨境电商和独立开发者三个方向。
            </p>
          </div>

          <div className="mt-8 space-y-8">
            {workflowPacks.map((pack) => {
              const deepDive = packDeepDives[pack.slug];
              const hasDetailPage = detailPackSlugs.has(pack.slug);

              return (
                <article className="scroll-mt-24 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm sm:p-8" id={pack.slug} key={pack.slug}>
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">{pack.audience}</span>
                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">{pack.promptIds.length} 个 Prompt</span>
                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">更新 2026-06</span>
                      </div>

                      <h3 className="mt-4 text-2xl font-bold text-zinc-950">{pack.title}</h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">{pack.description}</p>

                      {deepDive ? (
                        <>
                          <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-5">
                            <p className="text-sm font-bold text-zinc-950">Pack Overview</p>
                            <p className="mt-2 text-sm leading-6 text-zinc-600">{deepDive.goal}</p>
                            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                              <div className="rounded-md bg-white p-3">
                                <Clock className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                                <p className="mt-2 text-xs text-zinc-500">节省时间</p>
                                <p className="font-bold text-zinc-950">{deepDive.roi.saved}</p>
                              </div>
                              <div className="rounded-md bg-white p-3">
                                <Star className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                                <p className="mt-2 text-xs text-zinc-500">Prompt Score</p>
                                <p className="font-bold text-zinc-950">4.9 / 5</p>
                              </div>
                              <div className="rounded-md bg-white p-3">
                                <FileOutput className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                                <p className="mt-2 text-xs text-zinc-500">输出格式</p>
                                <p className="font-bold text-zinc-950">Markdown / Notion</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-5 grid gap-3 md:grid-cols-2">
                            <div className="rounded-lg border border-red-100 bg-red-50 p-4">
                              <p className="text-xs font-bold text-red-600">Before</p>
                              <p className="mt-2 text-xs font-semibold text-zinc-500">示例输入：{deepDive.beforeAfter.input}</p>
                              <p className="mt-2 text-sm leading-6 text-zinc-700">{deepDive.beforeAfter.before}</p>
                            </div>
                            <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                              <p className="text-xs font-bold text-emerald-700">After</p>
                              <ul className="mt-2 space-y-2 text-sm leading-6 text-zinc-700">
                                {deepDive.beforeAfter.after.map((item) => (
                                  <li className="flex gap-2" key={item}>
                                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-5 rounded-lg border border-zinc-200 p-4">
                            <div className="flex items-center gap-2 text-sm font-bold text-zinc-950">
                              <GitBranch className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                              Workflow 图
                            </div>
                            <div className="mt-4 grid gap-2 md:grid-cols-6">
                              {deepDive.fullWorkflow.map((step, index) => (
                                <div className="rounded-md bg-zinc-50 p-3" key={step}>
                                  <p className="text-xs font-bold text-emerald-700">Step {index + 1}</p>
                                  <p className="mt-1 text-sm font-semibold text-zinc-800">{step}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-5">
                          <p className="text-sm leading-6 text-zinc-600">这个 Pack 将按同样结构补充案例、模板和 ROI。当前先用于展示后续扩展方向。</p>
                        </div>
                      )}
                    </div>

                    <aside className="border-t border-zinc-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                      <p className="text-xs text-zinc-400">一次性验证价</p>
                      <p className="mt-1 text-3xl font-bold text-zinc-950">¥{pack.price}</p>
                      <p className="mt-1 text-xs text-zinc-500">当前用于验证付费意向，支付尚未开放。</p>
                      <ul className="mt-5 space-y-3">
                        {pack.includes.map((item) => (
                          <li className="flex gap-2 text-sm leading-6 text-zinc-700" key={item}>
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6">
                        <PackInterestButton packSlug={pack.slug} packTitle={pack.title} />
                      </div>
                      {hasDetailPage && (
                        <Link className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-md border border-zinc-300 px-5 text-sm font-semibold text-zinc-700 hover:border-emerald-500 hover:text-emerald-700" href={`/packs/${pack.slug}`}>
                          查看 Pack 详情
                        </Link>
                      )}
                    </aside>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-emerald-700">商业化层级</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {pricing.map((tier) => (
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5" key={tier.name}>
                <h2 className="text-xl font-bold text-zinc-950">{tier.name}</h2>
                <p className="mt-2 text-3xl font-bold text-emerald-700">{tier.price}</p>
                <p className="mt-2 text-sm text-zinc-600">{tier.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
