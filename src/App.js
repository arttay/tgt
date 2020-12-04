import logo from './logo.svg';
import Search from './Search/Search.js'

import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

import CaseApp from "./caseApp/CaseApp.js"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {

return (
  <Router>
  <div>
    <Switch>ds
      <Route path="/:route?/:direction?/:stop?" render={routeProps => (
        <CaseApp routeProps={routeProps}/>
      )}>
        
      </Route>
    </Switch>
  </div>
</Router>
)

/*
  return (
    <div className="App">
      <CaseApp />
    </div>
  );
  */
}

export default App;
