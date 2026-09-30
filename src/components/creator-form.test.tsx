import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { CreatorForm } from "./creator-form";

describe("CreatorForm accessibility", () => {
  it("has no mechanically detectable accessibility violations", async () => {
    const { container } = render(<CreatorForm />);
    const result = await axe(container);
    expect(result.violations).toEqual([]);
  });
});
