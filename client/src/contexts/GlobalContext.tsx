import React, { createContext, ReactNode } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';

// Define the type for our context state
interface GlobalContextState {
  navigate: NavigateFunction;
  navigateTo: (path: string, options?: object) => void;
  // Add other global states as needed
}

// Create the context with a default value
const GlobalContext = createContext<GlobalContextState | undefined>(undefined);

// Provider component that wraps your app and makes the context available
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  function navigateTo(path: string, options: object = {}): void {
    navigate(path, options);
  }

  const contextValue: GlobalContextState = {
    navigate,
    navigateTo,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
