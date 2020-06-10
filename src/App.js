import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Provider from "./components/Context";

// Main Page
import Main from "./components/Main/Index";

// Search
import Search from "./components/Search/Index";

// Course
import Course from "./components/Course/Index";

// User
// Login
import Login from "./components/User/Login";

// Register
import Register from "./components/User/Register";

// Forgot Password
import ForgotPassword from "./components/User/ForgotPassword";

// Forgot Password
import ResetPassword from "./components/User/ResetPassword";

export default function App() {
  window.APIUrl = "https://learning-valut-api.herokuapp.com";
  return (
    <Provider>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/search/:query" component={Search} />
          <Route exact path="/course/:courseUrl" component={Course} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/resetpassword/:token" component={ResetPassword} />
        </Switch>
      </Router>
    </Provider>
  );
}
