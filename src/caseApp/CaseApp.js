import logo from '../logo.svg';
import Search from '../Search/Search.js'
import React from "react";

import axios from 'axios';
import { useState, useEffect } from 'react';
import '../App.css';
import { Button } from '@material-ui/core';

import {
    useLocation
  } from "react-router-dom";



function CaseApp(props) {
    const { routeProps } = props
    const { params } = routeProps.match
    const location = useLocation();

  const [routes, setRoutes] = useState([])
  const [directions, setDirection] = useState()
  const [stops, setStops] = useState()
  const [stopTimes, setStopTimes] = useState()
  const [selectedStop, setSelectedStop] = useState(params.stop || "default")
  const [selectedDirections, setSelectedDirection] = useState(params.direction || "default")
  const [selectedRoute, setSelectedRoute] = useState(params.route || "default")


  const [isRoute, setIsRoute] = useState(true)


  useEffect(() => {
    axios.get(`https://svc.metrotransit.org/nextripv2/routes`)
    .then(res => {
      setRoutes(res.data)
    })



    if (
        selectedStop && 
        selectedStop !== "default" &&
        selectedDirections && 
        selectedDirections !== "default" &&
        selectedRoute  && 
        selectedRoute !== "default"
    ) {
        axios.get(`https://svc.metrotransit.org/nextripv2/${selectedRoute}/${selectedDirections}/${selectedStop}`)
        .then(res => {
            setStopTimes(res.data)
        })
    }

  }, [])


  useEffect(() => {
    setSelectedStop(params.stop || "default")
    setSelectedDirection(params.direction || "default")
    setSelectedRoute(params.route || "default")
  }, [location]);
  
  const handleUserSelectedNewRoute = (value) => {
    setSelectedRoute(value.route_id)
    axios.get(`https://svc.metrotransit.org/nextripv2/directions/${value.route_id}`)
    .then(res => {
        routeProps.history.push(`/${value.route_id}`)
      setDirection(res.data)
    })
  }

  const handleUserSelectedNewDirection = (value) => {
    setSelectedDirection(value.direction_id)
    axios.get(`https://svc.metrotransit.org/nextripv2/stops/${selectedRoute}/${value.direction_id}`)
    .then(res => {
        routeProps.history.push(`/${selectedRoute}/${value.direction_id}`)
      setStops(res.data)
    })
  }


  const handleUserSelectedNewStop = (value) => {
    setSelectedStop(value.place_code)
    axios.get(`https://svc.metrotransit.org/nextripv2/${selectedRoute}/${selectedDirections}/${value.place_code}`)
    .then(res => {
        routeProps.history.push(`/${selectedRoute}/${selectedDirections}/${value.place_code}`)
      setStopTimes(res.data)
    })
  }


  const handleSearchTypeChange = (value) => {
    setIsRoute(value)
  }

  return (
    <div className="App">
        <div className="searchTypeBtnContainer">
            <Button variant="outlined" color="primary" onClick={() => handleSearchTypeChange(true)}>Route</Button>
            <Button variant="outlined" color="primary" onClick={() => handleSearchTypeChange(false)}>Stop</Button>
        </div>



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
          isRoute={isRoute}
        />
   
    </div>
  );
}

export default CaseApp;
