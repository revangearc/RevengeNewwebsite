import Link from "next/link";

export default function NotFound() {
  return <main id="main-content" className="content-shell grid min-h-svh place-items-center py-24 text-center"><div><p className="utility-text text-xs text-violet-300">404 · Arc not found</p><h1 className="display-text mt-4 text-[clamp(5rem,18vw,10rem)] font-bold uppercase leading-[0.8] text-white">Wrong path.<br /><span className="text-gradient-violet">Keep moving.</span></h1><p className="mx-auto mt-6 max-w-lg text-zinc-400">This page does not exist or has moved.</p><Link href="/" className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-violet-600 px-5 text-sm font-bold text-white">Return home</Link></div></main>;
}
