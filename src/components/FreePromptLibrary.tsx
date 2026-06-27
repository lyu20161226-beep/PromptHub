"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { PromptCategory, RunnablePrompt } from "../../data/prompts";
import { promptCategories } from "../../data/prompts";
import { RunnablePromptCard } from "@/components/RunnablePromptCard";
import { recordValidationEvent } from "@/lib/validation-events";

export function FreePromptLibrary({ prompts, initialQuery = "" }: { prompts: RunnablePrompt[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<"全部" | PromptCategory>("全部");

  const filteredPrompts = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return prompts.filter((prompt) => {
      const matchesCategory = category === "全部" || prompt.category === category;
      const searchable = [prompt.title, prompt.description, prompt.scene, ...prompt.tags, prompt.template].join(" ").toLowerCase();
      return matchesCategory && (!keyword || searchable.includes(keyword));
    });
  }, [category, prompts, query]);

  function updateQuery(value: string) {
    setQuery(value);
    if (value.trim()) void recordValidationEvent("search", { query: value.trim(), source: "free-prompt-library" });
  }

  function clearFilters() {
    setQuery("");
    setCategory("全部");
  }

  return (
    <>
      <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
        <label className="flex min-h-12 items-center gap-3 rounded-md border border-zinc-300 bg-white px-4 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100">
          <Search className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden="true" />
          <span className="sr-only">搜索 Prompt</span>
          <input
            className="min-w-0 flex-1 bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="搜索小红书、SEO、程序报错、简历、竞品分析..."
            type="search"
            value={query}
          />
          {query && (
            <button aria-label="清空搜索" className="rounded-md p-1 text-zinc-400 hover:bg-zinc-100" onClick={() => setQuery("")} type="button">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </label>

        <div className="scrollbar-hidden flex gap-2 overflow-x-auto" role="group" aria-label="Prompt 分类">
          {promptCategories.map((item) => (
            <button
              aria-pressed={category === item}
              className={`whitespace-nowrap rounded-md border px-4 py-3 text-sm font-semibold ${
                category === item
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-300 bg-white text-zinc-700 hover:border-emerald-500 hover:text-emerald-700"
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
          找到 <strong className="text-zinc-950">{filteredPrompts.length}</strong> 个免费工作流 Prompt
        </p>
        {(query || category !== "全部") && (
          <button className="text-sm font-semibold text-emerald-700" onClick={clearFilters} type="button">
            清除筛选
          </button>
        )}
      </div>

      {filteredPrompts.length > 0 ? (
        <div className="mt-7 columns-1 gap-4 space-y-4 md:columns-2 xl:columns-3">
          {filteredPrompts.map((prompt) => (
            <div className="break-inside-avoid" key={prompt.id}>
              <RunnablePromptCard prompt={prompt} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-7 flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-white px-6 text-center">
          <Search className="h-8 w-8 text-zinc-300" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-bold text-zinc-950">没有找到匹配的 Prompt</h2>
          <button className="mt-4 text-sm font-semibold text-emerald-700" onClick={clearFilters} type="button">
            查看全部 Prompt
          </button>
        </div>
      )}
    </>
  );
}
