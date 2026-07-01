"use client";

import { Mail, X } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { recordValidationEvent } from "@/lib/validation-events";

type PackInterestButtonProps = {
  packSlug: string;
  packTitle: string;
  label?: string;
  source?: string;
  variant?: "primary" | "secondary";
};

export function PackInterestButton({
  packSlug,
  packTitle,
  label = "获取完整 Pack",
  source = "pack-detail",
  variant = "primary"
}: PackInterestButtonProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function openModal() {
    setOpen(true);
    void recordValidationEvent("pack_click", { packSlug, source });
  }

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, packSlug, source })
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(result.error ?? "提交失败，请稍后再试。");
        return;
      }

      await recordValidationEvent("pack_email_submit", { packSlug, source });
      setSubmitted(true);
    } catch {
      setError("网络连接失败，请稍后再试。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button
        className={
          variant === "primary"
            ? "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-bold text-white hover:bg-emerald-700"
            : "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-5 text-sm font-bold text-zinc-700 hover:border-emerald-500 hover:text-emerald-700"
        }
        onClick={openModal}
        type="button"
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 px-4">
          <div aria-labelledby="waitlist-title" aria-modal="true" className="w-full max-w-md rounded-lg bg-white p-5 shadow-xl" role="dialog">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-emerald-700">AI Playbook 内测计划</p>
                <h2 className="mt-1 text-xl font-bold text-zinc-950" id="waitlist-title">{packTitle}</h2>
              </div>
              <button aria-label="关闭" className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100" onClick={() => setOpen(false)} type="button">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {submitted ? (
              <div className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 p-4">
                <p className="font-bold text-emerald-900">已加入等待名单。</p>
                <p className="mt-2 text-sm leading-6 text-emerald-800">Playbook 开放内测时，我们会优先发送体验邀请和首发通知。</p>
              </div>
            ) : (
              <form className="mt-5" onSubmit={submitEmail}>
                <label className="block">
                  <span className="text-sm font-semibold text-zinc-700">邮箱</span>
                  <input
                    className="mt-2 min-h-11 w-full rounded-md border border-zinc-300 px-3 text-sm text-zinc-950 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                    type="email"
                    value={email}
                  />
                </label>
                {error && <p aria-live="polite" className="mt-3 text-sm font-medium text-rose-700">{error}</p>}
                <button className="mt-4 min-h-11 w-full rounded-md bg-zinc-950 px-4 text-sm font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-zinc-400" disabled={submitting} type="submit">
                  {submitting ? "正在提交..." : "免费加入等待名单"}
                </button>
                <p className="mt-3 text-xs leading-5 text-zinc-500">邮箱仅用于该 Playbook 的内测、首发和早鸟通知，记录最多保留 12 个月，不会用于无关推广。</p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
