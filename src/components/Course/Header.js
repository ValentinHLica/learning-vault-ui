import React from "react";
import { Consumer } from "../Context";
import { Link } from "react-router-dom";

export default function CourseHeader() {
  return (
    <Consumer>
      {(value) => (
        <div className="course-header">
          <div className="course-logo">
            <Link to="/">
              <img
                src="https://www.udemy.com/staticx/udemy/images/v6/logo-coral.svg"
                alt=""
              />
            </Link>
          </div>

          <p>Login Coming soon...</p>

          {/* todo */}
          {/* <ul>
            {value.token ? (
              <li>Log Out</li>
            ) : (
              <React.Fragment>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </React.Fragment>
            )}
          </ul> */}
        </div>
      )}
    </Consumer>
  );
}
