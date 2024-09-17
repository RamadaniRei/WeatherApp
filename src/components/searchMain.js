import React, { useState, useCallback, useEffect } from "react";
import "../components/style.css";
import WeatherDetails from "./WeatherDetails";

function SearchMain() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [searchTerm, setSearchTerm] = useState("Tirana");
  const [searchQuery, setSearchQuery] = useState("Tirana");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = useCallback(async () => {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=metric&appid=${apiKey}`;
      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure, temp_min, temp_max } = data.main;
      const { main: weatherType } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const { timezone } = data;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherType,
        name,
        speed,
        country,
        sunset,
        timezone,
        temp_min,
        temp_max,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  }, [apiKey, searchQuery]);

  useEffect(() => {
    getWeatherInfo();
  }, [getWeatherInfo]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(searchTerm);
    }
  };

  const handleSearchClick = () => {
    setSearchQuery(searchTerm);
  };

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Enter City Name"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <button className="searchButton" onClick={handleSearchClick}>
          Search
        </button>
      </div>
      <WeatherDetails {...tempInfo} />
    </>
  );
}

export default SearchMain;
