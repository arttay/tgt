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
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [httpError, setHttpError] = useState(false)


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
            setShowSearchResults(true)
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

        if (selectedDirections !== "default" || selectedStop !== "default") {
            setSelectedStop("default")
            setSelectedDirection("default")
            setStops(undefined)
            setStopTimes(undefined)
            setShowSearchResults(true)
        }


    })
  }

  const handleUserSelectedNewDirection = (value) => {
    setSelectedDirection(value.direction_id)
    axios.get(`https://svc.metrotransit.org/nextripv2/stops/${selectedRoute}/${value.direction_id}`)
    .then(res => {
        routeProps.history.push(`/${selectedRoute}/${value.direction_id}`)
      setStops(res.data)

      if (selectedStop !== "default") {
        setSelectedStop("default")
        setStopTimes(undefined)
        setShowSearchResults(true)
      }
    })
  }

  const handleUserSelectedNewStop = (value) => {
    setSelectedStop(value.place_code)
    axios.get(`https://svc.metrotransit.org/nextripv2/${selectedRoute}/${selectedDirections}/${value.place_code}`)
    .then(res => {
        routeProps.history.push(`/${selectedRoute}/${selectedDirections}/${value.place_code}`)
      setStopTimes(res.data)
      setShowSearchResults(true)
    })
  }

  const handleSearchByStop = (value ) => {
    axios.get(`https://svc.metrotransit.org/nextripv2/${value}`)
    .then(res => {
        routeProps.history.push(`/${value}`)
        setStopTimes(res.data)
    }, (err) => {
        setHttpError(true)
    })
  }

  const handleSearchTypeChange = (value) => {
    setIsRoute(value)
    setStopTimes(undefined)

    if (value) {
        setSelectedRoute("default")
        setSelectedStop("default")
        setStops(undefined)
        setDirection(undefined)
    }

    if (value &&         
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
            setShowSearchResults(true)
        })
    }
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
          handleSearchByStop={handleSearchByStop}
          isRoute={isRoute}
          showSearchResults={showSearchResults}
          httpError={httpError}
        />
   
    </div>
  );
}

export default CaseApp;
