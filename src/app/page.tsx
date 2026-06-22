import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarDays, FlaskConical, Search, Sparkles } from "lucide-react";
import { PackCard } from "@/components/PackCard";
import { WorkflowCard } from "@/components/WorkflowCard";
import { caseStudies } from "@/data/case-studies";
import { workflowPacks } from "@/data/workflow-packs";
import { latestWeeklyIssue } from "@/data/workflow-weekly";
import { topWorkflowPrompts } from "@/lib/mock-prompts";

const byId = (id: string) => topWorkflowPrompts.find((prompt) => prompt.id === id)!;

const coreTop5 = [byId("coding-002"), byId("chatgpt-003"), byId("marketing-002"), byId("chatgpt-009"), byId("chatgpt-005")];
const secondaryTop5 = [byId("coding-004"), byId("chatgpt-010"), byId("coding-005"), byId("marketing-001"), byId("chatgpt-004")];

export default function HomePage() {
  const weeklyPrompts = latestWeeklyIssue.workflowIds.map(byId);

  return (
    <main>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              10个经过真实输出测试的工作流
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">解决真实工作的 AI 工作流库</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">从编程、营销、求职到商业分析，提供可复制 Prompt、实测案例和完整方法，帮助你更快获得可用结果。</p>
            <form action="/search" className="mt-8 flex max-w-2xl items-center gap-3 rounded-lg border border-zinc-300 bg-white p-2 pl-4 shadow-sm focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100">
              <Search className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden="true" />
              <input className="min-h-11 min-w-0 flex-1 bg-transparent text-sm text-zinc-950 outline-none" name="q" placeholder="搜索问题，例如：程序报错、SEO、简历" type="search" />
              <button className="min-h-10 rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-emerald-700" type="submit">搜索</button>
            </form>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-950 py-10 text-white sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><div className="flex items-center gap-2 text-emerald-300"><CalendarDays className="h-4 w-4" aria-hidden="true" /><p className="text-sm font-semibold">Workflow Weekly · 第 {latestWeeklyIssue.issue} 期</p></div><h2 className="mt-2 text-2xl font-bold">{latestWeeklyIssue.title}</h2></div><Link className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300" href="/weekly">阅读本期 <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">{weeklyPrompts.map((prompt, index) => <Link className="flex items-center justify-between gap-3 rounded-md border border-zinc-700 px-4 py-4 text-sm font-semibold text-white hover:border-emerald-400 hover:text-emerald-300" href={`/prompts/${prompt.slug}`} key={prompt.id}><span><span className="mr-2 text-emerald-300">0{index + 1}</span>{prompt.title}</span><ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>)}</div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">核心 Top5</p>
              <h2 className="mt-2 text-3xl font-bold text-zinc-950">用户会为真正解决问题的工作流回来</h2>
            </div>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700" href="/workflows">查看Top10合集 <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {coreTop5.map((prompt) => <WorkflowCard key={prompt.id} prompt={prompt} />)}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="max-w-2xl"><p className="text-sm font-semibold text-emerald-700">高频辅助工具</p><h2 className="mt-2 text-3xl font-bold text-zinc-950">第二梯队工作流</h2><p className="mt-3 text-sm leading-7 text-zinc-600">用于测试、会议、重构、活动规划和客户沟通。它们高频实用，但不抢占核心问题的位置。</p></div><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{secondaryTop5.map((prompt) => <WorkflowCard compact key={prompt.id} prompt={prompt} />)}</div></div>
      </section>

      <section className="border-b border-zinc-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div className="max-w-2xl"><div className="flex items-center gap-2 text-emerald-700"><FlaskConical className="h-5 w-5" aria-hidden="true" /><p className="text-sm font-semibold">验证案例库</p></div><h2 className="mt-2 text-3xl font-bold text-zinc-950">公开结果，也公开限制</h2><p className="mt-3 text-sm leading-7 text-zinc-600">案例展示输入、过程、输出和未验证项，不把内部测试包装成客户成功故事。</p></div><Link className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700" href="/cases">查看全部案例 <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div><div className="mt-7 grid gap-4 md:grid-cols-3">{caseStudies.map((study) => <Link className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 transition hover:border-emerald-400 hover:bg-white" href={`/cases/${study.slug}`} key={study.slug}><span className="text-xs font-bold text-amber-700">内部验证案例</span><h3 className="mt-3 text-lg font-bold text-zinc-950">{study.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-600">{study.summary}</p></Link>)}</div></div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl"><p className="text-sm font-semibold text-emerald-700">按场景成套使用</p><h2 className="mt-2 text-3xl font-bold text-zinc-950">Prompt 只是起点，完整交付才有价值</h2><p className="mt-3 text-sm leading-7 text-zinc-600">每个包包含工作流、实测案例、使用说明、错误清单和输出模板。当前免费预览，后续计划采用一次性购买。</p></div>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700" href="/packs">查看全部工作流包 <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">{workflowPacks.map((pack) => <PackCard compact key={pack.slug} pack={pack} />)}</div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-950 py-12 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div><div className="flex items-center gap-2 text-emerald-300"><Sparkles className="h-4 w-4" aria-hidden="true" /><span className="text-sm font-semibold">PromptHub V2</span></div><h2 className="mt-2 text-2xl font-bold">从一个高价值工作流开始</h2></div>
          <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-emerald-400 px-5 text-sm font-bold text-zinc-950 hover:bg-emerald-300" href="/workflows">浏览Top10工作流 <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
