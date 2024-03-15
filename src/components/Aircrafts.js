function Aircrafts({ onSelectAircraft, aircraftsList, aircraftIndex }) {
  function calculateUtilization(aircraft) {
    const totalFlightTime = aircraft.rotation.reduce((acc, flight) => {
      return acc + (flight.arrivaltime - flight.departuretime);
    }, 0);
    const totalUptime = 86400; // 24 hours in seconds
    return Math.round((totalFlightTime / totalUptime) * 100);
  }

  let className = "aircraft";

  function isUtilized(aircraft) {
    if (aircraft.rotation.length > 0) {
      return className + " utilized";
    }
    return className;
  }

  return (
    <>
      <h1>Aircrafts</h1>
      <p>
        Select an Aircraft from the list to start creating rotation schedule
      </p>
      <hr />
      <ul>
        {aircraftsList.map((aircraft, index) => {
          return (
            <li key={aircraft.ident}>
              <button
                onClick={() => onSelectAircraft(aircraft.ident)}
                className={isUtilized(aircraft) + " " + (index === aircraftIndex ? "active" : "")}
              >
                <div>
                  <h3>{aircraft.ident}</h3>
                  <p>({calculateUtilization(aircraft)} %)</p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Aircrafts;
