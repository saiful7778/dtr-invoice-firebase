import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";

export const StateData = createContext(null);

const StateComp = ({ children }) => {
  /**
   * false means light mode
   */
  const [theme, setTheme] = useState(localStorage.getItem("themeState"));
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSiderBar = () => {
    setShowSidebar((l) => !l);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeChange = () => {
    setTheme((l) => (l === "light" ? "dark" : "light"));
    if (theme === "dark") {
      localStorage.setItem("themeState", "light");
      document.body.classList.remove("dark");
    } else {
      localStorage.setItem("themeState", "dark");
      document.body.classList.add("dark");
    }
  };
  const allData = { theme, handleThemeChange, showSidebar, handleSiderBar };
  return <StateData.Provider value={allData}>{children}</StateData.Provider>;
};

StateComp.propTypes = {
  children: PropTypes.node,
};

export default StateComp;
