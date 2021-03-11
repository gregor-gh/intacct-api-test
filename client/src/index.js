import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from "./Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cookies from "js-cookie";
//import { useState, useEffect } from "react"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/">
        {Cookies.get("usersession") ? 
        <App/>:<Login/>}
      </Route>
</Router>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
