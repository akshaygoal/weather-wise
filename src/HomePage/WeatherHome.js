import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { FaTemperatureArrowUp, FaTemperatureArrowDown } from "react-icons/fa6";
import { useStateContext } from "../Context/index";
import { WiDayCloudy } from "react-icons/wi";
import "./Home.css";
import clouds from "../Assets/weather02-512.webp";
import humidity from "../Assets/humidity.png";
import wind from "../Assets/sky.png";
import axios from "axios";

function Home() {
  const [searchInput, setSearchInput] = useState("");

  const [weatherData, setWeatherData] = useState({
    celecius: 18.25,
    name: "London",
    humidity: 70,
    speed: 5.12,
    sunrise: "06:00 AM",
    sunset: "06:00 PM",
    highTemp: 20,
    lowTemp: 15,
  });

  const { weather, setWeather } = useStateContext(); // Access context

  console.log(weather);
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem("user"));



  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput("");
  };

  const handleClick = () => {
    if (searchInput !== "") {
      const API = ` https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=3a01979fde01a73794e7e2bbce5fe4d3&units=metric`;
      axios
        .get(API)
        .then((res) => {
          console.log(res.data);
          setWeatherData({
//             ...weatherData,
//             celecius: res.data.main.temp,
//             name: res.data.name,
//             humidity: res.data.main.humidity,
//             speed: res.data.wind.speed,
//             sunrice :new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
//             sunset:new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
// temp:res.data.main.temp
celecius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            sunrise: new Date(res.data.sys.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(res.data.sys.sunset * 1000).toLocaleTimeString(),
            highTemp: res.data.main.temp_max,
            lowTemp: res.data.main.temp_min,

          });
        })
        .catch((err) => console.log(err));
    }
  };
   const date = new Date().toLocaleDateString();



  return (
    <div className="Home-container">
      <nav className="Nav-container">
        <h1>Weather Wisee</h1>
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
          {/* <h3>Welcome home {userName.name}</h3> */}
          <img className="cloud-image" src={clouds} alt="" />
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
              <p>Low:{weatherData.lowTemp}°c</p>
            </div>
          </div>
          <div className="hour-container">
            <h3>3 HOURS STEO FORECAST</h3>
            <hr />
            <div className="details-main">
              <div className="details-hour">
                <p>10:00 AM</p>
                <p>
                  <WiDayCloudy className="details-icons" />
                </p>
                <p>{weatherData.celecius}°</p>
              </div>
              <div className="details-hour">
                <p>01:00 AM</p>
                <p>
                  <WiDayCloudy className="details-icons" />
                </p>
                <p>13°</p>
              </div>
              <div className="details-hour">
                <p>03:00 AM</p>
                <p>
                  <WiDayCloudy className="details-icons" />
                </p>
                <p>13°</p>
              </div>
              <div className="details-hour">
                <p>06:00 AM</p>
                <p>
                  <WiDayCloudy className="details-icons" />
                </p>
                <p>13°</p>
              </div>
                <div className="details-hour">
                <p>09:00 AM</p>
                <p>
                  <WiDayCloudy className="details-icons" />
                </p>
                <p>13°</p>
              </div>
            </div>
          </div>
          <div className="hour-container">
            <h3>DAILY FORECAST</h3>
            <hr />
            <div className="details-main">
              <div className="details-hour">
                <p>Wed</p>
                <p>
                  <WiDayCloudy className="details-icons" />
                </p>
                <p>{weatherData.celecius}°</p>
              </div>
              <div className="details-hour">
                <p>Thu</p>
                <p>
                  <WiDayCloudy className="details-icons" />
                </p>
                <p>13°</p>
              </div>
              <div className="details-hour">
                <p>Fri</p>
                <p>
                  <WiDayCloudy className="details-icons" />
                </p>
                <p>13°</p>
              </div>
              <div className="details-hour">
                <p>Sat</p>
                <p>
                  <WiDayCloudy className="details-icons" />
                </p>
                <p>13°</p>
              </div>
                <div className="details-hour">
                <p>Sun</p>
                <p>
                  <WiDayCloudy className="details-icons" />
                </p>
                <p>13°</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
