import Link from "next/link";
import { ArrowRight, Bot, MessageSquareText, Search, Sparkles, WandSparkles } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { FavoriteButton } from "@/components/FavoriteButton";
import promptData from "@/data/prompts.json";

const categories = [
  {
    slug: "midjourney",
    name: "Midjourney",
    description: "商业摄影、品牌视觉与创意设计提示词",
    icon: WandSparkles,
    color: "bg-rose-50 text-rose-700"
  },
  {
    slug: "jimeng",
    name: "即梦",
    description: "短视频、产品广告与东方美学提示词",
    icon: Sparkles,
    color: "bg-amber-50 text-amber-700"
  },
  {
    slug: "chatgpt",
    name: "ChatGPT",
    description: "内容创作、商业分析与效率提升提示词",
    icon: MessageSquareText,
    color: "bg-emerald-50 text-emerald-700"
  }
] as const;

export default function HomePage() {
  const featuredPrompts = promptData.slice(0, 6);

  return (
    <main>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              30 条精选提示词，免费复制使用
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl lg:text-6xl">
              发现高质量 AI 提示词
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              Midjourney、即梦、ChatGPT 提示词库
            </p>
            <p className="mt-3 max-w-xl leading-7 text-zinc-500">
              为创作、营销和设计场景精选可直接使用的提示词，让每一次 AI 对话都更接近理想结果。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-zinc-950 px-6 text-sm font-semibold text-white transition hover:bg-emerald-700"
                href="#categories"
              >
                浏览提示词
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-emerald-500 hover:text-emerald-700"
                href="#featured"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                热门提示词
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950 p-5 shadow-xl shadow-zinc-200/70 sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-400 text-zinc-950">
                  <Bot className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">PromptHub</p>
                  <p className="text-xs text-zinc-400">精选提示词工作台</p>
                </div>
              </div>
              <span className="text-xs font-medium text-emerald-300">实时可用</span>
            </div>
            <div className="mt-5 space-y-3">
              {categories.map((category) => {
                const Icon = category.icon;
                const count = promptData.filter((prompt) => prompt.platform === category.slug).length;

                return (
                  <div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 p-4" key={category.slug}>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/10 text-emerald-300">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white">{category.name}</p>
                      <p className="truncate text-xs text-zinc-400">{category.description}</p>
                    </div>
                    <span className="text-sm font-semibold text-white">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 py-12 sm:py-16" id="categories">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-emerald-700">按平台探索</p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-950">选择你的 AI 创作工具</h2>
            <p className="mt-3 leading-7 text-zinc-600">每个分类收录 10 条经过整理的实用提示词。</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const count = promptData.filter((prompt) => prompt.platform === category.slug).length;

              return (
                <Link
                  className="group block rounded-lg border border-zinc-200 bg-white p-6 transition hover:border-emerald-400 hover:shadow-lg hover:shadow-zinc-200/60"
                  href={`/${category.slug}`}
                  key={category.slug}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-md ${category.color}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">{count} 条</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-zinc-950">{category.name}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-600">{category.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                    查看分类
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16" id="featured">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">编辑推荐</p>
              <h2 className="mt-2 text-3xl font-bold text-zinc-950">从这些提示词开始</h2>
            </div>
            <form className="flex w-full max-w-md items-center gap-2 rounded-md border border-zinc-300 bg-white p-2 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100" action="/search">
              <Search className="ml-2 h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
              <input
                className="min-h-9 min-w-0 flex-1 bg-transparent px-1 text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                name="q"
                placeholder="搜索标题、用途或标签"
                type="search"
              />
              <button className="min-h-9 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700" type="submit">
                搜索
              </button>
            </form>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPrompts.map((prompt) => (
              <article className="flex min-h-80 flex-col rounded-lg border border-zinc-200 bg-white p-5 shadow-sm" key={prompt.id}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase text-emerald-700">{prompt.platformName}</span>
                  <span className="text-xs text-zinc-400">{prompt.id}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-zinc-950">{prompt.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{prompt.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {prompt.tags.slice(0, 3).map((tag) => (
                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 border-t border-zinc-100 pt-5">
                  <CopyButton text={prompt.content} />
                  <FavoriteButton compact slug={prompt.slug} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
