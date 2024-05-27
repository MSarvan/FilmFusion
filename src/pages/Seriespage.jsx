import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/homepage.scss";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Card from "../components/Card";
import Loadingcard from "../components/Loadingcard";
import { MainContext } from "../context/MainContext";
import { API_KEY } from "../constant";
import Mobilemenu from "../components/Mobilemenu";
import Search from "../components/Search";

const Seriespage = () => {
  const navigate = useNavigate();
  const { setSeriesId, searchParam, isSearching, setIsSearching, isMenuOpen } =
    useContext(MainContext);

  const [seriesData, setSeriesData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;
  const [isLoading, setIsLoading] = useState(true);

  const contentAreaRef = useRef(null);

  const fetchData = async (type, page) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${type}&type=${type}&page=${page}&apikey=${API_KEY}`
    );
    return response.data;
  };

  useEffect(() => {
    const fetchSeries = async () => {
      setIsLoading(true);
      try {
        const seriesResponsePage1 = await fetchData("series", page);
        const seriesResponsePage2 = await fetchData("series", page + 1);
        setSeriesData([
          ...seriesResponsePage1.Search,
          ...seriesResponsePage2.Search,
        ]);
        const totalResults = seriesResponsePage1.totalResults;
        setTotalPages(Math.ceil(totalResults / itemsPerPage));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching series data:", error);
        setIsLoading(false);
      }
    };

    fetchSeries();
  }, [page]);

  useEffect(() => {
    if (contentAreaRef.current) {
      contentAreaRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [page]);

  const handleClick = (id) => {
    navigate(`/series/${id}`);
    setSeriesId(id);
    localStorage.setItem("series id", id);
    setIsSearching(false);
  };

  const filteredSeries = seriesData?.filter((entry) =>
    entry?.Title?.toLowerCase().includes(searchParam?.toLowerCase())
  );

  return (
    <div className="homepage-container">
      <Navbar />
      {isMenuOpen ? (
        <Mobilemenu />
      ) : (
        <div className="content-area" ref={contentAreaRef}>
          <div
            className={
              isLoading
                ? "caption-disable"
                : isSearching
                ? "caption-disable"
                : "caption"
            }
          >
            <div className="trend-icon">
              <FaStar />
            </div>
            <h2>BINGE-WORTHY SERIES</h2>
          </div>

          {isLoading ? "" : <Search />}

          <div className="cards-data">
            {isLoading ? (
              Array(8)
                .fill("")
                .map((e, i) => {
                  return <Loadingcard index={i} />;
                })
            ) : (
              <>
                {(isSearching ? filteredSeries : seriesData)?.length > 0 ? (
                  (isSearching ? filteredSeries : seriesData)?.map((e, i) => {
                    return (
                      <Card
                        key={i}
                        title={e?.Title}
                        poster={e?.Poster}
                        year={e?.Year}
                        index={e?.imdbID}
                        handleClick={() => handleClick(e?.imdbID)}
                      />
                    );
                  })
                ) : (
                  <div className="no-results">No results found!</div>
                )}
              </>
            )}
          </div>
          <div
            className={
              isLoading
                ? "pagination-controls-disable"
                : isSearching
                ? "pagination-controls-disable"
                : "pagination-controls-visible"
            }
          >
            <button
              onClick={() => setPage(page > 1 ? page - 1 : 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>{`Page ${page} of ${totalPages}`}</span>
            <button
              onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Seriespage;
