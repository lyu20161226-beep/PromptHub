import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, FileOutput, GitBranch, Star } from "lucide-react";
import { PackInterestButton } from "@/components/PackInterestButton";
import { packDeepDives } from "@/data/pack-deep-dives";
import { workflowPacks } from "@/data/workflow-packs";
import { getPromptById } from "@/lib/mock-prompts";

const enabledPackSlugs = ["xiaohongshu-growth", "indie-product-research", "cross-border-commerce"] as const;

type PackPageProps = {
  params: Promise<{ slug: string }>;
};

function getPack(slug: string) {
  if (!enabledPackSlugs.includes(slug as (typeof enabledPackSlugs)[number])) return undefined;
  const pack = workflowPacks.find((item) => item.slug === slug);
  const deepDive = packDeepDives[slug];
  if (!pack || !deepDive) return undefined;
  return { pack, deepDive };
}

export function generateStaticParams() {
  return enabledPackSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PackPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getPack(slug);

  if (!data) {
    return { title: "Workflow Pack - PromptHub" };
  }

  return {
    title: `${data.pack.title} - PromptHub`,
    description: data.deepDive.goal,
    alternates: { canonical: `/packs/${slug}` }
  };
}

export default async function PackDetailPage({ params }: PackPageProps) {
  const { slug } = await params;
  const data = getPack(slug);

  if (!data) notFound();

  const { pack, deepDive } = data;
  const prompts = pack.promptIds.map(getPromptById).filter(Boolean);

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-emerald-700" href="/packs">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            返回 Packs
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">{pack.audience}</span>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">{pack.promptIds.length} 个工作流</span>
              </div>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">{pack.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">{deepDive.goal}</p>
            </div>
            <aside className="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm font-semibold text-zinc-500">计划首发价格</p>
              <p className="mt-1 text-4xl font-bold text-zinc-950">¥{pack.price}</p>
              <p className="mt-3 text-sm leading-6 text-zinc-600">当前不接支付，先收集购买意向。点击按钮留下邮箱，记录为一次有效验证。</p>
              <div className="mt-5">
                <PackInterestButton packSlug={pack.slug} packTitle={pack.title} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <Clock className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <h2 className="mt-3 font-bold text-zinc-950">ROI</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{deepDive.roi.saved}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{deepDive.roi.weeklyValue}</p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <Star className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <h2 className="mt-3 font-bold text-zinc-950">适合谁</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{pack.audience}</p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <FileOutput className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <h2 className="mt-3 font-bold text-zinc-950">输出资产</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{deepDive.outputTemplate.slice(0, 3).join(" / ")}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-red-100 bg-red-50 p-5">
              <p className="text-sm font-bold text-red-700">Before</p>
              <p className="mt-3 text-sm font-semibold text-zinc-500">示例输入：{deepDive.beforeAfter.input}</p>
              <p className="mt-3 text-lg leading-8 text-zinc-800">{deepDive.beforeAfter.before}</p>
            </div>
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
              <p className="text-sm font-bold text-emerald-700">After</p>
              <ul className="mt-3 space-y-3">
                {deepDive.beforeAfter.after.map((item) => (
                  <li className="flex gap-2 text-sm leading-6 text-zinc-700" key={item}>
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-zinc-950">Workflow 步骤图</h2>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {deepDive.fullWorkflow.map((step, index) => (
              <div className="rounded-lg border border-zinc-200 bg-white p-4" key={step}>
                <p className="text-xs font-bold text-emerald-700">Step {index + 1}</p>
                <p className="mt-2 font-semibold text-zinc-900">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-zinc-950">Prompt 列表</h2>
            <div className="mt-5 grid gap-3">
              {deepDive.prompts.map((item) => (
                <div className="rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-800" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-zinc-950">免费预览内容</h2>
            <div className="mt-5 space-y-3">
              {prompts.slice(0, 2).map(
                (prompt) =>
                  prompt && (
                    <Link
                      className="flex items-center justify-between gap-3 rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-800 hover:border-emerald-400 hover:text-emerald-800"
                      href={`/prompts/${prompt.slug}`}
                      key={prompt.id}
                    >
                      <span>{prompt.title}</span>
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  )
              )}
            </div>
            <div className="mt-6">
              <PackInterestButton packSlug={pack.slug} packTitle={pack.title} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
