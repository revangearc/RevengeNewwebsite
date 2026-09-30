import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const base = "pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition-[background-color,border-color,color,box-shadow,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 disabled:cursor-not-allowed disabled:opacity-50";

export function PrimaryLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} className={`${base} border border-violet-300/40 bg-violet-600 text-white shadow-[0_0_24px_rgba(168,85,247,.26)] hover:-translate-y-0.5 hover:bg-violet-500 ${props.className ?? ""}`} />;
}

export function SecondaryLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} className={`${base} border border-white/15 bg-white/[0.04] text-zinc-100 hover:border-white/30 hover:bg-white/[0.08] ${props.className ?? ""}`} />;
}

export function PrimaryButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`${base} border border-violet-300/40 bg-violet-600 text-white shadow-[0_0_24px_rgba(168,85,247,.26)] hover:-translate-y-0.5 hover:bg-violet-500 ${props.className ?? ""}`} />;
}
