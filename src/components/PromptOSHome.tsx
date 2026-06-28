import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ExternalLink,
  FlaskConical,
  Search,
  ShieldCheck,
} from "lucide-react";
import { CaseCard } from "@/components/CaseCard";
import { EmailCapture } from "@/components/EmailCapture";
import { caseStudies } from "@/data/case-studies";
import { packs } from "@/data/packs";

const editorPicks = packs.filter((pack) => pack.status === "featured").slice(0, 3);

const collections = [
  { title: "内容增长", description: "小红书、SEO、脚本与内容复盘", query: "内容" },
  { title: "产品与创业", description: "市场验证、竞品、定价与落地页", query: "产品" },
  { title: "编程调试", description: "根因分析、代码审查与测试设计", query: "编程" },
  { title: "求职成长", description: "简历、面试、学习与职业表达", query: "简历" },
  { title: "跨境电商", description: "Listing、广告、商品内容与合规", query: "电商" },
] as const;

const models = ["ChatGPT", "Claude", "Gemini", "DeepSeek", "Qwen", "Midjourney"] as const;

const evidenceRules = [
  "来源可追溯，无法确认时明确标记未验证",
  "记录为什么有效，也记录什么时候不该用",
  "保留失败原因与证据边界，不制造效果数字",
  "每个案例都能还原输入、步骤、输出与模板",
] as const;

export function PromptOSHome() {
  return (
    <>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              The Trusted Reference for AI Workflows
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-zinc-950 sm:text-6xl">
              AI Workflow 的可信参考指南
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-zinc-600">
              帮你用最少时间找到当前更靠谱的 AI 工作方法。每个 Workflow 都记录来源、验证状态、
              适用模型、失败边界、替代方案与版本更新。
            </p>

            <form action="/prompts" className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
              <label className="relative flex-1">
                <span className="sr-only">搜索工作任务</span>
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
                  aria-hidden="true"
                />
                <input
                  className="min-h-12 w-full rounded-md border border-zinc-300 bg-white pl-12 pr-4 text-base outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  name="q"
                  placeholder="你想完成什么？例如：调试代码、写落地页、优化简历"
                  type="search"
                />
              </label>
              <button
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-zinc-950 px-6 text-sm font-bold text-white hover:bg-emerald-700"
                type="submit"
              >
                查找工作流
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold">
              <Link className="text-emerald-700 hover:text-emerald-900" href="/cases">
                浏览精选案例
              </Link>
              <Link className="text-zinc-600 hover:text-zinc-950" href="/packs">
                查看 Workflow Packs
              </Link>
              <span className="text-zinc-400">Learn AI workflows that actually work.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Editor’s Picks"
            title="编辑精选"
            description="不是按数量排序，而是按问题是否真实、流程是否清楚、结果是否可检验来选择。"
            href="/packs"
            linkLabel="查看全部 Packs"
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {editorPicks.map((pack) => (
              <article className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-6" key={pack.slug}>
                <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  编辑推荐 · {pack.category}
                </span>
                <h3 className="mt-5 text-xl font-bold text-zinc-950">{pack.title}</h3>
                <p className="mt-3 font-semibold leading-6 text-emerald-700">{pack.promise}</p>
                <p className="mt-4 text-sm leading-6 text-zinc-600">{pack.problem}</p>
                <div className="mt-auto pt-6">
                  <Link
                    className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-900"
                    href={`/packs/${pack.slug}`}
                  >
                    查看编辑说明与免费预览
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Verification Queue"
            title="最新验证工作流"
            description="当前案例用于展示验证结构，尚未冒充真实成果。获得公开来源与完整证据后，才会升级为 Source-linked 或 Verified。"
            href="/cases"
            linkLabel="查看全部案例"
          />

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.slice(0, 6).map((caseItem) => (
              <CaseCard caseItem={caseItem} compact key={caseItem.id} />
            ))}
          </div>

          <div className="mt-8 grid gap-6 rounded-lg border border-amber-200 bg-amber-50 p-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <div className="flex items-center gap-2 text-amber-800">
                <FlaskConical className="h-5 w-5" aria-hidden="true" />
                <p className="text-sm font-bold">Failure Cases</p>
              </div>
              <h3 className="mt-3 text-2xl font-bold text-zinc-950">失败也必须留下证据</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-700">
                我们不仅记录成功模板，也解释上下文不足、模型不适配、格式失控和结果无法验证等失败原因。
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {evidenceRules.map((rule) => (
                <div className="flex gap-3 rounded-md border border-amber-200 bg-white p-4" key={rule}>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-zinc-700">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Collections"
            title="按长期问题学习"
            description="不追热点，优先整理几年后仍然有价值的工作任务。"
            href="/prompts"
            linkLabel="浏览免费 Library"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {collections.map((collection) => (
              <Link
                className="group rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-emerald-400"
                href={`/prompts?q=${encodeURIComponent(collection.query)}`}
                key={collection.title}
              >
                <h3 className="font-bold text-zinc-950">{collection.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{collection.description}</p>
                <ArrowRight className="mt-5 h-4 w-4 text-emerald-700 transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-700">
              <Bot className="h-5 w-5" aria-hidden="true" />
              <p className="text-sm font-bold">Models</p>
            </div>
            <h2 className="mt-3 text-3xl font-bold text-zinc-950">同一工作流，不同模型有不同边界</h2>
            <p className="mt-4 leading-7 text-zinc-600">
              每个工作流将逐步记录推荐模型、测试时间、已知限制和替代方案，而不是笼统声称“全模型通用”。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {models.map((model) => (
              <Link
                className="flex min-h-16 items-center justify-between rounded-md border border-zinc-200 bg-zinc-50 px-4 font-bold text-zinc-800 hover:border-emerald-400 hover:bg-emerald-50"
                href={`/prompts?q=${encodeURIComponent(model)}`}
                key={model}
              >
                {model}
                <ExternalLink className="h-4 w-4 text-zinc-400" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold text-emerald-300">Weekly Curated Workflow</p>
            <h2 className="mt-2 text-3xl font-bold">每周只发真正值得学习的工作流</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              包含来源、适用场景、执行步骤、失败边界和可复用模板。没有值得发布的内容，就不凑数。
            </p>
          </div>
          <EmailCapture source="homepage-curated-weekly" />
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-bold text-emerald-700">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold text-zinc-950">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">{description}</p>
      </div>
      <Link className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-900" href={href}>
        {linkLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
