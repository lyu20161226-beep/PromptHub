import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Lightbulb,
  Target,
} from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { FavoriteButton } from "@/components/FavoriteButton";
import { topWorkflowPrompts } from "@/lib/mock-prompts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "今日精选 AI 工作流",
  description:
    "每天精选一个高价值 AI 工作流，讲清推荐原因、适用场景、练习方法和可以获得的成果。",
};

function getChinaDate() {
  const now = new Date();
  const dateKey = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const label = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(now);

  return { dateKey, label };
}

export default function DailyPage() {
  const { dateKey, label } = getChinaDate();
  const dayNumber = Math.floor(
    Date.parse(`${dateKey}T00:00:00+08:00`) / 86_400_000,
  );
  const prompt = topWorkflowPrompts[Math.abs(dayNumber) % topWorkflowPrompts.length];
  const workflow = prompt.workflow!;

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-emerald-700">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            今日精选 · {label}
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-zinc-950 sm:text-6xl">
            每天学会一个能真正解决问题的 AI 工作流
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">
            不追求数量。每天只选择一条高价值内容，帮助你理解方法、完成练习，并带走一个可复用成果。
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start lg:px-8">
          <article className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
            <header className="border-b border-zinc-200 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-bold text-emerald-300">
                  {workflow.tier} 级精选
                </span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  {prompt.category}
                </span>
              </div>
              <h2 className="mt-5 text-3xl font-bold text-zinc-950">{prompt.title}</h2>
              <p className="mt-3 max-w-3xl leading-7 text-zinc-600">{prompt.description}</p>
            </header>

            <div className="space-y-8 p-6 sm:p-8">
              <section>
                <div className="flex items-center gap-2 text-emerald-700">
                  <Lightbulb className="h-5 w-5" aria-hidden="true" />
                  <h3 className="font-bold">为什么今天推荐它？</h3>
                </div>
                <p className="mt-3 rounded-md border-l-2 border-emerald-500 bg-emerald-50 p-4 text-sm leading-7 text-zinc-700">
                  {workflow.solution}
                </p>
              </section>

              <section className="border-t border-zinc-200 pt-8">
                <div className="flex items-center gap-2 text-zinc-950">
                  <Target className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                  <h3 className="font-bold">今日练习</h3>
                </div>
                <ol className="mt-4 grid gap-3 sm:grid-cols-2">
                  {workflow.steps.slice(0, 4).map((step, index) => (
                    <li className="flex gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700" key={step}>
                      <span className="font-mono text-xs font-bold text-emerald-700">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </section>

              <section className="border-t border-zinc-200 pt-8">
                <div className="flex items-center gap-2 text-zinc-950">
                  <CheckCircle2 className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                  <h3 className="font-bold">完成后你会得到</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{workflow.caseOutput}</p>
              </section>

              <section className="border-t border-zinc-200 pt-8">
                <p className="text-sm font-bold text-emerald-700">今日 Prompt</p>
                <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-zinc-950 p-5 font-mono text-sm leading-7 text-zinc-100">
                  {prompt.content}
                </pre>
              </section>
            </div>
          </article>

          <aside className="rounded-lg border border-zinc-200 bg-white p-5 lg:sticky lg:top-24">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-950">
              <Clock3 className="h-4 w-4 text-emerald-700" aria-hidden="true" />
              今天只完成这一条
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              替换 Prompt 中的变量，运行一次，再根据真实结果修改一轮。
            </p>
            <div className="mt-5 space-y-3">
              <CopyButton
                location="daily"
                text={prompt.content}
                workflowId={prompt.id}
              />
              <FavoriteButton slug={prompt.slug} />
              <Link
                className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-zinc-300 px-4 text-sm font-bold text-zinc-700 hover:border-emerald-500 hover:text-emerald-700"
                href={`/prompts/${prompt.slug}`}
              >
                学习完整工作流 <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-5 border-t border-zinc-100 pt-4 text-xs leading-5 text-zinc-400">
              精选内容每天按中国标准时间轮换，不增加未经审核的新 Prompt。
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
