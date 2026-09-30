import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { afterEach, describe, expect, it } from "vitest";
import { ProductDemo } from "./product-demo";

afterEach(cleanup);
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
});
