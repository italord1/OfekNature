import { createContext } from "react";

// Create a context to store the base URL
export const BaseUrlContext = createContext();

// Provider component that wraps the app
export const BaseUrlProvider = ({ children }) => {
  const baseUrl = "https://your-server-url.com"; 

  return (
    <BaseUrlContext.Provider value={baseUrl}>
      {children}
    </BaseUrlContext.Provider>
  );
};
