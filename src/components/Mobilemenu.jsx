import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdOndemandVideo } from "react-icons/md";
import { SiSteelseries } from "react-icons/si";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { MainContext } from "../context/MainContext";
import '../styles/mobilemenu.scss';

const Mobilemenu = () => {
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

  return (
    <div className="mob-menu">
      <div
        className="mob-nav-item"
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
        className="mob-nav-item"
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
      
      <div
        className="mob-nav-item"
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

export default Mobilemenu;
