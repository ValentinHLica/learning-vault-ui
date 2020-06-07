import React, { useState } from "react";

// ShowPasswordIcon
import ShowPasswordIcon from "../../assets/img/eye.svg";

// HidePasswordIcon
import HidePasswordIcon from "../../assets/img/eye-off.svg";

export default function PasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="password input ">
      <p>Password</p>
      <div className="flex items-center">
        <input
          type={showPassword ? "text" : "password"}
          onChange={(e) => {
            props.setInput(e.target.value);
            if (props.emptyInput) {
              props.setEmptyInput(false);
            }
            if (props.shortPassword) {
              props.setShortPassword(false);
            }
          }}
          className={props.emptyInput ? "empty-query" : ""}
        />
        <div
          className="view-password flex items-center justify-center pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          <img
            src={showPassword ? ShowPasswordIcon : HidePasswordIcon}
            alt="Password Visibility Icon"
          />
        </div>
      </div>

      {props.emptyInput ? (
        <p className="empty-input-error">{props.emptyInputError}</p>
      ) : null}

      {props.shortPassword ? (
        <p className="empty-input-error">
          Password must me longer than 8 characters
        </p>
      ) : null}
    </div>
  );
}
