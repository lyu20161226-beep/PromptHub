import type { Metadata } from "next";
import { BadgeCheck, Search } from "lucide-react";
import { WorkflowCard } from "@/components/WorkflowCard";
import { topWorkflowPrompts } from "@/lib/mock-prompts";

export const metadata: Metadata = {
  title: "Top10 AI 工作流",
  description: "经过真实输出测试的10个AI工作流，包含问题、解决步骤、Prompt、案例、常见错误和优化技巧。",
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
            单模型实测精选
          </div>
          <h1 className="mt-5 text-4xl font-bold text-zinc-950 sm:text-5xl">Top10 AI 工作流</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-600">从真实问题出发，提供解决步骤、可复制Prompt、案例输出和优化方法，而不只是一个模板。</p>
          <form action="/search" className="mt-7 flex max-w-xl items-center gap-3 rounded-md border border-zinc-300 bg-white px-4 focus-within:border-emerald-500">
            <Search className="h-5 w-5 text-zinc-400" aria-hidden="true" />
            <input className="min-h-12 min-w-0 flex-1 bg-transparent text-sm outline-none" name="q" placeholder="搜索全部 Prompt" type="search" />
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-emerald-700">S级 · 最高优先级</p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-950">解决高价值问题</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sTier.map((prompt) => <WorkflowCard key={prompt.id} prompt={prompt} />)}
          </div>
        </div>

        <div className="mt-14 border-t border-zinc-200 pt-12">
          <p className="text-sm font-semibold text-emerald-700">A级 · 高频实用</p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-950">进入日常工作流</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {aTier.map((prompt) => <WorkflowCard key={prompt.id} prompt={prompt} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
