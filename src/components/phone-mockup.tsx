import { ScreenPreviewButton } from "./screen-gallery";

export function PhoneMockup({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const stem = src.replace(/\.png$/, "");
  return (
    <div style={{ backgroundImage: `url(${stem}-preview.webp)`, backgroundSize: "cover" }} className={`relative aspect-[9/19.5] overflow-hidden rounded-[2.5rem] border-[7px] border-[#19171d] bg-black shadow-[0_30px_90px_rgba(0,0,0,.66),0_0_0_1px_rgba(255,255,255,.22),0_0_50px_rgba(168,85,247,.18)] sm:rounded-[3rem] sm:border-[9px] ${className}`}>
      {/* Pre-generated responsive assets keep app previews independent of the image optimizer. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${stem}-640.webp`} srcSet={`${stem}-360.webp 360w, ${stem}-640.webp 640w, ${stem}-853.webp 853w`} sizes="(max-width: 767px) 70vw, (max-width: 1023px) 40vw, 420px" alt={alt} width={853} height={1844} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <span aria-hidden="true" className="absolute left-1/2 top-2 z-10 h-[1.25rem] w-[32%] -translate-x-1/2 rounded-full bg-black shadow-[0_1px_0_rgba(255,255,255,.09)] sm:top-3 sm:h-[1.55rem]" />
      <span aria-hidden="true" className="absolute inset-y-[6%] left-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      <ScreenPreviewButton src={src} />
    </div>
  );
}
