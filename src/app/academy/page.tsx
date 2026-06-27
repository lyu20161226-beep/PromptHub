import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Check, Lightbulb, Workflow } from "lucide-react";
import { academyLessons } from "@/data/academy-lessons";

export const metadata: Metadata = {
  title: "AI 实战学院",
  description:
    "把商业思维与 AI 工作流结合。每个主题讲清商业问题、适用场景、执行流程和可直接带走的成果。",
};

export default function AcademyPage() {
  return (
    <main>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
              <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
              AI × 商业思维
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-zinc-950 sm:text-6xl">
              学一个方法，解决一个真实问题
            </h1>
            <p className="mt-5 max-w-3xl text-xl font-semibold leading-8 text-zinc-700">
              不需要学会所有 AI 技巧。掌握少数高价值方法和 Workflow，就能解决大多数高频工作。
            </p>
            <p className="mt-3 max-w-3xl leading-7 text-zinc-600">
              每一课都从商业问题开始，解释为什么、什么时候用，再提供 AI 执行步骤和可交付成果。内容为 PromptHub 原创整理。
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 py-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            ["商业问题", "先明确需要做出的判断，而不是急着向 AI 提问。"],
            ["方法框架", "理解逻辑、适用边界和常见误区。"],
            ["AI 工作流", "按步骤获得能直接使用和验证的成果。"],
          ].map(([title, description], index) => (
            <div className="rounded-lg border border-zinc-200 bg-white p-5" key={title}>
              <span className="text-xs font-bold text-emerald-700">0{index + 1}</span>
              <h2 className="mt-3 text-lg font-bold text-zinc-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-emerald-700">首批课程</p>
              <h2 className="mt-2 text-3xl font-bold text-zinc-950">6 个能立即用于工作的商业方法</h2>
            </div>
            <Link className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700" href="/prompts?q=商业">
              配套免费 Prompt <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {academyLessons.map((lesson) => (
              <article className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 sm:p-6" key={lesson.slug}>
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                    {lesson.category}
                  </span>
                  <span className="text-xs font-semibold text-zinc-400">原创课程</span>
                </div>
                <h3 className="mt-5 text-2xl font-bold text-zinc-950">{lesson.title}</h3>
                <p className="mt-3 font-semibold leading-7 text-zinc-700">{lesson.question}</p>

                <div className="mt-5 rounded-md border border-zinc-200 bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-zinc-950">
                    <Lightbulb className="h-4 w-4 text-amber-600" aria-hidden="true" />
                    核心原理
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{lesson.principle}</p>
                </div>

                <div className="mt-5">
                  <p className="flex items-center gap-2 text-sm font-bold text-zinc-950">
                    <Workflow className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                    AI 执行流程
                  </p>
                  <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                    {lesson.workflow.map((step, index) => (
                      <li className="flex gap-2 text-sm leading-6 text-zinc-600" key={step}>
                        <span className="font-mono text-xs font-bold text-emerald-700">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-5 border-t border-zinc-200 pt-5">
                  <p className="flex gap-2 text-sm leading-6 text-zinc-700">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                    <span><strong>带走成果：</strong>{lesson.deliverable}</span>
                  </p>
                  <p className="mt-3 rounded-md bg-zinc-950 p-4 font-mono text-xs leading-6 text-zinc-300">
                    {lesson.promptStarter}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
