import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <section
      data-download-entry
      className="page-hero relative overflow-hidden border-b border-white/10 pb-10 pt-28 sm:pb-16 sm:pt-36"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-12 h-[30rem] w-[48rem] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]"
      />
      <div className="content-shell relative">
        <p className="utility-text text-xs text-violet-300">{eyebrow}</p>
        <h1 className="display-text mt-4 max-w-5xl text-[clamp(3rem,10vw,7rem)] font-bold uppercase leading-[0.94] text-white">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
          {description}
        </p>
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  );
}
