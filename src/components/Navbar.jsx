import React from "react";
import "../styles/navbar.scss";
import { FaVideo } from "react-icons/fa6";
import { MdOndemandVideo } from "react-icons/md";
import { SiSteelseries } from "react-icons/si";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

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
      <div className="nav-item" onClick={() => {
          navigate("/series");
        }}>
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
    </div>
  );
};

export default Navbar;
