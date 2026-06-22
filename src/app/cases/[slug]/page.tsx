import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, FlaskConical, ShieldAlert } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { getPromptById } from "@/lib/mock-prompts";

type CasePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "案例不存在", robots: { index: false, follow: false } };
  return { title: study.title, description: study.summary, alternates: { canonical: `/cases/${study.slug}` }, openGraph: { title: study.title, description: study.summary, type: "article", url: `/cases/${study.slug}` } };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const prompt = getPromptById(study.workflowId);
  if (!prompt) notFound();

  return (
    <main className="min-h-screen bg-zinc-50">
      <article>
        <header className="border-b border-zinc-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"><Link className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-emerald-700" href="/cases"><ArrowLeft className="h-4 w-4" aria-hidden="true" />返回案例库</Link><div className="mt-7 flex items-center gap-2 text-emerald-700"><FlaskConical className="h-5 w-5" aria-hidden="true" /><span className="text-sm font-semibold">内部验证案例 · {prompt.category}</span></div><h1 className="mt-3 text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">{study.title}</h1><p className="mt-5 text-lg leading-8 text-zinc-600">{study.summary}</p><p className="mt-6 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">{study.disclosure}</p></div>
        </header>
        <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
          <section><p className="text-sm font-semibold text-rose-700">01 · 问题背景</p><h2 className="mt-2 text-2xl font-bold text-zinc-950">挑战</h2><p className="mt-4 text-base leading-8 text-zinc-700">{study.challenge}</p></section>
          <section className="border-t border-zinc-200 pt-9"><p className="text-sm font-semibold text-emerald-700">02 · 提交给工作流的信息</p><h2 className="mt-2 text-2xl font-bold text-zinc-950">示例输入</h2><p className="mt-4 rounded-lg bg-zinc-950 p-5 font-mono text-sm leading-7 text-zinc-100">{study.input}</p></section>
          <section className="border-t border-zinc-200 pt-9"><p className="text-sm font-semibold text-emerald-700">03 · 执行过程</p><h2 className="mt-2 text-2xl font-bold text-zinc-950">不是一次提问，而是一组验证步骤</h2><ol className="mt-5 space-y-3">{study.process.map((step, index) => <li className="flex gap-3 rounded-md border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-700" key={step}><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-bold text-white">{index + 1}</span>{step}</li>)}</ol></section>
          <section className="border-t border-zinc-200 pt-9"><p className="text-sm font-semibold text-emerald-700">04 · 输出</p><h2 className="mt-2 text-2xl font-bold text-zinc-950">得到的结果</h2><p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-base leading-8 text-zinc-800">{study.output}</p><ul className="mt-5 grid gap-3 sm:grid-cols-2">{study.result.map((item) => <li className="flex gap-2 text-sm leading-7 text-zinc-700" key={item}><CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />{item}</li>)}</ul></section>
          <section className="border-t border-zinc-200 pt-9"><div className="flex items-center gap-2 text-amber-700"><ShieldAlert className="h-5 w-5" aria-hidden="true" /><h2 className="text-2xl font-bold">限制与未验证项</h2></div><ul className="mt-5 space-y-3">{study.limitations.map((item) => <li className="border-l-2 border-amber-400 pl-4 text-sm leading-7 text-zinc-700" key={item}>{item}</li>)}</ul></section>
          <section className="border-t border-zinc-200 pt-9"><p className="text-sm font-semibold text-emerald-700">05 · 可复用经验</p><h2 className="mt-2 text-2xl font-bold text-zinc-950">下次可以直接带走什么</h2><ul className="mt-5 space-y-3">{study.lessons.map((item) => <li className="flex gap-2 text-sm leading-7 text-zinc-700" key={item}><CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />{item}</li>)}</ul><Link className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-emerald-700" href={`/prompts/${prompt.slug}`}>查看并复制完整工作流 <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></section>
        </div>
      </article>
    </main>
  );
}
