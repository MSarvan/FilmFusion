import React, { createContext, useEffect, useState } from "react";

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  const [movieId, setMovieId] = useState("");
  const [seriesId, setSeriesId] = useState("");
  const [theme, setTheme] = useState("dark-mode");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // movies page states
  const [movieSearchParam, setMovieSearchParam] = useState("");
  const [isMovieSearching, setIsMovieSearching] = useState(false);

  //series page states
  const [seriesSearchParam, setSeriesSearchParam] = useState("");
  const [isSeriesSearching, setSeriesSearching] = useState(false);

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
        isMenuOpen,
        setIsMenuOpen,
        
        // movies page states
        movieSearchParam,
        setMovieSearchParam,
        isMovieSearching,
        setIsMovieSearching,

        //series page states
        seriesSearchParam,
        setSeriesSearchParam,
        isSeriesSearching,
        setSeriesSearching,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
