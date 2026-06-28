import Link from "next/link";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ExternalLink,
  FileInput,
  FileOutput,
  FlaskConical,
  GitCommitHorizontal,
  Info,
  Lightbulb,
  OctagonX,
  Route,
  ShieldAlert,
} from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import type { CuratedCase } from "@/data/case-studies";

const statusLabels = {
  verified: "Verified",
  "source-linked": "Source-linked",
  unverified: "Demo · Unverified",
} as const;

const reproducibilityLabels = {
  high: "高",
  medium: "中",
  low: "低",
  "not-tested": "未测试",
} as const;

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
                {statusLabels[caseItem.verificationStatus]}
              </span>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-600">{caseItem.category}</span>
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">{caseItem.title}</h1>
            <p className="mt-5 text-lg leading-8 text-zinc-600">{caseItem.useCase}</p>
            {caseItem.verificationStatus === "unverified" ? (
              <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex gap-3">
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-amber-950">当前是未验证的结构演示</p>
                    <p className="mt-1 text-sm leading-6 text-amber-900">{caseItem.curatorNote}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </header>

        <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
          <section>
            <SectionLabel index="01" label="Evidence" />
            <h2 className="mt-2 text-2xl font-bold text-zinc-950">来源与证据</h2>
            <dl className="mt-5 grid gap-4 rounded-lg border border-zinc-200 bg-white p-5 sm:grid-cols-2">
              <Fact label="来源平台" value={caseItem.sourcePlatform} />
              <Fact label="作者" value={caseItem.sourceAuthor ?? "未提供"} />
              <Fact label="来源日期" value={caseItem.sourceDate ?? "未提供"} />
              <Fact label="测试日期" value={caseItem.evidence.testedAt ?? "尚未测试"} />
              <Fact label="复现程度" value={reproducibilityLabels[caseItem.evidence.reproducibility]} />
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
            <p className="mt-4 rounded-md border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-700">
              {caseItem.evidence.summary}
            </p>
            <p className="mt-4 flex gap-2 text-xs leading-6 text-zinc-500">
              <Info className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
              仅展示必要摘要、结构化分析和来源链接，不全文搬运外部内容。
            </p>
          </section>

          <section className="border-t border-zinc-200 pt-9">
            <div className="flex items-center gap-2 text-emerald-700">
              <Lightbulb className="h-5 w-5" aria-hidden="true" />
              <SectionLabel index="02" label="Decision Brief" />
            </div>
            <h2 className="mt-2 text-2xl font-bold text-zinc-950">先判断该不该用</h2>
            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              <DecisionList
                className="border-emerald-200 bg-emerald-50"
                items={caseItem.decision.recommendedWhen}
                title="推荐使用"
                titleClassName="text-emerald-800"
              />
              <DecisionList
                className="border-rose-200 bg-rose-50"
                items={caseItem.decision.avoidWhen}
                title="不建议使用"
                titleClassName="text-rose-800"
              />
              <DecisionList
                className="border-zinc-200 bg-white"
                items={caseItem.decision.alternatives}
                title="替代方案"
                titleClassName="text-zinc-800"
              />
            </div>
          </section>

          <section className="border-t border-zinc-200 pt-9">
            <SectionLabel index="03" label="Problem" />
            <h2 className="mt-2 text-2xl font-bold text-zinc-950">问题与原始提问</h2>
            <p className="mt-4 text-base leading-8 text-zinc-700">{caseItem.problem}</p>
            <div className="mt-5 rounded-lg border border-red-100 bg-red-50 p-5">
              <p className="text-xs font-bold text-red-700">原始 Prompt</p>
              <p className="mt-2 font-mono text-sm leading-7 text-zinc-700">{caseItem.originalPrompt}</p>
            </div>
          </section>

          <section className="border-t border-zinc-200 pt-9">
            <div className="flex items-center gap-2 text-emerald-700">
              <BrainCircuit className="h-5 w-5" aria-hidden="true" />
              <SectionLabel index="04" label="Why It Works" />
            </div>
            <h2 className="mt-2 text-2xl font-bold text-zinc-950">为什么这样设计</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {caseItem.whyItWorks.map((item) => (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5" key={item.principle}>
                  <h3 className="font-bold text-zinc-950">{item.principle}</h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-700">{item.explanation}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-zinc-200 pt-9">
            <div className="flex items-center gap-2 text-emerald-700">
              <Route className="h-5 w-5" aria-hidden="true" />
              <SectionLabel index="05" label="Workflow" />
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
            <SummaryCard icon={<FileInput className="h-5 w-5" />} title="输入摘要" text={caseItem.inputSummary} />
            <SummaryCard icon={<FileOutput className="h-5 w-5" />} title="输出摘要" text={caseItem.outputSummary} accent />
          </section>

          <section className="border-t border-zinc-200 pt-9">
            <div className="flex items-center gap-2 text-rose-700">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              <SectionLabel index="06" label="Failure Cases" />
            </div>
            <h2 className="mt-2 text-2xl font-bold text-zinc-950">什么时候会失败</h2>
            <div className="mt-5 space-y-4">
              {caseItem.failureCases.map((failure) => (
                <div className="rounded-lg border border-rose-200 bg-white p-5" key={failure.symptom}>
                  <h3 className="font-bold text-zinc-950">{failure.symptom}</h3>
                  <dl className="mt-3 grid gap-3 text-sm leading-6 sm:grid-cols-2">
                    <div><dt className="font-bold text-rose-700">原因</dt><dd className="mt-1 text-zinc-600">{failure.cause}</dd></div>
                    <div><dt className="font-bold text-emerald-700">修正</dt><dd className="mt-1 text-zinc-600">{failure.fix}</dd></div>
                  </dl>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-zinc-200 pt-9">
            <div className="flex items-center gap-2 text-emerald-700">
              <FlaskConical className="h-5 w-5" aria-hidden="true" />
              <SectionLabel index="07" label="Model Comparison" />
            </div>
            <h2 className="mt-2 text-2xl font-bold text-zinc-950">模型测试状态</h2>
            <div className="mt-5 overflow-hidden rounded-lg border border-zinc-200 bg-white">
              <div className="grid grid-cols-[0.8fr_0.8fr_1.4fr] gap-3 border-b border-zinc-200 bg-zinc-100 px-4 py-3 text-xs font-bold text-zinc-500">
                <span>模型</span><span>状态 / 评分</span><span>结论</span>
              </div>
              {caseItem.modelComparison.map((item) => (
                <div className="grid grid-cols-[0.8fr_0.8fr_1.4fr] gap-3 border-b border-zinc-100 px-4 py-4 text-sm last:border-0" key={item.model}>
                  <span className="font-bold text-zinc-950">{item.model}</span>
                  <span className="text-zinc-600">{item.status === "tested" ? `${item.score ?? "-"} / 5` : "未测试"}</span>
                  <span className="leading-6 text-zinc-600">{item.note}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-zinc-200 pt-9">
            <SectionLabel index="08" label="Reusable Template" />
            <h2 className="mt-2 text-2xl font-bold text-zinc-950">带走并适配自己的任务</h2>
            <pre className="mt-5 whitespace-pre-wrap break-words rounded-lg bg-zinc-950 p-5 font-mono text-sm leading-7 text-zinc-100">
              {caseItem.reusableTemplate}
            </pre>
            <div className="mt-4 max-w-48">
              <CopyButton location={`case-${caseItem.slug}`} text={caseItem.reusableTemplate} />
            </div>
          </section>

          <section className="border-t border-zinc-200 pt-9">
            <div className="flex items-center gap-2 text-emerald-700">
              <GitCommitHorizontal className="h-5 w-5" aria-hidden="true" />
              <SectionLabel index="09" label="Evolution" />
            </div>
            <h2 className="mt-2 text-2xl font-bold text-zinc-950">版本如何演化</h2>
            <div className="mt-5 space-y-3">
              {caseItem.evolution.map((version) => (
                <div className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-5 sm:grid-cols-[7rem_7rem_1fr]" key={version.version}>
                  <div>
                    <p className="font-mono text-sm font-bold text-zinc-950">{version.version}</p>
                    <span className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-bold ${version.status === "current" ? "bg-emerald-100 text-emerald-800" : "bg-zinc-200 text-zinc-600"}`}>
                      {version.status === "current" ? "当前版本" : "已弃用"}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-zinc-500">{version.date}</p>
                  <p className="text-sm leading-7 text-zinc-700">{version.changes}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-zinc-200 pt-9">
            <SectionLabel index="10" label="Result Boundary" />
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

function SectionLabel({ index, label }: { index: string; label: string }) {
  return <p className="text-sm font-bold text-emerald-700">{index} · {label}</p>;
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-xs font-bold text-zinc-400">{label}</dt><dd className="mt-1 font-semibold text-zinc-800">{value}</dd></div>;
}

function DecisionList({
  title,
  items,
  className,
  titleClassName,
}: {
  title: string;
  items: readonly string[];
  className: string;
  titleClassName: string;
}) {
  const Icon = title === "不建议使用" ? OctagonX : CheckCircle2;

  return (
    <div className={`rounded-lg border p-5 ${className}`}>
      <h3 className={`font-bold ${titleClassName}`}>{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li className="flex gap-2 text-sm leading-6 text-zinc-700" key={item}>
            <Icon className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SummaryCard({ icon, title, text, accent = false }: { icon: ReactNode; title: string; text: string; accent?: boolean }) {
  return (
    <div className={`rounded-lg border p-5 ${accent ? "border-emerald-200 bg-emerald-50" : "border-zinc-200 bg-white"}`}>
      <div className="text-emerald-700">{icon}</div>
      <h2 className="mt-3 font-bold text-zinc-950">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-zinc-600">{text}</p>
    </div>
  );
}
