import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Context } from "../Context";
import { Link } from "react-router-dom";

import axios from "axios";

// Header
import Header from "../Other/Header";

// Email Inpupt
import EmailInput from "../Other/FormInput";

// Password Inpupt
import PasswordInput from "../Other/PasswordInput";

// Submit Input
import SubmitInput from "../Other/SubmitInput";

export default function Login(props) {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  const [invalideEmail, setInvalideEmail] = useState(false);
  const [shortPassword, setShortPassword] = useState(false);

  const [loginError, setLoginError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [invalideCredentials, setInvalideCredentials] = useState(false);

  const { signIn } = React.useContext(Context);

  const loginUser = async (form) => {
    form.preventDefault();
    setInvalideCredentials(false);

    if (email.length === 0) {
      setEmptyEmail(true);
    }

    if (password.length === 0) {
      setEmptyPassword(true);
    }

    if (email.length === 0 || password.length === 0) {
      return;
    }

    if (password.length < 8) {
      setShortPassword(true);
      return;
    }

    const APIUrl = window.APIUrl;

    setLoading(true);
    await axios
      .post(`${APIUrl}/auth/login`, { email, password })
      .then((response) => {
        const cookies = new Cookies();
        cookies.set("token", response.data.token, { path: "/" });
        cookies.set("username", response.data.username, { path: "/" });
        setLoginSuccess(true);
        signIn(response.data.token, response.data.username);

        setLoading(false);
        setTimeout(() => {
          props.history.push("/");
        }, 1000);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.data.message === "Please add a valid email") {
          setInvalideEmail(true);
          return;
        }

        if (error.response.data.message === "Invalide Credentials") {
          setInvalideCredentials(true);
          return;
        }

        setLoginError(true);
        setTimeout(() => {
          setLoginError(false);
        }, 2000);
      });
  };

  useEffect(() => {
    const cookies = new Cookies();

    if (cookies.get("token")) {
      props.history.push("/");
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="login">
      <Header props={props} page="login" />

      <div className="wrapper container">
        <form className="user-form" onSubmit={loginUser}>
          <h2>Login</h2>

          <EmailInput
            class="email"
            title="Email"
            type="email"
            setInput={setEmail}
            emptyInput={emptyEmail}
            setEmptyInput={setEmptyEmail}
            emptyInputError="Please provide email address"
            invalideEmail={invalideEmail}
            setInvalideEmail={setInvalideEmail}
          />

          <PasswordInput
            class="password"
            title="Password"
            type="password"
            setInput={setPassword}
            emptyInput={emptyPassword}
            setEmptyInput={setEmptyPassword}
            emptyInputError="Please provide password"
            shortPassword={shortPassword}
            setShortPassword={setShortPassword}
          />

          <SubmitInput
            error={loginError}
            success={loginSuccess}
            value="Login"
            errorMessage="User does not exist"
            invalideCredentials={invalideCredentials}
            loading={loading}
          />

          <Link to="/forgotpassword" className="forgot-password-link">
            Forgot Password
          </Link>
        </form>
      </div>
    </div>
  );
}
