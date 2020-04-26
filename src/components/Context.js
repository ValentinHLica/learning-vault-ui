import React, { Component } from "react";
import Cookies from "universal-cookie";

const Context = React.createContext();
export default class Provider extends Component {
  state = {
    query: "",
    setQuery: (e) => {
      this.setState({ query: e.target.value });
    },
    searchData: [],
    setSearchData: (data) => {
      this.setState({ searchData: data });
    },
    paggination: [0, 10, 1],
    setPaggination: (paggination) => {
      this.setState({
        paggination,
      });
    },
    token: null,
  };

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    if (token) {
      this.setState({ token });
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
