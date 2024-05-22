import React from "react";
import Navbar from "../components/Navbar";
import "../styles/movieinfopage.scss";

const Movieinfopage = () => {
  return (
    <div className="movieinfopage-container">
      <Navbar />
      <div className="movieinfo-content-area">
        <div className="left-area">
          <img
            src="https://m.media-amazon.com/images/M/MV5BMTg4MDk1ODExN15BMl5BanBnXkFtZTgwNzIyNjg3MDE@._V1_SX300.jpg"
            alt=""
          />
        </div>
        <div className="right-area">
          <h1>Title</h1>
          <div className="seperator-div">
            <div className="left-div">
              <span>Released on:</span>
              <span>Released</span>
            </div>
            <div className="left-div">
              <span>Runtime:</span>
              <span>Runtime</span>
            </div>
          </div>
          <div className="seperator-div">
            <div>
              <span>Genre:</span>
              <span>Genre</span>
            </div>
            <div>
              <span>Director:</span>
              <span>Director</span>
            </div>
          </div>
          <div className="seperator-div">
            <div>
              <span>Writer:</span>
              <span>Writer</span>
            </div>
            <div>
              <span>Actors:</span>
              <span>Actors</span>
            </div>
          </div>
          <div>
            <span>Plot:</span>
            <span>Plot</span>
          </div>
          <div className="seperator-div">
            <div>
              <span>Language:</span>
              <span>Language</span>
            </div>
            <div>
              <span>Country:</span>
              <span>Country</span>
            </div>
          </div>
          <div>
            <span>Awards:</span>
            <span>Awards</span>
          </div>
          <div>Ratings:</div>
          <div>
            <span>Metascore:</span>
            <span>Metascore</span>
          </div>
          <div>
            <span>IMdB:</span>
            <span>Metascore</span>
          </div>
          <div>
            <span>BoxOffice collection:</span>
            <span>BoxOffice</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movieinfopage;
