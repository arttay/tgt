import { Select, MenuItem, FormHelperText } from '@material-ui/core';

function Search(props) {
    const { selectedRoute, selectedDirection, selectedDirections, directions, stops, selectedStop } = props
    const handleNewSelection = (e) => {
        const routeNumber = e.target.value
        const routeObj = props.routes.find(item => item.route_id === routeNumber)
        props.setNewRoute(routeObj)
    }

    const handleNewDirectionSelection = (e) => {
        const directionNumber = e.target.value
        const routeObj = props.directions.find(item => item.direction_id === directionNumber)

        props.handleUserSelectedNewDirection(routeObj)
    }

    const handleNewStopSelection = (e) => {
        const stopNumber = e.target.value
        const routeObj = props.stops.find(item => item.place_code === stopNumber)

        props.handleUserSelectedNewStop(routeObj)
    }


  return (
    <div className="App">
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={props.selectedRoute}
          displayEmpty
          onChange={handleNewSelection}
        >
            <MenuItem value="" disabled>
            Placeholder
          </MenuItem>
            {props.routes.map(item => (
                <MenuItem value={item.route_id} key={item.route_id}>{item.route_label}</MenuItem>
            ))}
            <FormHelperText>Placeholder</FormHelperText>
        </Select>

      {directions && (
          <div>
            <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={selectedDirections}
            displayEmpty
            onChange={handleNewDirectionSelection}
            >
                <MenuItem value="" disabled>
                Direction
            </MenuItem>
                {props.directions.map(item => (
                    <MenuItem value={item.direction_id} key={item.direction_id}>{item.direction_name}</MenuItem>
                ))}
                <FormHelperText>Direction</FormHelperText>
            </Select>
          </div>
      )}

      {stops && (
          <div>
          <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={selectedStop}
          displayEmpty
          onChange={handleNewStopSelection}
          >
              <MenuItem value="" disabled>
              Stops
          </MenuItem>
              {props.stops.map(item => (
                  <MenuItem value={item.place_code} key={item.place_code}>{item.description}</MenuItem>
              ))}
              <FormHelperText>Stops</FormHelperText>
          </Select>
        </div>
      )}

    </div>
  );
}

export default Search;
