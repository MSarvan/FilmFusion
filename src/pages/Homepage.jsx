import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/homepage.scss";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Card from "../components/Card";

const Homepage = () => {
  const API_KEY = "693677a4";

  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=movie&type=movie&apikey=${API_KEY}`
      );
      let result = response?.data?.Search;
      // console.log(result, 'movies data');
      setMovies(result);
    };

    const fetchSeries = async () => {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=series&type=series&apikey=${API_KEY}`
      );
      let result = response?.data?.Search;
      // console.log(result, 'series data');
      setSeries(result);
    };

    fetchMovies();
    fetchSeries();
  }, []);

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
          {movies?.map((e, i) => {
            return (
              <Card
                title={e?.Title}
                poster={e?.Poster}
                year={e?.Year}
                index={e?.imdbID}
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
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
