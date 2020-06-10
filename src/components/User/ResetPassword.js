import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Context } from "../Context";

// Header
import Header from "../Other/Header";

// Password Inpupt
import PasswordInput from "../Other/PasswordInput";

// Submit Input
import SubmitInput from "../Other/SubmitInput";

// LoadingIcon
import LoadingIcon from "../../assets/img/loader.svg";

export default function ResetPassword(props) {
  const [newPassword, setnewPassword] = useState("");
  const [emptyPassword, setemptyPassword] = useState(false);
  const [shortPassword, setshortPassword] = useState(false);

  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const [formLoading, setformLoading] = useState(false);

  const [loading, setloading] = useState(true);
  const [invalidtoken, setInvalidtoken] = useState(false);
  const [validToken, setValidToken] = useState(false);

  const { signIn } = React.useContext(Context);

  const submit = async (form) => {
    form.preventDefault();

    const APIUrl = window.APIUrl;

    setformLoading(true);
    await axios
      .post(`${APIUrl}/auth/resetpassword/${props.match.params.token}`, {
        password: newPassword,
      })
      .then((response) => {
        setFormSuccess(true);
        const cookies = new Cookies();
        cookies.set("token", response.data.token, { path: "/" });
        cookies.set("username", response.data.username, { path: "/" });

        signIn(response.data.token, response.data.username);
        setTimeout(() => {
          props.history.push("/");
        }, 1000);
      })
      .catch((response) => {
        setFormError(true);
      });

    setformLoading(false);
  };

  const checkResetToken = async () => {
    const APIUrl = window.APIUrl;
    await axios
      .get(`${APIUrl}/auth/checkresettoken/${props.match.params.token}`)
      .then((response) => {
        setValidToken(true);
      })
      .catch((response) => {
        setInvalidtoken(true);
      });

    setloading(false);
  };

  useEffect(() => {
    checkResetToken();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="reset-password">
      <Header props={props} page="resetpassword" />

      <div className="wrapper">
        {loading ? (
          <div className="flex items-center justify-center">
            <img src={LoadingIcon} alt="Loading Icon" />
          </div>
        ) : null}

        {invalidtoken ? (
          <div className="flex items-center justify-center">
            <h2>Invalid Token</h2>
          </div>
        ) : null}

        {validToken ? (
          <form className="user-form" onSubmit={submit}>
            <h2>Reset Password</h2>
            <PasswordInput
              class="password"
              title="Password"
              type="password"
              setInput={setnewPassword}
              emptyInput={emptyPassword}
              setEmptyInput={setemptyPassword}
              emptyInputError="Please provide password"
              shortPassword={shortPassword}
              setShortPassword={setshortPassword}
            />

            <SubmitInput
              error={formError}
              success={formSuccess}
              value="Go"
              errorMessage="Please provide valid password"
              loading={formLoading}
            />
          </form>
        ) : null}
      </div>
    </div>
  );
}
