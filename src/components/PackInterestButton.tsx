"use client";

import { Mail, X } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { recordValidationEvent } from "@/lib/validation-events";

type PackInterestButtonProps = {
  packSlug: string;
  packTitle: string;
};

export function PackInterestButton({ packSlug, packTitle }: PackInterestButtonProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function openModal() {
    setOpen(true);
    void recordValidationEvent("pack_click", { packSlug, source: "pack-detail" });
  }

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    await recordValidationEvent("pack_email_submit", {
      packSlug,
      email: cleanEmail,
      source: "pack-detail"
    });

    setSubmitted(true);
  }

  return (
    <>
      <button
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-bold text-white hover:bg-emerald-700"
        onClick={openModal}
        type="button"
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        获取该 Pack
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-emerald-700">首发通知</p>
                <h2 className="mt-1 text-xl font-bold text-zinc-950">{packTitle}</h2>
              </div>
              <button aria-label="关闭" className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100" onClick={() => setOpen(false)} type="button">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {submitted ? (
              <div className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 p-4">
                <p className="font-bold text-emerald-900">即将上线，首发通知已记录。</p>
                <p className="mt-2 text-sm leading-6 text-emerald-800">上线后会优先通知你。现在这条提交已经用于验证 Pack 购买意向。</p>
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
                <button className="mt-4 min-h-11 w-full rounded-md bg-zinc-950 px-4 text-sm font-bold text-white hover:bg-emerald-700" type="submit">
                  即将上线，首发通知
                </button>
                <p className="mt-3 text-xs leading-5 text-zinc-500">当前不接支付，只记录购买意向，用于判断哪个 Pack 值得优先上线。</p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
