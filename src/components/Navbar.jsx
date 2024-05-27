import React, { useContext, useEffect, useState } from "react";
import "../styles/navbar.scss";
import { FaVideo } from "react-icons/fa6";
import { MdOndemandVideo } from "react-icons/md";
import { SiSteelseries } from "react-icons/si";
import { FaSearch } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { MainContext } from "../context/MainContext";

const Navbar = () => {
  const navigate = useNavigate();
  const {
    theme,
    toggleTheme,
    searchParam,
    setSearchParam,
    isSearching,
    setIsSearching,
    isMenuOpen,
    setIsMenuOpen,
  } = useContext(MainContext);

  const [placeholderText, setPlaceholderText] = useState("Search your favourites..");

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
    <div className="navbar-container">
      <div
        className="hamburger-menu"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes /> : <GiHamburgerMenu />}
      </div>

      <div
        className="nav-item logo-div"
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="icon-div logo">
          <FaVideo />
        </div>
        <h2>FILMFUSION</h2>
      </div>

      <div
        className="nav-item"
        onClick={() => {
          navigate("/movies");
          setIsMenuOpen(false);
        }}
      >
        <div className="icon-div">
          <MdOndemandVideo />
        </div>
        <div>MOVIES</div>
      </div>

      <div
        className="nav-item"
        onClick={() => {
          navigate("/series");
          setIsMenuOpen(false);
        }}
      >
        <div className="icon-div">
          <SiSteelseries />
        </div>
        <div>SERIES</div>
      </div>

      {/* <div className="nav-item nav-input">
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
      </div> */}

      <div
        className="nav-item"
        onClick={() => {
          toggleTheme();
          setIsMenuOpen(false);
        }}
      >
        <div className="icon-div">
          {theme === "light-mode" ? <MdDarkMode /> : <MdLightMode />}
        </div>
        <div>THEME</div>
      </div>
    </div>
  );
};

export default Navbar;
