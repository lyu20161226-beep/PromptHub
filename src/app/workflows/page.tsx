import type { Metadata } from "next";
import { BadgeCheck, Search } from "lucide-react";
import { WorkflowCard } from "@/components/WorkflowCard";
import { topWorkflowPrompts } from "@/lib/mock-prompts";

export const metadata: Metadata = {
  title: "精选 AI 工作流",
  description: "按问题、步骤、Prompt、示例、常见错误与证据状态组织的精选 AI 工作流。",
  alternates: { canonical: "/workflows" }
};

export default function WorkflowsPage() {
  const sTier = topWorkflowPrompts.filter((prompt) => prompt.workflow?.tier === "S");
  const aTier = topWorkflowPrompts.filter((prompt) => prompt.workflow?.tier === "A");

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            编辑精选 · 证据分级
          </div>
          <h1 className="mt-5 text-4xl font-bold text-zinc-950 sm:text-5xl">精选 AI 工作流</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-600">
            从真实任务出发，提供解决步骤、可复用 Prompt、示例边界和常见错误。未经验证的内容会明确标注。
          </p>
          <form action="/search" className="mt-7 flex max-w-xl items-center gap-3 rounded-md border border-zinc-300 bg-white px-4 focus-within:border-emerald-500">
            <Search className="h-5 w-5 text-zinc-400" aria-hidden="true" />
            <input className="min-h-12 min-w-0 flex-1 bg-transparent text-sm outline-none" name="q" placeholder="搜索工作流或任务" type="search" />
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-emerald-700">S 级 · 重点工作流</p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-950">解决高价值问题</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sTier.map((prompt) => <WorkflowCard key={prompt.id} prompt={prompt} />)}
          </div>
        </div>

        <div className="mt-14 border-t border-zinc-200 pt-12">
          <p className="text-sm font-semibold text-emerald-700">A 级 · 高频实用</p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-950">进入日常工作流</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {aTier.map((prompt) => <WorkflowCard key={prompt.id} prompt={prompt} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
