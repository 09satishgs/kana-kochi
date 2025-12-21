"use client";
const { useContext, useState, createContext, useCallback } = require("react");

const GlobalsContext = createContext({ title: "", changeTitle: () => {} });

export const GlobalsProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const changeTitle = useCallback((val) => setTitle(val), []);
  return (
    <GlobalsContext.Provider value={{ title, changeTitle }}>
      {children}
    </GlobalsContext.Provider>
  );
};

export const useGlobals = () => {
  return useContext(GlobalsContext);
};
