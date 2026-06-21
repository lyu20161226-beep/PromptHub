"use client";

import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { FavoriteButton } from "@/components/FavoriteButton";
import type { MockPrompt } from "@/lib/mock-prompts";

type SearchPageClientProps = {
  initialQuery: string;
  prompts: MockPrompt[];
};

export function SearchPageClient({ initialQuery, prompts }: SearchPageClientProps) {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return prompts;

    return prompts.filter((prompt) =>
      [prompt.title, prompt.description, prompt.useCase, prompt.content, ...prompt.tags]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [prompts, query]);

  function updateQuery(value: string) {
    setQuery(value);
    const url = value.trim() ? `/search?q=${encodeURIComponent(value)}` : "/search";
    window.history.replaceState(null, "", url);
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-semibold text-emerald-700">全站搜索</p>
          <h1 className="mt-3 text-4xl font-bold text-zinc-950 sm:text-5xl">找到适合你的 AI 提示词</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
            搜索标题、简介、标签、使用场景和完整提示词内容。
          </p>
          <label className="mx-auto mt-8 flex max-w-3xl items-center gap-3 rounded-lg border border-zinc-300 bg-white p-2 pl-4 shadow-sm focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100">
            <Search className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden="true" />
            <span className="sr-only">搜索全部提示词</span>
            <input
              autoFocus
              className="min-h-11 min-w-0 flex-1 bg-transparent text-base text-zinc-950 outline-none placeholder:text-zinc-400"
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="例如：产品摄影、小红书、短视频脚本"
              type="search"
              value={query}
            />
            {query && (
              <button
                aria-label="清空搜索"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                onClick={() => updateQuery("")}
                type="button"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </label>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 border-b border-zinc-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-950">搜索结果</h2>
            <p className="mt-1 text-sm text-zinc-500">
              {query.trim() ? `关键词“${query.trim()}”` : "当前显示全部提示词"}
            </p>
          </div>
          <p className="text-sm text-zinc-500">
            找到 <strong className="text-zinc-950">{results.length}</strong> 条提示词
          </p>
        </div>

        {results.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((prompt) => (
              <article
                className="group relative flex min-h-72 flex-col rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-400 hover:shadow-md"
                key={prompt.id}
              >
                <Link aria-label={`查看${prompt.title}详情`} className="absolute inset-0 rounded-lg" href={`/prompts/${prompt.id}`} />
                <div className="pointer-events-none relative">
                  <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">
                    {prompt.platformName}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-zinc-950 transition group-hover:text-emerald-800">{prompt.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{prompt.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {prompt.tags.map((tag) => (
                      <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative z-10 mt-auto flex items-end justify-between gap-3 pt-6">
                  <span className="pointer-events-none inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                    查看提示词
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                  <FavoriteButton compact slug={prompt.slug} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-white px-6 text-center">
            <Search className="h-8 w-8 text-zinc-300" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold text-zinc-950">未找到相关提示词</h2>
            <p className="mt-2 text-sm text-zinc-500">尝试缩短关键词，或搜索平台、用途和标签。</p>
            <button className="mt-5 text-sm font-semibold text-emerald-700 hover:text-emerald-900" onClick={() => updateQuery("")} type="button">
              查看全部提示词
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
