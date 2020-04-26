import React from "react";

export default function SearchPaggination(props) {
  const createPages = (count, limit, currentPage) => {
    const pageCount = Math.ceil(count / limit);

    if (pageCount > 5) {
      let link = [];
      for (let i = 1; i <= pageCount; i++) {
        link.push(
          <li
            key={i}
            onClick={props.changePage.bind(
              this,
              i,
              props.setData,
              props.setPaggination,
              [count, limit, currentPage],
              props.query
            )}
            className={currentPage === i ? "current" : ""}
          >
            {i}
          </li>
        );
      }
      return link;
    }
  };

  return <ul>{createPages(props.count, props.limit, props.currentPage)}</ul>;
}
