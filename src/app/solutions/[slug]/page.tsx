import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, FileText, Layers3, Users } from "lucide-react";
import { getSolution, solutions } from "@/data/solutions";

type SolutionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: SolutionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    return {
      title: "Solution Not Found - PromptHub"
    };
  }

  return {
    title: `${solution.subtitle} - PromptHub Solution Hub`,
    description: solution.description
  };
}

export default async function SolutionDetailPage({ params }: SolutionDetailPageProps) {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    notFound();
  }

  return (
    <main className="bg-zinc-50 text-zinc-950">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800" href="/solutions">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            返回 Solution Hub
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">{solution.category}</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">{solution.subtitle}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">{solution.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {solution.audience.map((item) => (
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-semibold text-zinc-700" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <aside className="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm font-bold text-zinc-950">最终结果</p>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{solution.outcome}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-md bg-white p-3">
                  <p className="text-xs text-zinc-500">Prompt</p>
                  <p className="mt-1 text-xl font-bold">{solution.promptCount}</p>
                </div>
                <div className="rounded-md bg-white p-3">
                  <p className="text-xs text-zinc-500">Difficulty</p>
                  <p className="mt-1 text-xl font-bold">{solution.difficulty}</p>
                </div>
              </div>
              <Link className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-bold text-white hover:bg-emerald-700" href={`/packs/${solution.recommendedPackSlug}`}>
                获取推荐 Pack
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="space-y-6">
            <section className="rounded-lg border border-zinc-200 bg-white p-5 sm:p-7">
              <div className="flex items-center gap-2">
                <Layers3 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <h2 className="text-2xl font-bold">Workflow 步骤</h2>
              </div>
              <div className="mt-6 space-y-4">
                {solution.steps.map((step, index) => (
                  <article className="rounded-lg border border-zinc-200 bg-zinc-50 p-4" key={step.title}>
                    <div className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-sm font-bold text-emerald-800">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-bold">{step.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-zinc-600">{step.description}</p>
                        <Link className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-800" href={`/prompts/${step.promptId}`}>
                          查看推荐 Prompt
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-zinc-200 bg-white p-5 sm:p-7">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <h2 className="text-2xl font-bold">推荐 Prompt</h2>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {solution.recommendedPromptIds.map((promptId) => (
                  <Link className="rounded-md border border-zinc-200 bg-zinc-50 p-4 hover:border-emerald-300 hover:bg-emerald-50" href={`/prompts/${promptId}`} key={promptId}>
                    <p className="text-sm font-bold text-zinc-950">{promptId}</p>
                    <p className="mt-1 text-xs text-zinc-500">点击查看或运行这个 Prompt</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-lg border border-zinc-200 bg-white p-5">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <h2 className="font-bold">适合人群</h2>
              </div>
              <ul className="mt-4 space-y-2">
                {solution.audience.map((item) => (
                  <li className="flex gap-2 text-sm text-zinc-600" key={item}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-lg border border-zinc-200 bg-white p-5">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <h2 className="font-bold">输出模板</h2>
              </div>
              <ul className="mt-4 space-y-2">
                {solution.outputTemplates.map((item) => (
                  <li className="rounded-md bg-zinc-50 px-3 py-2 text-sm font-semibold text-zinc-700" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-sm font-bold text-emerald-800">推荐 Pack</p>
              <h2 className="mt-2 text-xl font-bold">{solution.recommendedPackTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">把这个解决方案里的 Prompt、案例和模板打包成可复用资产。</p>
              <Link className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-bold text-white hover:bg-emerald-700" href={`/packs/${solution.recommendedPackSlug}`}>
                {solution.cta}
              </Link>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
