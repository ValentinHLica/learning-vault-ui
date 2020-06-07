import React from "react";

export default function FormInput(props) {
  return (
    <div className={`${props.class} input`}>
      <p>{props.title}</p>
      <input
        type={props.type}
        onChange={(e) => {
          props.setInput(e.target.value);
          if (props.emptyInput) {
            props.setEmptyInput(false);
          }
          if (props.invalideEmail && props.type === "email") {
            props.setInvalideEmail(false);
          }
          if (props.shortUsername) {
            props.setshortUsername(false);
          }
        }}
        className={props.emptyInput ? "empty-query" : ""}
      />
      {props.emptyInput ? (
        <p className="empty-input-error">{props.emptyInputError}</p>
      ) : null}

      {props.invalideEmail && props.type === "email" ? (
        <p className="empty-input-error">
          Please provide a valid email address
        </p>
      ) : null}

      {props.shortUsername && props.class === "username" ? (
        <p className="empty-input-error">
          Username must me longer than 4 characters
        </p>
      ) : null}
    </div>
  );
}
