import Timeline from "./Timeline";
function Rotation({aircraftIndex, aircraftsList , onRemove, onRemoveAll}) {
  return (
    <>
      <h1>Rotation {aircraftIndex !== null ? aircraftsList[aircraftIndex].ident : ''}</h1>
      {aircraftIndex !== null && <p>Click on a flight to add it to the rotation</p>}
      <hr />
      <div className="rotation-container">
        <div>
          <ul>
            {aircraftIndex !== null ? 
              aircraftsList[aircraftIndex].rotation.map((flight) => {
              return (
                <li key={flight.ident}> 
                <button
                    className="aircraft" onClick={() => onRemove(flight)}>
                  <h3>{flight.ident}</h3>
                  <div className="sub-contents">
                    <div className="flight-row">
                      <p>{flight.origin}</p> <span className="right-arrow">&#x1F82A;</span> <p>{flight.destination}</p>
                    </div>
                    <div className="flight-row">
                      <p>{flight.readable_departure}</p>
                      <p>{flight.readable_arrival}</p>
                    </div>
                  </div>
                </button>
                </li>
              );
            }) : <p>No aircraft selected!</p>}
          </ul>
        </div>
        {aircraftIndex !== null && 
        <div className='timeline-container'>
          {aircraftsList[aircraftIndex].rotation.length > 0 && <button onClick={onRemoveAll} className="remove">Remove All Flights</button>}
          <hr />
          <Timeline aircraft={aircraftsList[aircraftIndex]}/>
        </div>
        }
      </div>
    </>
  );
}

export default Rotation;