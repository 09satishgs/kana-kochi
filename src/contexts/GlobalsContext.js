"use client";
const { useContext, useState, createContext, useCallback } = require("react");

const GlobalsContext = createContext({
  title: "",
  changeTitle: () => {},
  headerVisibility: true,
  showHeader: () => {},
  activeSection: null, // "learn" | "practice" | "play" | null
  enteredAt: null, // Date.now()
  setActiveSection: (section) => {},
  setEnteredAt: (time) => {},
});

export const GlobalsProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [headerVisibility, setHeaderVisibility] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [enteredAt, setEnteredAt] = useState(0);

  const changeTitle = useCallback((val) => setTitle(val), []);
  const showHeader = useCallback((isTrue) => setHeaderVisibility(isTrue), []);
  return (
    <GlobalsContext.Provider
      value={{
        title,
        changeTitle,
        headerVisibility,
        showHeader,
        activeSection,
        enteredAt,
        setActiveSection,
        setEnteredAt,
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};

export const useGlobalsContext = () => {
  return useContext(GlobalsContext);
};
