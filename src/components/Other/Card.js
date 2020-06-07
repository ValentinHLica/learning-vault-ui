import React from "react";
import { Link } from "react-router-dom";

import Loading from "./Loading";

export default function Card(props) {
  const card = () => {
    return (
      <React.Fragment>
        <div className="card-cover">
          {props.loading ? (
            <Loading
              loadingWidth="100%"
              loadingHeight="100%"
              loaderWidth="40px"
              loaderHeight="150px"
            />
          ) : (
            <img
              src={`${props.courseCover}?width=230`}
              alt={`${props.title} Cover`}
            />
          )}
        </div>

        {props.loading ? (
          <Loading
            loadingWidth="100%"
            loadingHeight="48px"
            loaderWidth="40px"
            loaderHeight="48px"
            margin="20px 0 0 0 "
          />
        ) : (
          <React.Fragment>
            <div className="card-title">
              <p>{props.title}</p>
            </div>
            <button className="start-course pointer">Start</button>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  return props.loading ? (
    <div className="card flex justify-center pointer" title={props.title}>
      {card()}
    </div>
  ) : (
    <Link
      to={props.url}
      className="card flex justify-center pointer"
      title={props.title}
    >
      {card()}
    </Link>
  );
}
