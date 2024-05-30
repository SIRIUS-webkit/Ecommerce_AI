import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Notify from "./Notify"; // Adjust the import path as needed

jest.useFakeTimers();

describe("Notify component", () => {
  test("renders notification message when notify is true", () => {
    const setNotify = jest.fn();
    render(<Notify notify={true} setNotify={setNotify} />);

    const notification = screen.getByText(/Item Added/i);
    expect(notification).toBeInTheDocument();
  });

  test("hides notification message after 1 second", async () => {
    const setNotify = jest.fn();
    render(<Notify notify={true} setNotify={setNotify} />);

    const notification = screen.getByText(/Item Added/i);
    expect(notification).toBeInTheDocument();

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Wait for the side effect to be applied
    await waitFor(() => {
      expect(setNotify).toHaveBeenCalledWith(false);
    });

    // Check if the notification is hidden
    expect(notification).not.toBeVisible();
  });

  test("does not render notification message when notify is false", () => {
    const setNotify = jest.fn();
    render(<Notify notify={false} setNotify={setNotify} />);

    const notification = screen.queryByText(/Item Added/i);
    expect(notification).not.toBeInTheDocument();
  });
});
