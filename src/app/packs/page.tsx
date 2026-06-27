import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, LockKeyhole, Sparkles } from "lucide-react";
import { PackInterestButton } from "@/components/PackInterestButton";
import { packs, type PackProduct } from "@/data/packs";

export const metadata: Metadata = {
  title: "PromptHub Workflow Packs - 精选 AI 工作流提示词包",
  description: "精选 AI 工作流提示词包，包含 Prompt、步骤、案例、模板和检查清单。先看结果，再决定是否获取完整包。",
  alternates: { canonical: "/packs" }
};

const featuredPacks = packs.filter((pack) => pack.status === "featured");
const comingSoonPacks = packs.filter((pack) => pack.status === "coming-soon");

export default function PacksPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-emerald-700">PromptHub Workflow Packs</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">
              精选 AI 工作流提示词包，帮你更快完成具体任务
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">
              每个 Pack 包含 Prompt、步骤、案例、模板和检查清单。先看结果，再决定是否获取完整包。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-bold text-white hover:bg-emerald-700" href="#featured">
                查看主推 Packs <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-300 px-5 text-sm font-bold text-zinc-700 hover:border-emerald-500 hover:text-emerald-700" href="/">
                浏览免费 Prompt
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16" id="featured">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">主推 Packs</p>
              <h2 className="mt-2 text-3xl font-bold text-zinc-950">先用 3 个完整产品验证付费意向</h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-zinc-600">
              这三个 Pack 已包含 Before / After、完整 Workflow、资产清单和免费预览。
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {featuredPacks.map((pack) => (
              <FeaturedPackCard key={pack.slug} pack={pack} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-emerald-700">Coming Soon</p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-950">加入等待名单，帮助决定下一个 Pack</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              这些方向暂时不展开复杂内容。真实的邮箱意向将决定优先开发顺序。
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {comingSoonPacks.map((pack) => (
              <article className="flex h-full flex-col rounded-lg border border-zinc-200 bg-zinc-50 p-5" key={pack.slug}>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-zinc-600">{pack.category}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700">
                    <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                    即将上线
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-zinc-950">{pack.title}</h3>
                <p className="mt-3 font-semibold leading-6 text-emerald-700">{pack.promise}</p>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{pack.description}</p>
                <div className="mt-auto pt-6">
                  <PackInterestButton
                    label="加入等待名单"
                    packSlug={pack.slug}
                    packTitle={pack.title}
                    source="packs-coming-soon"
                    variant="secondary"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-12 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-emerald-300">为什么不是普通 Prompt？</p>
              <h2 className="mt-2 text-3xl font-bold">一套 Pack，就是一条从问题到结果的路径</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["明确使用场景", "真实 Before / After", "可复制 Workflow", "Prompt 与输出模板", "常见错误与检查清单", "持续更新说明"].map((item) => (
                <div className="flex gap-2 rounded-md border border-zinc-800 bg-zinc-900 p-4 text-sm font-semibold text-zinc-200" key={item}>
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeaturedPackCard({ pack }: { pack: PackProduct }) {
  const deepDive = pack.deepDive;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-100 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">{pack.category}</span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-500">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
            主推
          </span>
        </div>
        <h3 className="mt-5 text-2xl font-bold text-zinc-950">{pack.title}</h3>
        <p className="mt-3 text-lg font-bold leading-7 text-emerald-700">{pack.promise}</p>
        <p className="mt-3 text-sm leading-6 text-zinc-600">适合：{pack.audience}</p>
      </div>

      {deepDive && (
        <div className="grid gap-3 bg-zinc-50 p-5">
          <div className="rounded-md border border-red-100 bg-white p-3">
            <p className="text-xs font-bold text-red-600">Before</p>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600">{deepDive.beforeAfter.before}</p>
          </div>
          <div className="rounded-md border border-emerald-100 bg-white p-3">
            <p className="text-xs font-bold text-emerald-700">After</p>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600">{deepDive.beforeAfter.after[0]}</p>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <ul className="space-y-2">
          {pack.includes.slice(0, 4).map((item) => (
            <li className="flex gap-2 text-sm leading-6 text-zinc-700" key={item}>
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-xs text-zinc-400">一次性验证价</p>
              <p className="text-3xl font-bold text-zinc-950">¥{pack.price}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500">
              <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
              完整内容待解锁
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <Link className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-300 px-4 text-sm font-bold text-zinc-700 hover:border-emerald-500 hover:text-emerald-700" href={`/packs/${pack.slug}#free-preview`}>
              免费预览
            </Link>
            <PackInterestButton
              label="获取完整 Pack"
              packSlug={pack.slug}
              packTitle={pack.title}
              source="packs-featured"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
