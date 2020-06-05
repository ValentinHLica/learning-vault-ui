import React from "react";

export default function VideoPlayer(props) {
  return <video src={props.videoUrl}></video>;
}
