import React, { useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { MainContext } from "../context/MainContext";
import "../styles/search.scss";
import { useLocation, useNavigate } from "react-router-dom";

const Search = ({ stateVal, stateFun, loadingState, loadingFunc, handleSearch }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  // const handleSearch = () => {
  //   loadingFunc(!loadingState);
  //   if (loadingState && stateVal?.length > 0) {
  //     stateFun("");
  //   }
  //   if (currentPath.includes("movies")) {
  //     navigate(`/movies?search=${stateVal}`);
  //   }
  // };

  useEffect(() => {
    if (stateVal?.length < 1) {
      loadingFunc(false);
    }
  }, [stateVal]);

  return (
    <div className="nav-item nav-input">
      <input
        type="text"
        placeholder="Search your favourites.."
        onChange={(e) => {
          stateFun(e.target.value);
        }}
        value={stateVal}
      />
      <div
        className="icon-div"
        onClick={handleSearch}
        style={{ cursor: "pointer" }}
      >
        {loadingState ? <FaTimes /> : <FaSearch />}
      </div>
    </div>
  );
};

export default Search;
