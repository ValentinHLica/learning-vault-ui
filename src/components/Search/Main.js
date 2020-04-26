import React, { useState } from "react";
import axios from "axios";
import { Consumer } from "../Context";

// Style
import "../assets/css/search.css";

// Header
import Header from "./Header";

// Card
import Card from "./Card";

// Paggination
import Paggination from "./Paggination";

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [err, seterr] = useState(false);

  // Fetch Function
  const fetch = (page, setSearchData, setPaggination, query) => {
    setSearchData([]);
    setLoading(true);
    seterr(false);
    setPaggination([0, 10, 1]);

    //   Fetch Courses
    axios
      .get(
        `https://learning-valut-api.herokuapp.com/search/${query}?page=${page}`
      )
      .then((data) => {
        setLoading(false);
        setSearchData(data.data.data);
        setPaggination([
          data.data.count,
          data.data.paggiantion.limit,
          data.data.paggiantion.currentPage,
        ]);

        if (data.data.data.length === 0) {
          setLoading(false);
          seterr(true);
          setSearchData([]);
        }
      })
      .catch(() => {
        setLoading(false);
        seterr(true);
        setSearchData([]);
      });
  };

  // Search
  const submit = (setSearchData, paggination, setPaggination, query, form) => {
    form.preventDefault();

    fetch(paggination[2], setSearchData, setPaggination, query);
  };

  // Paggination Click Search
  const changePage = (
    page,
    setSearchData,
    setPaggination,
    paggination,
    query
  ) => {
    const pagg = [...paggination];
    pagg[2] = page;
    setPaggination(pagg);
    fetch(page, setSearchData, setPaggination, query);
  };

  return (
    <Consumer>
      {(value) => (
        <div className="search-page">
          <Header />

          <form
            onSubmit={submit.bind(
              this,
              value.setSearchData,
              value.paggination,
              value.setPaggination,
              value.query
            )}
          >
            <input
              type="text"
              placeholder="Search course..."
              value={value.query}
              onChange={value.setQuery}
              required
            />
            <button>Search</button>
          </form>

          <div className="container">
            {loading ? (
              <div className="loading">
                <div className="loader"></div>
              </div>
            ) : null}
            {err ? <h1 className="notfound">Nothing was found</h1> : null}

            <div className="row">
              {value.searchData.length !== 0
                ? value.searchData.map((course, index) => (
                    <Card
                      title={course.title}
                      cover={course.cover}
                      link={course.link}
                      source={course.source}
                      key={index}
                    />
                  ))
                : null}
            </div>

            {value.searchData.length !== 0 ? (
              <div className="paggination">
                <Paggination
                  count={value.paggination[0]}
                  limit={value.paggination[1]}
                  currentPage={value.paggination[2]}
                  changePage={changePage}
                  setData={value.setSearchData}
                  setPaggination={value.setPaggination}
                  query={value.query}
                />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </Consumer>
  );
}
