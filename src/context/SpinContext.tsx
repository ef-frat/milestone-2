import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the SpinContext
interface SpinContextType {
  prize: string | null;
  setPrize: (prize: string) => void;
  clearPrize: () => void;
}

// Create the context
const SpinContext = createContext<SpinContextType | undefined>(undefined);

// Custom hook to use the SpinContext
export const useSpin = () => {
  const context = useContext(SpinContext);
  if (!context) {
    throw new Error("useSpin must be used within a SpinProvider");
  }
  return context;
};

// SpinProvider component
export const SpinProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prize, setPrize] = useState<string | null>(null);

  // Function to clear the prize (after checkout)
  const clearPrize = () => setPrize(null);

  return (
    <SpinContext.Provider value={{ prize, setPrize, clearPrize }}>
      {children}
    </SpinContext.Provider>
  );
};