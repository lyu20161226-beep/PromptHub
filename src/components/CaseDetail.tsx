import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FileInput,
  FileOutput,
  Info,
  Route,
  ShieldAlert,
} from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import type { CuratedCase } from "@/data/case-studies";

export function CaseDetail({ caseItem }: { caseItem: CuratedCase }) {
  return (
    <main className="min-h-screen bg-zinc-50">
      <article>
        <header className="border-b border-zinc-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <Link className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-emerald-700" href="/cases">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              返回精选案例
            </Link>
            <div className="mt-7 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                Demo · Unverified
              </span>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-600">
                {caseItem.category}
              </span>
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">{caseItem.title}</h1>
            <p className="mt-5 text-lg leading-8 text-zinc-600">{caseItem.useCase}</p>
            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex gap-3">
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
                <div>
                  <p className="font-bold text-amber-950">当前是未验证的结构示例</p>
                  <p className="mt-1 text-sm leading-6 text-amber-900">{caseItem.curatorNote}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
          <section>
            <p className="text-sm font-bold text-emerald-700">01 · 来源与证据</p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-950">来源信息</h2>
            <dl className="mt-5 grid gap-4 rounded-lg border border-zinc-200 bg-white p-5 sm:grid-cols-2">
              <div><dt className="text-xs font-bold text-zinc-400">平台</dt><dd className="mt-1 font-semibold text-zinc-800">{caseItem.sourcePlatform}</dd></div>
              <div><dt className="text-xs font-bold text-zinc-400">作者</dt><dd className="mt-1 font-semibold text-zinc-800">{caseItem.sourceAuthor ?? "未提供"}</dd></div>
              <div><dt className="text-xs font-bold text-zinc-400">日期</dt><dd className="mt-1 font-semibold text-zinc-800">{caseItem.sourceDate ?? "未提供"}</dd></div>
              <div>
                <dt className="text-xs font-bold text-zinc-400">原始来源</dt>
                <dd className="mt-1 font-semibold text-zinc-800">
                  {caseItem.sourceUrl ? (
                    <a className="inline-flex items-center gap-1 text-emerald-700" href={caseItem.sourceUrl} rel="noreferrer" target="_blank">
                      查看来源 <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : "无公开来源，不能视为真实案例"}
                </dd>
              </div>
            </dl>
            <p className="mt-4 flex gap-2 text-xs leading-6 text-zinc-500">
              <Info className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
              案例页仅展示摘要、结构化分析和可复用模板。接入外部真实案例后，不全文搬运原始内容。
            </p>
          </section>

          <section className="border-t border-zinc-200 pt-9">
            <p className="text-sm font-bold text-rose-700">02 · 真实场景</p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-950">问题背景</h2>
            <p className="mt-4 text-base leading-8 text-zinc-700">{caseItem.problem}</p>
            <div className="mt-5 rounded-lg border border-red-100 bg-red-50 p-5">
              <p className="text-xs font-bold text-red-700">原始 Prompt</p>
              <p className="mt-2 font-mono text-sm leading-7 text-zinc-700">{caseItem.originalPrompt}</p>
            </div>
          </section>

          <section className="border-t border-zinc-200 pt-9">
            <div className="flex items-center gap-2 text-emerald-700">
              <Route className="h-5 w-5" aria-hidden="true" />
              <p className="text-sm font-bold">03 · Workflow</p>
            </div>
            <h2 className="mt-2 text-2xl font-bold text-zinc-950">关键执行步骤</h2>
            <ol className="mt-5 space-y-3">
              {caseItem.workflowSteps.map((step, index) => (
                <li className="flex gap-3 rounded-md border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-700" key={step}>
                  <span className="font-mono text-xs font-bold text-emerald-700">{String(index + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section className="grid gap-5 border-t border-zinc-200 pt-9 md:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 bg-white p-5">
              <FileInput className="h-5 w-5 text-emerald-700" aria-hidden="true" />
              <h2 className="mt-3 font-bold text-zinc-950">输入摘要</h2>
              <p className="mt-2 text-sm leading-7 text-zinc-600">{caseItem.inputSummary}</p>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
              <FileOutput className="h-5 w-5 text-emerald-700" aria-hidden="true" />
              <h2 className="mt-3 font-bold text-zinc-950">输出摘要</h2>
              <p className="mt-2 text-sm leading-7 text-zinc-700">{caseItem.outputSummary}</p>
            </div>
          </section>

          <section className="border-t border-zinc-200 pt-9">
            <p className="text-sm font-bold text-emerald-700">04 · 可复用模板</p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-950">带走并适配自己的任务</h2>
            <pre className="mt-5 whitespace-pre-wrap break-words rounded-lg bg-zinc-950 p-5 font-mono text-sm leading-7 text-zinc-100">
              {caseItem.reusableTemplate}
            </pre>
            <div className="mt-4 max-w-48">
              <CopyButton location={`case-${caseItem.slug}`} text={caseItem.reusableTemplate} />
            </div>
          </section>

          <section className="border-t border-zinc-200 pt-9">
            <p className="text-sm font-bold text-amber-700">05 · 结果边界</p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-950">我们能确认什么？</h2>
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
              {caseItem.resultClaim}
            </p>
            <Link className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-bold text-white hover:bg-emerald-700" href={`/prompts/${caseItem.promptSlug}`}>
              查看配套 Prompt <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>
        </div>
      </article>
    </main>
  );
}
