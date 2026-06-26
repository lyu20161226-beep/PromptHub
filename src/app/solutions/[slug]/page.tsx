import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, FileText, Layers3, Lightbulb, PlayCircle, Users } from "lucide-react";
import { SolutionWorkflowCopyButton } from "@/components/SolutionWorkflowCopyButton";
import { getSolution, solutions, type Solution } from "@/data/solutions";

type SolutionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const solutionExamples: Record<string, { input: string[]; output: string[] }> = {
  "build-saas": {
    input: ["Idea：AI 英语口语陪练工具", "目标用户：大学生和职场新人", "商业目标：验证 30 天内是否有人愿意付费"],
    output: ["3 个可验证用户痛点", "竞品差异化矩阵", "Landing Page 首屏文案", "30 天冷启动执行清单"]
  },
  "grow-xiaohongshu": {
    input: ["产品：AI 英语学习 App", "目标用户：大学生", "卖点：便宜、高效、自动生成学习计划"],
    output: ["5 个爆款标题方向", "一篇可发布的小红书正文", "标签和评论区引导", "发布后复盘指标"]
  },
  "launch-product": {
    input: ["产品：PromptHub", "发布渠道：小红书、X、社群、Product Hunt", "目标：获得首批 100 个真实用户"],
    output: ["发布定位", "多渠道发布文案", "邮件通知", "发布后数据复盘表"]
  },
  "write-seo-content": {
    input: ["主题：AI 工作流工具", "目标关键词：AI workflow prompts", "目标用户：独立开发者"],
    output: ["关键词集群", "SEO 文章大纲", "FAQ 模块", "内部链接建议"]
  },
  "improve-resume": {
    input: ["岗位：产品经理", "经历：负责过一个 App 改版", "目标：突出结果和数据"],
    output: ["JD 能力拆解", "量化简历 bullet", "项目 STAR 故事", "面试高频问题回答"]
  },
  "cross-border-ecommerce": {
    input: ["产品：便携咖啡机", "平台：Amazon", "卖点：便携、快速出咖啡、适合办公室"],
    output: ["Listing 标题", "五点描述", "A+ Content 模块", "广告文案和 Review 回复"]
  }
};

const usageSteps = [
  "先确认你的任务目标和输入信息。",
  "按 Workflow 顺序依次运行每一步 Prompt。",
  "把上一步输出复制到下一步，形成连续上下文。",
  "最后用输出模板整理成可发布、可交付或可复盘的结果。"
];

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: SolutionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    return {
      title: "Solution Not Found - PromptHub",
      robots: { index: false, follow: false }
    };
  }

  return {
    title: `${solution.subtitle} - PromptHub Solution Hub`,
    description: solution.description,
    alternates: { canonical: `/solutions/${solution.slug}` }
  };
}

function buildWorkflowText(solution: Solution) {
  const example = solutionExamples[solution.slug];

  return [
    `# ${solution.subtitle}`,
    "",
    `目标：${solution.outcome}`,
    "",
    "适合人群：",
    ...solution.audience.map((item) => `- ${item}`),
    "",
    "Workflow 步骤：",
    ...solution.steps.map((step, index) => `${index + 1}. ${step.title}\n   ${step.description}\n   推荐 Prompt：${step.promptId}`),
    "",
    "示例输入：",
    ...(example?.input.map((item) => `- ${item}`) ?? []),
    "",
    "预期输出：",
    ...(example?.output.map((item) => `- ${item}`) ?? []),
    "",
    "输出模板：",
    ...solution.outputTemplates.map((item) => `- ${item}`),
    "",
    `推荐 Pack：${solution.recommendedPackTitle}`
  ].join("\n");
}

