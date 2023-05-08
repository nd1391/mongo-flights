const React = require('react')

class Show extends React.Component {
    render() {
        const {flight} = this.props
        console.log(flight)
        return(
            <div>
                <h1>Show Page - Check out this Flight</h1>
                <h1>Airline: {flight.airline}</h1>
                <h2>Flight Number: {flight.flightNo}</h2>
                <h2>Depature Time: {flight.departs.toISOString().slice(0, 16)}</h2>
                <h2>Airport: {flight.airport}</h2>
                <h2> Destinations:</h2> {flight.destinations.map((destinations) => {
                    return (<h3>{destinations.airport}<br/></h3>)
                })}
                <br></br>
                <form method='POST' action={`/destinations/${flight._id}`}>
                <label>Select a Destination: </label>
                    <select name="airport">
                        <option value="AUS">AUS</option>
                        <option value="DAL">DAL</option>
                        <option value="LAX">LAX</option>
                        <option value="SAN">SAN</option>
                        <option value="SEA">SEA</option>
                    </select>
                    <input type="submit" value="Update Flight" />
                </form>
            </div>
        )
    }
}

module.exports = Show;