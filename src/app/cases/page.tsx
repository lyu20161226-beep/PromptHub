import type { Metadata } from "next";
import { FlaskConical, ShieldCheck } from "lucide-react";
import { CaseCard } from "@/components/CaseCard";
import { caseStudies } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "精选 AI Workflow 案例",
  description:
    "少量精选、来源清楚、结构统一、可以复用的 AI Workflow 案例。未验证内容会明确标记，不包装成真实成功故事。",
  alternates: { canonical: "/cases" },
};

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-700">
            <FlaskConical className="h-5 w-5" aria-hidden="true" />
            Curated Workflow Cases
          </div>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-zinc-950 sm:text-6xl">
            每个案例都能看懂、能复用、能跑通
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">
            不追求海量。我们只保留来源边界清楚、执行步骤完整、能够提炼可复用模板的案例。
          </p>
          <div className="mt-6 inline-flex max-w-3xl gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            当前 6 条均为结构演示，统一标记为 Demo · Unverified。后续真实案例必须带来源链接，并由人工审核后发布。
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {caseStudies.map((caseItem) => (
            <CaseCard caseItem={caseItem} key={caseItem.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
