import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import { getPromptById } from "@/lib/mock-prompts";

export const metadata: Metadata = {
  title: "AI 工作流验证案例",
  description: "查看 PromptHub 工作流的完整验证过程：真实问题结构、示例输入、执行方法、输出、限制与可复用经验。",
  alternates: { canonical: "/cases" }
};

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex items-center gap-2 text-emerald-700"><FlaskConical className="h-5 w-5" aria-hidden="true" /><p className="text-sm font-semibold">验证案例库</p></div>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">案例比 Prompt 更重要</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">这里公开工作流如何处理输入、得到什么输出、还存在哪些限制。当前案例来自 PromptHub 内部验证，不包装成客户成功故事。</p>
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {caseStudies.map((study) => {
            const prompt = getPromptById(study.workflowId);
            return <article className="flex flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm" key={study.slug}><div className="flex items-center justify-between gap-3"><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">内部验证案例</span><span className="text-xs font-semibold text-zinc-400">{prompt?.category}</span></div><h2 className="mt-5 text-2xl font-bold text-zinc-950">{study.title}</h2><p className="mt-3 text-sm leading-7 text-zinc-600">{study.summary}</p><p className="mt-5 border-l-2 border-zinc-300 pl-3 text-xs leading-6 text-zinc-500">{study.disclosure}</p><Link className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-emerald-700" href={`/cases/${study.slug}`}>阅读完整案例 <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></article>;
          })}
        </div>
      </section>
    </main>
  );
}
