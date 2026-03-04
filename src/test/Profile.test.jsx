import Profile from "../components/Profile";
import { screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { data as MOCK_DATA } from "./mock-data/edit.mock";
import { createMockStore, renderWithProviders } from "./test-utils/test-util";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Profile Component", () => {
  // 1 - Render
  // 2 - Query
  // 3 - Expect

  let mockNavigate;

  const setup = (userData = MOCK_DATA) => {
    const store = createMockStore({ user: userData });
    return renderWithProviders(<Profile />, { store });
  };

  const event = userEvent.setup();
  setup();

  beforeEach(() => {
    mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("should display user information in form field", () => {
    expect(screen.getByPlaceholderText(/first name/i)).toHaveValue("Harvey");
    expect(screen.getByPlaceholderText(/skills/i)).toHaveValue(
      "developer,hustler",
    );
  });

  it("should display correct number of skills", () => {
    // setup();

    const skillsInput = screen.getByPlaceholderText(/skills/i);
    const skillsCount = skillsInput.value.split(",").length;

    expect(skillsCount).toBe(2);
  });

  it("should not redirect when clicking Interested button", async () => {
    const interestedButton = screen.getByRole("button", { name: "Interested" });
    await event.click(interestedButton);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("should not redirect when clicking ignored button", async () => {
    const ignoredButton = screen.getByRole("button", { name: "Ignored" });
    await event.click(ignoredButton);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
