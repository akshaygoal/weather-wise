import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useStateContext } from "../Context/index";
import "./Home.css";
import clouds from "../Assets/weather02-512.webp";
import humidity from "../Assets/humidity.png";
import wind from "../Assets/sky.png";
import axios from "axios";

function Home() {
  const [searchInput, setSearchInput] = useState("");

  const [weatherData, setWeatherData] = useState({
    celecius: 15.25,
    name: "London",
    humidity: 90,
    speed: 4.12,
  });

  const { weather, setWeather } = useStateContext(); // Access context

  console.log(weather);
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("loggedin");
    navigate("/login");
  };

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
            ...weatherData,
            celecius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="Home-container">
      {/*<h1>Welcome home {userName.name}</h1>
      
      <button onClick={handleLogout} type="button">
        LogOut
      </button> */}

      <nav className="Nav-container">
        <h1>Weather Wisee</h1>
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
      </div>
    </div>
  );
}

export default Home;
