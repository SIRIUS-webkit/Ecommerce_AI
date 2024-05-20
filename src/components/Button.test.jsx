import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button from "./Button";

describe("Button Component", () => {
  test("renders the title prop", () => {
    render(<Button target="primary" title="Click Me" />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("applies primary class when target is primary", () => {
    render(<Button target="primary" title="Primary Button" />);
    const heading = screen.getByText("Primary Button");
    expect(heading).toHaveClass("primary");
  });

  test("applies secondary class when target is not primary", () => {
    render(<Button target="secondary" title="Secondary Button" />);
    const heading = screen.getByText("Secondary Button");
    expect(heading).toHaveClass("secondary");
  });
});
