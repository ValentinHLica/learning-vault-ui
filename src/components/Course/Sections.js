import React from "react";

export default function Sections(props) {
  return (
    <React.Fragment>
      <h2>Course Content</h2>

      {props.curriculum.map((section, sectionIndex) => {
        return (
          <div className="section" key={sectionIndex}>
            <p>
              {section.sectionCount} {section.sectionTitle}
            </p>
            <ul>
              {section.lections.map((lection, lectionIndex) => {
                return (
                  <li key={lectionIndex}>
                    <p>{lection.info.title}</p>{" "}
                    <i
                      className="fas fa-play"
                      onClick={props.changeVideo.bind(
                        this,
                        lection.lectureVideo
                      )}
                    ></i>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </React.Fragment>
  );
}
