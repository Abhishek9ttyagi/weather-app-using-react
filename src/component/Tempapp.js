import React, { useEffect, useState } from "react";
import "./css/style.css";

const Tempapp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("pune");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const url = `https://goweather.herokuapp.com/weather/${search}`;
        const response = await fetch(url);
        const data = await response.json();
        setCity(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setCity(null);
      }
    };

    const timer = setTimeout(() => {
      fetchWeatherData();
    }, 1500); // Fetch data every 1.5 seconds

    return () => {
      clearTimeout(timer); // Clean up the timer on component unmount
    };
  }, [search]);

  return (
    <>
      <div className="box">
        <div className="inputdata">
          <input
            type="search"
            className="inputFeild"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        {!city ? (
          <p>Loading...</p>
        ) : (
          <div className="info">
            <h2 className="location">
              <i className="fas fa-street-view"></i>
              {search}
            </h2>
            <h1 className="temp">Temp: {city.temperature}</h1>
            <h3 className="tempmin_max">
              Wind: {city.wind}
              <br />
              Description: {city.description}
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Tempapp;
