import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/homepage.scss";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import Loadingcard from "../components/Loadingcard";
import { MainContext } from "../context/MainContext";
import { API_KEY } from "../constant";

const Homepage = () => {
  const navigate = useNavigate();
  const { setMovieId, setSeriesId, searchParam, setSearchParam, isSearching, setIsSearching } =
    useContext(MainContext);

  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [isMoviesLoading, setIsMoviesLoading] = useState(true);
  const [isSeriesLoading, setIsSeriesLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsMoviesLoading(true);
      const response = await axios.get(
        `https://www.omdbapi.com/?s=movie&type=movie&apikey=${API_KEY}`
      );
      let result = response?.data?.Search;
      // console.log(result, 'movies data');
      setMovies(result);
      setIsMoviesLoading(false);
    };

    const fetchSeries = async () => {
      setIsSeriesLoading(true);
      const response = await axios.get(
        `https://www.omdbapi.com/?s=series&type=series&apikey=${API_KEY}`
      );
      let result = response?.data?.Search;
      // console.log(result, 'series data');
      setSeries(result);
      setIsSeriesLoading(false);
    };

    fetchMovies();
    fetchSeries();
  }, []);

  const handleClickMovies = (id) => {
    navigate(`/movies/${id}`);
    setMovieId(id);
    localStorage.setItem("movie id", id);
    setSearchParam("");
    setIsSearching(false);
  };

  const handleClickSeries = (id) => {
    navigate(`/series/${id}`);
    setSeriesId(id);
    localStorage.setItem("series id", id);
    setSearchParam("");
    setIsSearching(false);
  };

  const filteredMovies = movies?.filter((entry) =>
    entry?.Title?.toLowerCase().includes(searchParam?.toLowerCase())
  );
  const filteredSeries = series?.filter((entry) =>
    entry?.Title?.toLowerCase().includes(searchParam?.toLowerCase())
  );

  return (
    <div className="homepage-container">
      <Navbar />
      <div className="content-area">
        <div
          className={
            isMoviesLoading
              ? "caption-disable"
              : isSeriesLoading
              ? "caption-disable"
              : isSearching
              ? "caption-disable"
              : "caption"
          }
        >
          <div className="trend-icon">
            <FaStar />
          </div>
          <h2>TRENDING TODAY</h2>
        </div>
        <div className="cards-data">
          {isMoviesLoading || isSeriesLoading ? (
            Array(8)
              .fill("")
              .map((e, i) => {
                return <Loadingcard index={i} />;
              })
          ) : (
            <>
              {(isSearching
                ? [...filteredMovies, ...filteredSeries]
                : [...movies, ...series]
              )?.length > 0 ? (
                (isSearching
                  ? [...filteredMovies, ...filteredSeries]
                  : [...movies, ...series]
                )?.map((e, i) => {
                  return (
                    <Card
                      key={i}
                      title={e?.Title}
                      poster={e?.Poster}
                      year={e?.Year}
                      index={e?.imdbID}
                      handleClick={() =>
                        e.Type === "movie"
                          ? handleClickMovies(e?.imdbID)
                          : handleClickSeries(e?.imdbID)
                      }
                    />
                  );
                })
              ) : (
                <div className="no-results">No results found!</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
