import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CircleHelp,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import type { CuratedCase } from "@/data/case-studies";

const statusConfig = {
  verified: { label: "Verified", className: "bg-emerald-100 text-emerald-800", icon: ShieldCheck },
  "source-linked": { label: "Source-linked", className: "bg-blue-100 text-blue-800", icon: ExternalLink },
  unverified: { label: "Demo · Unverified", className: "bg-amber-100 text-amber-800", icon: ShieldAlert },
} as const;

const recommendationConfig = {
  recommended: { label: "仍然推荐", className: "text-emerald-700" },
  limited: { label: "有限推荐", className: "text-amber-700" },
  pending: { label: "待验证", className: "text-zinc-500" },
  retired: { label: "已停止推荐", className: "text-rose-700" },
} as const;

export function CaseCard({
  caseItem,
  compact = false,
}: {
  caseItem: CuratedCase;
  compact?: boolean;
}) {
  const status = statusConfig[caseItem.verificationStatus];
  const recommendation = recommendationConfig[caseItem.validation.recommendation];
  const StatusIcon = status.icon;

  return (
    <article className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-bold text-zinc-500">
          {caseItem.sourcePlatform} · {caseItem.category}
        </span>
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${status.className}`}>
          <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {status.label}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-bold leading-7 text-zinc-950">{caseItem.title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{caseItem.useCase}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 border-y border-zinc-100 py-4 text-xs">
        <div>
          <p className="flex items-center gap-1 font-bold text-zinc-400">
            <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
            最后审查
          </p>
          <p className="mt-1 font-semibold text-zinc-700">{caseItem.validation.lastReviewedAt}</p>
        </div>
        <div>
          <p className="flex items-center gap-1 font-bold text-zinc-400">
            <CircleHelp className="h-3.5 w-3.5" aria-hidden="true" />
            当前结论
          </p>
          <p className={`mt-1 font-bold ${recommendation.className}`}>{recommendation.label}</p>
        </div>
      </div>

      {!compact ? (
        <div className="mt-4 rounded-md border border-zinc-200 bg-zinc-50 p-3">
          <p className="text-xs font-bold text-zinc-500">结果边界</p>
          <p className="mt-1 text-sm leading-6 text-zinc-700">{caseItem.resultClaim}</p>
        </div>
      ) : null}

      <div className="mt-auto pt-5">
        <Link
          className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-900"
          href={`/cases/${caseItem.slug}`}
        >
          查看验证与决策记录
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
