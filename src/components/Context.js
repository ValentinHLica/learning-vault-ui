import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();
export default class Provider extends Component {
  state = {
    data: [],
    setData: (query, loading, setNotFound) => {
      this.setState({ data: [] });
      axios
        .get(
          `https://learning-valut-api.herokuapp.com/search/${query}?pagginatio=false`
        )
        .then(e => {
          this.setState({ data: e.data.data });
        })
        .then(() => {
          loading(false);
        })
        .catch(() => {
          loading(false);
          setNotFound(true);
        });
    }
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
