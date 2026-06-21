import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div><Link className="inline-flex items-center gap-2 font-bold text-zinc-950" href="/"><span className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-950 text-emerald-300"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" /></span>PromptHub</Link><p className="mt-2 text-sm text-zinc-500">不只提供 Prompt，更提供完成任务的方法。</p></div>
        <nav aria-label="页脚导航" className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-zinc-600"><Link className="hover:text-emerald-700" href="/workflows">精选工作流</Link><Link className="hover:text-emerald-700" href="/packs">工作流包</Link><Link className="hover:text-emerald-700" href="/about">关于 PromptHub</Link><Link className="hover:text-emerald-700" href="/favorites">我的收藏</Link></nav>
      </div>
    </footer>
  );
}
