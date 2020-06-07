import React, { useEffect, useState } from "react";
// import { Context } from "../Context";
import axios from "axios";

// Header
import Header from "../Other/Header";

// Card
import Card from "../Other/Card";

// Arrow Right Icon
// import ArrowRightIcon from "../../assets/img/arrow-right.svg";

export default function Index(props) {
  // const { logOut, login } = React.useContext(Context);

  const [recentCourses, setRecent] = useState([]);
  const [popularCourses, setPopular] = useState([]);

  const [loading, setLoading] = useState(true);

  const APIUrl = window.APIUrl;

  const fetchMain = async () => {
    await axios.get(`${APIUrl}/main`).then((response) => {
      setRecent(response.data.data.recent);
      setPopular(response.data.data.popular);
      setLoading(false);
    });
  };

  const loadingContent = () => {
    let conntent = [];
    for (let i = 0; i < 4; i++) {
      conntent.push(<Card loading={loading} key={i} />);
    }
    return conntent;
  };

  useEffect(() => {
    fetchMain();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header props={props} page="main" />
      <div className="wrapper container">
        {/* {login ? (
          <div className="user-courses">
            <h2>Continue Watching</h2>
            <div className="row flex items-center">
              <Card
                courseCover="https://www.learningcrux.com/image/5d457881d068d927f6adf171?width=250"
                title="NodeJS - The Complete Guide (incl. MVC, REST APIs, GraphQL)"
                loading={loading}
              />
              <Card
                courseCover="https://www.learningcrux.com/image/5d457881d068d927f6adf171?width=250"
                title="NodeJS - The Complete Guide (incl. MVC, REST APIs, GraphQL)"
                loading={loading}
              />
              <Card
                courseCover="https://www.learningcrux.com/image/5d457881d068d927f6adf171?width=250"
                title="NodeJS - The Complete Guide (incl. MVC, REST APIs, GraphQL)"
                loading={loading}
              />

              <div className="your-courses-wrapper flex items-center justify-center pointer">
              <div className="your-courses flex items-center justify-center">
                <img src={ArrowRightIcon} alt="Arrow Right Icon" />
              </div>
            </div>
            </div>
          </div>
        ) : null} */}

        {loading ? (
          <div className="loading-contet">
            <div className="row flex">{loadingContent()}</div>
          </div>
        ) : null}

        {recentCourses.length !== 0 ? (
          <div className="recent-courses">
            <h2>Most Recent Courses</h2>
            <div className="row flex">
              {recentCourses.map((course, index) => (
                <Card
                  url={course.link}
                  courseCover={course.cover}
                  title={course.title}
                  key={index}
                />
              ))}
            </div>
          </div>
        ) : null}

        {popularCourses.length !== 0 ? (
          <div className="popular-courses">
            <h2>Most Popular Courses</h2>
            <div className="row flex">
              {popularCourses.map((course, index) => (
                <Card
                  url={course.link}
                  courseCover={course.cover}
                  title={course.title}
                  key={index}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
