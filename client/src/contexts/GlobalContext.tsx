import React, { createContext, ReactNode } from "react";
import { NavigateFunction, useNavigate } from "react-router";

// Define the type for our context state
interface GlobalContextState {
  navigate: NavigateFunction;
  // Add other global states as needed
}

// Create the context with a default value
const GlobalContext = createContext<GlobalContextState | undefined>(undefined);

// Provider component that wraps your app and makes the context available
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const contextValue: GlobalContextState = {
    navigate,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
