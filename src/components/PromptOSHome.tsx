"use client";

import { ArrowRight, CheckCircle2, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { PromptCategory, RunnablePrompt } from "../../data/prompts";
import { promptCategories } from "../../data/prompts";
import { solutions } from "@/data/solutions";
import { workflowPacks } from "@/data/workflow-packs";
import { EmailCapture } from "@/components/EmailCapture";
import { RunnablePromptCard } from "@/components/RunnablePromptCard";
import { recordValidationEvent } from "@/lib/validation-events";

type PromptOSHomeProps = {
  prompts: RunnablePrompt[];
};

const hotScenes = ["小红书文案", "程序报错", "简历优化", "SEO策划", "落地页文案", "竞品分析"];

const heroStats = [
  { value: "30分钟", label: "完成小红书笔记" },
  { value: "半天", label: "完成产品验证" },
  { value: "3步", label: "拿到可复制结果" }
];

const systemSteps = [
  {
    title: "问题",
    subtitle: "先选择你要完成的任务",
    description: "用户不需要先理解 Prompt，只需要选择：写爆款笔记、修 Bug、优化简历、做竞品分析。"
  },
  {
    title: "工作流",
    subtitle: "按步骤填变量并运行",
    description: "每张卡自动解析变量，填入产品、用户、场景或报错信息后即可调用模型生成结果。"
  },
  {
    title: "结果",
    subtitle: "复制输出并复用",
    description: "输出不是一段泛泛回答，而是标题、正文、清单、模板、行动项等可以直接拿去用的资产。"
  }
];

const beforeAfterExamples = [
  {
    title: "小红书爆款内容",
    before: "帮我写一篇小红书文案。",
    after: "输出标题钩子、正文结构、卖点转化、标签推荐和评论区引导。"
  },
  {
    title: "程序报错根因分析",
    before: "这个报错是什么意思？",
    after: "输出根因假设、验证步骤、最小修复、回归测试和补充信息清单。"
  },
  {
    title: "SEO 内容策划",
    before: "帮我写一篇 SEO 文章。",
    after: "输出搜索意图、H2/H3 大纲、FAQ、内链建议和发布检查清单。"
  }
];

const pricingTiers = [
  {
    name: "Free",
    price: "0元",
    description: "适合首次体验",
    features: ["免费运行 Prompt 卡片", "复制 Prompt 文本", "查看免费案例"]
  },
  {
    name: "Starter Pack",
    price: "9元起",
    description: "适合单个高频场景",
    features: ["解锁单个 Workflow Pack", "获得案例和输出模板", "适合验证第一笔收入"]
  },
  {
    name: "Pro Bundle",
    price: "29元起",
    description: "适合创作者和运营",
    features: ["解锁多个垂直 Pack", "获得完整工作流", "后续可升级为会员"]
  }
];

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
      void recordValidationEvent("search", { query: value.trim(), source: "prompt-os-home" });
    }
  }

  function clearFilters() {
    setQuery("");
    setCategory("全部");
  }

  return (
    <>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-bold text-zinc-950">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-zinc-950 text-white">PH</span>
            <span>PromptHub</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-zinc-600 md:flex">
            <a className="hover:text-zinc-950" href="/solutions">解决方案</a>
            <a className="hover:text-zinc-950" href="#explore">免费运行</a>
            <a className="hover:text-zinc-950" href="#packs">Workflow Packs</a>
            <a className="hover:text-zinc-950" href="#proof">案例</a>
            <a className="hover:text-zinc-950" href="#pricing">定价</a>
          </nav>
          <a className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700" href="#explore">
            免费体验
          </a>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              AI Workflow Library
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-zinc-950 sm:text-6xl">
              不要再收藏 Prompt。
              <span className="block text-emerald-700">直接运行 AI 工作流。</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              用标准化工作流解决真实任务：30 分钟完成小红书笔记、半天完成产品验证、快速定位程序报错、生成可复制的 SEO 内容方案。
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a className="inline-flex min-h-11 items-center justify-center rounded-md bg-emerald-600 px-5 text-sm font-bold text-white hover:bg-emerald-700" href="/packs">
                浏览 Packs
              </a>
              <a className="inline-flex min-h-11 items-center justify-center rounded-md bg-zinc-950 px-5 text-sm font-bold text-white hover:bg-emerald-700" href="/prompts">
                免费复制 Prompt
              </a>
              <a className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-300 px-5 text-sm font-bold text-zinc-700 hover:border-emerald-500 hover:text-emerald-700" href="/solutions">
                按问题找方案
              </a>
            </div>

            <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              {heroStats.map((stat) => (
                <div className="rounded-md bg-white p-3" key={stat.label}>
                  <p className="text-xl font-bold text-zinc-950">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold text-zinc-500">{stat.label}</p>
                </div>
              ))}
            </div>

            <label className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-lg border border-zinc-300 bg-white px-4 shadow-sm focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100">
              <Search className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden="true" />
              <span className="sr-only">搜索任务</span>
              <input
                className="min-h-14 min-w-0 flex-1 bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                onChange={(event) => handleQueryChange(event.target.value)}
                placeholder="输入你想让 AI 完成的任务，例如：小红书、程序报错、简历、SEO、竞品分析"
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

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {systemSteps.map((step) => (
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5" key={step.title}>
                <p className="text-sm font-bold text-emerald-700">{step.title}</p>
                <h2 className="mt-2 text-xl font-bold text-zinc-950">{step.subtitle}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-zinc-200 bg-zinc-50 p-5 sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-emerald-700">Solution Hub</p>
                <h2 className="mt-2 text-3xl font-bold text-zinc-950">我想要完成...</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
                  先选择要解决的问题，再进入完整 Workflow、推荐 Prompt、推荐 Pack 和输出模板。
                </p>
              </div>
              <a className="inline-flex min-h-11 items-center justify-center rounded-md bg-zinc-950 px-5 text-sm font-bold text-white hover:bg-emerald-700" href="/solutions">
                查看全部解决方案
              </a>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {solutions.slice(0, 6).map((solution) => (
                <a className="rounded-md border border-zinc-200 bg-white p-4 transition hover:border-emerald-300 hover:bg-emerald-50" href={`/solutions/${solution.slug}`} key={solution.slug}>
                  <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">{solution.category}</p>
                  <h3 className="mt-2 font-bold text-zinc-950">{solution.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{solution.subtitle}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white py-12" id="proof">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold text-emerald-700">15 秒价值证明</p>
              <h2 className="mt-2 text-3xl font-bold text-zinc-950">用户买的不是 Prompt，是更稳定的结果</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-600">
                每个 Pack 都围绕 Before / After、ROI、Workflow 流程图和输出模板组织，让用户先看到结果，再决定是否留下购买意向。
              </p>
              <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-sm font-bold text-zinc-950">ROI 示例</p>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-md bg-white p-3">
                    <p className="text-xs text-zinc-500">传统方式</p>
                    <p className="mt-1 text-xl font-bold text-zinc-950">2小时</p>
                  </div>
                  <div className="rounded-md bg-white p-3">
                    <p className="text-xs text-zinc-500">使用后</p>
                    <p className="mt-1 text-xl font-bold text-zinc-950">15分钟</p>
                  </div>
                  <div className="rounded-md bg-white p-3">
                    <p className="text-xs text-zinc-500">效率提升</p>
                    <p className="mt-1 text-xl font-bold text-emerald-700">87%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              {beforeAfterExamples.map((item) => (
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5" key={item.title}>
                  <h3 className="font-bold text-zinc-950">{item.title}</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-md border border-red-100 bg-white p-3">
                      <p className="text-xs font-bold text-red-600">Before</p>
                      <p className="mt-2 text-sm text-zinc-600">{item.before}</p>
                    </div>
                    <div className="rounded-md border border-emerald-100 bg-white p-3">
                      <p className="text-xs font-bold text-emerald-700">After</p>
                      <p className="mt-2 text-sm text-zinc-600">{item.after}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-950 py-5" id="explore">
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
              <p className="text-sm font-semibold text-emerald-700">可运行 Prompt 卡片</p>
              <h2 className="mt-2 text-3xl font-bold text-zinc-950">填写变量，立即拿到结果</h2>
              <p className="mt-3 text-sm text-zinc-500">
                找到 <strong className="text-zinc-950">{filteredPrompts.length}</strong> 个可运行 AI 工作流
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
              <h3 className="mt-4 text-xl font-bold text-zinc-950">没有找到匹配的工作流</h3>
              <p className="mt-2 text-sm text-zinc-500">换一个关键词，或者查看全部分类。</p>
              <button className="mt-5 text-sm font-semibold text-emerald-700" onClick={clearFilters} type="button">
                查看全部工作流
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white py-12" id="packs">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-emerald-700">精选垂直 Workflow Packs</p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-950">不是卖提示词，而是卖可复制的 AI 工作流</h2>
            <p className="mt-4 text-sm leading-6 text-zinc-600">
              普通 Prompt 会越来越不值钱。真正值钱的是垂直场景、稳定结果、模板化输出和持续更新。先用前三个 Pack 验证付费意向。
            </p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {workflowPacks.slice(0, 3).map((pack) => (
              <a className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 transition hover:border-emerald-400 hover:bg-emerald-50" href={`/packs/${pack.slug}`} key={pack.slug}>
                <p className="text-xs font-bold text-emerald-700">{pack.audience}</p>
                <h3 className="mt-3 text-xl font-bold text-zinc-950">{pack.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{pack.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-2xl font-bold text-zinc-950">¥{pack.price}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                    查看详情 <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-12 text-white" id="pricing">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-emerald-300">商业化验证</p>
            <h2 className="mt-2 text-3xl font-bold">先验证付费意向，再接真实支付</h2>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5" key={tier.name}>
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <p className="mt-2 text-2xl font-bold text-emerald-300">{tier.price}</p>
                <p className="mt-2 text-sm text-zinc-400">{tier.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-zinc-200">
                  {tier.features.map((feature) => (
                    <li className="flex gap-2" key={feature}>
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold text-emerald-700">PromptHub Weekly</p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-950">每周领取一个免费 Workflow</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              每封邮件只讲一个具体问题、完整步骤和可复制 Prompt，不发送无关内容。
            </p>
          </div>
          <EmailCapture source="homepage-weekly" />
        </div>
      </section>
    </>
  );
}
