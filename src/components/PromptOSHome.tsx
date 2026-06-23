"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { PromptCategory, RunnablePrompt } from "../../data/prompts";
import { promptCategories } from "../../data/prompts";
import { RunnablePromptCard } from "@/components/RunnablePromptCard";
import { recordValidationEvent } from "@/lib/validation-events";

type PromptOSHomeProps = {
  prompts: RunnablePrompt[];
};

const hotScenes = ["小红书文案", "代码审查", "简历优化", "SEO策划", "周报生成", "商业计划书"];

export function PromptOSHome({ prompts }: PromptOSHomeProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"全部" | PromptCategory>("全部");

  const filteredPrompts = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return prompts.filter((prompt) => {
      const matchesCategory = category === "全部" || prompt.category === category;
      const text = [prompt.title, prompt.description, prompt.category, prompt.scene, prompt.template, ...prompt.tags].join(" ").toLowerCase();
      return matchesCategory && (!keyword || text.includes(keyword));
    });
  }, [category, prompts, query]);

  function handleQueryChange(value: string) {
    setQuery(value);
    if (value.trim()) {
      void recordValidationEvent("search", { query: value.trim(), source: "prompt-os-mvp-home" });
    }
  }

  function clearFilters() {
    setQuery("");
    setCategory("全部");
  }

  return (
    <>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
              Prompt OS MVP
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">
              输入任务，运行 AI 工作流
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              PromptHub 第一版只做一件事：让用户搜索任务，填写变量，点击运行，拿到可复制的 AI 结果。
            </p>

            <label className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-lg border border-zinc-300 bg-white px-4 shadow-sm focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100">
              <Search className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden="true" />
              <span className="sr-only">搜索任务</span>
              <input
                className="min-h-14 min-w-0 flex-1 bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                onChange={(event) => handleQueryChange(event.target.value)}
                placeholder="搜索任务，例如：小红书、代码审查、简历、周报、SEO"
                type="search"
                value={query}
              />
              {query && (
                <button aria-label="清空搜索" className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100" onClick={() => setQuery("")} type="button">
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </label>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {hotScenes.map((scene) => (
                <button
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-800"
                  key={scene}
                  onClick={() => handleQueryChange(scene)}
                  type="button"
                >
                  {scene}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-950 py-5">
        <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 sm:px-6 lg:px-8">
          <SlidersHorizontal className="mt-2 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
          <div className="scrollbar-hidden flex gap-2 overflow-x-auto" role="group" aria-label="热门场景分类">
            {promptCategories.map((item) => (
              <button
                aria-pressed={category === item}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === item ? "bg-emerald-400 text-zinc-950" : "border border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-emerald-400 hover:text-emerald-300"
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
      </section>

      <section className="bg-zinc-50 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Prompt 卡片瀑布流</p>
              <h2 className="mt-2 text-3xl font-bold text-zinc-950">直接填写变量并运行</h2>
              <p className="mt-3 text-sm text-zinc-500">
                找到 <strong className="text-zinc-950">{filteredPrompts.length}</strong> 个可运行 Prompt
              </p>
            </div>
            {(query || category !== "全部") && (
              <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700" onClick={clearFilters} type="button">
                <X className="h-4 w-4" aria-hidden="true" />
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
              <h3 className="mt-4 text-xl font-bold text-zinc-950">没有找到匹配的 Prompt</h3>
              <p className="mt-2 text-sm text-zinc-500">换一个关键词，或者查看全部分类。</p>
              <button className="mt-5 text-sm font-semibold text-emerald-700" onClick={clearFilters} type="button">
                查看全部 Prompt
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
