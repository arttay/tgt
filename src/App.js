import React from "react";
import './App.css';

import CaseApp from "./caseApp/CaseApp.js"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";



function App() {

return (
  <Router>
  <div>
    <Switch>
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
