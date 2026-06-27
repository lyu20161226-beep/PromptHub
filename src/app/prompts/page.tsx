import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { prompts } from "../../../data/prompts";
import { FreePromptLibrary } from "@/components/FreePromptLibrary";

export const metadata: Metadata = {
  title: "免费 AI Prompt Library - PromptHub",
  description: "免费搜索、运行和复制高质量 AI 工作流 Prompt，覆盖内容营销、编程、职场、办公、学习、商业和 AI 绘图。",
  alternates: { canonical: "/prompts" }
};

export default function PromptsPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-emerald-700" href="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            返回首页
          </Link>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Free Prompt Library</p>
              <h1 className="mt-2 text-4xl font-bold text-zinc-950 sm:text-5xl">免费运行和复制精选 Prompt</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-600">
                输入变量即可调用 AI。需要完整案例、流程、模板和检查清单时，再进入 Workflow Packs。
              </p>
            </div>
            <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-bold text-white hover:bg-emerald-700" href="/packs">
              浏览 Workflow Packs <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FreePromptLibrary prompts={prompts} />
        </div>
      </section>
    </main>
  );
}
