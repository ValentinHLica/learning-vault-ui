import React, { Component } from "react";

export const Context = React.createContext();
export default class Provider extends Component {
  state = {
    login: false,
    logOut: () => {
      this.setState({ login: !this.state.login });
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

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
