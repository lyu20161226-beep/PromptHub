"use client";

import { CheckCircle2, Mail } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { recordValidationEvent } from "@/lib/validation-events";

export function EmailCapture({ source = "homepage" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    setLoading(true);
    await recordValidationEvent("newsletter_subscribe", { email: cleanEmail, source });
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-900">
        <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
        已订阅。每周精选 Workflow 上线后会发送到你的邮箱。
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
      <label className="flex min-h-12 flex-1 items-center gap-3 rounded-md border border-zinc-300 bg-white px-4 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100">
        <Mail className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
        <span className="sr-only">邮箱</span>
        <input
          className="min-w-0 flex-1 bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="输入邮箱，免费订阅"
          required
          type="email"
          value={email}
        />
      </label>
      <button
        className="min-h-12 rounded-md bg-zinc-950 px-5 text-sm font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-zinc-400"
        disabled={loading}
        type="submit"
      >
        {loading ? "提交中..." : "每周领取一个 Workflow"}
      </button>
    </form>
  );
}
