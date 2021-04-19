import { Select, MenuItem } from '@material-ui/core';

function ByRoute(props) {
    const { selectedRoute, selectedDirections, directions, stops, selectedStop } = props
    const routeSelectValue = stops || directions ? props.selectedRoute : "default"

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
          id="tgt-route-select"
          value={routeSelectValue}
          displayEmpty
          onChange={handleNewSelection}
          data-cy="routeSelect"
        >
            <MenuItem value="default" key="default" disabled>Select Route</MenuItem>
            {props.routes.map((item, key) => (
                <MenuItem data-cy={`route-${key}`} className={`tgt-route-${item.route_id}`} value={item.route_id} key={item.route_id}>{item.route_label}</MenuItem>
            ))}
        </Select>

      {directions && selectedRoute && (
          <div>
            <Select
            id="tgt-direction-select"
            value={selectedDirections}
            displayEmpty
            onChange={handleNewDirectionSelection}
            data-cy="directionSelect"
            >
                <MenuItem value="default" disabled>
                Select a Direction
            </MenuItem>
                {props.directions.map((item, key) => (
                    <MenuItem data-cy={`direction-${key}`} className={`tgt-direction-${item.direction_id}`} value={item.direction_id} key={item.direction_id}>{item.direction_name}</MenuItem>
                ))}
            </Select>
          </div>
      )}

      {stops && selectedDirections && (
          <div>
          <Select
          labelId="demo-simple-select-required-label"
          id="tgt-stop-select"
          value={selectedStop}
          displayEmpty
          onChange={handleNewStopSelection}
          data-cy="stopSelect"
          >
              <MenuItem value="default" disabled>
              Select a Stop
          </MenuItem>
              {props.stops.map((item, key) => (
                  <MenuItem data-cy={`stop-${key}`} className={`tgt-stop-${item.place_code}`} value={item.place_code} key={item.place_code}>{item.description}</MenuItem>
              ))}
          </Select>
        </div>
      )}


    </div>
  );
}

export default ByRoute;
