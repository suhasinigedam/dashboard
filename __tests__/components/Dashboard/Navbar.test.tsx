import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../../../src/components/Dashboard/Navbar";

describe("Navbar", () => {
  beforeEach(() => {
    // Clear localStorage and reset html classes before each test
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("renders the title and welcome text", () => {
    render(<Navbar />);
    expect(screen.getByText(/mini dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/welcome user/i)).toBeInTheDocument();
  });

  it("shows Dark Mode button text initially when no dark class or localStorage", () => {
    render(<Navbar />);
    expect(screen.getByRole("button")).toHaveTextContent("Dark Mode");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("initializes in dark mode if html has dark class", () => {
    document.documentElement.classList.add("dark");
    render(<Navbar />);
    expect(screen.getByRole("button")).toHaveTextContent("Light Mode");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("initializes in dark mode if localStorage theme is dark", () => {
    localStorage.setItem("theme", "dark");
    render(<Navbar />);
    expect(screen.getByRole("button")).toHaveTextContent("Light Mode");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("toggles dark mode on button click", () => {
    render(<Navbar />);
    const button = screen.getByRole("button");

    // Initially light mode
    expect(button).toHaveTextContent("Dark Mode");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBeNull();

    // Click to enable dark mode
    fireEvent.click(button);
    expect(button).toHaveTextContent("Light Mode");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");

    // Click again to disable dark mode
    fireEvent.click(button);
    expect(button).toHaveTextContent("Dark Mode");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
