import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserTopChoice from "./UserTopChoice";

describe("UserTopChoice Component", () => {
  test("renders the Products heading", () => {
    render(<UserTopChoice />);
    const headingElement = screen.getByText(/Products/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("applies the correct classes to the heading", () => {
    render(<UserTopChoice />);
    const headingElement = screen.getByText(/Products/i);
    expect(headingElement).toHaveClass(
      "font-myfont",
      "text-center",
      "text-[8rem]",
      "uppercase",
      "font-semibold"
    );
  });
});
