import React, { createContext, useState } from "react";

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  const [movieId, setMovieId] = useState("");
  const [seriesId, setSeriesId] = useState("");

  return (
    <MainContext.Provider
      value={{
        movieId,
        setMovieId,
        seriesId,
        setSeriesId,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
