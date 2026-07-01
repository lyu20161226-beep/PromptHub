import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, ArrowRight, BadgeCheck, ChevronRight, CircleCheck, Copy, FileCheck2, Lightbulb, Route, ShieldCheck, Sparkles, Target, Users, XCircle } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { FavoriteButton } from "@/components/FavoriteButton";
import { WorkflowCard } from "@/components/WorkflowCard";
import { WorkflowFeedback } from "@/components/WorkflowFeedback";
import { WorkflowViewTracker } from "@/components/WorkflowViewTracker";
import { getPackForWorkflow } from "@/data/workflow-packs";
import { getPromptBySlug, mockPrompts, topWorkflowPrompts } from "@/lib/mock-prompts";

type PromptPageProps = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return mockPrompts.map((prompt) => ({ id: prompt.slug }));
}

export async function generateMetadata({ params }: PromptPageProps): Promise<Metadata> {
  const { id } = await params;
  const prompt = getPromptBySlug(id);
  if (!prompt) return { title: "提示词不存在", robots: { index: false, follow: false } };

  const description = prompt.workflow
    ? `${prompt.title}完整AI工作流：问题分析、解决步骤、可复制Prompt、示例输入输出、证据边界和常见错误。`
    : prompt.description;

  return {
    title: prompt.title,
    description,
    keywords: [prompt.title, prompt.category, ...(prompt.workflow?.models ?? prompt.models), ...prompt.tags],
    alternates: { canonical: prompt.workflow ? `/workflows/${prompt.slug}` : `/prompts/${prompt.slug}` },
    robots: prompt.workflow ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: prompt.title,
      description,
      url: prompt.workflow ? `/workflows/${prompt.slug}` : `/prompts/${prompt.slug}`,
      type: "article",
      tags: [prompt.category, ...prompt.tags]
    }
  };
}

