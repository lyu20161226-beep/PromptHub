import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Beaker,
  CheckCircle2,
  Lightbulb,
  RefreshCcw,
  XCircle,
} from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { promptLabs } from "@/data/prompt-labs";

export const metadata: Metadata = {
  title: "Prompt Lab 提示词实验室",
  description:
    "通过失败案例、优化过程与最终 Prompt，学习提示词为什么有效，以及如何把一次提问升级为稳定工作流。",
};

export default function PromptLabPage() {
  return (
    <main>
      <section className="border-b border-zinc-200 bg-zinc-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300">
              <Beaker className="h-4 w-4" aria-hidden="true" />
              Prompt Lab
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-6xl">
              不只给最终答案，展示它是怎样被优化出来的
            </h1>
            <p className="mt-5 max-w-3xl text-xl font-semibold leading-8 text-zinc-300">
              失败 Prompt、问题诊断、版本演进与最终工作流。每个实验只教一个可以复用的方法。
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white py-10">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            ["01", "为什么失败"],
            ["02", "改了什么"],
            ["03", "为什么有效"],
            ["04", "如何复用"],
          ].map(([number, label]) => (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4" key={number}>
              <span className="font-mono text-xs font-bold text-emerald-700">{number}</span>
              <p className="mt-2 font-bold text-zinc-950">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50 py-14">
        <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
          {promptLabs.map((lab, labIndex) => (
            <article className="overflow-hidden rounded-lg border border-zinc-200 bg-white" key={lab.slug}>
              <header className="border-b border-zinc-200 p-5 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                    实验 {String(labIndex + 1).padStart(2, "0")} · {lab.category}
                  </span>
                  <Link
                    className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700"
                    href={`/prompts/${lab.promptSlug}`}
                  >
                    查看完整工作流 <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <h2 className="mt-5 text-2xl font-bold text-zinc-950 sm:text-3xl">{lab.title}</h2>
                <p className="mt-3 max-w-4xl leading-7 text-zinc-600">{lab.problem}</p>
              </header>

              <div className="grid gap-0 lg:grid-cols-2">
                <section className="border-b border-zinc-200 p-5 sm:p-7 lg:border-b-0 lg:border-r">
                  <div className="flex items-center gap-2 text-red-700">
                    <XCircle className="h-5 w-5" aria-hidden="true" />
                    <h3 className="font-bold">失败版本</h3>
                  </div>
                  <p className="mt-4 rounded-md border border-red-100 bg-red-50 p-4 font-mono text-sm leading-7 text-zinc-700">
                    {lab.weakPrompt}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {lab.failureReasons.map((reason) => (
                      <li className="flex gap-3 text-sm leading-6 text-zinc-600" key={reason}>
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="p-5 sm:p-7">
                  <div className="flex items-center gap-2 text-amber-700">
                    <RefreshCcw className="h-5 w-5" aria-hidden="true" />
                    <h3 className="font-bold">优化过程</h3>
                  </div>
                  <ol className="mt-4 space-y-4">
                    {lab.iterations.map((iteration) => (
                      <li className="rounded-md border border-zinc-200 bg-zinc-50 p-4" key={iteration.version}>
                        <p className="text-sm font-bold text-zinc-950">
                          <span className="mr-2 font-mono text-emerald-700">{iteration.version}</span>
                          {iteration.change}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-zinc-600">{iteration.reason}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              </div>

              <section className="border-t border-zinc-200 bg-zinc-950 p-5 text-white sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-emerald-300">最终 Prompt</p>
                    <p className="mt-1 text-sm text-zinc-400">结构清晰、边界明确、可以继续修改复用</p>
                  </div>
                  <div className="w-full sm:w-44">
                    <CopyButton location={`lab-${lab.slug}`} text={lab.finalPrompt} />
                  </div>
                </div>
                <pre className="mt-5 whitespace-pre-wrap break-words rounded-md border border-zinc-800 bg-black/20 p-4 font-mono text-sm leading-7 text-zinc-200">
                  {lab.finalPrompt}
                </pre>
              </section>

              <footer className="grid gap-5 border-t border-zinc-200 p-5 sm:p-7 lg:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2 text-emerald-700">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    <h3 className="font-bold">结果变化</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{lab.result}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-amber-700">
                    <Lightbulb className="h-5 w-5" aria-hidden="true" />
                    <h3 className="font-bold">可以带走的方法</h3>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {lab.lessons.map((lesson) => (
                      <li className="text-sm leading-6 text-zinc-600" key={lesson}>· {lesson}</li>
                    ))}
                  </ul>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
