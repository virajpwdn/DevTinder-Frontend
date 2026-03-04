import Hello from "../components/Hello";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest"; //This is the library which gives the following methods like toBeInTheDocument()

describe("hellocomp", () => {
  it("Renders Hello World by default", () => {
    render(<Hello />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument(); //Assertation
  });
  it("Button element check", () => {
    // render(<Hello />);

    const button = screen.getAllByRole("button");
    expect(button.length).toBe(2);
  });
});
