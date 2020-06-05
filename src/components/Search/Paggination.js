import React from "react";

// todo Needs Refactor

// Next Arrow Icon
import NextArrowIcon from "../../assets/img/arrow-right.svg";

// Previous Arrow Icon
import PrevArrowIcon from "../../assets/img/arrow-left.svg";

export default function Paggination(props) {
  const pageCount = Math.ceil(props.count / props.limit);

  const createPaggination = () => {
    if (pageCount === 1) {
      return "";
    }

    if (props.currentPage <= 3) {
      return (
        <React.Fragment>
          <li
            className={props.currentPage === 1 ? "current-page" : ""}
            onClick={props.changePage.bind(this, 1)}
          >
            1
          </li>
          <li
            className={props.currentPage === 2 ? "current-page" : ""}
            onClick={props.changePage.bind(this, 2)}
          >
            2
          </li>
          {pageCount !== 2 ? (
            <li
              className={props.currentPage === 3 ? "current-page" : ""}
              onClick={props.changePage.bind(this, 3)}
            >
              3
            </li>
          ) : null}

          {props.currentPage !== pageCount ? (
            <React.Fragment>
              {pageCount !== 3 ? (
                <li className="paggination-more">...</li>
              ) : null}

              <li onClick={props.changePage.bind(this, props.currentPage + 1)}>
                <img src={NextArrowIcon} alt="Next Arrow Icon" />
              </li>
            </React.Fragment>
          ) : null}
        </React.Fragment>
      );
    }

    if (props.currentPage > 3) {
      return (
        <React.Fragment>
          <li onClick={props.changePage.bind(this, props.currentPage - 1)}>
            <img src={PrevArrowIcon} alt="Previous Arrow Icon" />
          </li>
          <li onClick={props.changePage.bind(this, 1)}>1</li>
          <li className="paggination-more">...</li>

          {pageCount === props.currentPage ? (
            <li onClick={props.changePage.bind(this, props.currentPage - 2)}>
              {props.currentPage - 2}
            </li>
          ) : null}

          <li onClick={props.changePage.bind(this, props.currentPage - 1)}>
            {props.currentPage - 1}
          </li>
          <li className="current-page">{props.currentPage}</li>

          {pageCount > props.currentPage ? (
            <li onClick={props.changePage.bind(this, props.currentPage + 1)}>
              {props.currentPage + 1}
            </li>
          ) : null}

          {pageCount !== props.currentPage + 1 &&
          pageCount > props.currentPage ? (
            <React.Fragment>
              <li className="paggination-more">...</li>
              <li onClick={props.changePage.bind(this, pageCount)}>
                {pageCount}
              </li>
              <li onClick={props.changePage.bind(this, props.currentPage + 1)}>
                <img src={NextArrowIcon} alt="Next Arrow Icon" />
              </li>
            </React.Fragment>
          ) : null}
        </React.Fragment>
      );
    }
  };
  return (
    <div className="paggination flex items-center">
      <ul className="flex items-center">{createPaggination()}</ul>
    </div>
  );
}
