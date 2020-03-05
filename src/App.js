import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.scss";
import Button from '@material-ui/core/Button';
import { ThemeProvider } from "@material-ui/core";
import Theme from "./Theme";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={Theme}>
        <div className="App">
          <h1> Hello, World! </h1>
          <Button variant="contained" color="primary">
            Press Me!
          </Button>
        </div>
      </ThemeProvider>
    );
  }
}


export default hot(module)(App);