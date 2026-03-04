import Hero from "../components/Hero";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter } from "react-router";
import userEvent from "@testing-library/user-event";

describe("Hero", () => {
  it("should contain get started button", () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>,
    );

    const getStarted = screen.getByRole("button", { name: "Get started" });

    expect(getStarted).toBeInTheDocument();
  });

  it("should redirect to login page when any get started button is clicked", async () => {
    const { unmount } = render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>,
    );
    const loginButton = screen.getAllByRole("button", {
      name: /get started/i,
    });

    for (let i = 0; i < loginButton.length; i++) {
      const user = userEvent.setup();

      const currentButton = screen.getAllByRole("button", {
        name: /get started/i,
      })[0];

      await user.click(currentButton);
      expect(window.location.pathname).toBe("/login");

      unmount();
    }
  });
});
