import { TextField } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Listing from "../../Listing/Listing.js"

function ByStop(props) {
  const { handleSearchByStop, stopTimes, isRoute, httpError } = props
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchByStop(e.target.value)
   }
  }

  return (
    <div className="App">
        <TextField
          label="Outlined"
          variant="outlined"
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />


      {(stopTimes || httpError) && !isRoute && (
        <Listing data={stopTimes} httpError={props.httpError} />
      )}
    </div>
  );
}

export default ByStop;
