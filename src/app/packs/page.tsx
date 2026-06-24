import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, FileOutput, GitBranch, Star } from "lucide-react";
import { workflowPacks } from "@/data/workflow-packs";
import { packDeepDives } from "@/data/pack-deep-dives";
import { getPromptById } from "@/lib/mock-prompts";

export const metadata: Metadata = {
  title: "PromptHub Workflow Packs - 精选 AI 工作流资产包",
  description: "PromptHub 精选垂直 AI 工作流 Packs，包含 Prompt、变量、案例、Before/After、ROI、输出模板和使用指南。",
  alternates: { canonical: "/packs" }
};

const packProof: Record<string, { problem: string; before: string; after: string; workflow: string[]; models: string; updated: string }> = {
  "xiaohongshu-growth": {
    problem: "解决小红书内容空泛、标题不吸引人、卖点无法转化的问题。",
    before: "帮我写一篇小红书文案。",
    after: "输出标题钩子、正文结构、卖点转化、标签推荐、评论区引导和发布节奏。",
    workflow: ["卖点提炼", "选题角度", "标题测试", "正文生成", "发布复盘"],
    models: "ChatGPT / DeepSeek / Claude",
    updated: "2026-06"
  },
  "cross-border-commerce": {
    problem: "解决跨境商品描述、Listing、主图和广告文案重复生产的问题。",
    before: "帮我写一个商品 Listing。",
    after: "输出卖点矩阵、搜索关键词、主图提示词、落地页文案和邮件培育内容。",
    workflow: ["商品定位", "竞品拆解", "Listing", "主图脚本", "广告转化"],
    models: "ChatGPT / Claude / Gemini",
    updated: "2026-06"
  },
  "teacher-lesson": {
    problem: "解决教案从目标到练习不连贯、课堂活动难落地的问题。",
    before: "帮我写一份教案。",
    after: "输出教学目标、课堂活动、练习题、反馈方式和可检查的教学成果。",
    workflow: ["目标拆解", "活动设计", "练习生成", "课堂反馈", "作业模板"],
    models: "ChatGPT / DeepSeek",
    updated: "2026-06"
  },
  "creator-editorial": {
    problem: "解决自媒体选题分散、内容同质化和发布节奏不稳定的问题。",
    before: "帮我想几个选题。",
    after: "输出选题池、脚本结构、标题变体、发布时间表和复用模板。",
    workflow: ["受众洞察", "选题池", "脚本大纲", "内容改写", "排期发布"],
    models: "ChatGPT / Claude",
    updated: "2026-06"
  },
  "indie-product-research": {
    problem: "解决独立开发者凭直觉做产品、缺少用户和竞品证据的问题。",
    before: "帮我分析一个产品想法。",
    after: "输出用户画像、竞品矩阵、差异化机会、Landing Page 和 30 天验证计划。",
    workflow: ["问题定义", "竞品分析", "用户访谈", "机会判断", "MVP验证"],
    models: "Claude / ChatGPT / DeepSeek",
    updated: "2026-06"
  },
  "ai-visual-style": {
    problem: "解决 AI 绘图提示词不可控、风格不统一、商业图难复用的问题。",
    before: "帮我生成一张产品图。",
    after: "输出构图、材质、灯光、镜头、风格参数和多模型适配提示词。",
    workflow: ["风格定位", "主体描述", "构图光线", "参数控制", "结果迭代"],
    models: "Midjourney / Flux / 即梦",
    updated: "2026-06"
  }
};