export default async function SolutionDetailPage({ params }: SolutionDetailPageProps) {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    notFound();
  }

  const example = solutionExamples[solution.slug];
  const workflowText = buildWorkflowText(solution);

  return (
    <main className="bg-zinc-50 text-zinc-950">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800" href="/solutions">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            返回 Solution Hub
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">{solution.category}</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">{solution.subtitle}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">{solution.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {solution.audience.map((item) => (
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-semibold text-zinc-700" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <aside className="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm font-bold text-zinc-950">最终结果</p>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{solution.outcome}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-md bg-white p-3">
                  <p className="text-xs text-zinc-500">Prompt</p>
                  <p className="mt-1 text-xl font-bold">{solution.promptCount}</p>
                </div>
                <div className="rounded-md bg-white p-3">
                  <p className="text-xs text-zinc-500">Difficulty</p>
                  <p className="mt-1 text-xl font-bold">{solution.difficulty}</p>
                </div>
              </div>
              <div className="mt-5">
                <SolutionWorkflowCopyButton text={workflowText} />
              </div>
              <Link className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-md border border-zinc-300 px-4 text-sm font-bold text-zinc-700 hover:border-emerald-500 hover:text-emerald-700" href={`/packs/${solution.recommendedPackSlug}`}>
                获取推荐 Pack
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="space-y-6">
            <section className="rounded-lg border border-zinc-200 bg-white p-5 sm:p-7">
              <div className="flex items-center gap-2">
                <Layers3 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <h2 className="text-2xl font-bold">Workflow 步骤</h2>
              </div>
              <div className="mt-6 space-y-4">
                {solution.steps.map((step, index) => (
                  <article className="rounded-lg border border-zinc-200 bg-zinc-50 p-4" key={step.title}>
                    <div className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-sm font-bold text-emerald-800">{index + 1}</span>
                      <div>
                        <h3 className="font-bold">{step.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-zinc-600">{step.description}</p>
                        <Link className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-800" href={`/search?q=${encodeURIComponent(step.promptId)}`}>
                          搜索这个 Prompt
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {example && (
              <section className="rounded-lg border border-zinc-200 bg-white p-5 sm:p-7">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                  <h2 className="text-2xl font-bold">示例输入 / 输出</h2>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-sm font-bold text-zinc-950">Example Input</p>
                    <ul className="mt-3 space-y-2 text-sm text-zinc-600">
                      {example.input.map((item) => (
                        <li className="flex gap-2" key={item}>
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-sm font-bold text-emerald-900">Expected Output</p>
                    <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                      {example.output.map((item) => (
                        <li className="flex gap-2" key={item}>
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            <section className="rounded-lg border border-zinc-200 bg-white p-5 sm:p-7">
              <div className="flex items-center gap-2">
                <PlayCircle className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <h2 className="text-2xl font-bold">如何使用</h2>
              </div>
              <div className="mt-5 grid gap-3">
                {usageSteps.map((item, index) => (
                  <div className="flex gap-3 rounded-md bg-zinc-50 p-3 text-sm text-zinc-700" key={item}>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-bold text-white">{index + 1}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-zinc-200 bg-white p-5 sm:p-7">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <h2 className="text-2xl font-bold">推荐 Prompt</h2>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {solution.recommendedPromptIds.map((promptId) => (
                  <Link className="rounded-md border border-zinc-200 bg-zinc-50 p-4 hover:border-emerald-300 hover:bg-emerald-50" href={`/search?q=${encodeURIComponent(promptId)}`} key={promptId}>
                    <p className="text-sm font-bold text-zinc-950">{promptId}</p>
                    <p className="mt-1 text-xs text-zinc-500">点击搜索并找到相近的可运行 Prompt</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-lg border border-zinc-200 bg-white p-5">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <h2 className="font-bold">适合人群</h2>
              </div>
              <ul className="mt-4 space-y-2">
                {solution.audience.map((item) => (
                  <li className="flex gap-2 text-sm text-zinc-600" key={item}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-lg border border-zinc-200 bg-white p-5">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <h2 className="font-bold">输出模板</h2>
              </div>
              <ul className="mt-4 space-y-2">
                {solution.outputTemplates.map((item) => (
                  <li className="rounded-md bg-zinc-50 px-3 py-2 text-sm font-semibold text-zinc-700" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-sm font-bold text-emerald-800">推荐下一步</p>
              <h2 className="mt-2 text-xl font-bold">{solution.recommendedPackTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">如果这个 Solution 能解决你的任务，就进入 Pack 页面查看案例、模板和完整资产。</p>
              <Link className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-bold text-white hover:bg-emerald-700" href={`/packs/${solution.recommendedPackSlug}`}>
                {solution.cta}
              </Link>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
