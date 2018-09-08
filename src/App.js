import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Album from './components/Album';
import SignIn from "./components/SignIn";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Ankurs React App, under active development</h1>
        </header>
          <div>
              <Album/>
              <SignIn/>
          </div>
      </div>
    );
  }
}

export default App;
