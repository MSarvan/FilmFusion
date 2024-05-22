import React from "react";
import "../styles/card.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loadingcard = (index) => {
  return (
    <div className="each-card" key={index}>
      <div className="img-box">
        <Skeleton />
      </div>
      <div className="movie-title">
        <Skeleton width={200} height={25} />
      </div>
      <div className="year">
        <Skeleton width={100} height={25} />
      </div>
      <div className="info-div">
          <Skeleton width={80} height={30} />
      </div>
    </div>
  );
};

export default Loadingcard;
