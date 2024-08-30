
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { FaTemperatureArrowUp, FaTemperatureArrowDown } from "react-icons/fa6";
import { useStateContext } from "../Context/index";
import humidity from "../Assets/humidity.png";
import wind from "../Assets/sky.png";
import "./Home.css";
import clouds from "../Assets/weather02-512.webp";
import axios from "axios";
import Forecast from "./forecast";

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState({
    celecius: "",
    name: "",
    humidity: "",
    speed: "",
    sunrise: "",
    sunset: "",
    highTemp: "",
    lowTemp: "",
    icon: "",
    lat: "",
    lon: "",
  });

  const { weather, setWeather } = useStateContext();
  const navigate = useNavigate();

  const fetchWeatherData = (city = "kerala") => {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a01979fde01a73794e7e2bbce5fe4d3&units=metric`;
    axios
      .get(API)
      .then((res) => {
        const iconCode = res.data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        setWeatherData({
          celecius: res.data.main.temp,
          name: res.data.name,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
          sunrise: new Date(res.data.sys.sunrise * 1000).toLocaleTimeString(),
          sunset: new Date(res.data.sys.sunset * 1000).toLocaleTimeString(),
          highTemp: res.data.main.temp_max,
          lowTemp: res.data.main.temp_min,
          icon: iconUrl,
          lat: res.data.coord.lat, 
          lon: res.data.coord.lon,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput("");
  };

  const handleClick = () => {
    if (searchInput !== "") {
      fetchWeatherData(searchInput);
    }
  };
  
  const getLocalTime = () => {
    const date = new Date();
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const [localTime, setLocalTime] = useState(getLocalTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setLocalTime(getLocalTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const date = new Date().toLocaleDateString();

  return (
    <div className="Home-container">
      <nav className="Nav-container">
        <h1>Weather Wise</h1>
        <h3 className="date-time">{date}</h3>
        <div className="search-div">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search"
              className="search-input"
            />
            <button className="search-button" onClick={handleClick}>
              <IoIosSearch className="icon" />
            </button>
          </form>
        </div>
      </nav>

      <div className="weather-container">
        <div className="weather-card">
          <img className="cloud-image" src={weatherData.icon} alt="Weather Icon" />
          <p className="localTime">Local Time : {localTime} </p>
          <h1>{weatherData.celecius}°c</h1>
          <h2>{weatherData.name}</h2>
          <div className="details">
            <div className="humidity">
              <img className="humidity-img" src={humidity} alt="humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="wind">
              <img className="humidity-img" src={wind} alt="humidity" />
              <div>
                <p>{weatherData.speed}Km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
        <div className="more-details">
          <div className="sun-details">
            <div>
              <GiSunrise className="details-icons" />
              <p>Rise:{weatherData.sunrise}</p>
            </div>
            <div>
              <GiSunset className="details-icons" />
              <p>Set: {weatherData.sunset}</p>
            </div>
            <div>
              <FaTemperatureArrowUp className="details-icons" />
              <p>High: {weatherData.highTemp}°c</p>
            </div>
            <div>
              <FaTemperatureArrowDown className="details-icons" />
              <p>Low: {weatherData.lowTemp}°c</p>
            </div>
          </div>
          <Forecast lat={weatherData.lat} lon={weatherData.lon} />
        </div>
      </div>
    </div>
  );
}

export default Home;
