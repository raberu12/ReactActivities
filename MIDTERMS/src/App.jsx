import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sales, setSales] = useState(0);
  const [destinations, setDestinations] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [buses, setBuses] = useState({
    Bus1: [],
    Bus2: [],
    Bus3: [],
  });

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/troy1129/jsonplaceholder/passengers")
      .then((response) => response.json())
      .then((data) => {
        setPassengers(data);
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("https://my-json-server.typicode.com/troy1129/jsonplaceholder/destinations")
      .then((response) => response.json())
      .then((data) => {
        setDestinations(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const assignPassengerToBus = (passenger, destination) => {
    let bus;
    if (destination.destination === "Cebu" || destination.destination === "Mandaue") {
      bus = "Bus1";
    } else if (destination.destination === "Lilo-an" || destination.destination === "Lapu-Lapu") {
      bus = "Bus2";
    } else if (destination.destination === "Consolacion" || destination.destination === "Talisay") {
      bus = "Bus3";
    } else {
      return;
    }
    if (buses[bus].length < 5) {
      const updatedPassengers = passengers.filter((p) => p.id !== passenger.id);
      setPassengers(updatedPassengers);
      setBuses({ ...buses, [bus]: [...buses[bus], passenger] });
      incrementSales(destination.price);
    } else {
      alert(`${bus} is full!!!!!`);
    }
  };

  const removePassengerFromBus = (passenger, busName) => {
    const updatedBus = buses[busName].filter((p) => p.id !== passenger.id);
    setBuses({ ...buses, [busName]: updatedBus });
  };
  const incrementSales = (price) => {
    setSales(sales + price);
  };

  return (
    <>
      <div className="heading">
        <h1>Sales: PHP {sales}</h1>
      </div>
      <div className="container">
          <ul>
            {passengers.map((passenger) => (
            <li key={passenger.id}>
              Name: {passenger.name}
              <br />
              Ticket ID: {passenger.id}
              <div className="buttons">
                {destinations.map((destination) => (
                  <button
                    key={destination.id}
                    onClick={() => assignPassengerToBus(passenger, destination)}
                  >
                    {destination.destination}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="buses">
        {Object.keys(buses).map((busName) => (
          <div key={busName}>
            <h2>{busName}</h2>
            <ul>
              {buses[busName].map((passenger) => (
                <li key={passenger.id}>
                  Name: {passenger.name}
                  <br />
                  Ticket ID: {passenger.id}
                  <br />
                  <button onClick={() => removePassengerFromBus(passenger, busName)}>
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
