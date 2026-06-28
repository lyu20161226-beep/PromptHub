import Link from "next/link";
import { CalendarDays, Heart, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-zinc-950">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-950 text-emerald-300">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-xl">PromptHub</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-semibold text-zinc-600" aria-label="主导航">
          <Link className="hidden rounded-md px-3 py-2 hover:bg-zinc-100 hover:text-zinc-950 sm:inline-flex" href="/">首页</Link>
          <Link className="rounded-md px-3 py-2 hover:bg-zinc-100 hover:text-zinc-950" href="/packs">Packs</Link>
          <Link className="hidden rounded-md px-3 py-2 hover:bg-zinc-100 hover:text-zinc-950 md:inline-flex" href="/academy">AI 实战学院</Link>
          <Link className="hidden rounded-md px-3 py-2 hover:bg-zinc-100 hover:text-zinc-950 lg:inline-flex" href="/lab">Prompt Lab</Link>
          <Link className="hidden rounded-md px-3 py-2 hover:bg-zinc-100 hover:text-zinc-950 xl:inline-flex" href="/cases">案例</Link>
          <Link className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-emerald-700 hover:bg-emerald-50" href="/daily">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">今日精选</span>
          </Link>
          <Link className="hidden rounded-md px-3 py-2 hover:bg-zinc-100 hover:text-zinc-950 sm:inline-flex" href="/prompts">免费资料库</Link>
          <Link className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 hover:bg-zinc-100 hover:text-zinc-950" href="/favorites">
            <Heart className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">收藏</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
