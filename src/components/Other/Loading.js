import React from "react";

export default function Loading(props) {
  return (
    <div
      className="loading"
      style={{ width: props.width, height: props.height }}
    ></div>
  );
}
