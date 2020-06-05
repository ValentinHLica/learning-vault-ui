import React, { useState, useEffect } from "react";
import axios from "axios";

// Header
import Header from "../Other/Header";

// Course Content
import Content from "./Content";

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

  useEffect(() => {
    fetchCourse();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header props={props} />

      <div className="wrapper container course flex">
        {loading ? "loading..." : null}

        {error ? (
          <h2 className="not-found-error-message course-not-found flex items-center justify-center ">
            <img src={NotFoundFaceIcon} alt="Not Found Icon" />
            <span>Nothing was found!</span>
          </h2>
        ) : (
          <React.Fragment>
            <div className="course-detail">
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
                    <li className="course-number">
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

                    <li className="course-learn">
                      <p>You will learn:</p>
                      <ul>
                        {course.learn.map((learn, index) => {
                          return <li>{learn}</li>;
                        })}
                      </ul>
                    </li>

                    <li className="course-requirements">
                      <p>Requirements:</p>
                      <ul>
                        {course.requirements.map((requirement, index) => {
                          return <li>{requirement}</li>;
                        })}
                      </ul>
                    </li>

                    <li className="course-description">
                      <p>Description:</p>
                      <div
                        dangerouslySetInnerHTML={{ __html: course.desc }}
                      ></div>
                    </li>
                  </ul>
                </React.Fragment>
              ) : null}
            </div>
            <div className="course-content">
              <h2>Course Content</h2>
              {course.title ? (
                <Content
                  curriculum={course.curriculum}
                  changeVideo={changeVideo}
                  icon={DropDownSectionIcon}
                />
              ) : null}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
