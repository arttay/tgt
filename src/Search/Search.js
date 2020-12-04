import ByRoute from "./ByRoute/ByRoute.js"
import ByStop from "./ByStop/ByStop.js"

function Search(props) {
  const { isRoute } = props

  return (
    <div className="App">

      {isRoute ? (
        <ByRoute {...props} />
      ) : (
        <ByStop {...props} />
      )}
      
    </div>
    
  );
}

export default Search;