const pricing = [
  { name: "Starter", price: "$9", description: "7 Prompts + 3 Templates" },
  { name: "Professional", price: "$29", description: "15 Prompts + Workflow + Guides" },
  { name: "Asset Pack", price: "$79", description: "Workflow + Prompt + Notion + SOP" }
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
            每个 Pack 都按“问题、方案、案例、Prompt、模板”的结构组织，让用户先看到结果，再决定是否解锁完整工作流。
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
              Explore Workflow Packs <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-300 px-5 text-sm font-semibold text-zinc-700 hover:border-emerald-500 hover:text-emerald-700" href="/">
              Browse Free Library
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-950 py-10 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-emerald-300">Pack 固定结构</p>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              ["问题", "明确这个 Pack 解决什么痛点，适合谁使用。"],
              ["案例", "展示 Before / After，让用户先看到效果。"],
              ["流程", "用 Workflow 图说明从输入到输出的完整步骤。"],
              ["资产", "提供 Prompt、模板、避坑指南和更新日志。"]
            ].map(([title, description]) => (
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
              这些 Pack 负责商业转化；免费 Prompt Library 负责 SEO 流量。免费内容把用户带进来，Pack 负责证明价值并转化。
            </p>
          </div>

          <div className="mt-8 space-y-8">
            {workflowPacks.map((pack) => {
              const prompts = pack.promptIds.map(getPromptById).filter(Boolean);
              const proof = packProof[pack.slug];
              const deepDive = packDeepDives[pack.slug];

              return (
                <article className="scroll-mt-24 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm sm:p-8" id={pack.slug} key={pack.slug}>
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">{pack.audience}</span>
                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">{proof.models}</span>
                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">更新 {proof.updated}</span>
                      </div>

                      <h3 className="mt-4 text-2xl font-bold text-zinc-950">{pack.title}</h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">{pack.description}</p>

                      <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-5">
                        <p className="text-sm font-bold text-zinc-950">Pack Overview</p>
                        <p className="mt-2 text-sm leading-6 text-zinc-600">{proof.problem}</p>
                        {deepDive && (
                          <p className="mt-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-emerald-800">
                            目标：{deepDive.goal}
                          </p>
                        )}
                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                          <div className="rounded-md bg-white p-3">
                            <Clock className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                            <p className="mt-2 text-xs text-zinc-500">节省时间</p>
                            <p className="font-bold text-zinc-950">{deepDive ? deepDive.roi.saved : "2h / 15min"}</p>
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
                          <p className="mt-2 text-sm leading-6 text-zinc-700">{deepDive?.beforeAfter.before ?? proof.before}</p>
                        </div>
                        <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                          <p className="text-xs font-bold text-emerald-700">After</p>
                          {deepDive ? (
                            <ul className="mt-2 space-y-2 text-sm leading-6 text-zinc-700">
                              {deepDive.beforeAfter.after.map((item) => (
                                <li className="flex gap-2" key={item}>
                                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="mt-2 text-sm leading-6 text-zinc-700">{proof.after}</p>
                          )}
                        </div>
                      </div>

                      <div className="mt-5 rounded-lg border border-zinc-200 p-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-zinc-950">
                          <GitBranch className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                          Workflow 图
                        </div>
                        <div className="mt-4 grid gap-2 md:grid-cols-5">
                          {(deepDive?.fullWorkflow ?? proof.workflow).map((step, index) => (
                            <div className="rounded-md bg-zinc-50 p-3" key={step}>
                              <p className="text-xs font-bold text-emerald-700">Step {index + 1}</p>
                              <p className="mt-1 text-sm font-semibold text-zinc-800">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {deepDive && (
                        <div className="mt-5 grid gap-4 lg:grid-cols-3">
                          <div className="rounded-lg border border-zinc-200 bg-white p-4">
                            <p className="text-sm font-bold text-zinc-950">包含 Prompt</p>
                            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
                              {deepDive.prompts.map((item) => (
                                <li className="flex gap-2" key={item}>
                                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="rounded-lg border border-zinc-200 bg-white p-4">
                            <p className="text-sm font-bold text-zinc-950">输出模板</p>
                            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
                              {deepDive.outputTemplate.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="rounded-lg border border-zinc-200 bg-white p-4">
                            <p className="text-sm font-bold text-zinc-950">常见错误</p>
                            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
                              {deepDive.mistakes.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {deepDive && (
                        <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                          <p className="text-sm font-bold text-zinc-950">ROI 说明</p>
                          <div className="mt-3 grid gap-3 sm:grid-cols-2">
                            <p className="text-sm leading-6 text-zinc-700"><strong>传统方式：</strong>{deepDive.roi.traditional}</p>
                            <p className="text-sm leading-6 text-zinc-700"><strong>使用 Pack：</strong>{deepDive.roi.withPack}</p>
                            <p className="text-sm leading-6 text-zinc-700"><strong>节省：</strong>{deepDive.roi.saved}</p>
                            <p className="text-sm leading-6 text-zinc-700"><strong>每周价值：</strong>{deepDive.roi.weeklyValue}</p>
                          </div>
                        </div>
                      )}

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {prompts.map(
                          (prompt) =>
                            prompt && (
                              <Link
                                className="flex items-center justify-between gap-3 rounded-md border border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-800 hover:border-emerald-400 hover:text-emerald-800"
                                href={`/prompts/${prompt.slug}`}
                                key={prompt.id}
                              >
                                <span>{prompt.title}</span>
                                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                              </Link>
                            )
                        )}
                      </div>
                    </div>

                    <aside className="border-t border-zinc-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                      <p className="text-xs text-zinc-400">计划一次性价格</p>
                      <p className="mt-1 text-3xl font-bold text-zinc-950">¥{pack.price}</p>
                      <p className="mt-1 text-xs text-zinc-500">当前用于验证付费意愿，支付尚未开放。</p>
                      <ul className="mt-5 space-y-3">
                        {pack.includes.map((item) => (
                          <li className="flex gap-2 text-sm leading-6 text-zinc-700" key={item}>
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Link className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-emerald-700" href={`/prompts/${prompts[0]?.slug}`}>
                        免费预览第一个工作流
                      </Link>
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
