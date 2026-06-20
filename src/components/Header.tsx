import Link from "next/link";
import { Heart, Search, Sparkles } from "lucide-react";

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
        <nav className="flex items-center gap-1 overflow-x-auto text-sm font-medium text-zinc-600" aria-label="主导航">
          <Link className="whitespace-nowrap rounded-md px-3 py-2 hover:bg-zinc-100 hover:text-zinc-950" href="/midjourney">
            Midjourney
          </Link>
          <Link className="whitespace-nowrap rounded-md px-3 py-2 hover:bg-zinc-100 hover:text-zinc-950" href="/jimeng">
            即梦
          </Link>
          <Link className="whitespace-nowrap rounded-md px-3 py-2 hover:bg-zinc-100 hover:text-zinc-950" href="/chatgpt">
            ChatGPT
          </Link>
          <Link className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 hover:bg-zinc-100 hover:text-zinc-950" href="/favorites">
            <Heart className="h-4 w-4" aria-hidden="true" />
            我的收藏
          </Link>
          <Link
            aria-label="搜索提示词"
            className="ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-zinc-950 text-white transition hover:bg-emerald-700"
            href="/search"
            title="搜索提示词"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
