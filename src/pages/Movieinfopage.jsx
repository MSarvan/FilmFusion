import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/infopage.scss";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MainContext } from "../context/MainContext";
import { API_KEY } from "../constant";
import Mobilemenu from "../components/Mobilemenu";

const Movieinfopage = () => {
  const { movieId, setMovieId, isMenuOpen } = useContext(MainContext);

  const [movieInfo, setMovieInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let id = localStorage.getItem("movie id");
    setMovieId(id);
  }, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      if (movieId) {
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`
        );
        setMovieInfo(response?.data);
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleClick = (title) => {
    window.open(
      `https://www.youtube.com/results?search_query=${title}+trailer`,
      "_blank"
    );
  };

  return (
    <div className="infopage-container">
      <Navbar />
      {isMenuOpen ? (
        <Mobilemenu />
      ) : (
        <div className="info-content-area">
          {isLoading ? (
            <>
              <div className="left-area">
                <Skeleton containerClassName="image-loader" />
              </div>
              <div className="right-area">
                <Skeleton containerClassName="book-details1" />
                <Skeleton containerClassName="book-details2" />
                <Skeleton containerClassName="book-details2" />
                <Skeleton containerClassName="book-details3" />
                <Skeleton containerClassName="book-details2" />
                <Skeleton containerClassName="user-review-heading" />
                <Skeleton containerClassName="user-review-loader" />
                <Skeleton width={70} height={25} />
              </div>
            </>
          ) : (
            <>
              <div className="left-area">
                <img src={movieInfo?.Poster} alt="Poster" />
              </div>
              <div className="right-area">
                <h1>{movieInfo?.Title}</h1>
                <div className="seperator-div">
                  <div className="left-div">
                    <span className="fw">📅 Released on:</span>
                    <span>{movieInfo?.Released}</span>
                  </div>
                  <div className="left-div">
                    <span className="fw">⏰ Runtime:</span>
                    <span>{movieInfo?.Runtime}</span>
                  </div>
                </div>
                <div className="seperator-div">
                  <div>
                    <span className="fw">🎭 Genre:</span>
                    <span>{movieInfo?.Genre}</span>
                  </div>
                  <div>
                    <span className="fw">🎬 Director:</span>
                    <span>{movieInfo?.Director}</span>
                  </div>
                </div>
                <div className="plot-div">
                  <span className="fw">✍ Writer:</span>
                  <span>{movieInfo?.Writer}</span>
                </div>
                <div className="plot-div">
                  <span className="fw">👨🏻‍🎤 Actors:</span>
                  <span>{movieInfo?.Actors}</span>
                </div>
                <div className="plot-div">
                  <span className="fw">
                    {" "}
                    <span>📝</span> Plot:
                  </span>
                  <span className="description">{movieInfo?.Plot}</span>
                </div>
                <div className="plot-div">
                  <span className="fw">🔠 Language:</span>
                  <span>{movieInfo?.Language}</span>
                </div>
                <div className="plot-div">
                  <span className="fw">🌍 Country:</span>
                  <span>{movieInfo?.Country}</span>
                </div>
                <div className="plot-div">
                  <span className="fw">🥇 Awards:</span>
                  <span>{movieInfo?.Awards}</span>
                </div>
                <div className="ratings-div">
                  <div className="fw">🌟 Ratings:</div>
                  <div className="reviewer-div">
                    <div>
                      <span>Metascore:</span>
                      <span>{movieInfo?.Metascore}</span>
                    </div>
                    <div>
                      <span>IMdB:</span>
                      <span>{movieInfo?.imdbRating}</span>
                    </div>
                  </div>
                </div>
                <div className="plot-div">
                  <span className="fw">💰 BoxOffice collection:</span>
                  <span>{movieInfo?.BoxOffice}</span>
                </div>
                <div
                  className="trailer-button"
                  onClick={() => {
                    handleClick(movieInfo?.Title);
                  }}
                >
                  Watch Trailer
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Movieinfopage;
