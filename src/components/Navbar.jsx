import React, { useContext } from "react";
import "../styles/navbar.scss";
import { FaVideo } from "react-icons/fa6";
import { MdOndemandVideo } from "react-icons/md";
import { SiSteelseries } from "react-icons/si";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { MainContext } from "../context/MainContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, setTheme, toggleTheme } = useContext(MainContext);

  return (
    <div className="navbar-container">
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
        }}
      >
        <div className="icon-div">
          <SiSteelseries />
        </div>
        <div>SERIES</div>
      </div>
      <div className="nav-item nav-input">
        <input type="text" placeholder="Search your favourites.." />
        <div className="icon-div">
          <FaSearch />
        </div>
      </div>
      <div
        className="nav-item"
        onClick={() => {
          toggleTheme()
        }}
      >
        <div className="icon-div">
          {theme === "light-mode" ? <MdDarkMode /> : <MdLightMode />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
