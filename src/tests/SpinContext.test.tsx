import { render, screen, act } from "@testing-library/react";
import { SpinProvider, useSpin } from "../context/SpinContext";
import { ReactNode } from "react";

// Test Component to interact with SpinContext
const TestComponent = () => {
  const { prize, setPrize, clearPrize } = useSpin();

  return (
    <div>
      <p data-testid="prize">{prize || "No Prize"}</p>
      <button onClick={() => setPrize("Free Shipping")}>Set Prize</button>
      <button onClick={clearPrize}>Clear Prize</button>
    </div>
  );
};

// Utility function to render with SpinProvider
const renderWithProvider = (ui: ReactNode) => render(<SpinProvider>{ui}</SpinProvider>);

describe("SpinContext", () => {
  it("should initialize with no prize", () => {
    renderWithProvider(<TestComponent />);

    expect(screen.getByTestId("prize").textContent).toBe("No Prize");
  });

  it("should update the prize when setPrize is called", () => {
    renderWithProvider(<TestComponent />);

    act(() => {
      screen.getByText("Set Prize").click();
    });

    expect(screen.getByTestId("prize").textContent).toBe("Free Shipping");
  });

  it("should clear the prize when clearPrize is called", () => {
    renderWithProvider(<TestComponent />);

    act(() => {
      screen.getByText("Set Prize").click();
    });

    expect(screen.getByTestId("prize").textContent).toBe("Free Shipping");

    act(() => {
      screen.getByText("Clear Prize").click();
    });

    expect(screen.getByTestId("prize").textContent).toBe("No Prize");
  });
});