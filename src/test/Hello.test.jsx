import Hello from "../components/Hello";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest"

describe("hellocomp", () => {
    it("Renders Hello World by default", () => {
        render(<Hello />)
        expect(screen.getByText("Hello World")).toBeInTheDocument();
    })
})