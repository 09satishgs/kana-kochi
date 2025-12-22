"use client";
const { useContext, useState, createContext, useCallback } = require("react");

const GlobalsContext = createContext({
  title: "",
  changeTitle: () => {},
  headerVisibility: true,
  showHeader: () => {},
});

export const GlobalsProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [headerVisibility, setHeaderVisibility] = useState(true);
  const changeTitle = useCallback((val) => setTitle(val), []);
  const showHeader = useCallback((isTrue) => setHeaderVisibility(isTrue), []);
  return (
    <GlobalsContext.Provider
      value={{ title, changeTitle, headerVisibility, showHeader }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};

export const useGlobalsContext = () => {
  return useContext(GlobalsContext);
};
