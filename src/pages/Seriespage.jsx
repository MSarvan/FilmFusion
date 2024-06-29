import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/homepage.scss";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Card from "../components/Card";
import Loadingcard from "../components/Loadingcard";
import { MainContext } from "../context/MainContext";
import { API_KEY } from "../constant";
import Mobilemenu from "../components/Mobilemenu";
import Search from "../components/Search";

const Seriespage = () => {
  const navigate = useNavigate();
  const { setSeriesId, isMenuOpen } = useContext(MainContext);

  const [seriesData, setSeriesData] = useState([]);
  const [seriesSearchParam, setSeriesSearchParam] = useState("");
  const [isSeriesSearching, setSeriesSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const contentAreaRef = useRef(null);

  const fetchData = async (type, page) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${
        searchQuery
          ? searchQuery
          : seriesSearchParam?.length > 0
          ? seriesSearchParam
          : type
      }&type=${type}&page=${page}&apikey=${API_KEY}`
    );
    return response.data;
  };

  useEffect(() => {
    const fetchSeries = async () => {
      setIsLoading(true);
      try {
        const seriesResponsePage1 = await fetchData("series", page * 2 - 1);
        const seriesResponsePage2 = await fetchData("series", page * 2);

        const combinedSeries = [
          ...seriesResponsePage1.Search,
          ...seriesResponsePage2.Search,
        ];
        setSeriesData(combinedSeries);

        const totalResults = seriesResponsePage1.totalResults;
        setTotalPages(Math.ceil(totalResults / itemsPerPage));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching series data:", error);
        setIsLoading(false);
      }
    };

    fetchSeries();
  }, [page, isSeriesSearching]);

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
    setSeriesSearching(false);
  };

  const handleSearch = () => {
    setSeriesSearching(!isSeriesSearching);
    if (isSeriesSearching && seriesSearchParam?.length > 0) {
      setSeriesSearchParam("");
      navigate("/series");
    } else if (searchQuery || seriesSearchParam) {
      navigate(
        `/series?search=${searchQuery ? searchQuery : seriesSearchParam}`
      );
    }
  };

  useEffect(() => {
    if (searchQuery) {
      setSeriesSearchParam(searchQuery);
      setSeriesSearching(true);
    } else {
      setSeriesSearching(false);
    }
  }, [searchParams]);

  return (
    <div className="homepage-container">
      <Navbar />
      {isMenuOpen ? (
        <Mobilemenu />
      ) : (
        <div className="content-area" ref={contentAreaRef}>
          {isLoading ? (
            ""
          ) : (
            <Search
              stateVal={seriesSearchParam}
              stateFun={setSeriesSearchParam}
              loadingState={isSeriesSearching}
              loadingFunc={setSeriesSearching}
              handleSearch={handleSearch}
            />
          )}

          <div
            className={
              isLoading
                ? "caption-disable"
                : isSeriesSearching
                ? "caption-disable"
                : "caption"
            }
          >
            <div className="trend-icon">
              <FaStar />
            </div>
            <h2>BINGE-WORTHY SERIES</h2>
          </div>

          <div className="cards-data">
            {isLoading ? (
              Array(8)
                .fill("")
                .map((e, i) => {
                  return <Loadingcard index={i} />;
                })
            ) : (
              <>
                {seriesData?.length > 0 ? (
                  seriesData?.map((e, i) => {
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
                : seriesData?.length < 1
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
