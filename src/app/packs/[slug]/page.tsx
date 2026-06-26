import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileOutput,
  GitBranch,
  Layers3,
  ShieldCheck,
  Sparkles,
  Star,
  Users
} from "lucide-react";
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
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">{pack.promptIds.length} 个核心 Prompt</span>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">Workflow Pack</span>
              </div>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">{pack.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">{deepDive.goal}</p>
              <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-500">{deepDive.promise}</p>
            </div>

            <aside className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 shadow-sm">
              <p className="text-sm font-semibold text-zinc-500">首发验证价</p>
              <p className="mt-1 text-4xl font-bold text-zinc-950">¥{pack.price}</p>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                当前先收集购买意向，不接真实支付。点击后留下邮箱，用来验证这个 Pack 是否值得继续打磨。
              </p>
              <div className="mt-5">
                <PackInterestButton packSlug={pack.slug} packTitle={pack.title} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          <MetricCard icon={<Clock className="h-5 w-5" />} label="传统方式" value={deepDive.roi.traditional} />
          <MetricCard icon={<Sparkles className="h-5 w-5" />} label="使用 Pack 后" value={deepDive.roi.withPack} />
          <MetricCard icon={<Star className="h-5 w-5" />} label="效率提升" value={deepDive.roi.saved} />
          <MetricCard icon={<Users className="h-5 w-5" />} label="适合人群" value={pack.audience} />
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Before / After</p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-950">用户不是买 Prompt，而是买更好的结果</h2>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-red-100 bg-red-50 p-5">
              <p className="text-sm font-bold text-red-700">Before：普通提问</p>
              <p className="mt-3 text-sm font-semibold text-zinc-500">示例输入：{deepDive.beforeAfter.input}</p>
              <p className="mt-3 text-lg leading-8 text-zinc-800">{deepDive.beforeAfter.before}</p>
            </div>
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
              <p className="text-sm font-bold text-emerald-700">After：使用 Workflow Pack</p>
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
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
            每个 Pack 都不是单条提示词，而是一套从输入到输出的可复制流程。
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {deepDive.fullWorkflow.map((step, index) => (
              <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm" key={step}>
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
            <div className="flex items-center gap-2">
              <Layers3 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-zinc-950">包含的 Prompt 模块</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {deepDive.prompts.map((item) => (
                <div className="rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-800" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <FileOutput className="h-5 w-5 text-emerald-600" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-zinc-950">最终输出模板</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {deepDive.outputTemplate.map((item) => (
                <div className="flex gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-800" key={item}>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="rounded-lg border border-zinc-200 bg-white p-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-zinc-950">常见错误</h2>
            </div>
            <ul className="mt-5 space-y-3">
              {deepDive.mistakes.map((item) => (
                <li className="text-sm leading-6 text-zinc-600" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-zinc-950">使用步骤</h2>
            <ol className="mt-5 space-y-3">
              {deepDive.demoSteps.map((item, index) => (
                <li className="flex gap-3 text-sm leading-6 text-zinc-600" key={item}>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-zinc-950">免费预览</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">先查看前两个 Prompt 页面，确认风格和质量，再决定是否留下购买意向。</p>
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
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Validation CTA</p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-950">想要完整 Pack？</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-700">
              点击按钮留下邮箱。现阶段我们用购买意向来判断优先打磨哪个 Pack，而不是急着接支付。
            </p>
            <div className="mt-5">
              <PackInterestButton packSlug={pack.slug} packTitle={pack.title} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="text-emerald-600">{icon}</div>
      <h2 className="mt-3 font-bold text-zinc-950">{label}</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{value}</p>
    </div>
  );
}
