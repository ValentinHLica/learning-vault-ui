import React, { useEffect, useState } from "react";
import axios from "axios";

// CSS
import "../assets/css/course.css";

// Header
import Header from "./Header";

// Sections
import Sections from "./Sections";

export default function Main(props) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, seterr] = useState(false);
  const [video, setVideo] = useState("");

  const changeVideo = (url) => {
    setVideo("https://www.learningcrux.com" + url);
  };

  useEffect(() => {
    axios
      .get(
        `https://learning-valut-api.herokuapp.com/course/${props.match.params.courseUrl}`
      )
      .then((course) => {
        setData(course.data.data);
        setLoading(false);
        setVideo(
          `https://www.learningcrux.com${course.data.data.curriculum[0].lections[0].lectureVideo}`
        );
      })
      .catch(() => {
        setLoading(false);
        seterr(true);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <div className="loading">
          <div className="loader"></div>
        </div>
      ) : null}
      {err ? <h1 className="notfound">Nothing was found</h1> : null}

      {data.title ? (
        <div id="course">
          <div className="course-detail">
            <Header />
            <div className="course">
              {data.curriculum.length !== 0 ? (
                <video
                  src={video}
                  className="video"
                  poster={data.cover}
                  controls
                ></video>
              ) : (
                <h1 className="no-curriculum">
                  <i className="fas fa-exclamation-triangle"></i>
                  Videos are not present yet. Team will add them soon
                </h1>
              )}

              <h2 className="course-title">{data.title}</h2>
              <p className="course-headline">{data.headline}</p>

              <div className="course-numbers grid">
                <p>By the numbers</p>
                <div>
                  <ul>
                    <li>
                      Students: <strong>{data.detail.students} </strong>
                    </li>
                    <li>
                      Sections: <strong>{data.detail.sections}</strong>
                    </li>
                    <li>
                      Videos: <strong>{data.detail.videos}</strong>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      Time: <strong>{data.detail.length}</strong>
                    </li>
                    <li>
                      Added Date: <strong>{data.detail.addedDate}</strong>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="course-learn grid">
                <p>You will learn:</p>
                <ul>
                  {data.learn.map((e, index) => (
                    <li key={index}>{e}</li>
                  ))}
                </ul>
              </div>

              <div className="course-require grid">
                <p>Requirements:</p>
                <ul>
                  {data.requirements.map((e, index) => (
                    <li key={index}>{e}</li>
                  ))}
                </ul>
              </div>

              <div className="course-desc grid">
                <p>Description:</p>
                <div dangerouslySetInnerHTML={{ __html: data.desc }} />
              </div>
            </div>
          </div>
          <div className="course-sections">
            <div className="section-wrapper">
              <Sections
                curriculum={data.curriculum}
                changeVideo={changeVideo}
              />
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}
