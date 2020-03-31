import React from "react";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

export default function Card(props) {
  return (
    <Link to={props.link}>
      <div className="card">
        <div className="cover">
          <LazyLoad
            once={true}
            placeholder={<img src={props.cover} alt={props.title + " Cover"} />}
          >
            <img src={props.cover} alt={props.title + " Cover"} />
          </LazyLoad>
        </div>
        <div className="detail">
          <h5 className="title">{props.title}</h5>
          <p className="source">{props.source}</p>
        </div>
      </div>
    </Link>
  );
}