export default async function PromptPage({ params }: PromptPageProps) {
  const { id } = await params;
  const prompt = getPromptBySlug(id);
  if (!prompt) notFound();

  const workflow = prompt.workflow;
  const editorial = workflow?.editorial;
  const pack = workflow ? getPackForWorkflow(prompt.id) : undefined;
  const relatedPrompts = workflow
    ? topWorkflowPrompts.filter((item) => item.id !== prompt.id).slice(0, 3)
    : mockPrompts.filter((item) => item.id !== prompt.id && item.category === prompt.category).slice(0, 3);

  return (
    <main className="min-h-screen bg-zinc-50">
      {workflow && <WorkflowViewTracker workflowId={prompt.id} />}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-zinc-500" aria-label="面包屑导航">
          <Link className="hover:text-emerald-700" href="/">首页</Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <Link className="hover:text-emerald-700" href={workflow ? "/workflows" : "/search"}>{workflow ? "精选工作流" : prompt.category}</Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <span className="text-zinc-800">{prompt.title}</span>
        </nav>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <article className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
            <header className="border-b border-zinc-200 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                {workflow && <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950 px-3 py-1.5 text-sm font-bold text-emerald-300"><BadgeCheck className="h-4 w-4" aria-hidden="true" />{workflow.tier}级工作流</span>}
                {editorial && <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-800">{editorial.status === "verified" ? "Verified" : editorial.status === "source-linked" ? "Source-linked" : "Unverified"}</span>}
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">{prompt.category}</span>
              </div>
              <h1 className="mt-5 text-3xl font-bold leading-tight text-zinc-950 sm:text-4xl">{prompt.title}</h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-600">{prompt.description}</p>
              {editorial && <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4"><p className="text-sm font-bold text-amber-900">证据边界 · 审查于 {editorial.reviewedAt}</p><p className="mt-2 text-sm leading-6 text-amber-800">{editorial.evidenceNote}</p></div>}
              {pack && <p className="mt-4 text-sm text-zinc-500">收录于 <Link className="font-semibold text-emerald-700 hover:text-emerald-900" href={`/packs#${pack.slug}`}>{pack.shortTitle}</Link> · 包含案例、错误清单与输出模板</p>}
            </header>

            <div className="p-6 sm:p-8">
              {workflow ? (
                <>
                  <section>
                    <div className="flex items-center gap-2 text-rose-700"><AlertTriangle className="h-5 w-5" aria-hidden="true" /><h2 className="text-xl font-bold">问题</h2></div>
                    <p className="mt-4 rounded-md border-l-2 border-rose-400 bg-rose-50 px-4 py-4 text-sm leading-7 text-zinc-700">{workflow.problem}</p>
                  </section>

                  {editorial && (
                    <section className="mt-9 grid gap-5 border-t border-zinc-200 pt-8 md:grid-cols-2">
                      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
                        <div className="flex items-center gap-2 text-emerald-700"><Users className="h-5 w-5" aria-hidden="true" /><h2 className="text-xl font-bold">适合谁</h2></div>
                        <ul className="mt-4 space-y-2">{editorial.audience.map((item) => <li className="text-sm leading-6 text-zinc-700" key={item}>{item}</li>)}</ul>
                      </div>
                      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
                        <div className="flex items-center gap-2 text-emerald-700"><FileCheck2 className="h-5 w-5" aria-hidden="true" /><h2 className="text-xl font-bold">需要提供</h2></div>
                        <ul className="mt-4 space-y-2">{editorial.requiredInputs.map((item) => <li className="text-sm leading-6 text-zinc-700" key={item}>{item}</li>)}</ul>
                      </div>
                    </section>
                  )}

                  <section className="mt-9 border-t border-zinc-200 pt-8">
                    <div className="flex items-center gap-2 text-emerald-700"><Route className="h-5 w-5" aria-hidden="true" /><h2 className="text-xl font-bold">解决方案</h2></div>
                    <p className="mt-4 text-sm leading-7 text-zinc-700">{workflow.solution}</p>
                    <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                      {workflow.steps.map((step, index) => <li className="flex gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700" key={step}><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-bold text-white">{index + 1}</span><span className="leading-6">{step}</span></li>)}
                    </ol>
                  </section>
                </>
              ) : (
                <section><div className="flex items-center gap-2"><Target className="h-5 w-5 text-emerald-700" aria-hidden="true" /><h2 className="font-bold text-zinc-950">适用场景</h2></div><p className="mt-3 rounded-md border-l-2 border-emerald-500 bg-emerald-50 px-4 py-3 text-sm leading-7 text-zinc-700">{prompt.useCase}</p></section>
              )}

              <section className="mt-9 border-t border-zinc-200 pt-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div><div className="flex items-center gap-2"><Copy className="h-5 w-5 text-emerald-700" aria-hidden="true" /><h2 className="text-xl font-bold text-zinc-950">可复制 Prompt</h2></div><p className="mt-2 text-sm text-zinc-500">替换方括号中的变量，再粘贴到推荐模型。</p></div>
                  <div className="w-full sm:w-44"><CopyButton location="prompt-header" text={prompt.content} workflowId={workflow ? prompt.id : undefined} /></div>
                </div>
                <div className="mt-5 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950"><div className="flex items-center justify-between border-b border-white/10 px-5 py-3"><span className="text-xs font-semibold uppercase text-emerald-300">Prompt</span><span className="text-xs text-zinc-500">{prompt.id}</span></div><pre className="max-h-[34rem] overflow-auto whitespace-pre-wrap break-words p-5 font-mono text-sm leading-7 text-zinc-100 sm:p-6">{prompt.content}</pre></div>
                <div className="mt-4 max-w-48"><CopyButton location="prompt-footer" text={prompt.content} workflowId={workflow ? prompt.id : undefined} /></div>
              </section>

              {workflow ? (
                <>
                  <section className="mt-9 border-t border-zinc-200 pt-8">
                    <div className="flex items-center gap-2 text-emerald-700"><CircleCheck className="h-5 w-5" aria-hidden="true" /><h2 className="text-xl font-bold">示例输入 / 输出：{workflow.caseTitle}</h2></div>
                    <div className="mt-5 grid gap-5 sm:grid-cols-2"><div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5"><h3 className="font-bold text-zinc-950">输入</h3><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-zinc-700">{workflow.caseInput}</p></div><div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-5"><h3 className="font-bold text-zinc-950">输出结果</h3><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-zinc-700">{workflow.caseOutput}</p></div></div>
                  </section>

                  {editorial && (
                    <section className="mt-9 border-t border-zinc-200 pt-8">
                      <div className="flex items-center gap-2 text-emerald-700"><FileCheck2 className="h-5 w-5" aria-hidden="true" /><h2 className="text-xl font-bold">最终得到</h2></div>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {editorial.expectedOutputs.map((item) => <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900" key={item}>{item}</div>)}
                      </div>
                    </section>
                  )}

                  <div className="mt-9 grid gap-6 border-t border-zinc-200 pt-8 lg:grid-cols-2">
                    <section><div className="flex items-center gap-2 text-rose-700"><XCircle className="h-5 w-5" aria-hidden="true" /><h2 className="text-xl font-bold">常见错误</h2></div><ul className="mt-4 space-y-3">{workflow.commonErrors.map((error) => <li className="flex gap-3 text-sm leading-7 text-zinc-700" key={error}><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />{error}</li>)}</ul></section>
                    <section><div className="flex items-center gap-2 text-amber-700"><Lightbulb className="h-5 w-5" aria-hidden="true" /><h2 className="text-xl font-bold">优化技巧</h2></div><ul className="mt-4 space-y-3">{workflow.optimizationTips.map((tip) => <li className="flex gap-3 text-sm leading-7 text-zinc-700" key={tip}><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />{tip}</li>)}</ul></section>
                  </div>
                  {editorial && (
                    <>
                      <section className="mt-9 border-t border-zinc-200 pt-8">
                        <div className="flex items-center gap-2 text-amber-700"><ShieldCheck className="h-5 w-5" aria-hidden="true" /><h2 className="text-xl font-bold">使用边界</h2></div>
                        <ul className="mt-4 space-y-3">{editorial.limitations.map((item) => <li className="text-sm leading-7 text-zinc-700" key={item}>{item}</li>)}</ul>
                      </section>
                      <section className="mt-9 border-t border-zinc-200 pt-8">
                        <h2 className="text-xl font-bold text-zinc-950">FAQ</h2>
                        <div className="mt-4 divide-y divide-zinc-200 rounded-lg border border-zinc-200">
                          {editorial.faq.map((item) => <div className="p-5" key={item.question}><h3 className="font-bold text-zinc-950">{item.question}</h3><p className="mt-2 text-sm leading-7 text-zinc-600">{item.answer}</p></div>)}
                        </div>
                      </section>
                    </>
                  )}
                  <WorkflowFeedback workflowId={prompt.id} />
                </>
              ) : (
                <div className="mt-8 grid gap-5 sm:grid-cols-2"><section className="rounded-lg border border-zinc-200 bg-zinc-50 p-5"><h2 className="font-bold">示例输入</h2><p className="mt-3 text-sm leading-7">{prompt.exampleInput}</p></section><section className="rounded-lg border border-zinc-200 bg-zinc-50 p-5"><h2 className="font-bold">示例输出</h2><p className="mt-3 text-sm leading-7">{prompt.exampleOutput}</p></section></div>
              )}
            </div>
          </article>

          <aside className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <div className="flex items-center gap-2 text-emerald-700"><Sparkles className="h-4 w-4" aria-hidden="true" /><p className="text-sm font-semibold">推荐配置</p></div>
            <div className="mt-5 grid gap-2"><CopyButton location="sidebar" text={prompt.content} workflowId={workflow ? prompt.id : undefined} /><FavoriteButton slug={prompt.slug} /></div>
            <dl className="mt-6 space-y-4 border-t border-zinc-100 pt-5 text-sm"><div><dt className="text-zinc-400">模型状态</dt><dd className="mt-2 space-y-2">{editorial ? editorial.modelAssessments.map((item) => <p className="leading-6 text-zinc-700" key={item.model}><span className="font-semibold text-zinc-950">{item.model}</span> · {item.status === "tested" ? "已测试" : item.status === "compatible" ? "结构兼容" : "未测试"}<br />{item.fit}</p>) : (workflow?.models ?? prompt.models).map((model) => <span className="mr-2 inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-700" key={model}>{model} · 未测试</span>)}</dd></div>{workflow && <div><dt className="text-zinc-400">参数建议</dt><dd className="mt-2 space-y-2">{workflow.params.map((param) => <p className="leading-6 text-zinc-700" key={param}>{param}</p>)}</dd></div>}</dl>
            {editorial?.relatedCaseSlug && <Link className="mt-5 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-zinc-300 px-4 text-sm font-semibold text-zinc-700 hover:border-emerald-500 hover:text-emerald-700" href={`/cases/${editorial.relatedCaseSlug}`}>查看相关案例 <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
            <Link className="mt-6 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-zinc-300 px-4 text-sm font-semibold text-zinc-700 hover:border-emerald-500 hover:text-emerald-700" href={workflow ? "/workflows" : "/search"}><ArrowLeft className="h-4 w-4" aria-hidden="true" />返回{workflow ? "工作流合集" : "搜索"}</Link>
          </aside>
        </div>

        {relatedPrompts.length > 0 && <section className="mt-10 border-t border-zinc-200 pt-10"><h2 className="text-2xl font-bold text-zinc-950">相关推荐</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{relatedPrompts.map((item) => item.workflow ? <WorkflowCard compact key={item.id} prompt={item} /> : <Link className="rounded-lg border border-zinc-200 bg-white p-5" href={`/prompts/${item.slug}`} key={item.id}><h3 className="font-bold">{item.title}</h3><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">查看详情 <ArrowRight className="h-4 w-4" aria-hidden="true" /></span></Link>)}</div></section>}
      </div>
    </main>
  );
}
