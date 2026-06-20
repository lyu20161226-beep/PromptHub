import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, Sparkles, Target } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getPromptBySlug, mockPrompts } from "@/lib/mock-prompts";

type PromptDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return mockPrompts.map((prompt) => ({ slug: prompt.slug }));
}

export async function generateMetadata({ params }: PromptDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    return { title: "提示词不存在", robots: { index: false, follow: false } };
  }

  return {
    title: prompt.title,
    description: prompt.description,
    keywords: [prompt.title, `${prompt.platformName}提示词`, prompt.useCase, ...prompt.tags],
    alternates: { canonical: `/prompt/${prompt.slug}` },
    openGraph: {
      title: prompt.title,
      description: prompt.description,
      url: `/prompt/${prompt.slug}`,
      type: "article",
      tags: prompt.tags
    },
    twitter: {
      card: "summary",
      title: prompt.title,
      description: prompt.description
    }
  };
}

export default async function PromptDetailPage({ params }: PromptDetailPageProps) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-zinc-500" aria-label="面包屑导航">
          <Link className="transition hover:text-emerald-700" href="/">
            首页
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <Link className="transition hover:text-emerald-700" href={`/${prompt.platform}`}>
            {prompt.platformName}
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <span className="text-zinc-800">{prompt.title}</span>
        </nav>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <article className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
            <header className="border-b border-zinc-200 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  {prompt.platformName}
                </span>
                <span className="text-sm text-zinc-400">{prompt.id}</span>
              </div>
              <h1 className="mt-5 text-3xl font-bold leading-tight text-zinc-950 sm:text-4xl">{prompt.title}</h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-600">{prompt.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {prompt.tags.map((tag) => (
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-600" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                <h2 className="font-bold text-zinc-950">使用场景</h2>
              </div>
              <p className="mt-3 rounded-md border-l-2 border-emerald-500 bg-emerald-50/60 px-4 py-3 text-sm leading-7 text-zinc-700">
                {prompt.useCase}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-zinc-950">完整提示词</h2>
                  <p className="mt-1 text-sm text-zinc-500">将方括号中的内容替换为你的实际信息后使用。</p>
                </div>
                <div className="w-full sm:w-44">
                  <CopyButton text={prompt.content} />
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                  <span className="text-xs font-semibold uppercase text-emerald-300">Prompt</span>
                  <span className="text-xs text-zinc-500">可直接复制</span>
                </div>
                <pre className="max-h-[34rem] overflow-auto whitespace-pre-wrap break-words p-5 font-mono text-sm leading-7 text-zinc-100 sm:p-6">
                  {prompt.content}
                </pre>
              </div>
            </div>
          </article>

          <aside className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <p className="text-sm font-semibold text-zinc-950">使用这条提示词</p>
            <p className="mt-2 text-sm leading-6 text-zinc-500">复制完整内容，在对应的 AI 平台中粘贴并替换变量。</p>
            <div className="mt-5 grid gap-2">
              <CopyButton text={prompt.content} />
              <FavoriteButton slug={prompt.slug} />
            </div>
            <dl className="mt-6 space-y-4 border-t border-zinc-100 pt-5 text-sm">
              <div>
                <dt className="text-zinc-400">适用平台</dt>
                <dd className="mt-1 font-semibold text-zinc-800">{prompt.platformName}</dd>
              </div>
              <div>
                <dt className="text-zinc-400">提示词编号</dt>
                <dd className="mt-1 font-semibold text-zinc-800">{prompt.id}</dd>
              </div>
            </dl>
            <Link
              className="mt-6 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-zinc-300 px-4 text-sm font-semibold text-zinc-700 transition hover:border-emerald-500 hover:text-emerald-700"
              href={`/${prompt.platform}`}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              返回{prompt.platformName}分类
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
