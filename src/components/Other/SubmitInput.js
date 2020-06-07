import React from "react";

// SuccessIcon
import SuccessIcon from "../../assets/img/check.svg";

// LoadingIcon
import LoadingIcon from "../../assets/img/loader.svg";

export default function SubmitInput(props) {
  return (
    <div className="submit">
      <button
        type="submit"
        className={`pointer ${props.error ? "form-failed" : ""} ${
          props.success ? "form-success" : ""
        }`}
      >
        {!props.loading && !props.success ? props.value : null}

        {props.success ? <img src={SuccessIcon} alt="Success Icone" /> : null}

        {props.loading ? (
          <img src={LoadingIcon} alt="Loading Icone" className="loading-icon" />
        ) : null}
      </button>

      {props.error ? <p className="form-error">{props.errorMessage}</p> : null}

      {props.invalideCredentials && props.value === "Login" ? (
        <p className="form-error">Invalide Credentials</p>
      ) : null}
    </div>
  );
}
