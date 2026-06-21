import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Check, Code2, TrendingUp } from "lucide-react";
import type { WorkflowPack } from "@/data/workflow-packs";

const icons = {
  code: Code2,
  growth: TrendingUp,
  career: BriefcaseBusiness
};

export function PackCard({ pack, compact = false }: { pack: WorkflowPack; compact?: boolean }) {
  const Icon = icons[pack.icon];

  return (
    <article className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-400 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-950 text-emerald-300"><Icon className="h-5 w-5" aria-hidden="true" /></span>
        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">支付尚未开放</span>
      </div>
      <p className="mt-5 text-xs font-semibold text-emerald-700">{pack.audience}</p>
      <h3 className="mt-2 text-xl font-bold text-zinc-950">{pack.title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{pack.description}</p>
      {!compact && <ul className="mt-5 space-y-2 border-t border-zinc-100 pt-5">{pack.includes.map((item) => <li className="flex gap-2 text-sm text-zinc-700" key={item}><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />{item}</li>)}</ul>}
      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        <div><span className="text-xs text-zinc-400">计划一次性价格</span><p className="mt-0.5 text-2xl font-bold text-zinc-950">¥{pack.price}</p></div>
        <Link className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white hover:bg-emerald-700" href={`/packs#${pack.slug}`}>免费预览 <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
