"use client";

import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { FavoriteButton } from "@/components/FavoriteButton";
import type { MockPrompt } from "@/lib/mock-prompts";

type PlatformPromptPageProps = {
  title: string;
  description: string;
  eyebrow: string;
  prompts: MockPrompt[];
};

export function PlatformPromptPage({ title, description, eyebrow, prompts }: PlatformPromptPageProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(
    () => Array.from(new Set(prompts.flatMap((prompt) => prompt.tags))).sort((a, b) => a.localeCompare(b, "zh-CN")),
    [prompts]
  );

  const filteredPrompts = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return prompts.filter((prompt) => {
      const matchesTag = !activeTag || prompt.tags.includes(activeTag);
      const searchableText = [prompt.title, prompt.description, prompt.useCase, ...prompt.tags].join(" ").toLowerCase();
      return matchesTag && (!keyword || searchableText.includes(keyword));
    });
  }, [activeTag, prompts, query]);

  function clearFilters() {
    setQuery("");
    setActiveTag(null);
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-semibold text-emerald-700">{eyebrow}</p>
          <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold text-zinc-950 sm:text-5xl">{title}</h1>
              <p className="mt-4 text-lg leading-8 text-zinc-600">{description}</p>
            </div>
            <div className="shrink-0 rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3">
              <span className="text-2xl font-bold text-zinc-950">{prompts.length}</span>
              <span className="ml-2 text-sm text-zinc-500">条精选提示词</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="border-b border-zinc-200 pb-7">
          <label className="flex max-w-2xl items-center gap-3 rounded-md border border-zinc-300 bg-white px-4 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
            <Search className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden="true" />
            <span className="sr-only">搜索提示词</span>
            <input
              className="min-h-12 min-w-0 flex-1 bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索标题、用途或标签"
              type="search"
              value={query}
            />
            {query && (
              <button
                aria-label="清空搜索"
                className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
                onClick={() => setQuery("")}
                type="button"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </label>

          <div className="mt-5 flex items-start gap-3">
            <SlidersHorizontal className="mt-2 h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
            <div className="flex flex-wrap gap-2">
              <button
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  activeTag === null ? "bg-zinc-950 text-white" : "border border-zinc-300 bg-white text-zinc-600 hover:border-emerald-500"
                }`}
                onClick={() => setActiveTag(null)}
                type="button"
              >
                全部标签
              </button>
              {tags.map((tag) => (
                <button
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    activeTag === tag ? "bg-emerald-700 text-white" : "border border-zinc-300 bg-white text-zinc-600 hover:border-emerald-500"
                  }`}
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            找到 <strong className="text-zinc-950">{filteredPrompts.length}</strong> 条结果
          </p>
          {(query || activeTag) && (
            <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-900" onClick={clearFilters} type="button">
              <X className="h-4 w-4" aria-hidden="true" />
              清除筛选
            </button>
          )}
        </div>

        {filteredPrompts.length > 0 ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPrompts.map((prompt) => (
              <article
                className="group relative flex min-h-96 flex-col rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-400 hover:shadow-md"
                key={prompt.id}
              >
                <Link aria-label={`查看${prompt.title}详情`} className="absolute inset-0 rounded-lg" href={`/prompts/${prompt.id}`} />
                <div className="relative pointer-events-none">
                  <span className="text-xs font-bold uppercase text-emerald-700">{prompt.platformName}</span>
                  <h2 className="mt-3 text-xl font-bold text-zinc-950 transition group-hover:text-emerald-800">{prompt.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{prompt.description}</p>
                  <div className="mt-5 border-l-2 border-emerald-500 pl-3">
                    <p className="text-xs font-semibold text-zinc-400">使用场景</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-700">{prompt.useCase}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {prompt.tags.map((tag) => (
                      <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative z-10 mt-auto grid grid-cols-[1fr_auto] gap-2 pt-6">
                  <CopyButton text={prompt.content} />
                  <FavoriteButton compact slug={prompt.slug} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5 flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-white px-6 text-center">
            <Search className="h-7 w-7 text-zinc-300" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-bold text-zinc-950">没有找到匹配的提示词</h2>
            <p className="mt-2 text-sm text-zinc-500">换一个关键词或清除标签筛选后再试。</p>
            <button className="mt-5 text-sm font-semibold text-emerald-700 hover:text-emerald-900" onClick={clearFilters} type="button">
              查看全部提示词
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
