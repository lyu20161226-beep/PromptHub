"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { recordValidationEvent } from "@/lib/validation-events";

const VISITED_KEY = "prompthub:validation-pages";
const COMPLETE_KEY = "prompthub:validation-survey-complete";
const DISMISSED_KEY = "prompthub:validation-survey-dismissed";
const options = ["编程", "SEO", "求职", "营销", "学习", "其他"];

export function ValidationSurvey() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [need, setNeed] = useState("");
  const [otherNeed, setOtherNeed] = useState("");

  useEffect(() => {
    if (window.localStorage.getItem(COMPLETE_KEY) === "true" || window.sessionStorage.getItem(DISMISSED_KEY) === "true") return;

    try {
      const visited = JSON.parse(window.localStorage.getItem(VISITED_KEY) ?? "[]") as string[];
      const nextVisited = visited.includes(pathname) ? visited : [...visited, pathname].slice(-20);
      window.localStorage.setItem(VISITED_KEY, JSON.stringify(nextVisited));
      if (nextVisited.length >= 3) setOpen(true);
    } catch {
      window.localStorage.setItem(VISITED_KEY, JSON.stringify([pathname]));
    }
  }, [pathname]);

  function dismiss() {
    window.sessionStorage.setItem(DISMISSED_KEY, "true");
    setOpen(false);
  }

  async function submit() {
    if (!need || (need === "其他" && !otherNeed.trim())) return;
    await recordValidationEvent("survey", { need, otherNeed: otherNeed.trim() });
    window.localStorage.setItem(COMPLETE_KEY, "true");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/35 p-3 sm:items-center" role="presentation">
      <section aria-labelledby="validation-survey-title" aria-modal="true" className="w-full max-w-lg rounded-lg border border-zinc-200 bg-white p-5 shadow-2xl sm:p-6" role="dialog">
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-sm font-semibold text-emerald-700">30 秒匿名调研</p><h2 className="mt-1 text-xl font-bold text-zinc-950" id="validation-survey-title">你最想解决什么问题？</h2></div>
          <button aria-label="暂时关闭调研" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700" onClick={dismiss} type="button"><X className="h-4 w-4" aria-hidden="true" /></button>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {options.map((option) => <button className={`min-h-11 rounded-md border px-3 text-sm font-semibold transition ${need === option ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-zinc-300 text-zinc-700 hover:border-emerald-400"}`} key={option} onClick={() => setNeed(option)} type="button">{option}</button>)}
        </div>
        {need === "其他" && <label className="mt-4 block text-sm font-semibold text-zinc-700">请简单描述<input autoFocus className="mt-2 min-h-11 w-full rounded-md border border-zinc-300 px-3 font-normal outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" maxLength={120} onChange={(event) => setOtherNeed(event.target.value)} placeholder="例如：提高客服回复效率" value={otherNeed} /></label>}
        <button className="mt-5 min-h-11 w-full rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-zinc-300" disabled={!need || (need === "其他" && !otherNeed.trim())} onClick={submit} type="button">提交</button>
        <p className="mt-3 text-center text-xs text-zinc-400">仅记录你的选项，不收集个人身份信息。</p>
      </section>
    </div>
  );
}
