import Search from '../Search/Search.js'
import React from "react";

import axios from 'axios';
import { useState, useEffect } from 'react';
import '../App.css';
import { Button } from '@material-ui/core';

import Listing from "../Listing/Listing.js"

import { sanitizeString } from "../Util/Util"

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
  const [selectedStop, setSelectedStop] = useState(sanitizeString(params.stop || "default"))
  const [selectedDirections, setSelectedDirection] = useState(sanitizeString(params.direction || "default"))
  const [selectedRoute, setSelectedRoute] = useState(sanitizeString(params.route || "default"))
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [httpError, setHttpError] = useState(false)
  const [isRoute, setIsRoute] = useState(true)

  useEffect(() => {

    axios.get(`https://svc.metrotransit.org/nextripv2/routes`)
    .then(res => {
      setRoutes(res.data)
    })

    if (
        selectedStop !== "default" &&
        selectedDirections !== "default" &&
        selectedRoute !== "default"
    ) {
        axios.get(`https://svc.metrotransit.org/nextripv2/${selectedRoute}/${selectedDirections}/${selectedStop}`)
        .then(res => {
          console.log("hello!")
            setStopTimes(res.data)
            setShowSearchResults(true)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setSelectedStop(params.stop || "default")
    setSelectedDirection(params.direction || "default")
    setSelectedRoute(params.route || "default")
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setShowSearchResults(true)
        setStopTimes(res.data)
    }, (err) => {
        setHttpError(true)
    })
  }

  const handleSearchTypeChange = (value) => {
    setIsRoute(value)
    setStopTimes(undefined)
    setShowSearchResults(false)

    if (value) {
        setSelectedRoute(sanitizeString(params.route || "default"))
        setSelectedStop(sanitizeString(params.stop || "default"))
    }

    if (value &&         
        selectedStop !== "default" &&
        selectedDirections !== "default" &&
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
            <Button id="tgt-search-route-btn" variant="outlined" color="primary" onClick={() => handleSearchTypeChange(true)} data-cy="byRoute">Route</Button>
            <Button id="tgt-search-stop-btn" variant="outlined" color="primary" onClick={() => handleSearchTypeChange(false)} data-cy="byStop">Stop</Button>
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
        />

        {showSearchResults && (
          <>
          <Listing data={stopTimes} httpError={httpError} />
          </>
        )}
   
    </div>
  );
}

export default CaseApp;
