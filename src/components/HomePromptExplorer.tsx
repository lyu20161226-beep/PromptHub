"use client";

import Link from "next/link";
import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import type { MockPrompt, PromptCategory } from "@/lib/mock-prompts";

const categories: Array<PromptCategory | "全部"> = ["全部", "写作", "编程", "营销", "绘图", "学习", "办公"];

type HomePromptExplorerProps = {
  prompts: MockPrompt[];
  hotPromptIds: string[];
};

function PromptCard({ prompt, hot = false }: { prompt: MockPrompt; hot?: boolean }) {
  return (
    <article className="flex min-h-80 flex-col rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-400 hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">{prompt.category}</span>
          {hot && <span className="text-xs font-semibold text-rose-600">热门</span>}
        </div>
        <span className="text-xs font-medium text-zinc-400">{prompt.platformName}</span>
      </div>
      <h3 className="mt-4 text-xl font-bold text-zinc-950">{prompt.title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{prompt.description}</p>
      <div className="mt-4 border-l-2 border-emerald-500 pl-3">
        <p className="text-xs font-semibold text-zinc-400">适用场景</p>
        <p className="mt-1 text-sm leading-6 text-zinc-700">{prompt.useCase}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {prompt.tags.slice(0, 3).map((tag) => (
          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 border-t border-zinc-100 pt-5">
        <CopyButton text={prompt.content} />
        <Link
          aria-label={`查看${prompt.title}详情`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 text-zinc-600 transition hover:border-emerald-500 hover:text-emerald-700"
          href={`/prompts/${prompt.id}`}
          title="查看详情"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function HomePromptExplorer({ prompts, hotPromptIds }: HomePromptExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PromptCategory | "全部">("全部");

  const filteredPrompts = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return prompts.filter((prompt) => {
      const matchesCategory = category === "全部" || prompt.category === category;
      const searchable = [prompt.title, prompt.description, prompt.category, prompt.useCase, prompt.content, ...prompt.tags]
        .join(" ")
        .toLowerCase();
      return matchesCategory && (!keyword || searchable.includes(keyword));
    });
  }, [category, prompts, query]);

  const hotPrompts = hotPromptIds
    .map((id) => prompts.find((prompt) => prompt.id === id))
    .filter((prompt): prompt is MockPrompt => Boolean(prompt));

  const hasFilters = query.trim() || category !== "全部";

  function clearFilters() {
    setQuery("");
    setCategory("全部");
  }

  return (
    <>
      {!hasFilters && (
        <section className="border-b border-zinc-200 bg-white py-12 sm:py-16" id="popular">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-emerald-700">编辑精选</p>
                <h2 className="mt-2 text-3xl font-bold text-zinc-950">热门提示词</h2>
              </div>
              <span className="hidden text-sm text-zinc-500 sm:block">覆盖创作、技术与日常工作</span>
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hotPrompts.map((prompt) => (
                <PromptCard hot key={prompt.id} prompt={prompt} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-zinc-50 py-12 sm:py-16" id="prompt-library">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 border-b border-zinc-200 pb-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">提示词库</p>
              <h2 className="mt-2 text-3xl font-bold text-zinc-950">找到下一条可直接使用的 Prompt</h2>
            </div>
            <label className="flex w-full max-w-xl items-center gap-3 rounded-md border border-zinc-300 bg-white px-4 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
              <Search className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden="true" />
              <span className="sr-only">搜索提示词</span>
              <input
                className="min-h-12 min-w-0 flex-1 bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索标题、场景、标签或提示词内容"
                type="search"
                value={query}
              />
              {query && (
                <button aria-label="清空搜索" className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100" onClick={() => setQuery("")} type="button">
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </label>
          </div>

          <div className="mt-5 flex items-start gap-3">
            <SlidersHorizontal className="mt-2 h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
            <div className="flex flex-wrap gap-2" role="group" aria-label="提示词分类筛选">
              {categories.map((item) => (
                <button
                  aria-pressed={category === item}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    category === item
                      ? "bg-zinc-950 text-white"
                      : "border border-zinc-300 bg-white text-zinc-600 hover:border-emerald-500 hover:text-emerald-700"
                  }`}
                  key={item}
                  onClick={() => setCategory(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between gap-4">
            <p className="text-sm text-zinc-500">
              找到 <strong className="text-zinc-950">{filteredPrompts.length}</strong> 条提示词
            </p>
            {hasFilters && (
              <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700" onClick={clearFilters} type="button">
                <X className="h-4 w-4" aria-hidden="true" />
                清除筛选
              </button>
            )}
          </div>

          {filteredPrompts.length > 0 ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          ) : (
            <div className="mt-5 flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-white px-6 text-center">
              <Search className="h-8 w-8 text-zinc-300" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-bold text-zinc-950">没有找到匹配的提示词</h3>
              <p className="mt-2 text-sm text-zinc-500">换一个关键词，或者查看全部分类。</p>
              <button className="mt-5 text-sm font-semibold text-emerald-700" onClick={clearFilters} type="button">
                查看全部提示词
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
