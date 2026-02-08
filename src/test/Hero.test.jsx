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

  it("should redirect to login page", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>,
    );

    const loginButton = screen.getAllByRole("button", { name: "Get started" });
    await user.click(loginButton[0]);

    expect(window.location.pathname).toBe("/login");
  });
});
