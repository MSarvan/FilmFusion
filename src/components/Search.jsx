import React, { useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { MainContext } from "../context/MainContext";
import '../styles/search.scss';
// import { useLocation, useNavigate } from 'react-router-dom'

const Search = () => {
  const {
    searchParam,
    setSearchParam,
    isSearching,
    setIsSearching,
  } = useContext(MainContext);
  // const location = useLocation();
  // const currentPath = location.pathname;
  // const navigate = useNavigate();

  const handleSearch = () => {
    setIsSearching(!isSearching);
    if (isSearching && searchParam?.length > 0) {
      setSearchParam("");
    }
    // if(currentPath.includes('movies')) {
    //   navigate(`/movies?search=${searchParam}`)
    // }
  };

  useEffect(() => {
    if(searchParam?.length < 1) {
      setIsSearching(false);
    }
  }, [searchParam])

  return (
    <div className="nav-item nav-input">
      <input
        type="text"
        placeholder='Search your favourites..'
        onChange={(e) => {
          setSearchParam(e.target.value);
        }}
        value={searchParam}
      />
      <div
        className="icon-div"
        onClick={handleSearch}
        style={{ cursor: "pointer" }}
      >
        {isSearching ? <FaTimes /> : <FaSearch />}
      </div>
    </div>
  );
};

export default Search;
