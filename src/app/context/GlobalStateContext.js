"use client"
import { createContext, useState, useContext } from "react";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [qtdQuestoes, setQtdQuestoes] = useState(1)

  return (
    <GlobalStateContext.Provider value={{qtdQuestoes, setQtdQuestoes}}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
