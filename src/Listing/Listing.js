import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow 
 } from '@material-ui/core';

function Listing(props) {
    const { data } = props
    const { departures } = data

  return (
    <div className="App">
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
          {departures.map((row) => (
            <TableRow key={row.route_short_name}>
              <TableCell component="th" scope="row">{row.route_short_name}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.departure_text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default Listing;
