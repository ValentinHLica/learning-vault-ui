import React, { useState } from "react";
import { Consumer } from "./Context";
import LazyLoad from "react-lazyload";

// Card
import Card from "./Card";

export default function Search() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const changeQuery = e => {
    setQuery(e.target.value);
  };

  const submit = (addData, load, err, e) => {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    addData(query, load, err);
  };

  return (
    <Consumer>
      {value => (
        <div className="container">
          <h1 id="title">Learning Vault</h1>
          <form
            id="form"
            onSubmit={submit.bind(this, value.setData, setLoading, setNotFound)}
          >
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={changeQuery}
            />

            <button>
              <i className="fas fa-search"></i>
            </button>
          </form>

          {loading ? (
            <div className="loading">
              <div className="lds-dual-ring"></div>{" "}
            </div>
          ) : null}

          {notFound ? (
            <div className="notfound">
              <h1>Not found</h1>
            </div>
          ) : null}

          {value.data.length !== 0 ? (
            <div className="row">
              {value.data.map((e, index) => {
                return (
                  <span className="wrapper" key={index}>
                    <LazyLoad
                      placeholder={
                        <div className="loading">
                          <div className="lds-dual-ring"></div>
                        </div>
                      }
                    >
                      <Card
                        title={e.title}
                        cover={e.cover.replace("?width=250", "?width=200")}
                        source={e.source}
                        link={e.link}
                      />
                    </LazyLoad>
                  </span>
                );
              })}
            </div>
          ) : null}
        </div>
      )}
    </Consumer>
  );
}
