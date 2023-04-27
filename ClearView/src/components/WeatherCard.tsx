import { WeatherData } from "../types/WeatherData";

interface Props {
  data: WeatherData["forecast"]["forecastday"][0];
  unit: "°C" | "°F";
  windSpeed: "km/h" | "mp/h";
  precip: "mm" | "in";
}

function WeatherCard({ data, unit, windSpeed, precip }: Props) {
  // console.log(data);
  // const date = new Date(data.date);

  return (
    <>
      <div className="  flex justify-center  text-lg font-semibold m-3 text-white  ">
        <span className="text-3xl p-2 font-bold flex capitalize border-2 border-white rounded-md">
          {data.day.condition.text}
        </span>
      </div>
      <div className="flex justify-center font-bold m-2 ">
        <span className="text-2xl font-bold flex capitalize">{data.date}</span>
      </div>
      <hr />
      <div className=" text-6xl justify-between font-bold flex m-5">
        <img
          className="flex justify-center "
          src={data.day.condition.icon}
          alt={data.day.condition.text}
        />{" "}
        {unit === "°C" ? data.day.maxtemp_c : data.day.maxtemp_f}
        {unit}
      </div>
      <hr />

      {/* <div className="date">{date.toLocaleDateString()}</div> */}
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
        {data.astro.sunrise}
      </div>

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
        {data.astro.sunset}
      </div>
      <hr />
      <div className="flex justify-between items-end my-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z" />
        </svg>
        <p className="text-2xl font-bold flex capitalize">
          Will it rain? : {data.day.daily_will_it_rain === 1 ? "Yes" : "No"}
        </p>
        <div className="flex justify-center font-bold m-2 ">
          Total precipitation{" "}
          {precip === "mm" ? data.day.totalprecip_mm : data.day.totalprecip_in}{" "}
          {precip}
        </div>
      </div>
      <hr />
      <div className="  flex justify-between items-end m-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
        </svg>
        <p className="text-lg font-bold flex capitalize"> windspeed: </p>
        {windSpeed === "km/h"
          ? data.day.maxwind_kph
          : data.day.maxwind_mph}{" "}
        {windSpeed}
      </div>
      <hr />
      <div className="flex justify-between items-end my-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="cyan"
          viewBox="0 0 16 16"
        >
          <path d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z" />
          <path d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z" />
        </svg>
        <p className="text-lg font-bold flex capitalize">
          {" "}
          average humidity for the day is:{" "}
        </p>
        {data.day.avghumidity}%
      </div>
      <hr />
      {/* <div className=" flex justify-between items-end m-5">
        <p className="text-2xl font-bold flex capitalize"> Humidity: </p>
        {data.day.avghumidity}%
      </div> */}
    </>
  );
}

export default WeatherCard;
