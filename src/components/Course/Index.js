import React, { useState, useEffect } from "react";
import axios from "axios";

// Header
import Header from "../Other/Header";

// Course Content
import Content from "./Content";

// Loading
import Loading from "../Other/Loading";

// Stylesheet
import "./style.css";

// DropDownSectionIcon
import DropDownSectionIcon from "../../assets/img/chevron-down.svg";

// Not Found Face Icon
import NotFoundFaceIcon from "../../assets/img/frown.svg";

export default function Index(props) {
  const [course, setCourse] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [video, setVideo] = useState("");

  // const [openCourse, setopenCourse] = useState(false);

  const changeVideo = (url) => {
    setVideo("https://www.learningcrux.com" + url);
  };

  const APIUrl = window.APIUrl;

  const fetchCourse = async () => {
    await axios
      .get(`${APIUrl}/course/${props.match.params.courseUrl}`)
      .then((response) => {
        setCourse(response.data.data);
        setVideo(
          `https://www.learningcrux.com${response.data.data.curriculum[0].lections[0].lectureVideo}`
        );
      })
      .catch(() => {
        setError(true);
      });
    setLoading(false);
  };

  const sectionLoading = () => {
    const load = [];

    for (let i = 0; i < 4; i++) {
      load.push(
        <Loading
          loadingWidth="100%"
          loadingHeight="50px"
          loaderWidth="40px"
          loaderHeight="50px"
          margin="0 0 20px 0"
          key={i}
        />
      );
    }

    return load;
  };

  useEffect(() => {
    fetchCourse();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header props={props} />

      <div className="wrapper container course flex">
        {error ? (
          <h2 className="not-found-error-message course-not-found flex items-center justify-center ">
            <img src={NotFoundFaceIcon} alt="Not Found Icon" />
            <span>Nothing was found!</span>
          </h2>
        ) : (
          <React.Fragment>
            <div className="course-detail">
              {loading ? (
                <Loading
                  loadingWidth="100%"
                  loadingHeight="370px"
                  loaderWidth="40px"
                  loaderHeight="370px"
                  margin="0 0 0 0 "
                />
              ) : null}

              {loading ? (
                <Loading
                  loadingWidth="100%"
                  loadingHeight="100px"
                  loaderWidth="40px"
                  loaderHeight="100px"
                  margin="20px 0 0 0 "
                />
              ) : null}

              {course.title ? (
                <React.Fragment>
                  <video
                    src={video}
                    className="video"
                    poster={course.cover}
                    controls
                  ></video>

                  <h2 className="course-title">{course.title}</h2>

                  <p className="course-short-description">{course.headline}</p>

                  <ul className="course-info">
                    <li className="course-number course-grid">
                      <p>By the numbers</p>
                      <div className="number flex">
                        <ul>
                          <li>
                            Students: <strong>{course.detail.students}</strong>
                          </li>
                          <li>
                            Sections: <strong>{course.detail.sections}</strong>
                          </li>
                          <li>
                            Videos: <strong>{course.detail.videos}</strong>
                          </li>
                        </ul>
                        <ul>
                          <li>
                            Time: <strong>{course.detail.length}</strong>
                          </li>
                          <li>
                            Added Date:{" "}
                            <strong>{course.detail.addedDate}</strong>
                          </li>
                        </ul>
                      </div>
                    </li>

                    {course.learn.length !== 0 ? (
                      <li className="course-learn course-grid">
                        <p>You will learn:</p>
                        <ul>
                          {course.learn.map((learn, index) => {
                            return <li key={index}>{learn}</li>;
                          })}
                        </ul>
                      </li>
                    ) : null}

                    {course.requirements.length !== 0 ? (
                      <li className="course-requirements course-grid">
                        <p>Requirements:</p>
                        <ul>
                          {course.requirements.map((requirement, index) => {
                            return <li key={index}>{requirement}</li>;
                          })}
                        </ul>
                      </li>
                    ) : null}

                    <li className="course-description course-grid">
                      <p>Description:</p>
                      <div
                        dangerouslySetInnerHTML={{ __html: course.desc }}
                      ></div>
                    </li>
                  </ul>
                </React.Fragment>
              ) : null}
            </div>

            {/* {!loading && !error ? (
              <div
                className="content-button"
                onClick={() => setopenCourse(true)}
              >
                Content
              </div>
            ) : null} */}

            <div
              className={`course-content `} //${openCourse ? "course-open" : ""}
            >
              <h2>Course Content</h2>

              {loading ? sectionLoading() : null}

              {course.title ? (
                <div className="content-wrapper">
                  <Content
                    curriculum={course.curriculum}
                    changeVideo={changeVideo}
                    icon={DropDownSectionIcon}
                    // setopenCourse={setopenCourse}
                  />
                </div>
              ) : null}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
