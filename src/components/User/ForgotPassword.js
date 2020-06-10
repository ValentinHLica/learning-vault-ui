import React, { useState } from "react";
import axios from "axios";

// Header
import Header from "../Other/Header";

// Submit Input
import SubmitInput from "../Other/SubmitInput";

export default function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [emptyEmail, setEmptyEmail] = useState(false);

  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const submit = async (form) => {
    form.preventDefault();
    if (email.length === 0) {
      setEmptyEmail(true);
      return;
    }

    setFormSuccess(false);
    setFormError(false);
    setLoading(true);
    const APIUrl = window.APIUrl;

    await axios
      .post(`${APIUrl}/auth/forgotpassword`, { email })
      .then((reponse) => {
        setFormSuccess(true);
      })
      .catch((response) => {
        setFormError(true);
      });

    setLoading(false);
  };

  return (
    <div className="wrapper ">
      <Header props={props} page="main" />

      <form className="user-form forgot-password" onSubmit={submit}>
        <h2>Reset your password</h2>
        <p>
          Enter your user account's verified email address and we will send you
          a password reset link.
        </p>
        <input
          type="text"
          placeholder="Email address"
          onChange={(e) => {
            setEmail(e.target.value);
            if (emptyEmail) {
              setEmptyEmail(false);
            }
          }}
          value={email}
        />

        {emptyEmail ? (
          <p className="empty-input-error">Please provide email address</p>
        ) : null}

        <SubmitInput
          error={formError}
          success={formSuccess}
          value="Go"
          errorMessage="Invalid Credentials"
          loading={loading}
        />

        {formSuccess ? <p>Please check your email address</p> : null}
      </form>
    </div>
  );
}
