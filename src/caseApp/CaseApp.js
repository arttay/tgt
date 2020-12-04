import logo from '../logo.svg';
import Search from '../Search/Search.js'

import axios from 'axios';
import { useState, useEffect } from 'react';
import '../App.css';



function CaseApp(props) {
    const { routeProps } = props
    const { params } = routeProps.match
    
  const [routes, setRoutes] = useState([])
  const [selectedRoute, setSelectedRoute] = useState(params.route)
  const [directions, setDirection] = useState()
  const [selectedDirections, setSelectedDirection] = useState(params.direction)
  const [stops, setStops] = useState()
  const [selectedStop, setSelectedStop] = useState(params.stop)
  const [stopTimes, setStopTimes] = useState()

  
  useEffect(() => {
    axios.get(`https://svc.metrotransit.org/nextripv2/routes`)
    .then(res => {
      setRoutes(res.data)
    })
  }, [])
  

  const handleUserSelectedNewRoute = (value) => {
    console.log(value)

    setSelectedRoute(value)
    axios.get(`https://svc.metrotransit.org/nextripv2/directions/${value.route_id}`)
    .then(res => {
        routeProps.history.push(`/${value.route_id}`)
      setDirection(res.data)
    })
  }

  const handleUserSelectedNewDirection = (value) => {
    setSelectedDirection(value)
    axios.get(`https://svc.metrotransit.org/nextripv2/stops/${selectedRoute.route_id}/${value.direction_id}`)
    .then(res => {
        routeProps.history.push(`/${selectedRoute.route_id}/${value.direction_id}`)
      setStops(res.data)
    })
  }


  const handleUserSelectedNewStop = (value) => {
    setSelectedStop(value)
    axios.get(`https://svc.metrotransit.org/nextripv2/${selectedRoute.route_id}/${selectedDirections.direction_id}/${value.place_code}`)
    .then(res => {
        routeProps.history.push(`/${selectedRoute.route_id}/${selectedDirections.direction_id}/${value.place_code}`)
      setStopTimes(res.data)
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
          stopTimes={stopTimes}
        />
      </header>
    </div>
  );
}

export default CaseApp;
