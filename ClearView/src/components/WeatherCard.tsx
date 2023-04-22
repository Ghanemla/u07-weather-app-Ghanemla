import { WeatherData } from "../types/WeatherData";

interface Props {
  data: WeatherData["forecast"]["forecastday"][0];
  unit: "°C" | "°F";
}

function WeatherCard({ data, unit }: Props) {
  const date = new Date(data.date);

  return (
    <div className="weather-card">
      <div className="date">{date.toLocaleDateString()}</div>
      <div className="condition">
        <img src={data.day.condition.icon} alt={data.day.condition.text} />
        {data.day.condition.text}
      </div>
      <div className="temperature">
        {unit === "°C" ? data.day.maxtemp_c : data.day.maxtemp_f}
        {unit}
      </div>
      <div className="wind-speed">{data.day.maxwind_kph} km/h</div>
      <div className="humidity">{data.day.avghumidity}%</div>
    </div>
  );
}

export default WeatherCard;
