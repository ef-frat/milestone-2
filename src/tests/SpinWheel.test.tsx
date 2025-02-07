import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import SpinWheel from "../components/SpinWheel";

// Mock functions
const mockOnClose = jest.fn();
const mockOnPrizeWin = jest.fn();

describe("SpinWheel Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the spin wheel modal when open", () => {
    render(<SpinWheel isOpen={true} onClose={mockOnClose} onPrizeWin={mockOnPrizeWin} />);

    expect(screen.getByText("🎡 Spin the Wheel! 🎡")).toBeInTheDocument();
    expect(screen.getByText("Want a special reward for your purchase?")).toBeInTheDocument();
    expect(screen.getByText("🎯 Click Here!")).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", () => {
    render(<SpinWheel isOpen={true} onClose={mockOnClose} onPrizeWin={mockOnPrizeWin} />);

    fireEvent.click(screen.getByText("✖"));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should start spinning and select a prize", async () => {
    jest.useFakeTimers(); // ✅ Simulate timer behavior

    render(<SpinWheel isOpen={true} onClose={mockOnClose} onPrizeWin={mockOnPrizeWin} />);

    fireEvent.click(screen.getByText("🎯 Click Here!")); // Click the wheel

    expect(screen.getByText("Spinning...")).toBeInTheDocument(); // Ensure state updates to spinning

    act(() => {
      jest.advanceTimersByTime(3000); // ✅ Fast-forward 3 seconds
    });

    expect(mockOnPrizeWin).toHaveBeenCalled(); // Ensure prize function is triggered
    expect(screen.getByText(/You won:/)).toBeInTheDocument(); // Prize displayed
  });
});