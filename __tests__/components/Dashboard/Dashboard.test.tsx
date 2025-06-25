import { render, screen } from "@testing-library/react";
import Dashboard from "../../../src/components/Dashboard/Dashboard";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Mock lazy-loaded components
jest.mock("../../../src/components/Widgets/CryptoWidget", () => () => (
  <div data-testid="crypto-widget">Crypto Widget</div>
));
jest.mock("../../../src/components/Widgets/WeatherWidget", () => () => (
  <div data-testid="weather-widget">Weather Widget</div>
));
jest.mock("../../../src/components/Widgets/TaskListWidget", () => () => (
  <div data-testid="tasklist-widget">Task List Widget</div>
));

describe("Dashboard", () => {
  const renderWithRoute = (widgetId: string) => {
    render(
      <MemoryRouter initialEntries={[`/dashboard/${widgetId}`]}>
        <Routes>
          <Route path="/dashboard/:widgetId" element={<Dashboard />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders WeatherWidget when widgetId is 'weather'", async () => {
    renderWithRoute("weather");
    expect(await screen.findByTestId("weather-widget")).toBeInTheDocument();
  });

  it("renders CryptoWidget when widgetId is 'crypto'", async () => {
    renderWithRoute("crypto");
    expect(await screen.findByTestId("crypto-widget")).toBeInTheDocument();
  });

  it("renders TaskListWidget when widgetId is 'tasks'", async () => {
    renderWithRoute("tasks");
    expect(await screen.findByTestId("tasklist-widget")).toBeInTheDocument();
  });

  it("renders fallback when widgetId is invalid", async () => {
    renderWithRoute("invalid-widget");
    expect(await screen.findByText(/widget not found/i)).toBeInTheDocument();
  });
});
