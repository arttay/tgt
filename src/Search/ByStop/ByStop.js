import { TextField } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Listing from "../../Listing/Listing.js"

import React, { useRef  } from "react";


function ByStop(props) {
  const { handleSearchByStop, stopTimes, isRoute, httpError } = props
  const searchTextValue = useRef()

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchByStop(e.target.value)
   }
  }

  const handleIconClick = () => {
    handleSearchByStop(searchTextValue.current.value)
  }

  return (
    <div className="App">
        <TextField
          label="Outlined"
          variant="outlined"
          id='tgt-stop-search-input'
          inputRef={searchTextValue}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={handleIconClick}>
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
