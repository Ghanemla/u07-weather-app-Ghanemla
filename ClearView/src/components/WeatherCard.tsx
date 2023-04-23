import { WeatherData } from "../types/WeatherData";

interface Props {
  data: WeatherData["forecast"]["forecastday"][0];
  unit: "°C" | "°F";
  windSpeed: "km/h" | "mp/h";
}

function WeatherCard({ data, unit, windSpeed }: Props) {
  // const date = new Date(data.date);

  return (
    <div className="">
      {/* <div className="date">{date.toLocaleDateString()}</div> */}
      <div className="flex justify-between font-bold mt-2">{data.date}</div>
      <div className=" flex justify-center  text-lg font-semibold mt-1 text-white underline">
        {data.day.condition.text}
      </div>

      <div className="text-6xl justify-between font-bold flex mt-2">
        <img
          className="flex justify-center "
          src={data.day.condition.icon}
          alt={data.day.condition.text}
        />{" "}
        {unit === "°C" ? data.day.maxtemp_c : data.day.maxtemp_f}
        {unit}
      </div>
      <hr />
      <div className="flex justify-between items-end my-2">
        <p className="text-lg font-bold flex capitalize"> windspeed: </p>
        {windSpeed === "km/h"
          ? data.day.maxwind_kph
          : data.day.maxwind_mph}{" "}
        {windSpeed}
      </div>
      <hr />
      <div className="flex justify-between items-end my-2">
        <p className="text-2xl font-bold flex capitalize"> Humidity: </p>
        {data.day.avghumidity}%
      </div>
      <hr />
    </div>
  );
}

export default WeatherCard;
