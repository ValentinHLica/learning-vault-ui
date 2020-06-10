import React, { useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../Context";

// Header
import Header from "../Other/Header";

// Card
import Card from "../Other/Card";

// Not Found Face Icon
import NotFoundFaceIcon from "../../assets/img/frown.svg";

// Paggination
import Paggination from "./Paggination";

// Stylesheet
import "./style.css";

export default function Index(props) {
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  const { paggination, setPaggination } = React.useContext(Context);

  const APIUrl = window.APIUrl;

  const searchCourses = async (query, page) => {
    setLoading(true);
    setSearchResults([]);
    seterror(false);

    await axios
      .get(
        `${APIUrl}/search/${query || props.match.params.query}${
          props.history.location.search || "?page=1"
        }&limit=12`
      )
      .then((response) => {
        setPaggination(response.data.paggiantion);

        setSearchResults(response.data.data);
      })
      .catch(() => {
        seterror(true);
      });

    setLoading(false);
  };

  const changePage = (page) => {
    props.history.push(`/search/${props.match.params.query}?page=${page}`);
    searchCourses(null, page);
  };

  const loadingContent = () => {
    let conntent = [];
    for (let i = 0; i < 4; i++) {
      conntent.push(<Card loading={loading} key={i} />);
    }
    return conntent;
  };

  useEffect(() => {
    searchCourses(props.match.params.query);

    //eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   setLoading(true);

  //   searchCourses(null, props.history.location.search);

  //   setLoading(false);

  //   //eslint-disable-next-line
  // }, [props.history.location.search]);

  return (
    <div>
      <Header props={props} page="search" searchCourses={searchCourses} />
      <div className="wrapper container">
        {loading ? (
          <div className="loading-contet">
            <div className="row flex">{loadingContent()}</div>
          </div>
        ) : null}

        {error ? (
          <h2 className="not-found-error-message flex items-center justify-center">
            <img src={NotFoundFaceIcon} alt="Not Found Icon" />
            <span>Nothing was found!</span>
          </h2>
        ) : null}

        {searchResults.length !== 0 ? (
          <React.Fragment>
            <div className="recent-courses">
              <h2>Search Results</h2>
              <div className="row flex">
                {searchResults.map((course, index) => (
                  <Card
                    url={course.link}
                    courseCover={course.cover}
                    title={course.title}
                    key={index}
                  />
                ))}
              </div>
            </div>
            <Paggination
              limit={paggination.limit}
              currentPage={paggination.currentPage}
              count={paggination.count}
              nextPage={paggination.nextPage}
              changePage={changePage}
            />
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
}
