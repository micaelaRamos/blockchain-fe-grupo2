import React from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Home from "./pages/Home";

import './App.scss';

const Main = () => (
  <HashRouter>
    <div className="main">
      <div className="routing-settings">
        <span key="home"><NavLink exact to="/">Home</NavLink></span>
      </div>
      <>
        <Route exact path="/" component={Home}/>
      </>
    </div>
  </HashRouter>
);

export default Main;
