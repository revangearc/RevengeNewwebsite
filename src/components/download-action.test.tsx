import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/content/site", () => ({ APP_STORE_URL: null }));
import { DownloadAction } from "./download-action";

afterEach(cleanup);
describe("pre-launch download action", () => {
  it("provides an honest usable next step without a fabricated listing or disabled button", () => {
    render(<DownloadAction placement="test" />);
    const link = screen.getByRole("link", {
      name: "See iPhone launch details",
    });
    expect(link).toHaveAttribute("href", "/#app-launch");
    expect(link).not.toHaveAttribute("target");
  });
});
