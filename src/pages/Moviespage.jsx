import React, { useContext, useEffect, useState } from "react";
import "../styles/homepage.scss";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Card from "../components/Card";
import Loadingcard from "../components/Loadingcard";
import { MainContext } from "../context/MainContext";
import { API_KEY } from "../constant";

const Moviespage = () => {
  const navigate = useNavigate();
  const { setMovieId } = useContext(MainContext);
  
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (type, page) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${type}&type=${type}&page=${page}&apikey=${API_KEY}`
    );
    return response.data;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const moviesResponsePage1 = await fetchData("movie", page);
        const moviesResponsePage2 = await fetchData("movie", page + 1);
        setMovieData([
          ...moviesResponsePage1.Search,
          ...moviesResponsePage2.Search,
        ]);

        const totalResults = moviesResponsePage1.totalResults;
        setTotalPages(Math.ceil(totalResults / itemsPerPage));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies data:", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const handleClick = (id) => {
    navigate(`/movies/${id}`);
    setMovieId(id);
    localStorage.setItem('movie id', id);
  };

  return (
    <div className="homepage-container">
      <Navbar />
      <div className="content-area">
        <div className="caption">
          <div className="trend-icon">
            <FaStar />
          </div>
          <h2>TOP PICKS FOR YOU</h2>
        </div>
        <div className="cards-data">
          {isLoading
            ? Array(8)
                .fill("")
                .map((e, i) => {
                  return <Loadingcard index={i} />;
                })
            : movieData?.map((e, i) => {
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
        </div>
        <div
          className={
            isLoading
              ? "pagination-controls-disable"
              : "pagination-controls-visible"
          }
        >
          <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>
            Previous
          </button>
          <span>{`Page ${page} of ${totalPages}`}</span>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Moviespage;
