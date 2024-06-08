import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/infopage.scss";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MainContext } from "../context/MainContext";
import { API_KEY } from "../constant";
import Mobilemenu from "../components/Mobilemenu";

const Seriesinfopage = () => {
  const { seriesId, setSeriesId, isMenuOpen } = useContext(MainContext);

  const [seriesnfo, setSeriesInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let id = localStorage.getItem("series id");
    setSeriesId(id);
  }, []);

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      setIsLoading(true);
      if (seriesId) {
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${seriesId}&apikey=${API_KEY}`
        );
        setSeriesInfo(response?.data);
        setIsLoading(false);
      }
    };

    fetchSeriesDetails();
  }, [seriesId]);

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
                <img src={seriesnfo?.Poster} alt="Poster" />
              </div>
              <div className="right-area">
                <h1>{seriesnfo?.Title}</h1>
                <div className="seperator-div">
                  <div className="left-div">
                    <span className="fw">📅 Released on:</span>
                    <span>{seriesnfo?.Released}</span>
                  </div>
                  <div className="left-div">
                    <span className="fw">⏰ Runtime:</span>
                    <span>{seriesnfo?.Runtime}</span>
                  </div>
                </div>
                <div className="seperator-div">
                  <div>
                    <span className="fw">🎭 Genre:</span>
                    <span>{seriesnfo?.Genre}</span>
                  </div>
                  <div>
                    <span className="fw">🎬 Director:</span>
                    <span>{seriesnfo?.Director}</span>
                  </div>
                </div>
                <div className="plot-div">
                  <span className="fw">✍ Writer:</span>
                  <span>{seriesnfo?.Writer}</span>
                </div>
                <div className="plot-div">
                  <span className="fw">👨🏻‍🎤 Actors:</span>
                  <span>{seriesnfo?.Actors}</span>
                </div>
                <div className="plot-div">
                  <span className="fw">
                    {" "}
                    <span>📝</span> Plot:
                  </span>
                  <span>{seriesnfo?.Plot}</span>
                </div>
                <div className="plot-div">
                  <span className="fw">🔠 Language:</span>
                  <span>{seriesnfo?.Language}</span>
                </div>
                <div className="plot-div">
                  <span className="fw">🌍 Country:</span>
                  <span>{seriesnfo?.Country}</span>
                </div>
                <div className="plot-div">
                  <span className="fw">🥇 Awards:</span>
                  <span>{seriesnfo?.Awards}</span>
                </div>
                <div className="ratings-div">
                  <div className="fw">🌟 Ratings:</div>
                  <div className="reviewer-div">
                    <div>
                      <span>IMdB:</span>
                      <span>{seriesnfo?.imdbRating}</span>
                    </div>
                    <div>
                      <span>IMdB votes:</span>
                      <span>{seriesnfo?.imdbVotes}</span>
                    </div>
                  </div>
                </div>
                <div className="plot-div">
                  <span className="fw">🔢 Total Seasons:</span>
                  <span>{seriesnfo?.totalSeasons}</span>
                </div>
                <div
                  className="trailer-button"
                  onClick={() => {
                    handleClick(seriesnfo?.Title);
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

export default Seriesinfopage;
