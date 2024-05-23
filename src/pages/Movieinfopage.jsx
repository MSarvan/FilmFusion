import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/movieinfopage.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Movieinfopage = () => {
  const API_KEY = "693677a4";
  const { pathname } = useLocation();
  const [movieInfo, setMovieInfo] = useState([]);
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      if (id) {
        const response = await axios.get(
          `http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
        );
        setMovieInfo(response?.data);
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const extractIdFromPathname = () => {
    if (pathname) {
      const temp = pathname.split("/").pop();
      if (temp !== "") {
        setId(temp);
      }
    }
  };

  useEffect(() => {
    extractIdFromPathname();
  }, [pathname]);

  const handleClick = (title) => {
    window.open(
      `https://www.youtube.com/results?search_query=${title}+trailer`,
      "_blank"
    );
  };

  return (
    <div className="movieinfopage-container">
      <Navbar />
      <div className="movieinfo-content-area">
        <div className="left-area">
          <img src={movieInfo?.Poster} alt="Poster" />
        </div>
        <div className="right-area">
          <h1>{movieInfo?.Title}</h1>
          <div className="seperator-div">
            <div className="left-div">
              <span>📅 Released on:</span>
              <span>{movieInfo?.Released}</span>
            </div>
            <div className="left-div">
              <span>⏰ Runtime:</span>
              <span>{movieInfo?.Runtime}</span>
            </div>
          </div>
          <div className="seperator-div">
            <div>
              <span>🎭 Genre:</span>
              <span>{movieInfo?.Genre}</span>
            </div>
            <div>
              <span>🎬 Director:</span>
              <span>{movieInfo?.Director}</span>
            </div>
          </div>
          <div className="plot-div">
            <span>✍ Writer:</span>
            <span>{movieInfo?.Writer}</span>
          </div>
          <div className="plot-div">
            <span>👨🏻‍🎤 Actors:</span>
            <span>{movieInfo?.Actors}</span>
          </div>
          <div className="plot-div">
            <span>
              {" "}
              <span>📝</span> Plot:
            </span>
            <span>{movieInfo?.Plot}</span>
          </div>
          <div className="plot-div">
            <span>🔠 Language:</span>
            <span>{movieInfo?.Language}</span>
          </div>
          <div className="plot-div">
            <span>🌍 Country:</span>
            <span>{movieInfo?.Country}</span>
          </div>
          <div className="plot-div">
            <span>🥇 Awards:</span>
            <span>{movieInfo?.Awards}</span>
          </div>
          <div className="ratings-div">
            <div>🌟 Ratings:</div>
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
            <span>💰 BoxOffice collection:</span>
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
      </div>
    </div>
  );
};

export default Movieinfopage;
