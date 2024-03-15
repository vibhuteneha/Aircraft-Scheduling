function Flights({availableFlights, handleFlightSelect}) {
  return (
    <>
        <h1>Flights</h1>
          <p>{availableFlights.length > 0 ? 'Click on a flight to select it' : 'No flights to select'}</p>
          <hr />
          <ul>
            {availableFlights.map((flight) => {
              return (
                <li key={flight.ident}>
                  <button
                    className="aircraft"
                    onClick={() => handleFlightSelect(flight)}>
                        <h3>{flight.ident}</h3>
                        <div className="sub-contents">
                            <div className="flight-row">
                                <p>{flight.origin}</p> <span className="right-arrow">&#10142;</span> <p>{flight.destination}</p>
                            </div>
                            <div className="flight-row">
                                <p>{flight.readable_departure}</p>
                                <p>{flight.readable_arrival}</p>
                            </div>
                        </div>
                  </button>
                </li>
              );
            })}
          </ul>
    </>
  );
}

export default Flights;