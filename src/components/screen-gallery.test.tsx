import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ScreenGalleryProvider, ScreenPreviewButton } from "./screen-gallery";

beforeEach(() => {
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", { configurable: true, value: function (this: HTMLDialogElement) { this.setAttribute("open", ""); } });
  Object.defineProperty(HTMLDialogElement.prototype, "close", { configurable: true, value: function (this: HTMLDialogElement) { this.removeAttribute("open"); } });
  Object.defineProperty(Element.prototype, "scrollTo", { configurable: true, value: vi.fn() });
});
afterEach(() => { cleanup(); Reflect.deleteProperty(HTMLDialogElement.prototype, "showModal"); Reflect.deleteProperty(HTMLDialogElement.prototype, "close"); Reflect.deleteProperty(Element.prototype, "scrollTo"); });

function openGallery() {
  render(<ScreenGalleryProvider><ScreenPreviewButton src="/assets/app-screens/home.png" /></ScreenGalleryProvider>);
  const trigger = screen.getByRole("button", { name: "Explore Your daily home screen" });
  trigger.focus();
  fireEvent.click(trigger);
  return trigger;
}

describe("app screenshot gallery", () => {
  it("opens, wraps between screens, zooms, and restores focus and scrolling on close", () => {
    const trigger = openGallery();
    expect(screen.getByRole("dialog", { name: "Your daily home" })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.click(screen.getByRole("button", { name: "Previous screen" }));
    expect(screen.getByRole("heading", { name: "Prove" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next screen" }));
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "ArrowRight" });
    expect(screen.getByRole("heading", { name: "Train" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Zoom in" }));
    expect(screen.getByRole("button", { name: "Fit screen" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Close screen preview" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
    expect(trigger).toHaveFocus();
  });

  it("swipes horizontally without treating a vertical scroll or zoomed pan as navigation", () => {
    openGallery();
    const stage = document.querySelector(".gallery-stage")!;
    fireEvent.touchStart(stage, { touches: [{ clientX: 250, clientY: 200 }] });
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 240, clientY: 350 }] });
    expect(screen.getByRole("heading", { name: "Your daily home" })).toBeInTheDocument();
    fireEvent.touchStart(stage, { touches: [{ clientX: 250, clientY: 200 }] });
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 80, clientY: 205 }] });
    expect(screen.getByRole("heading", { name: "Train" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Zoom in" }));
    fireEvent.touchStart(stage, { touches: [{ clientX: 250, clientY: 200 }] });
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 80, clientY: 205 }] });
    expect(screen.getByRole("heading", { name: "Train" })).toBeInTheDocument();
    fireEvent(screen.getByRole("dialog"), new Event("cancel", { bubbles: false, cancelable: true }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
