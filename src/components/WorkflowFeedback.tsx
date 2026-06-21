"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { recordValidationEvent } from "@/lib/validation-events";

export function WorkflowFeedback({ workflowId }: { workflowId: string }) {
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const storageKey = `prompthub:feedback:${workflowId}`;

  useEffect(() => {
    setSubmitted(window.localStorage.getItem(storageKey) === "submitted");
  }, [storageKey]);

  async function submitFeedback() {
    if (helpful === null) return;
    await recordValidationEvent("feedback", { workflowId, helpful, reason: reason.trim() });
    window.localStorage.setItem(storageKey, "submitted");
    setSubmitted(true);
  }

  if (submitted) {
    return <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-semibold text-emerald-800">感谢反馈，这会帮助我们决定下一批重点优化的工作流。</p>;
  }

  return (
    <section className="mt-9 border-t border-zinc-200 pt-8">
      <h2 className="text-xl font-bold text-zinc-950">这个工作流对你有帮助吗？</h2>
      <p className="mt-2 text-sm text-zinc-500">匿名反馈，不收集姓名、邮箱或设备信息。</p>
      <div className="mt-5 flex gap-3" role="group" aria-label="帮助度反馈">
        <button className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md border px-4 text-sm font-semibold transition ${helpful === true ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-zinc-300 text-zinc-700 hover:border-emerald-500"}`} onClick={() => setHelpful(true)} type="button"><ThumbsUp className="h-4 w-4" aria-hidden="true" />有帮助</button>
        <button className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md border px-4 text-sm font-semibold transition ${helpful === false ? "border-rose-500 bg-rose-50 text-rose-700" : "border-zinc-300 text-zinc-700 hover:border-rose-400"}`} onClick={() => setHelpful(false)} type="button"><ThumbsDown className="h-4 w-4" aria-hidden="true" />没帮助</button>
      </div>
      {helpful !== null && (
        <div className="mt-4">
          <label className="text-sm font-semibold text-zinc-700" htmlFor={`feedback-${workflowId}`}>为什么？（选填）</label>
          <textarea className="mt-2 min-h-24 w-full resize-y rounded-md border border-zinc-300 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" id={`feedback-${workflowId}`} maxLength={500} onChange={(event) => setReason(event.target.value)} placeholder="哪一步最有用，或者哪里没有解决你的问题？" value={reason} />
          <button className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-emerald-700 sm:w-auto" onClick={submitFeedback} type="button">提交匿名反馈</button>
        </div>
      )}
    </section>
  );
}
