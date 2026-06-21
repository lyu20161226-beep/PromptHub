import Link from "next/link";
import { ArrowDown, Bot, Search, Sparkles } from "lucide-react";
import { HomePromptExplorer } from "@/components/HomePromptExplorer";
import { mockPrompts } from "@/lib/mock-prompts";

const hotPromptIds = ["writing-001", "coding-001", "marketing-002", "visual-001", "learning-001", "office-001"];

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_22rem] lg:items-center lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {mockPrompts.length} 条中文 AI 提示词
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">
              发现和分享高质量 AI 提示词
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              覆盖写作、编程、营销、绘图、学习和办公场景。找到合适的 Prompt，复制后立即开始。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-zinc-950 px-6 text-sm font-semibold text-white transition hover:bg-emerald-700" href="#prompt-library">
                <Search className="h-4 w-4" aria-hidden="true" />
                浏览提示词库
              </Link>
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-zinc-300 px-6 text-sm font-semibold text-zinc-700 transition hover:border-emerald-500 hover:text-emerald-700" href="#popular">
                查看热门
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5 text-white shadow-xl shadow-zinc-200/70 sm:p-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-400 text-zinc-950">
                <Bot className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold">PromptHub V1</p>
                <p className="text-xs text-zinc-400">中文 AI 提示词工作台</p>
              </div>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-md border border-white/10 bg-white/5 p-4">
                <dt className="text-xs text-zinc-400">提示词</dt>
                <dd className="mt-1 text-2xl font-bold">{mockPrompts.length}</dd>
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-4">
                <dt className="text-xs text-zinc-400">内容分类</dt>
                <dd className="mt-1 text-2xl font-bold">6</dd>
              </div>
              <div className="col-span-2 rounded-md border border-white/10 bg-white/5 p-4">
                <dt className="text-xs text-zinc-400">覆盖平台</dt>
                <dd className="mt-2 text-sm font-semibold text-emerald-300">ChatGPT · Midjourney · 即梦</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <HomePromptExplorer hotPromptIds={hotPromptIds} prompts={mockPrompts} />
    </main>
  );
}
