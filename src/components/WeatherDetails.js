import React, { useEffect, useState } from "react";

function WeatherDetails({
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
}) {
  const [weatherState, setWeatherState] = useState("");
  const [localTime, setLocalTime] = useState("");

  // Set weather state icon based on the weather condition
  useEffect(() => {
    if (weatherType) {
      switch (weatherType) {
        case "Clouds":
          setWeatherState("wi-day-cloudy");
          break;
        case "Haze":
          setWeatherState("wi-day-haze");
          break;
        case "Clear":
          setWeatherState("wi-day-sunny");
          break;
        case "Mist":
          setWeatherState("wi-dust");
          break;
        case "Rain":
          setWeatherState("wi-day-rain");
          break;
        default:
          setWeatherState("wi-day-sunny");
          break;
      }
    }
  }, [weatherType]);

  useEffect(() => {
    if (timezone) {
      const calculateLocalTime = () => {
        const currentUTC =
          new Date().getTime() + new Date().getTimezoneOffset() * 60000;
        const cityTime = new Date(currentUTC + timezone * 1000);
        setLocalTime(cityTime.toLocaleString());
      };

      calculateLocalTime();
      const intervalId = setInterval(() => {
        calculateLocalTime();
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timezone]);

  // Calculate sunset time
  let sec = sunset;
  let date = new Date(sec * 1000);
  let timeStr = `${date.getHours()}:${date.getMinutes()}`;

  return (
    <>
      <article className="widget">
        <div className="weatherIcon">
          <i className={`wi ${weatherState}`}></i>
        </div>
        <div className="weatherInfo">
          <div className="temperature">
            <span>{temp}&deg;</span>
          </div>
          <div className="description">
            <div className="weatherCondition">{weatherType}</div>
            <div className="place">
              {name}, {country}
            </div>
            <div className="temperature-range">
              <i className="wi wi-thermometer"></i>
              <span>
                {temp_min}&deg;C / {temp_max}&deg;C
              </span>
            </div>
          </div>
        </div>
        <div className="date">{localTime}</div>
        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-sunset"}></i>
              </p>
              <p className="extra-info-leftside">
                {timeStr} PM <br />
                Sunset
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-humidity"}></i>
              </p>
              <p className="extra-info-leftside">
                {humidity} <br />
                Humidity
              </p>
            </div>
          </div>

          <div className="weather-extra-info">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-rain"}></i>
              </p>
              <p className="extra-info-leftside">
                {pressure} <br />
                Pressure
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className="extra-info-leftside">
                {speed} <br />
                Speed
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default WeatherDetails;
