import React, { Component } from "react";
import Cookies from "universal-cookie";

export const Context = React.createContext();
export default class Provider extends Component {
  state = {
    token: undefined,
    username: undefined,
    signIn: (token, username) => {
      this.setState({ token, username });
    },
    logOut: () => {
      this.setState({ token: undefined, username: undefined });
    },
    searchResults: [],
    setSearchResults: (data) => {
      this.setState({ searchResults: data });
    },
    paggination: [],
    setPaggination: (paggination) => {
      this.setState({ paggination });
    },
  };

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const username = cookies.get("username");
    if (token) {
      this.setState({ token, username });
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
