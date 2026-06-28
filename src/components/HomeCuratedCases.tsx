import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CaseCard } from "@/components/CaseCard";
import { caseStudies } from "@/data/case-studies";

export function HomeCuratedCases() {
  return (
    <section className="border-b border-zinc-200 bg-zinc-50 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-emerald-700">Curated Workflow Cases</p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-950">精选 AI Workflow 案例</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
              每个案例都按问题、步骤、输入、输出和可复用模板整理。当前 6 个案例为结构演示，
              均明确标记为未验证，不代表真实用户结果。
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-900"
            href="/cases"
          >
            浏览全部案例
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.slice(0, 6).map((caseItem) => (
            <CaseCard caseItem={caseItem} compact key={caseItem.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
