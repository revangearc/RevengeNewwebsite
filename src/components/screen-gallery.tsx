"use client";

import {
  ArrowLeft,
  ArrowRight,
  MagnifyingGlassPlus,
  MagnifyingGlassMinus,
  X,
  ArrowsOutSimple,
} from "@phosphor-icons/react";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { chapters } from "@/content/site";
import { DownloadAction } from "./download-action";

const screens = [
  {
    src: "/assets/app-screens/home.png",
    title: "Your daily home",
    description: "Your next step, weekly report, and streak in one place.",
    alt: "Revenge Arc home screen with a weekly report, challenge, and streak",
  },
  ...chapters.map((chapter) => ({
    src: chapter.screen,
    title: chapter.title,
    description: chapter.summary,
    alt: chapter.imageAlt,
  })),
];
const GalleryContext = createContext<((src: string) => void) | null>(null);

export function ScreenGalleryProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<{
    index: number;
    trigger: HTMLElement | null;
  } | null>(null);
  function open(src: string) {
    const index = screens.findIndex((screen) => screen.src === src);
    if (index >= 0)
      setSelected({
        index,
        trigger: document.activeElement as HTMLElement | null,
      });
  }
  return (
    <GalleryContext value={open}>
      {children}
      {selected !== null &&
        createPortal(
          <ScreenGallery
            initialIndex={selected.index}
            restoreFocus={selected.trigger}
            onDismiss={() => setSelected(null)}
          />,
          document.body,
        )}
    </GalleryContext>
  );
}

export function ScreenPreviewButton({ src }: { src: string }) {
  const open = useContext(GalleryContext);
  const screen = screens.find((item) => item.src === src);
  if (!open || !screen) return null;
  return (
    <button
      type="button"
      className="screen-preview-trigger"
      onClick={() => open(src)}
      aria-label={`Explore ${screen.title} screen`}
      aria-haspopup="dialog"
    >
      <span>
        <ArrowsOutSimple size={15} aria-hidden="true" /> Explore screen
      </span>
    </button>
  );
}

function ScreenGallery({
  initialIndex,
  restoreFocus,
  onDismiss,
}: {
  initialIndex: number;
  restoreFocus: HTMLElement | null;
  onDismiss: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState("");
  const [failedSrc, setFailedSrc] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const screen = screens[index];

  useEffect(() => {
    // Warm only neighboring captures while the viewer is open; never download
    // the entire gallery on page entry or on a data-saving connection.
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (connection?.saveData) return;
    const links = [-1, 1].map((offset) => {
      const image = screens[(index + offset + screens.length) % screens.length];
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = image.src.replace(".png", "-853.webp");
      document.head.appendChild(link);
      return link;
    });
    return () => links.forEach((link) => link.remove());
  }, [index]);

  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element?.showModal();
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      restoreFocus?.focus({ preventScroll: true });
    };
  }, [restoreFocus]);

  function select(next: number) {
    setIndex((next + screens.length) % screens.length);
    setZoomed(false);
    stage.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }

  return (
    <dialog
      ref={dialog}
      className="screen-gallery"
      aria-labelledby="screen-gallery-title"
      aria-describedby="screen-gallery-help"
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onDismiss();
      }}
      onKeyDown={(event) => {
        if (zoomed) return;
        if (event.key === "ArrowRight") {
          event.preventDefault();
          select(index + 1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          select(index - 1);
        }
      }}
    >
      <div className="gallery-panel">
        <div className="gallery-header">
          <div aria-live="polite" aria-atomic="true">
            <p className="utility-text text-[.6rem] text-violet-300">
              Inside Revenge Arc · {index + 1} / {screens.length}
            </p>
            <h2 id="screen-gallery-title" className="mt-1 text-lg font-bold">
              {screen.title}
            </h2>
          </div>
          <button
            type="button"
            className="gallery-icon-button"
            aria-label="Close screen preview"
            onClick={onDismiss}
            autoFocus
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        <div
          ref={stage}
          className={`gallery-stage ${zoomed ? "is-zoomed" : ""}`}
          onTouchStart={(event) => {
            touch.current =
              !zoomed && event.touches.length === 1
                ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
                : null;
          }}
          onTouchCancel={() => {
            touch.current = null;
          }}
          onTouchEnd={(event) => {
            const start = touch.current;
            touch.current = null;
            if (!start || zoomed || !event.changedTouches[0]) return;
            const dx = event.changedTouches[0].clientX - start.x;
            const dy = event.changedTouches[0].clientY - start.y;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.3)
              select(index + (dx < 0 ? 1 : -1));
          }}
        >
          {/* Original-resolution, pre-compressed capture for close inspection. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={screen.src}
            src={screen.src.replace(".png", "-853.webp")}
            style={{
              backgroundImage: `url(${screen.src.replace(".png", "-preview.webp")})`,
              backgroundSize: "cover",
            }}
            alt={screen.alt}
            width={853}
            height={1844}
            draggable={false}
            onLoad={() => setLoadedSrc(screen.src)}
            onError={() => setFailedSrc(screen.src)}
          />
          {loadedSrc !== screen.src && (
            <span className="gallery-loading" role="status">
              {failedSrc === screen.src
                ? "Preview unavailable. Try another screen."
                : "Loading preview…"}
            </span>
          )}
        </div>
        <div className="gallery-footer">
          <p className="text-sm text-zinc-300">{screen.description}</p>
          <p className="text-xs text-zinc-400">
            App preview · example records. Screens may change.
          </p>
          <div className="gallery-controls">
            <button
              type="button"
              className="gallery-icon-button"
              aria-label="Previous screen"
              onClick={() => select(index - 1)}
            >
              <ArrowLeft size={21} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="gallery-zoom-button"
              aria-pressed={zoomed}
              onClick={() => {
                setZoomed(!zoomed);
                stage.current?.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "instant",
                });
              }}
            >
              {zoomed ? (
                <MagnifyingGlassMinus size={18} aria-hidden="true" />
              ) : (
                <MagnifyingGlassPlus size={18} aria-hidden="true" />
              )}
              {zoomed ? "Fit screen" : "Zoom in"}
            </button>
            <button
              type="button"
              className="gallery-icon-button"
              aria-label="Next screen"
              onClick={() => select(index + 1)}
            >
              <ArrowRight size={21} aria-hidden="true" />
            </button>
          </div>
          <p
            id="screen-gallery-help"
            className="text-center text-xs text-zinc-400"
          >
            {zoomed
              ? "Scroll to inspect details. Fit screen to swipe again."
              : "Swipe or use the arrows to explore. Escape closes."}
          </p>
          <DownloadAction
            placement="screen_gallery"
            onClick={onDismiss}
            className="gallery-download"
          />
        </div>
      </div>
    </dialog>
  );
}
