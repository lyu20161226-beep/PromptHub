import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Code2,
  DollarSign,
  FileText,
  FlaskConical,
  Search,
  Sparkles,
  TrendingUp,
  Wand2,
} from "lucide-react";
import { PackCard } from "@/components/PackCard";
import { RunnablePromptCard } from "@/components/RunnablePromptCard";
import { WorkflowCard } from "@/components/WorkflowCard";
import { caseStudies } from "@/data/case-studies";
import { featuredWorkflowPacks } from "@/data/workflow-packs";
import { latestWeeklyIssue } from "@/data/workflow-weekly";
import { topWorkflowPrompts } from "@/lib/mock-prompts";

const byId = (id: string) => topWorkflowPrompts.find((prompt) => prompt.id === id)!;

const heroScenarios = [
  { label: "爆款文案", href: "/search?q=小红书", icon: Wand2 },
  { label: "代码审查", href: "/search?q=代码", icon: Code2 },
  { label: "搞钱副业", href: "/search?q=营销", icon: DollarSign },
  { label: "简历优化", href: "/search?q=简历", icon: FileText },
  { label: "SEO策划", href: "/search?q=SEO", icon: TrendingUp },
];

const runnablePrompts = [
  {
    id: "run-xhs-note",
    title: "小红书爆款文案生成器",
    description: "输入产品、卖点和目标人群，生成更接近真实种草场景的笔记框架。",
    category: "写作",
    runs: "12.5k",
    score: "4.9",
    template:
      "你是一名小红书内容增长顾问。请围绕产品{{产品名称}}，面向{{目标人群}}，突出{{核心卖点}}，生成一篇小红书种草笔记。输出包含：3个爆款标题、正文结构、评论区引导、推荐标签和发布建议。",
  },
  {
    id: "run-bug-root-cause",
    title: "程序报错根因分析器",
    description: "把报错、环境和复现步骤整理成可验证的排查方案，而不是只猜最后一行日志。",
    category: "编程",
    runs: "8.2k",
    score: "4.8",
    template:
      "你是一名资深软件工程师。请根据报错信息{{报错信息}}、运行环境{{运行环境}}、复现步骤{{复现步骤}}，输出：最可能的3个根因、每个根因的验证方法、最小修复方案、回归测试清单和需要补充的信息。",
  },
  {
    id: "run-landing-page",
    title: "高转化落地页文案工坊",
    description: "把目标用户、痛点和证据转成首屏、价值模块、FAQ 与 CTA。",
    category: "营销",
    runs: "6.9k",
    score: "4.8",
    template:
      "你是一名SaaS转化文案专家。请为产品{{产品名称}}生成落地页文案。目标用户是{{目标用户}}，核心痛点是{{核心痛点}}，可信证据是{{可信证据}}。输出：首屏标题、副标题、3个价值模块、FAQ、CTA和不可夸大的风险提醒。",
  },
];

const coreTop5 = [byId("coding-002"), byId("chatgpt-003"), byId("marketing-002"), byId("chatgpt-009"), byId("chatgpt-005")];
const weeklyPrompts = latestWeeklyIssue.workflowIds.map(byId);

