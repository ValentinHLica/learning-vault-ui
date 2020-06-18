import React, { useState } from "react";

export default function Content(props) {
  const [currentVideo, setCurrentVideo] = useState(null);

  return (
    <React.Fragment>
      {props.curriculum.map((section, sectionIndex) => {
        return (
          <ul className="section" key={sectionIndex}>
            <div className="section-title flex items-center">
              <p>
                {section.sectionCount}: {section.sectionTitle}
              </p>
              <div className="drop-section pointer flex items-center justify-center">
                <img src={props.icon} alt="Dropdown Icon" />
              </div>
            </div>

            <li>
              <ul>
                {section.lections.map((lection, lectionIndex) => {
                  return (
                    <li
                      key={lectionIndex}
                      onClick={() => {
                        props.changeVideo(lection.lectureVideo);
                        props.setopenCourse(false);
                        setCurrentVideo(sectionIndex + "," + lectionIndex);
                      }}
                      className={
                        currentVideo === sectionIndex + "," + lectionIndex
                          ? "current-lection"
                          : ""
                      }
                    >
                      <p>{lection.info.title}</p>
                      <div>{lection.info.length}</div>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        );
      })}
    </React.Fragment>
  );
}
