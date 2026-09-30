"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, { message: "" });
  return (
    <form action={action} className="mt-8 grid gap-5">
      <label className="text-sm font-semibold text-zinc-300">Username<input name="username" type="text" required minLength={3} maxLength={64} autoComplete="username" autoCapitalize="none" spellCheck={false} className="mt-2 min-h-12 w-full rounded-xl border border-white/15 bg-black/50 px-4 text-white focus:border-violet-400 focus:outline-none" /></label>
      <label className="text-sm font-semibold text-zinc-300">Password<input name="password" type="password" required minLength={8} autoComplete="current-password" className="mt-2 min-h-12 w-full rounded-xl border border-white/15 bg-black/50 px-4 text-white focus:border-violet-400 focus:outline-none" /></label>
      {state.message && <p role="alert" className="rounded-xl border border-rose-400/25 bg-rose-400/[0.06] p-3 text-sm text-rose-200">{state.message}</p>}
      <button disabled={pending} className="min-h-12 rounded-xl bg-violet-600 px-5 text-sm font-bold text-white hover:bg-violet-500 disabled:opacity-50">{pending ? "Logging in…" : "Log in"}</button>
    </form>
  );
}
