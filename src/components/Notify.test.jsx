import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Notify from "./Notify"; // Adjust the import path as needed

jest.useFakeTimers();

describe("Notify component", () => {
  test("renders notification message when notify is true", () => {
    const setNotify = jest.fn();
    render(<Notify notify={true} setNotify={setNotify} />);

    const notificationWrapper = screen.getByTestId("notification");
    expect(notificationWrapper).toBeInTheDocument();
    expect(notificationWrapper).toHaveClass("block");
  });

  test("hides notification message after 1 second", async () => {
    const setNotify = jest.fn();
    render(<Notify notify={true} setNotify={setNotify} />);

    const notificationWrapper = screen.getByTestId("notification");
    expect(notificationWrapper).toBeInTheDocument();

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Check if setNotify has been called with false
    expect(setNotify).toHaveBeenCalledWith(false);
  });

  test("does not render notification message when notify is false", () => {
    const setNotify = jest.fn();
    render(<Notify notify={false} setNotify={setNotify} />);

    const notificationWrapper = screen.getByTestId("notification");
    expect(notificationWrapper).toBeInTheDocument();
    expect(notificationWrapper).toHaveClass("hidden");
  });
});
