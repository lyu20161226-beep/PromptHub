"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { FavoriteButton } from "@/components/FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";
import type { MockPrompt } from "@/lib/mock-prompts";

export function FavoritesPageClient({ prompts }: { prompts: MockPrompt[] }) {
  const { favorites } = useFavorites();
  const favoritePrompts = favorites
    .map((slug) => prompts.find((prompt) => prompt.slug === slug))
    .filter((prompt): prompt is MockPrompt => Boolean(prompt));

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-rose-50 text-rose-700">
            <Heart className="h-5 w-5 fill-current" aria-hidden="true" />
          </div>
          <h1 className="mt-5 text-4xl font-bold text-zinc-950 sm:text-5xl">我的收藏</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">保存在当前浏览器中的常用提示词，无需登录即可使用。</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {favoritePrompts.length > 0 ? (
          <>
            <p className="border-b border-zinc-200 pb-5 text-sm text-zinc-500">
              共收藏 <strong className="text-zinc-950">{favoritePrompts.length}</strong> 条提示词
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoritePrompts.map((prompt) => (
                <article className="flex min-h-80 flex-col rounded-lg border border-zinc-200 bg-white p-5 shadow-sm" key={prompt.slug}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">{prompt.platformName}</span>
                    <div className="shrink-0">
                      <FavoriteButton compact slug={prompt.slug} />
                    </div>
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-zinc-950">{prompt.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{prompt.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {prompt.tags.map((tag) => (
                      <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-6">
                    <CopyButton text={prompt.content} />
                    <Link
                      aria-label={`查看${prompt.title}详情`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 text-zinc-700 transition hover:border-emerald-500 hover:text-emerald-700"
                      href={prompt.workflow ? `/workflows/${prompt.slug}` : `/prompts/${prompt.slug}`}
                      title="查看详情"
                    >
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-white px-6 text-center">
            <Heart className="h-9 w-9 text-zinc-300" aria-hidden="true" />
            <h2 className="mt-5 text-xl font-bold text-zinc-950">你还没有收藏任何提示词</h2>
            <p className="mt-2 text-sm text-zinc-500">浏览提示词并点击收藏按钮，常用内容会出现在这里。</p>
            <Link className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-emerald-700" href="/search">
              浏览提示词
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
