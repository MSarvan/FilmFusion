import React from "react";
import "../styles/card.scss";

const Card = ({ title, poster, year, index, handleClick }) => {
  return (
    <div className="each-card" key={index}>
      <div className="img-box">
        <img src={poster} alt={title} />
      </div>
      <div className="movie-title">{title}</div>
      <div className="year">{year}</div>
      <div className="info-div">
        <div className="info-button" onClick={handleClick}>
          More Info..
        </div>
      </div>
    </div>
  );
};

export default Card;
