import logo from './logo.svg';
import Search from './Search/Search.js'

import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [routes, setRoutes] = useState([])
  const [selectedRoute, setSelectedRoute] = useState()
  const [directions, setDirection] = useState()
  const [selectedDirections, setSelectedDirection] = useState()
  const [stops, setStops] = useState()
  const [selectedStop, setSelectedStop] = useState()

  
  useEffect(() => {
    axios.get(`https://svc.metrotransit.org/nextripv2/routes`)
    .then(res => {
      setRoutes(res.data)
    })
  }, [])
  

  const handleUserSelectedNewRoute = (value) => {
    setSelectedRoute(value)
    axios.get(`https://svc.metrotransit.org/nextripv2/directions/${value.route_id}`)
    .then(res => {
      setDirection(res.data)
    })
  }

  const handleUserSelectedNewDirection = (value) => {
    setSelectedDirection(value)
    axios.get(`https://svc.metrotransit.org/nextripv2/stops/${selectedRoute.route_id}/${value.direction_id}`)
    .then(res => {
      setStops(res.data)
    })
  }


  const handleUserSelectedNewStop = (value) => {
    setSelectedStop(value)
    axios.get(`https://svc.metrotransit.org/nextripv2/${selectedRoute.route_id}/${selectedDirections.direction_id}/${value.place_code}`)
    .then(res => {
      console.log(res.data)
     // setStops(res.data)
    })
  }


  return (
    <div className="App">
      <header className="App-header">
        <Search 
          routes={routes}
          selectedRoute={selectedRoute}
          setNewRoute={handleUserSelectedNewRoute}
          directions={directions}
          selectedDirections={selectedDirections}
          handleUserSelectedNewDirection={handleUserSelectedNewDirection}
          stops={stops}
          handleUserSelectedNewStop={handleUserSelectedNewStop}
          selectedStop={selectedStop}
        />
      </header>
    </div>
  );
}

export default App;
