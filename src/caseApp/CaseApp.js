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
  const [selectedStop, setSelectedStop] = useState("default")
  const [selectedDirections, setSelectedDirection] = useState("default")
  const [selectedRoute, setSelectedRoute] = useState("default")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [httpError, setHttpError] = useState(false)
  const [isRoute, setIsRoute] = useState(true)

  useEffect(() => {

    setSelectedRoute(sanitizeString(params.route || "default"))
    setSelectedDirection(sanitizeString(params.direction || "default") )
    setSelectedStop(sanitizeString(params.stop || "default"))

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
      const newRoute = sanitizeString(String(value.route_id))
    setSelectedRoute(newRoute)
    axios.get(`https://svc.metrotransit.org/nextripv2/directions/${newRoute}`)
    .then(res => {
        routeProps.history.push(`/${newRoute}`)
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
      const newDirection = sanitizeString(String(value.direction_id))
    setSelectedDirection(newDirection)
    axios.get(`https://svc.metrotransit.org/nextripv2/stops/${selectedRoute}/${newDirection}`)
    .then(res => {
        routeProps.history.push(`/${selectedRoute}/${newDirection}`)
      setStops(res.data)

      if (selectedStop !== "default") {
        setSelectedStop("default")
        setStopTimes(undefined)
        setShowSearchResults(true)
      }
    })
  }

  const handleUserSelectedNewStop = (value) => {
    const newStop = sanitizeString(value.place_code)
    setSelectedStop(newStop)
    axios.get(`https://svc.metrotransit.org/nextripv2/${selectedRoute}/${selectedDirections}/${sanitizeString(newStop)}`)
    .then(res => {
        routeProps.history.push(`/${selectedRoute}/${selectedDirections}/${newStop}`)
      setStopTimes(res.data)
      setShowSearchResults(true)
    })
  }

  const handleSearchByStop = (value ) => {
    const stopSearch = sanitizeString(value)
    axios.get(`https://svc.metrotransit.org/nextripv2/${stopSearch}`)
    .then(res => {
        routeProps.history.push(`/${stopSearch}`)
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

  const sanitizeString = (str) => {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
  }


  return (
    <div className="App">
        <div className="searchTypeBtnContainer">
            <Button id="tgt-search-route-btn" variant="outlined" color="primary" onClick={() => handleSearchTypeChange(true)}>Route</Button>
            <Button id="tgt-search-stop-btn" variant="outlined" color="primary" onClick={() => handleSearchTypeChange(false)}>Stop</Button>
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
          showSearchResults={showSearchResults}
          httpError={httpError}
        />
   
    </div>
  );
}

export default CaseApp;
