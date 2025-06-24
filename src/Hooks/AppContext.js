import React, { useState, useMemo, createContext, useContext } from "react";
import Services from "../Services/index.js";
// import { useToast } from "@chakra-ui/react";

export const AppContextProvider = ({ children }) => {
  const login = (payload) => {
    //payload = {email,password}
    Services.login(payload)
      .then((res) => {
      })
      .catch((err) => {
      });
  };
  const logOut = () => {};

  const memoedValue = useMemo(
    () => ({
      login,
      logOut,
    }),
    []
  );
  return <AppContext.Provider value={memoedValue}>{children}</AppContext.Provider>;
};

export function useAppContext() {
  const ctx = useContext(AppContext);
  return {
    ...ctx,
  };
}

export const AppContext = createContext();
export default AppContext;
