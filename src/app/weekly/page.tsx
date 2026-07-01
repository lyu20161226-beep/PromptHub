import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Sparkles } from "lucide-react";
import { latestWeeklyIssue } from "@/data/workflow-weekly";
import { getPromptById } from "@/lib/mock-prompts";

export const metadata: Metadata = {
  title: "Workflow Weekly",
  description: "PromptHub 每周精选三个能解决真实工作问题的 AI 工作流，包含问题、案例、踩坑经验、模型和参数建议。",
  alternates: { canonical: "/weekly" }
};

export default function WeeklyPage() {
  const prompts = latestWeeklyIssue.workflowIds.map((id) => getPromptById(id)).filter((prompt) => prompt?.workflow);

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex items-center gap-2 text-emerald-700"><Sparkles className="h-4 w-4" aria-hidden="true" /><p className="text-sm font-semibold">Workflow Weekly · 第 {latestWeeklyIssue.issue} 期</p></div>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">{latestWeeklyIssue.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">{latestWeeklyIssue.introduction}</p>
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-500"><CalendarDays className="h-4 w-4" aria-hidden="true" />{latestWeeklyIssue.date}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6 lg:px-8">
          {prompts.map((prompt, index) => {
            const workflow = prompt?.workflow;
            if (!prompt || !workflow) return null;
            return (
              <article className="border-y border-zinc-200 bg-white px-5 py-7 sm:rounded-lg sm:border sm:p-8" key={prompt.id}>
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-950 text-xs font-bold text-white">{index + 1}</span><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">{prompt.category}</span></div>
                    <h2 className="mt-4 text-2xl font-bold text-zinc-950">{prompt.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-zinc-600">{latestWeeklyIssue.reasons[prompt.id]}</p>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2"><div><h3 className="text-sm font-bold text-rose-700">要解决的问题</h3><p className="mt-2 text-sm leading-7 text-zinc-700">{workflow.problem}</p></div><div><h3 className="text-sm font-bold text-emerald-700">内部验证结果</h3><p className="mt-2 text-sm leading-7 text-zinc-700">{workflow.caseOutput}</p></div></div>
                  </div>
                  <aside className="border-t border-zinc-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"><p className="text-sm font-bold text-zinc-950">本期使用提醒</p><ul className="mt-4 space-y-3">{workflow.optimizationTips.slice(0, 3).map((tip) => <li className="flex gap-2 text-sm leading-6 text-zinc-600" key={tip}><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />{tip}</li>)}</ul><p className="mt-5 text-xs text-zinc-400">推荐模型</p><p className="mt-1 text-sm font-semibold text-zinc-700">{workflow.models.join(" · ")}</p><Link className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white hover:bg-emerald-700" href={`/workflows/${prompt.slug}`}>查看完整工作流 <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></aside>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