const monetization = [
  {
    name: "Free",
    price: "0元",
    gate: "免登录 / 游客",
    benefits: ["首页语义搜索", "每日3次模拟运行", "复制Prompt纯文本"],
    role: "负责低门槛体验、分享和搜索流量。",
  },
  {
    name: "Standard",
    price: "登录后开放",
    gate: "微信 / GitHub 登录",
    benefits: ["每日20次高级运行额度", "我的收藏", "运行历史管理"],
    role: "让用户沉淀数据，形成复访资产。",
  },
  {
    name: "Pro",
    price: "订阅 / 算力包",
    gate: "付费用户",
    benefits: ["无限运行", "Fork私有版本", "高级商业工作流包"],
    role: "未来核心盈利点，先用人工开通验证意愿。",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              Prompt OS：Find → Run → Improve
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">
              告别废话，一键直达顶级 AI 输出
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              PromptHub 不再只是提示词库，而是面向真实工作的 AI Workflow Library。找到任务，填写变量，运行工作流，再把结果沉淀成自己的方法。
            </p>

            <form
              action="/search"
              className="mt-8 flex max-w-2xl items-center gap-3 rounded-lg border border-zinc-300 bg-white p-2 pl-4 shadow-sm focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100"
            >
              <Search className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden="true" />
              <input
                className="min-h-11 min-w-0 flex-1 bg-transparent text-sm text-zinc-950 outline-none"
                name="q"
                placeholder="输入你想让 AI 完成的任务，例如：分析报错、写落地页、优化简历"
                type="search"
              />
              <button className="min-h-10 rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-emerald-700" type="submit">
                搜索
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-2">
              {heroScenarios.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-800"
                    href={item.href}
                    key={item.label}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <blockquote className="mt-8 border-l-4 border-emerald-500 pl-4 text-sm leading-7 text-zinc-600">
              <strong className="text-zinc-950">We don’t sell prompts.</strong> We help you run ideas into results.
              <br />
              我们不卖提示词，我们帮你把想法直接变成结果。
            </blockquote>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-emerald-700">今日推荐工坊</p>
                <h2 className="mt-1 text-xl font-bold text-zinc-950">输入变量，立即运行</h2>
              </div>
              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-zinc-500">Demo</span>
            </div>
            <RunnablePromptCard prompt={runnablePrompts[0]} />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-950 py-10 text-white sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-zinc-800 p-5">
              <p className="text-sm font-semibold text-emerald-300">1. Find</p>
              <h2 className="mt-2 text-xl font-bold">用语义搜索找到任务</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-300">不按模型堆分类，按用户真实问题组织：写作、搞钱、编程、职场、学习。</p>
            </div>
            <div className="rounded-lg border border-zinc-800 p-5">
              <p className="text-sm font-semibold text-emerald-300">2. Run</p>
              <h2 className="mt-2 text-xl font-bold">把 Prompt 变成工具</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-300">自动解析模板变量，渲染输入框，让用户填写后直接得到可执行结果。</p>
            </div>
            <div className="rounded-lg border border-zinc-800 p-5">
              <p className="text-sm font-semibold text-emerald-300">3. Improve</p>
              <h2 className="mt-2 text-xl font-bold">沉淀收藏、历史与版本</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-300">未来接入登录后，支持我的工坊、运行记录、Fork 与私有版本。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Run Layer</p>
              <h2 className="mt-2 text-3xl font-bold text-zinc-950">把高价值 Prompt 做成可运行卡片</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
                先用模拟运行验证体验，不急着接 OpenAI、DeepSeek 或 Claude。等用户真的会反复使用，再接真实 API 和额度系统。
              </p>
            </div>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700" href="/workflows">
              查看精选工作流 <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {runnablePrompts.map((prompt) => (
              <RunnablePromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">高分精选</p>
              <h2 className="mt-2 text-3xl font-bold text-zinc-950">用户会因为真正解决问题的工作流回来</h2>
            </div>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700" href="/workflows">
              查看 Top10 合集 <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {coreTop5.map((prompt) => (
              <WorkflowCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-700">
                <CalendarDays className="h-5 w-5" aria-hidden="true" />
                <p className="text-sm font-semibold">Workflow Weekly · 第 {latestWeeklyIssue.issue} 期</p>
              </div>
              <h2 className="mt-2 text-3xl font-bold text-zinc-950">{latestWeeklyIssue.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
                每周只精选少量工作流，围绕问题、Prompt、案例、结果、踩坑与优化技巧深度打磨。
              </p>
            </div>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700" href="/weekly">
              阅读本期 <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {weeklyPrompts.map((prompt, index) => (
              <Link
                className="flex items-center justify-between gap-3 rounded-md border border-zinc-200 bg-white px-4 py-4 text-sm font-semibold text-zinc-800 hover:border-emerald-400 hover:text-emerald-700"
                href={`/prompts/${prompt.slug}`}
                key={prompt.id}
              >
                <span>
                  <span className="mr-2 text-emerald-700">0{index + 1}</span>
                  {prompt.title}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-emerald-700">
                <FlaskConical className="h-5 w-5" aria-hidden="true" />
                <p className="text-sm font-semibold">真实案例库</p>
              </div>
              <h2 className="mt-2 text-3xl font-bold text-zinc-950">案例大于 Prompt 本身</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                每个案例展示输入、输出、限制和下一步验证，不把内部测试包装成夸张成功故事。
              </p>
            </div>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700" href="/cases">
              查看全部案例 <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {caseStudies.map((study) => (
              <Link className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 transition hover:border-emerald-400 hover:bg-white" href={`/cases/${study.slug}`} key={study.slug}>
                <span className="text-xs font-bold text-amber-700">内部验证案例</span>
                <h3 className="mt-3 text-lg font-bold text-zinc-950">{study.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{study.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-emerald-700">Prompt Pack</p>
              <h2 className="mt-2 text-3xl font-bold text-zinc-950">不卖孤立文本，卖完整交付</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                每个包都包含工作流、示例、使用场景、常见错误和输出模板。当前免费预览，后续优先验证一次性购买。
              </p>
            </div>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700" href="/packs">
              查看全部工作流包 <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featuredWorkflowPacks.map((pack) => (
              <PackCard compact key={pack.slug} pack={pack} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-700">
              <BrainCircuit className="h-5 w-5" aria-hidden="true" />
              <p className="text-sm font-semibold">商业闭环</p>
            </div>
            <h2 className="mt-2 text-3xl font-bold text-zinc-950">先验证复访，再做收费</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              阶梯式 Freemium 让用户先低门槛使用，再逐步沉淀收藏、历史、私有版本和高级运行额度。
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {monetization.map((tier) => (
              <article className="rounded-lg border border-zinc-200 bg-zinc-50 p-5" key={tier.name}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-950">{tier.name}</h3>
                    <p className="mt-1 text-sm text-zinc-500">{tier.gate}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-zinc-700">{tier.price}</span>
                </div>
                <ul className="mt-5 space-y-2">
                  {tier.benefits.map((benefit) => (
                    <li className="flex gap-2 text-sm leading-6 text-zinc-700" key={benefit}>
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-zinc-200 pt-4 text-sm leading-6 text-zinc-600">{tier.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-950 py-12 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-300">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm font-semibold">Prompt OS</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold">从一个可运行工作流开始，把想法变成结果</h2>
          </div>
          <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-emerald-400 px-5 text-sm font-bold text-zinc-950 hover:bg-emerald-300" href="/workflows">
            浏览 Top10 工作流 <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
