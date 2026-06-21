import Link from "next/link";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Code2, Search, Sparkles, Zap } from "lucide-react";
import { WorkflowCard } from "@/components/WorkflowCard";
import { topWorkflowPrompts } from "@/lib/mock-prompts";

const byId = (id: string) => topWorkflowPrompts.find((prompt) => prompt.id === id)!;

const sections = [
  {
    title: "赚钱与增长",
    description: "围绕流量、转化、竞争和职业机会解决真实商业问题。",
    icon: BriefcaseBusiness,
    prompts: [byId("chatgpt-003"), byId("marketing-002"), byId("chatgpt-005"), byId("chatgpt-009"), byId("marketing-001")]
  },
  {
    title: "开发与质量",
    description: "从问题定位到测试与重构，让AI进入可靠的工程流程。",
    icon: Code2,
    prompts: [byId("coding-002"), byId("coding-004"), byId("coding-005")]
  },
  {
    title: "办公与服务",
    description: "减少信息整理和沟通成本，把讨论转化为清晰行动。",
    icon: Zap,
    prompts: [byId("chatgpt-010"), byId("chatgpt-004")]
  }
];

export default function HomePage() {
  const sTier = topWorkflowPrompts.filter((prompt) => prompt.workflow?.tier === "S");

  return (
    <main>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              10个经过真实输出测试的工作流
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">从问题到结果的 AI 工作流库</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">每个工作流包含适用问题、解决步骤、Prompt、实测案例、常见错误和优化技巧。</p>
            <form action="/search" className="mt-8 flex max-w-2xl items-center gap-3 rounded-lg border border-zinc-300 bg-white p-2 pl-4 shadow-sm focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100">
              <Search className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden="true" />
              <input className="min-h-11 min-w-0 flex-1 bg-transparent text-sm text-zinc-950 outline-none" name="q" placeholder="搜索问题，例如：程序报错、SEO、简历" type="search" />
              <button className="min-h-10 rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-emerald-700" type="submit">搜索</button>
            </form>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">本站精选 · S级</p>
              <h2 className="mt-2 text-3xl font-bold text-zinc-950">先解决最值钱的问题</h2>
            </div>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700" href="/workflows">查看Top10合集 <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sTier.map((prompt) => <WorkflowCard key={prompt.id} prompt={prompt} />)}
          </div>
        </div>
      </section>

      {sections.map((section, index) => {
        const Icon = section.icon;
        return (
          <section className={`py-12 sm:py-16 ${index % 2 ? "bg-zinc-50" : "bg-white"}`} key={section.title}>
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-zinc-950 text-emerald-300"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <div><h2 className="text-2xl font-bold text-zinc-950">{section.title}</h2><p className="mt-2 text-sm leading-6 text-zinc-600">{section.description}</p></div>
              </div>
              <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {section.prompts.map((prompt) => <WorkflowCard compact key={prompt.id} prompt={prompt} />)}
              </div>
            </div>
          </section>
        );
      })}

      <section className="border-t border-zinc-200 bg-zinc-950 py-12 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div><div className="flex items-center gap-2 text-emerald-300"><Sparkles className="h-4 w-4" aria-hidden="true" /><span className="text-sm font-semibold">PromptHub V2</span></div><h2 className="mt-2 text-2xl font-bold">从一个高价值工作流开始</h2></div>
          <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-emerald-400 px-5 text-sm font-bold text-zinc-950 hover:bg-emerald-300" href="/workflows">浏览Top10工作流 <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
