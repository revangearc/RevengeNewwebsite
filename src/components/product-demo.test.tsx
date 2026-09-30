import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProductDemo } from "./product-demo";
import { ScreenGalleryProvider } from "./screen-gallery";

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });
describe("mobile product demonstration", () => {
  it("advances only on input, resets each moment, and supports keyboard tabs", () => {
    render(<ProductDemo />);
    expect(screen.getByText("Dumbbell bench press")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Show next step" }));
    expect(screen.getByText("Set 1 · 10 reps · 35 lb")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: "Meal" }));
    expect(
      screen.getByText("Photo, barcode, search, voice or text"),
    ).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole("tab", { name: "Meal" }), {
      key: "ArrowRight",
    });
    expect(screen.getByRole("tab", { name: "GymBuddy" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "GymBuddy" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("What can I train today?")).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });
  it("has no mechanically detectable accessibility violations", async () => {
    const { container } = render(<ProductDemo />);
    expect((await axe(container)).violations).toEqual([]);
  });
  it("crossfades old pixels without duplicating the phone's interactive controls", () => {
    vi.useFakeTimers();
    const { container } = render(<ScreenGalleryProvider><ProductDemo /></ScreenGalleryProvider>);
    fireEvent.click(screen.getByRole("tab", { name: "Meal" }));
    expect(container.querySelector(".demo-screen-outgoing")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll(".demo-phone button")).toHaveLength(1);
    act(() => vi.advanceTimersByTime(400));
    expect(container.querySelector(".demo-screen-outgoing")).not.toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Meal" })).toHaveAttribute("aria-selected", "true");
  });
  it("shows a brief illustrative Buddy reply and cancels it on a rapid tab change", () => {
    vi.useFakeTimers();
    vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
    const { container } = render(<ProductDemo />);
    fireEvent.click(screen.getByRole("tab", { name: "GymBuddy" }));
    fireEvent.click(screen.getByRole("button", { name: "Show next step" }));
    expect(container.querySelector(".buddy-typing-dots")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(700));
    expect(screen.getByText("Find a session that fits your routine.")).toBeInTheDocument();
    expect(container.querySelector(".buddy-typing-dots")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: "Workout" }));
    expect(screen.getByText("Dumbbell bench press")).toBeInTheDocument();
    expect(vi.getTimerCount()).toBe(1); // Only the short outgoing-screen cleanup remains.
    act(() => vi.advanceTimersByTime(400));
    expect(vi.getTimerCount()).toBe(0);
  });
  it("shows the Buddy example immediately for reduced-motion visitors", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true, addEventListener() {}, removeEventListener() {} }));
    const { container } = render(<ProductDemo />);
    fireEvent.click(screen.getByRole("tab", { name: "GymBuddy" }));
    fireEvent.click(screen.getByRole("button", { name: "Show next step" }));
    expect(screen.getByText("Find a session that fits your routine.")).toBeInTheDocument();
    expect(container.querySelector(".buddy-typing-dots")).not.toBeInTheDocument();
  });
});
