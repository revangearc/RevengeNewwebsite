import Image from "next/image";
import Link from "next/link";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="group flex min-h-11 items-center gap-2" href="/" aria-label="Revenge Arc home">
      <span className="relative block h-14 w-14 shrink-0">
        <Image src="/assets/brand/ra-logo-header.webp" alt="" fill unoptimized className="object-contain drop-shadow-[0_0_9px_rgba(168,85,247,.32)]" preload />
        <span className="brand-shine" aria-hidden="true"><span className="brand-shine-light" /></span>
      </span>
      {!compact && (
        <span className="utility-text whitespace-nowrap text-[0.67rem] font-bold text-white transition-colors duration-200 group-hover:text-violet-200">
          Revenge Arc
        </span>
      )}
    </Link>
  );
}
