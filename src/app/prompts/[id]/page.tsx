import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight, Layers3, Sparkles, Target } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getPromptBySlug, mockPrompts } from "@/lib/mock-prompts";

type PromptPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return mockPrompts.map((prompt) => ({ id: prompt.slug }));
}

export async function generateMetadata({ params }: PromptPageProps): Promise<Metadata> {
  const { id } = await params;
  const prompt = getPromptBySlug(id);

  if (!prompt) {
    return { title: "提示词不存在", robots: { index: false, follow: false } };
  }

  return {
    title: prompt.title,
    description: prompt.description,
    keywords: [prompt.title, prompt.category, `${prompt.platformName}提示词`, prompt.useCase, ...prompt.tags],
    alternates: { canonical: `/prompts/${prompt.slug}` },
    openGraph: {
      title: prompt.title,
      description: prompt.description,
      url: `/prompts/${prompt.slug}`,
      type: "article",
      tags: [prompt.category, ...prompt.tags]
    }
  };
}

export default async function PromptPage({ params }: PromptPageProps) {
  const { id } = await params;
  const prompt = getPromptBySlug(id);

  if (!prompt) notFound();

  const relatedPrompts = mockPrompts
    .filter((item) => item.id !== prompt.id && item.category === prompt.category)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-zinc-500" aria-label="面包屑导航">
          <Link className="transition hover:text-emerald-700" href="/">首页</Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <Link className="transition hover:text-emerald-700" href="/#prompt-library">{prompt.category}</Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <span className="text-zinc-800">{prompt.title}</span>
        </nav>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <article className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
            <header className="border-b border-zinc-200 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
                  <Layers3 className="h-4 w-4" aria-hidden="true" />
                  {prompt.category}
                </span>
                <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-600">{prompt.platformName}</span>
              </div>
              <h1 className="mt-5 text-3xl font-bold leading-tight text-zinc-950 sm:text-4xl">{prompt.title}</h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-600">{prompt.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {prompt.tags.map((tag) => (
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-600" key={tag}>{tag}</span>
                ))}
              </div>
            </header>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                <h2 className="font-bold text-zinc-950">适用场景</h2>
              </div>
              <p className="mt-3 rounded-md border-l-2 border-emerald-500 bg-emerald-50/60 px-4 py-3 text-sm leading-7 text-zinc-700">{prompt.useCase}</p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-zinc-950">Prompt 正文</h2>
                  <p className="mt-1 text-sm text-zinc-500">替换方括号中的变量，然后粘贴到对应 AI 工具。</p>
                </div>
                <div className="w-full sm:w-44"><CopyButton text={prompt.content} /></div>
              </div>

              <div className="mt-5 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                  <span className="text-xs font-semibold uppercase text-emerald-300">Prompt</span>
                  <span className="text-xs text-zinc-500">{prompt.id}</span>
                </div>
                <pre className="max-h-[34rem] overflow-auto whitespace-pre-wrap break-words p-5 font-mono text-sm leading-7 text-zinc-100 sm:p-6">{prompt.content}</pre>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <section className="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
                  <h2 className="font-bold text-zinc-950">示例输入</h2>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-zinc-700">{prompt.exampleInput}</p>
                </section>
                <section className="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
                  <h2 className="font-bold text-zinc-950">示例输出</h2>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-zinc-700">{prompt.exampleOutput}</p>
                </section>
              </div>

              <section className="mt-8 border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-zinc-950">使用技巧</h2>
                <ol className="mt-4 space-y-3">
                  {prompt.tips.map((tip, index) => (
                    <li className="flex gap-3 text-sm leading-7 text-zinc-700" key={tip}>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">{index + 1}</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </article>

          <aside className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <div className="flex items-center gap-2 text-emerald-700">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <p className="text-sm font-semibold">立即使用</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-500">复制完整内容，根据你的任务替换变量。</p>
            <div className="mt-5 grid gap-2">
              <CopyButton text={prompt.content} />
              <FavoriteButton slug={prompt.slug} />
            </div>
            <dl className="mt-6 space-y-4 border-t border-zinc-100 pt-5 text-sm">
              <div><dt className="text-zinc-400">分类</dt><dd className="mt-1 font-semibold text-zinc-800">{prompt.category}</dd></div>
              <div><dt className="text-zinc-400">适用平台</dt><dd className="mt-1 font-semibold text-zinc-800">{prompt.platformName}</dd></div>
              <div><dt className="text-zinc-400">适用模型</dt><dd className="mt-1 font-semibold leading-6 text-zinc-800">{prompt.models.join(" · ")}</dd></div>
            </dl>
            <Link className="mt-6 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-zinc-300 px-4 text-sm font-semibold text-zinc-700 transition hover:border-emerald-500 hover:text-emerald-700" href="/#prompt-library">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              返回提示词库
            </Link>
          </aside>
        </div>

        {relatedPrompts.length > 0 && (
          <section className="mt-10 border-t border-zinc-200 pt-10">
            <h2 className="text-2xl font-bold text-zinc-950">同类提示词</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {relatedPrompts.map((item) => (
                <Link className="group rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-emerald-400" href={`/prompts/${item.slug}`} key={item.id}>
                  <span className="text-xs font-bold text-emerald-700">{item.category}</span>
                  <h3 className="mt-3 font-bold text-zinc-950 group-hover:text-emerald-800">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">查看详情 <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
