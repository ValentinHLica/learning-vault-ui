import React from "react";
import { Link } from "react-router-dom";

export default function SearchCard(props) {
  return (
    <div className="search-card">
      <Link to={props.link}>
        <div className="cover">
          <img src={props.cover} alt="Course Cover" />
        </div>

        <div className="card-detail">
          <p className="title">{props.title}</p>
          <p className="source">{props.source}</p>
        </div>
      </Link>
    </div>
  );
}
