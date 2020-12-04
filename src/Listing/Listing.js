import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow 
 } from '@material-ui/core';

function Listing(props) {
    const { data, httpError } = props


    const renderTable = () => {
        return (
            <TableContainer >
            <Table  aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Route</TableCell>
                    <TableCell align="right">Destination</TableCell>
                    <TableCell align="right">Departs</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data?.departures.map((row) => (
                    <TableRow key={row.route_short_name}>
                    <TableCell component="th" scope="row">{row.route_short_name}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">{row.departure_text}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        )
    }

    const renderErrorMessage = () => {
        console.log(httpError)
        return httpError ? (
            <div>There was an error fetching the data</div>
        ) : (
            <div>No departures at this time</div>
        )
    }

  return (
    <div className="App">
        {data?.departures.length ? (
            renderTable()
        ) : (
            renderErrorMessage()
        )}
    </div>
  );
}

export default Listing;
