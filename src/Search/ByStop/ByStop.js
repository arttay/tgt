import { TextField } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import React, { useRef  } from "react";


function ByStop(props) {
  const { handleSearchByStop } = props
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
          label="Stop Number"
          variant="outlined"
          id='tgt-stop-search-input'
          inputRef={searchTextValue}
          onKeyDown={handleKeyDown}
          data-cy="stopNumberInput"
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
    </div>
  );
}

export default ByStop;
