import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  const card = () => {
    return (
      <React.Fragment>
        <div className="card-cover">
          {props.loading ? (
            <div className="card-loading card-cover-loading">
              <div className="loader"></div>
            </div>
          ) : (
            <img
              src={`${props.courseCover}?width=230`}
              alt={`${props.title} Cover`}
            />
          )}
        </div>

        {props.loading ? (
          <div className="card-loading card-bottom-loading">
            <div className="loader"></div>
          </div>
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
