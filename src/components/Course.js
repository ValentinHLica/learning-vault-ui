import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Course(props) {
  const [data, setData] = useState([]);
  const [video, setVideo] = useState("");
  const [notFound, setnotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modal
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://learning-valut-api.herokuapp.com/course/${props.match.params.courseUrl}`
      )
      .then(e => {
        if (e.data.data.curriculum.length !== 0) {
          setData(e.data.data);
        } else {
          setnotFound(true);
        }

        setLoading(false);
      });
    //eslint-disable-next-line
  }, []);

  const changeVideo = e => {
    setOpenModal(true);
    setVideo("https://www.learningcrux.com" + e);
  };

  const closeModal = () => {
    setOpenModal(false);
    setVideo("");
  };

  return (
    <React.Fragment>
      <div className="header container">
        <Link to="/">
          <i className="fas fa-caret-left"></i> Go Back
        </Link>
      </div>

      <div id="modal" className={openModal ? "open" : "close"}>
        <div className="bc" onClick={closeModal}></div>
        <video width="400" controls autoPlay src={video}></video>

        <div className="video-failed">
          <p>
            If video wont load, you can download the video{" "}
            <a href={video} target="_blank" rel="noopener noreferrer">
              Here
            </a>
          </p>
        </div>
      </div>

      {notFound ? (
        <div className="notfound">
          <h1>Videos are not present yet. Team will add them soon</h1>
        </div>
      ) : null}

      {loading ? (
        <div className="loading">
          <div className="lds-dual-ring"></div>
        </div>
      ) : null}

      <div className="container">
        {data.length !== 0 ? (
          <div>
            <div className="course-cover">
              <img src={data.cover} alt={data.title + " Cover"} />
            </div>
            <h1 className="course-title">{data.title}</h1>

            <div className="course-detail">
              <ul>
                <li>
                  <span>Students:</span>
                  <strong>{data.detail.students}</strong>
                </li>
                <li>
                  <span>Sections:</span>
                  <strong>{data.detail.sections}</strong>
                </li>
                <li>
                  <span>Videos:</span>
                  <strong>{data.detail.videos}</strong>
                </li>
                <li>
                  <span>Length:</span>
                  <strong>{data.detail.length}</strong>
                </li>
                <li>
                  <span>Added Date:</span>
                  <strong>{data.detail.addedDate}</strong>
                </li>
              </ul>
            </div>
            <ol className="section-wrapper">
              {data.curriculum.map((e, index) => (
                <li key={index}>
                  <h3>
                    {e.sectionCount}: {e.sectionTitle}
                  </h3>

                  <ul className="section">
                    {e.lections.map((lec, lecIndex) => {
                      return (
                        <li key={lecIndex}>
                          <span>
                            <p className="lecture-title">{lec.info.title}</p>
                            <span className="type">{lec.info.type}</span>
                          </span>

                          <span>
                            <p>{lec.info.length}</p>
                            <button
                              className="watch"
                              onClick={changeVideo.bind(this, lec.lectureVideo)}
                            >
                              <i className="fas fa-play"></i> <p>Watch</p>
                            </button>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
}