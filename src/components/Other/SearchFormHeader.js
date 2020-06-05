import React from "react";

export default function SearchFormHeader(props) {
  return (
    <form
      className={`search-form flex items-center ${
        props.mobile ? "search-form-mobile" : ""
      }`}
      onSubmit={props.submit}
    >
      <div>
        <input
          type="text"
          placeholder="Search course..."
          onChange={(e) => props.setQuery(e.target.value)}
          className={props.emptyQuery ? "empty-query" : ""}
        />
        {props.emptyQuery ? <p>Please provide a query</p> : ""}
      </div>
      <input type="submit" value="Go" className="pointer" />
    </form>
  );
}
