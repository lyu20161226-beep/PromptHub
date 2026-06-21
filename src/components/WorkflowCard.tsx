import Link from "next/link";
import { ArrowRight, Layers3 } from "lucide-react";
import type { MockPrompt } from "@/lib/mock-prompts";

export function WorkflowCard({ prompt, compact = false }: { prompt: MockPrompt; compact?: boolean }) {
  const workflow = prompt.workflow;
  if (!workflow) return null;

  return (
    <article className={`flex flex-col rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:border-emerald-400 hover:shadow-md ${compact ? "p-5" : "p-6"}`}>
      <div className="flex items-center justify-between gap-3">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${workflow.tier === "S" ? "bg-zinc-950 text-emerald-300" : "bg-emerald-50 text-emerald-800"}`}>
          <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
          {workflow.tier}级工作流
        </span>
        <span className="text-xs font-semibold text-zinc-400">{prompt.category}</span>
      </div>
      <h3 className={`${compact ? "mt-4 text-lg" : "mt-5 text-xl"} font-bold text-zinc-950`}>{prompt.title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{workflow.problem}</p>
      {!compact && (
        <div className="mt-5 flex flex-wrap gap-2">
          {workflow.models.slice(0, 3).map((model) => (
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600" key={model}>{model}</span>
          ))}
        </div>
      )}
      <Link className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700" href={`/prompts/${prompt.slug}`}>
        查看完整工作流
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
