import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Code2, Lightbulb, Megaphone, SearchCheck, Target, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "关于 PromptHub",
  description: "了解 PromptHub 为什么选择 AI 工作流库与精品提示词包模式，以及我们服务的用户、内容标准和商业路径。",
  alternates: { canonical: "/about" }
};

const audiences = [
  { title: "独立开发者", needs: "产品调研、竞品分析、落地页、Bug 定位", icon: Code2 },
  { title: "内容创作者", needs: "选题策划、SEO、长文与视频脚本", icon: Lightbulb },
  { title: "营销从业者", needs: "用户洞察、营销方案、转化文案与销售沟通", icon: Megaphone },
  { title: "求职者", needs: "简历优化、面试准备与职业表达", icon: Target },
  { title: "中小企业经营者", needs: "商业分析、运营策略、客服与团队协作", icon: BriefcaseBusiness }
];

const workflowParts = ["问题定义", "使用场景", "可复制 Prompt", "示例输入与输出", "常见错误", "优化技巧", "推荐模型与参数"];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <p className="text-sm font-semibold text-emerald-700">关于 PromptHub</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">我们不出售一段文字，而是整理完成任务的方法</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">PromptHub 是中文 AI 工作流库与精品工作流包商店。免费工作流帮助用户快速解决问题，成套内容则把经验、案例和输出模板组织成可复用的方法。</p>
          <div className="mt-7 flex flex-wrap gap-3"><Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-emerald-700" href="/workflows">浏览精选工作流 <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-300 px-5 text-sm font-semibold text-zinc-700 hover:border-emerald-500 hover:text-emerald-700" href="/packs">查看工作流包</Link></div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-950 py-12 text-white sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div><p className="text-sm font-semibold text-emerald-300">产品定位</p><h2 className="mt-2 text-3xl font-bold">AI 工作流库 + 精品工作流包</h2><p className="mt-4 max-w-xl text-sm leading-7 text-zinc-300">我们不建设需要作者、审核、分成与退款体系的双边市场。PromptHub 选择编辑精选模式：先验证少量高价值工作流，再按职业场景组合成轻量商品。</p></div>
          <div className="border-t border-zinc-700 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"><p className="text-sm font-semibold text-emerald-300">核心理念</p><blockquote className="mt-3 text-2xl font-bold leading-10">用户购买的不是 Prompt，而是结果、经验与节省的时间。</blockquote></div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><div className="flex items-center gap-2 text-emerald-700"><Users className="h-5 w-5" aria-hidden="true" /><p className="text-sm font-semibold">我们服务谁</p></div><h2 className="mt-3 text-3xl font-bold text-zinc-950">不服务所有 AI 用户，只聚焦高频工作问题</h2></div>
          <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">{audiences.map(({ title, needs, icon: Icon }) => <article className="border-l-2 border-emerald-500 pl-4" key={title}><Icon className="h-5 w-5 text-zinc-900" aria-hidden="true" /><h3 className="mt-3 font-bold text-zinc-950">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-600">{needs}</p></article>)}</div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div><div className="flex items-center gap-2 text-emerald-700"><SearchCheck className="h-5 w-5" aria-hidden="true" /><p className="text-sm font-semibold">内容标准</p></div><h2 className="mt-3 text-3xl font-bold text-zinc-950">每个工作流都必须解释为什么有效</h2><p className="mt-4 text-sm leading-7 text-zinc-600">普通提示词网站止步于复制文本。PromptHub 把工作流做成可检查、可学习、可继续优化的实战手册。</p></div>
          <div className="grid gap-3 sm:grid-cols-2">{workflowParts.map((part) => <div className="flex min-h-14 items-center gap-3 rounded-md border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-800" key={part}><CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />{part}</div>)}</div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-emerald-700">商业路径</p><h2 className="mt-2 text-3xl font-bold text-zinc-950">先证明有用，再逐步收费</h2>
          <ol className="mt-8 grid gap-0 border-y border-zinc-200 md:grid-cols-3 md:divide-x md:divide-zinc-200">{[
            ["01", "免费验证", "开放精选工作流、验证记录和 SEO 页面，用真实浏览、复制与反馈决定保留内容。"],
            ["02", "一次性工作流包", "以 9.9–49 元提供垂直合集，让用户为完整方法付费，而不是为一句 Prompt 付费。"],
            ["03", "验证后再考虑订阅", "只有持续更新和高级教程被证明有需求时，才评估会员订阅，不提前建设复杂系统。"]
          ].map(([number, title, description]) => <li className="py-6 md:px-7" key={number}><span className="text-sm font-bold text-emerald-700">{number}</span><h3 className="mt-2 text-xl font-bold text-zinc-950">{title}</h3><p className="mt-3 text-sm leading-7 text-zinc-600">{description}</p></li>)}</ol>
        </div>
      </section>
    </main>
  );
}
