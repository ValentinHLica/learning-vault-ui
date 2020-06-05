import React from "react";

export default function Detail(props) {
  return (
    <React.Fragment>
      <video
        className="course-video"
        src="https://www.learningcrux.com/play/nodejs-the-complete-guide-incl-mvc-rest-apis-graphqls/0/0"
        controls
        poster={props.course.cover}
      ></video>

      <h2 className="course-title">{props.course.title}</h2>

      <p className="course-short-description">{props.course.headline}</p>

      <ul className="course-info">
        <li className="course-number">
          <p>By the numbers</p>
          <div className="number flex">
            <ul>
              <li>
                Students: <strong>{props.course.detail.students}</strong>
              </li>
              <li>
                Sections: <strong>{props.course.detail.sections}</strong>
              </li>
              <li>
                Videos: <strong>{props.course.detail.videos}</strong>
              </li>
            </ul>
            <ul>
              <li>
                Time: <strong>{props.course.detail.length}</strong>
              </li>
              <li>
                Added Date: <strong>{props.course.detail.addedDate}</strong>
              </li>
            </ul>
          </div>
        </li>

        <li className="course-learn">
          <p>You will learn:</p>
          <ul>
            {props.course.learn.map((learn, index) => {
              return <li>{learn}</li>;
            })}
          </ul>
        </li>

        <li className="course-requirements">
          <p>Requirements:</p>
          <ul>
            {props.course.requirements.map((requirement, index) => {
              return <li>{requirement}</li>;
            })}
          </ul>
        </li>

        <li className="course-description">
          <p>Description:</p>
          <div dangerouslySetInnerHTML={{ __html: props.course.desc }}></div>
        </li>
      </ul>
    </React.Fragment>
  );
}
