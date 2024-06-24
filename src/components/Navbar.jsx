import React, { useContext } from "react";
import "../styles/navbar.scss";
import { FaVideo } from "react-icons/fa6";
import { MdOndemandVideo } from "react-icons/md";
import { SiSteelseries } from "react-icons/si";
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
    isMenuOpen,
    setIsMenuOpen,
    setSearchParam,
    setIsSearching,
  } = useContext(MainContext);

  return (
    <nav className="navbar-container">
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
          setSearchParam("");
          setIsSearching(false);
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
          setSearchParam("");
          setIsSearching(false);
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
          setSearchParam("");
          setIsSearching(false);
        }}
      >
        <div className="icon-div">
          <SiSteelseries />
        </div>
        <div>SERIES</div>
      </div>

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
    </nav>
  );
};

export default Navbar;
