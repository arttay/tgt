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
    <div className="App">
      <CaseApp />
    </div>
  );
}

export default App;
