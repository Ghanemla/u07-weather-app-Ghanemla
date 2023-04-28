import { useState, useEffect } from "react";
import type { WeatherData, HourlyData } from "./types/WeatherData";
import WeatherCard from "./components/WeatherCard";
import Chart from "chart.js/auto";
import "./App.css";

function App() {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [unit, setUnit] = useState<"°C" | "°F">("°C");
  const [windSpeed, setWindSpeed] = useState<"km/h" | "mp/h">("km/h");
  const [precip, setPrecip] = useState<"mm" | "in">("mm");

  const baseURL = "https://api.weatherapi.com/v1/forecast.json?";
  const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  useEffect(() => {
    if (location) {
      fetch(
        `${baseURL}key=${API_KEY}&q=${location.coords.latitude},${location.coords.longitude}&days=3`
      )
        .then((res) => res.json())
        .then((data) => setWeather(data))
        .catch((error) => console.error(error));
    }
  }, [API_KEY, location]);

  // console.log(location);
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
    async function fetchData() {
      if (!coords) return;
      const WeatherData = await fetchHourlyWeather(
        coords.latitude,
        coords.longitude
      );
      updateChart(WeatherData, unit);
    }
    fetchData();
    async function fetchHourlyWeather(lat: number, lon: number) {
      const response = await fetch(
        `${baseURL}key=${API_KEY}&q=${lat},${lon}&days=1`
      );
      const data = await response.json();

      const WeatherData = data.forecast.forecastday[0].hour.map(
        (hour: HourlyData) => ({
          time: hour.time_epoch,
          temperature: hour.temp_c,
          humidity: hour.humidity,
        })
      );

      return WeatherData;
    }
  }, [API_KEY, coords, unit]);
  function updateChart(WeatherData: Array<HourlyData>, unit: string) {
    const canvas = document.getElementById("myChart") as HTMLCanvasElement;
    const labels = WeatherData.map((hour: HourlyData) => {
      const date = new Date(hour.time * 1000);
      return date.getHours().toString().padStart(2, "0") + ":00";
    });

    const data =
      unit === "°C"
        ? WeatherData.map((hour) => hour.temperature)
        : WeatherData.map((hour) => (hour.temperature * 9) / 5 + 32); // transform to Fahrenheit

    const chart = Chart.getChart(canvas);

    if (chart) {
      chart.destroy();
    }
    Chart.defaults.color = "white";

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
            borderColor: "#a3322a",
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
    return <div className="text-white">Loading...</div>;
  }

  const current = weather.current;
  const forecast = weather.forecast.forecastday;
  const astro = weather.forecast.forecastday[0].astro;
  const day = weather.forecast.forecastday[0].day;
  return (
    <>
      <main className="flex flex-col justify-center min-h-screen text-white ">
        <div className="w-screen max-w-screen-sm  p-10 rounded-xl ring-8 ring-white ring-opacity-40">
          <div className="inline mb-5 w-s ">
            <button
              className="p-2 rounded-2xl hover:bg-white hover:text-black bg-black mr-2"
              onClick={() => setUnit(unit === "°C" ? "°F" : "°C")}
            >
              Switch to {unit === "°C" ? "°F" : "°C"}
            </button>{" "}
            <button
              className="p-2 rounded-2xl hover:bg-white hover:text-black bg-black mr-2zzzZZ"
              onClick={() =>
                setWindSpeed(windSpeed === "km/h" ? "mp/h" : "km/h")
              }
            >
              Switch to {windSpeed === "km/h" ? "mp/h" : "km/h"}
            </button>
            <button
              className="p-2 rounded-2xl hover:bg-white hover:text-black bg-black"
              onClick={() => setPrecip(precip === "mm" ? "in" : "mm")}
            >
              Switch to {precip === "mm" ? "in" : "mm"}
            </button>
          </div>
          <p className="text-2xl font-semibold">Current Weather in:</p>
          <div className=" text-6xl font-semibold mt-1 text-white">
            {weather.location.name}
          </div>
          <hr />
          <div className="flex justify-center items-center text-3xl font-semibold mt-1 text-white underline">
            <img src={current.condition.icon} alt={current.condition.text} />
            <div className="">{current.condition.text}</div>
          </div>
          <div className="text-6xl  items-center justify-between font-bold flex mt-2">
            {unit === "°C" ? current.temp_c : current.temp_f}
            {unit}{" "}
            <p className="text-xl  underline ml-6">{day.condition.text}</p>
          </div>

          <hr />
          <div className="flex justify-between items-end my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="cyan"
              viewBox="0 0 16 16"
            >
              <path d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z" />
              <path d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z" />
            </svg>
            <p className="text-2xl font-bold flex capitalize"> humidity: </p>
            {current.humidity}%
          </div>
          <hr />
          <div className="flex justify-between items-end my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
            </svg>
            <p className="text-2xl font-bold flex capitalize"> windspeed: </p>
            {windSpeed === "km/h" ? current.wind_kph : current.wind_mph}{" "}
            {windSpeed}
          </div>
          <hr />
          <div className="flex justify-between items-end my-2">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="gold"
              viewBox="0 0 16 16"
            >
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708l1.5-1.5zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
            </svg>
            <p className="text-2xl font-bold flex capitalize"> sunrise: </p>
            {astro.sunrise}
          </div>
          <hr />
          <div className="flex justify-between items-center my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="orange"
              viewBox="0 0 16 16"
            >
              <path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708l1.5 1.5zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
            </svg>
            <p className="text-2xl font-bold flex capitalize"> sunset: </p>
            {astro.sunset}
          </div>
          <hr />
          <div className="flex justify-between items-center my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="white"
              viewBox="0 0 16 16"
            >
              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
            </svg>
            <p className="text-2xl font-bold flex capitalize"> moonrise: </p>
            {astro.moonrise}
          </div>
          <hr />
          <div className="flex justify-between items-center my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="slate"
              viewBox="0 0 16 16"
            >
              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
              <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
            </svg>
            <p className="text-2xl font-bold flex capitalize"> moonset: </p>
            {astro.moonset}
          </div>
          <hr />
          <div className="flex justify-between items-center my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .625.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .509-.375A3.502 3.502 0 0 1 7 8zm4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z" />
              <path d="M11.286 1.778a.5.5 0 0 0-.565-.755 4.595 4.595 0 0 0-3.18 5.003 5.46 5.46 0 0 1 1.055.209A3.603 3.603 0 0 1 9.83 2.617a4.593 4.593 0 0 0 4.31 5.744 3.576 3.576 0 0 1-2.241.634c.162.317.295.652.394 1a4.59 4.59 0 0 0 3.624-2.04.5.5 0 0 0-.565-.755 3.593 3.593 0 0 1-4.065-5.422z" />
            </svg>
            <p className="text-2xl font-bold flex capitalize"> moonPhase: </p>
            {astro.moon_phase}
          </div>
          <hr />
          <div className="hidden md:block mt-5">
            {" "}
            <canvas
              className="bg-slate-900  rounded-xl ring-8 ring-white ring-opacity-40"
              id="myChart"
            ></canvas>
          </div>
        </div>

        <br />

        <div className=" w-f my-2 rounded-xl ring-8 ring-white ring-opacity-40 p-10">
          <div className="inline mb-5 w-s ">
            <button
              className="p-2 rounded-2xl hover:bg-white hover:text-black bg-black"
              onClick={() => setUnit(unit === "°C" ? "°F" : "°C")}
            >
              Switch to {unit === "°C" ? "°F" : "°C"}
            </button>{" "}
            <button
              className="p-2 rounded-2xl hover:bg-white hover:text-black bg-black"
              onClick={() =>
                setWindSpeed(windSpeed === "km/h" ? "mp/h" : "km/h")
              }
            >
              Switch to {windSpeed === "km/h" ? "mp/h" : "km/h"}
            </button>
            <button
              className="p-2 rounded-2xl hover:bg-white hover:text-black bg-black"
              onClick={() => setPrecip(precip === "mm" ? "in" : "mm")}
            >
              Switch to {precip === "mm" ? "in" : "mm"}
            </button>
          </div>
          <p className="text-2xl font-semibold">3-Day Forecast</p>
          {forecast.map((day) => (
            <WeatherCard
              key={day.date}
              data={day}
              unit={unit}
              windSpeed={windSpeed}
              precip={precip}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
