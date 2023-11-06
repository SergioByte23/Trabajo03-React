import { useEffect, useRef, useState } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";
import InfoLocation from "./components/InfoLocation";
import CardResident from "./components/CardResident";

function App() {
  const [locationId, setLocationId] = useState(
    Math.floor(Math.random() * 126) + 1
  );

  const url = `https://rickandmortyapi.com/api/location/${locationId}`;
  const [location, getLocation, isLoading, hasError] = useFetch(url);

  useEffect(() => {
    getLocation();
  }, [locationId]);

  const inputLocation = useRef();

  const handleLocation = (e) => {
    e.preventDefault();
    setLocationId(inputLocation.current.value.trim());
  };
  return (
    <div className="app">
      <div  className="app__bg">
      {/* <img className="app__background" src="../public/banner.jfif" alt="Fondo" /> */}
      </div>
      <form className="app__form" onSubmit={handleLocation}>
        <input className="app__input" ref={inputLocation} type="text" placeholder="Search Location"/>
        <button className="app__btn">Search</button>
      </form>
      {isLoading ? (
        <h2>Loading ...</h2>
      ) : hasError || locationId === "0" ? (
        <h2> ❌ Hey! you must provide an id from 1 to 126</h2>
      ) : (
        <>
          <InfoLocation location={location} />
          <div className="app__card-container">
            {location?.residents.map((url) => (
              <CardResident key={url} url={url} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
