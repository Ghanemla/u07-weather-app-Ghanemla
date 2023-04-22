import { useState, useEffect } from "react";
import type { WeatherData } from "./types/WeatherData";
import WeatherCard from "./components/WeatherCard";
// import { Chart } from "chart.js";
import Chart from "chart.js/auto";
// import temp from "./assets/images/temp.svg";
import "./App.css";
import Navbar from "./components/navbar/navbar";

function App() {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [unit, setUnit] = useState<"°C" | "°F">("°C");
  const [windSpeed, setWindspeed] = useState<"km/h" | "mp/h">("km/h");

  const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  useEffect(() => {
    if (location) {
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location.coords.latitude},${location.coords.longitude}&days=3`
      )
        .then((res) => res.json())
        .then((data) => setWeather(data))
        .catch((error) => console.error(error));
    }
  }, [API_KEY, location]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        setCoords(position.coords);
      },
      (error) => console.error(error)
    );
  }, []);

  useEffect(() => {
    if (!coords) return;
    async function fetchData() {
      const WeatherData = await fetchHourlyWeather(
        coords.latitude,
        coords.longitude
      );
      updateChart(WeatherData, unit);
    }
    fetchData();
    async function fetchHourlyWeather(lat: number, lon: number) {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=1`
      );
      const data = await response.json();
      const WeatherData = data.forecast.forecastday[0].hour.map(
        (hour: any) => ({
          time: hour.time_epoch,
          temperature: hour.temp_c,
          humidity: hour.humidity,
        })
      );
      // const WeatherData = {
      //   temperature: data.current.temp_c,
      //   humidity: data.current.humidity,
      //   time: data.current.last_updated_epoch,
      // };
      // console.log(WeatherData);

      return WeatherData;
    }
  }, [API_KEY, coords, unit]);
  function updateChart(WeatherData: Array<any>, unit: string) {
    const canvas = document.getElementById("myChart") as HTMLCanvasElement;
    console.log(WeatherData);
    const labels = WeatherData.map((hour: { time: number }) => {
      const date = new Date(hour.time * 1000);
      return date.getHours().toString().padStart(2, "0") + ":00";
    });
    // const labels = [
    //   new Date(WeatherData.time * 1000).getHours().toString().padStart(2, "0") +
    //     ":00",
    // ];
    const data =
      unit === "°C"
        ? WeatherData.map((hour) => hour.temperature)
        : WeatherData.map((hour) => (hour.temperature * 9) / 5 + 32); // transform to Fahrenheit

    // const data = [WeatherData.temperature];
    // Check if a chart has already been created for the canvas
    const chart = Chart.getChart(canvas);

    // If a chart exists, destroy it before creating a new one
    if (chart) {
      chart.destroy();
    }

    // Create a new chart
    new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: `Temperature (${unit})`,
            data,
            fill: false,
            borderColor: "#007bff",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: `Temperature (${unit})`,
            },
          },
        },
      },
    });
  }

  if (!location || !weather) {
    return <div>Loading...</div>;
  }

  const current = weather.current;
  const forecast = weather.forecast.forecastday;

  return (
    <>
      <div className="app">
        <Navbar />
        <h1>current väder</h1>
        <canvas id="myChart" width="800" height="400"></canvas>
        <div></div>
        <div className="current-weather">
          <button
            className="btn btn-secondary"
            onClick={() => setUnit(unit === "°C" ? "°F" : "°C")}
          >
            Switch to {unit === "°C" ? "°F" : "°C"}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setWindspeed(windSpeed === "km/h" ? "mp/h" : "km/h")}
          >
            Switch to {windSpeed === "km/h" ? "mp/h" : "km/h"}
          </button>

          <div className="location">{weather.location.name}</div>
          <div className="flex justify-center items-center">
            <img src={current.condition.icon} alt={current.condition.text} />
            {current.condition.text}
          </div>
          {/* <p>{current.uv}</p> */}
          <div className="temperature">
            {unit === "°C" ? current.temp_c : current.temp_f}
          </div>
          {unit}
          <div className="humidity">{current.humidity}%</div>
          <div className="temperature">
            {windSpeed === "km/h" ? current.wind_kph : current.wind_mph}{" "}
            {windSpeed}
          </div>

          <div className="sunrise-sunset">
            <div className="sunrise">{current.sunrise}</div>
            <p className="sunset">{current.sunset}</p>
          </div>
          <div>{/* <img src={temp} alt="" srcset="" /> */}</div>
          {/* <div className="unit-switcher">
            <button onClick={() => setUnit("°C")}>°C</button>
            <button onClick={() => setUnit("°F")}>°F</button>
          </div> */}
        </div>
        <br />
        <h2>3-day forecast</h2>
        <div className="flex justify-center items-center gap-7 mt-3">
          {forecast.map((day) => (
            <WeatherCard
              key={day.date}
              data={day}
              unit={unit}
              windSpeed={windSpeed}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
