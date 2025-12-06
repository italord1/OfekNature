import { createContext } from "react";


export const BaseUrlContext = createContext();

export const BaseUrlProvider = ({ children }) => {

  const isLocal = false; 

  const baseUrl = isLocal
    ? "http://localhost:5000"
    : "https://ofeknatureserver.onrender.com";

  return (
    <BaseUrlContext.Provider value={baseUrl}>
      {children}
    </BaseUrlContext.Provider>
  );
};
