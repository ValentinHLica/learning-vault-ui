import React from "react";

export default function Loading(props) {
  return (
    <div
      className="loading"
      style={{
        width: props.loadingWidth,
        height: props.loadingHeight,
        margin: props.margin,
      }}
    >
      <div
        className="loader"
        style={{ width: props.loaderWidth, height: props.loaderHeight }}
      ></div>
    </div>
  );
}
