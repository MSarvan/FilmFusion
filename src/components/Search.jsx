import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { MainContext } from "../context/MainContext";
import '../styles/search.scss';

const Search = () => {
  const {
    searchParam,
    setSearchParam,
    isSearching,
    setIsSearching,
  } = useContext(MainContext);

  const [placeholderText, setPlaceholderText] = useState(
    "Search your favourites.."
  );
  const handleSearch = () => {
    setIsSearching(!isSearching);
    if (isSearching && searchParam?.length > 0) {
      setSearchParam("");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 550) {
        setPlaceholderText("Search");
      } else {
        setPlaceholderText("Search your favourites..");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="nav-item nav-input">
      <input
        type="text"
        placeholder={placeholderText}
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
