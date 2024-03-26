import "./App.css";
import { useEffect, useRef, useState } from "react";
import Aircrafts from "./components/Aircrafts";
import Flights from "./components/Flights";
import Header from "./components/Header";
import Rotation from "./components/Rotation";
import Modal from "./components/Modal";

function App() {
  const [aircraftsList, setAircraftsList] = useState([]);
  const [flightsList, setFlightsList] = useState([]);
  const [availableFlights, setAvailableFlights] = useState([]);
  const [aircraftIndex, setAircraftIndex] = useState(null);
  const modal = useRef();

  // Fetch data from local Json file
  useEffect(() => {
    fetch("/aircrafts.json")
      .then((response) => response.json())
      .then((data) => {
        let aircrafts = data.map((aircraft) => {
          aircraft.rotation = [];
          return aircraft;
        });
        setAircraftsList(aircrafts);
      });

    fetch("/flights.json")
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.departuretime - b.departuretime);
        setFlightsList(data);
        setAvailableFlights(data);
      });
  }, []);

  function handleFlightSelect(flight) {
    //Add flight to rotation
    if(aircraftIndex === null) {
      modal.current.open();
      return;
    }

    const newAircraftsList = [...aircraftsList];
    newAircraftsList[aircraftIndex].rotation.push(flight);
    flightsForRotation(aircraftIndex);
    setAircraftsList(newAircraftsList);
  }

  function handleAircraftSelect(aircraftId) {
    //Select aircraft
    const selectedAircraftIndex = aircraftsList.findIndex(
      (aircraft) => aircraft.ident === aircraftId
    );
    flightsForRotation(selectedAircraftIndex);
    setAircraftIndex(selectedAircraftIndex);
  }

  function handleFlightRemove(flight) {
    //Remove flight from rotation
    const newAircraftsList = [...aircraftsList];

    let index = newAircraftsList[aircraftIndex].rotation.indexOf(flight);

    if(newAircraftsList[aircraftIndex].rotation.length - 1 > index) {
      newAircraftsList[aircraftIndex].rotation.splice(index);
    } else {
      newAircraftsList[aircraftIndex].rotation = newAircraftsList[aircraftIndex].rotation.filter(
        (item) => item.ident !== flight.ident
      );
    }
    flightsForRotation(aircraftIndex);
    setAircraftsList(newAircraftsList);
  }

  function handleRemoveAllflights() {
    //Remove all flights from rotation
    const newAircraftsList = [...aircraftsList];
    newAircraftsList[aircraftIndex].rotation = [];
    flightsForRotation(aircraftIndex);
    setAircraftsList(newAircraftsList);
  }


  function flightsForRotation(aircraftIndex) {
    //Get flights for rotation
    let allFlights = [...flightsList];
    let filteredFlights = [];
    let rotation = aircraftsList[aircraftIndex].rotation;
    if(aircraftIndex !== null && rotation.length > 0) {
      const matchTime = rotation[rotation.length - 1].arrivaltime + 1200;  //adding 20 minutes of buffer time
      const matchAirport = rotation[rotation.length - 1].destination; // destination of last flight in rotation
      filteredFlights = allFlights.filter(flight => flight.departuretime >= matchTime && flight.origin === matchAirport && flight.arrivaltime < 86400); // making sure the flight is after the last flight in rotation and the flight is not after 12:00 AM

      setAvailableFlights(filteredFlights);
    } else {
      setAvailableFlights(allFlights);
    }  
  }

  return (
    <div className="App">
      <Modal ref={modal} />
      <Header />
      <div className="container">
        <div className="aircrafts">
          <Aircrafts onSelectAircraft={handleAircraftSelect} aircraftsList={aircraftsList} aircraftIndex={aircraftIndex} />
        </div>
        <div className="rotation">
          <Rotation aircraftIndex={aircraftIndex} aircraftsList={aircraftsList} onRemove={handleFlightRemove} onRemoveAll={handleRemoveAllflights}/>
        </div>
        <div className="flights">
         <Flights availableFlights={availableFlights} handleFlightSelect={handleFlightSelect} />
        </div>
      </div>
    </div>
  );
}

export default App;
