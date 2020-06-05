import React, { useState } from "react";
import { Context } from "../Context";

import { Link } from "react-router-dom";

// Search Form
import SearchForm from "./SearchFormHeader";

// Settings Icone
import SettingsIcon from "../../assets/img/settings.svg";

// Settings Icone
import MobileMenuIcon from "../../assets/img/menu.svg";

// Logo
import Logo from "../../assets/img/logo.svg";

export default function Header(props) {
  const [query, setQuery] = useState("");
  const [emptyQuery, setEmptyQuery] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);

  const submit = (form) => {
    form.preventDefault();
    if (query.length === 0) {
      setEmptyQuery(true);
      setTimeout(() => {
        setEmptyQuery(false);
      }, 2000);
      return;
    }

    if (props.page === "search") {
      props.props.history.replace(`/search/${query}`);
      props.searchCourses(query);
      return;
    }

    props.props.history.push(`/search/${query}`);
  };

  const { login } = React.useContext(Context);

  return (
    <header>
      <div className="container flex items-center">
        <div className="flex justify-center items-center">
          <Link to="/" className="logo flex items-center">
            <img src={Logo} alt="Learning Vault Logo" />
            <p>Learning Vault</p>
          </Link>

          <SearchForm
            submit={submit}
            setQuery={setQuery}
            emptyQuery={emptyQuery}
            mobile={false}
          />
        </div>

        <div>
          {login ? (
            <div className="flex items-center menu header-lg">
              <p>UserName</p>
              <div
                className="settings-button pointer flex justify-center items-center"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img src={SettingsIcon} alt="Settings Icon" />
              </div>
              <ul
                className={`setting-dropdown ${
                  dropdownOpen ? "openDropdown" : "closedDropdown"
                }`}
              >
                <li>Account</li>
                <li>Your'e Courses</li>
                <li>Log Out</li>
              </ul>
            </div>
          ) : (
            <ul className="flex justify-center items-center header-lg">
              <li>Login</li>
              <li>Register</li>
            </ul>
          )}

          <div
            className="mobile-dropdown-button pointer flex items-center justify-center"
            onClick={() => setMobileDropdown(!mobileDropdown)}
          >
            <img src={MobileMenuIcon} alt="Mobile Menu Icon" />
          </div>

          <ul
            className={`mobile-dropdown ${
              mobileDropdown ? "mobile-dropdown-open" : "mobile-dropdown-closed"
            }`}
          >
            <li>
              <SearchForm
                submit={submit}
                setQuery={setQuery}
                emptyQuery={emptyQuery}
                mobile={true}
              />
            </li>
            {login ? (
              <React.Fragment>
                <li>Account</li>
                <li>Your'e Courses</li>
                <li>Log Out</li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li>Login</li>
                <li>Register</li>
              </React.Fragment>
            )}
          </ul>
        </div>

        <div
          className={`mobile-bc ${mobileDropdown ? "mobile-bc-opened" : ""}`}
          onClick={() => setMobileDropdown(!mobileDropdown)}
        ></div>

        <div
          className={`setting-bc ${dropdownOpen ? "setting-bc-opened" : ""}`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        ></div>
      </div>
    </header>
  );
}
