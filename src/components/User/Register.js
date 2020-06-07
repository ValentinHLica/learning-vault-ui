import React, { useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../Context";

import Cookies from "universal-cookie";

// Header
import Header from "../Other/Header";

// Input
import Input from "../Other/FormInput";

// Password Inpupt
import PasswordInput from "../Other/PasswordInput";

// Submit Input
import SubmitInput from "../Other/SubmitInput";

export default function Register(props) {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emptyUsername, setEmptyUsername] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  const [invalideEmail, setInvalideEmail] = useState(false);
  const [shortPassword, setShortPassword] = useState(false);
  const [shortUsername, setshortUsername] = useState(false);

  const [successRegister, setsuccessRegister] = useState(false);

  const [registerError, setregisterError] = useState(false);

  const { signIn } = React.useContext(Context);

  const registerUser = async (form) => {
    form.preventDefault();

    if (username.length === 0) {
      setEmptyUsername(true);
    }

    if (email.length === 0) {
      setEmptyEmail(true);
    }

    if (password.length === 0) {
      setEmptyPassword(true);
    }

    if (username.length === 0 || email.length === 0 || password.length === 0) {
      return;
    }

    if (username.length < 4) {
      setshortUsername(true);
      return;
    }

    if (password.length < 8) {
      setShortPassword(true);
      return;
    }

    const APIUrl = window.APIUrl;

    await axios
      .post(`${APIUrl}/auth/register`, { username, email, password })
      .then((response) => {
        const cookies = new Cookies();
        cookies.set("token", response.data.token, { path: "/" });
        cookies.set("username", username, { path: "/" });
        setsuccessRegister(true);
        signIn(response.data.token, username);

        setTimeout(() => {
          props.history.push("/");
        }, 1000);
      })
      .catch((error) => {
        if (error.response.data.message === "Please add a valid email") {
          setInvalideEmail(true);
          return;
        }

        setregisterError(true);
        setTimeout(() => {
          setregisterError(false);
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
    <div className="register">
      <Header props={props} page="register" />

      <div className="wrapper container">
        <form className="user-form" onSubmit={registerUser}>
          <h2>Register</h2>

          <Input
            class="username"
            title="Username"
            type="text"
            setInput={setusername}
            emptyInput={emptyUsername}
            setEmptyInput={setEmptyUsername}
            emptyInputError="Please provide a username"
            shortUsername={shortUsername}
            setshortUsername={setshortUsername}
          />

          <Input
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
            type="email"
            setInput={setPassword}
            emptyInput={emptyPassword}
            setEmptyInput={setEmptyPassword}
            emptyInputError="Please provide password"
            shortPassword={shortPassword}
            setShortPassword={setShortPassword}
          />

          <SubmitInput
            error={registerError}
            success={successRegister}
            value="Register"
            errorMessage="Another User uses that mail"
          />
        </form>
      </div>
    </div>
  );
}
