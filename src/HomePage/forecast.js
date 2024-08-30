import React, { useEffect, useState } from "react";
import axios from "axios";

function Forecast({ lat, lon }) {
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);

  useEffect(() => {
    if (lat && lon) {
      const API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3a01979fde01a73794e7e2bbce5fe4d3&units=metric`;
      axios
        .get(API)
        .then((res) => {
          const hourlyData = res.data.list.slice(0, 5);
          const dailyData = res.data.list.filter((entry) =>
            entry.dt_txt.includes("12:00:00")
          );

          setHourlyForecast(hourlyData);
          setDailyForecast(dailyData);
        })
        .catch((err) => console.log(err));
    }
  }, [lat, lon]);

  return (
    <div>
      <div className="hour-container">
        <h3>3 HOURS STEP FORECAST</h3>
        <hr />
        <div className="details-main">
          {hourlyForecast.map((data, index) => (
            <div key={index} className="details-hour">
              <p>
                {new Date(data.dt_txt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>
                <img
                  className="forecast-icons"
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt="icon"
                />
              </p>
              <p>{data.main.temp}°</p>
            </div>
          ))}
        </div>
      </div>
      <div className="hour-container">
        <h3>DAILY FORECAST</h3>
        <hr />
        <div className="details-main">
          {dailyForecast.map((data, index) => (
            <div key={index} className="details-hour">
              <p>
                {new Date(data.dt_txt).toLocaleDateString([], {
                  weekday: "short",
                })}
              </p>
              <p>
                <img
                  className="forecast-icons"
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt="icon"
                />
              </p>
              <p>{data.main.temp}°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Forecast;
