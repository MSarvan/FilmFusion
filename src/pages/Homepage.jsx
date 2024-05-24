import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/homepage.scss";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import Loadingcard from "../components/Loadingcard";

const Homepage = () => {
  const API_KEY = "693677a4";
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [isMoviesLoading, setIsMoviesLoading] = useState(true);
  const [isSeriesLoading, setIsSeriesLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsMoviesLoading(true);
      const response = await axios.get(
        `http://www.omdbapi.com/?s=movie&type=movie&apikey=${API_KEY}`
      );
      let result = response?.data?.Search;
      // console.log(result, 'movies data');
      setMovies(result);
      setIsMoviesLoading(false);
    };

    const fetchSeries = async () => {
      setIsSeriesLoading(true);
      const response = await axios.get(
        `http://www.omdbapi.com/?s=series&type=series&apikey=${API_KEY}`
      );
      let result = response?.data?.Search;
      // console.log(result, 'series data');
      setSeries(result);
      setIsSeriesLoading(false);
    };

    fetchMovies();
    fetchSeries();
  }, []);

  const handleClick = (id) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className="homepage-container">
      <Navbar />
      <div className="content-area">
        <div className="caption">
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
              {movies?.map((e, i) => {
                return (
                  <Card
                    title={e?.Title}
                    poster={e?.Poster}
                    year={e?.Year}
                    index={e?.imdbID}
                    handleClick={() => handleClick(e?.imdbID)}
                  />
                );
              })}
              {series?.map((e, i) => {
                return (
                  <Card
                    title={e?.Title}
                    poster={e?.Poster}
                    year={e?.Year}
                    index={e?.imdbID}
                    handleClick={() => handleClick(e?.imdbID)}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
