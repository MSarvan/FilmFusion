import React, { createContext, useEffect, useState } from "react";

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  const [movieId, setMovieId] = useState("");
  const [seriesId, setSeriesId] = useState("");
  const [theme, setTheme] = useState("dark-mode");
  const [searchParam, setSearchParam] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "dark-mode" ? "light-mode" : "dark-mode"
    );
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <MainContext.Provider
      value={{
        movieId,
        setMovieId,
        seriesId,
        setSeriesId,
        theme,
        setTheme,
        toggleTheme,
        searchParam,
        setSearchParam,
        isSearching,
        setIsSearching,
        isMenuOpen,
        setIsMenuOpen,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
