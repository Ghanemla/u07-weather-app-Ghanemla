export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    wind_mph: number;
    humidity: number;
    sunrise: string;
    sunset: string;
  };

  forecast: {
    forecastday: {
      date: string;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        totalprecip_in: number;
        totalprecip_mm: number;
        daily_will_it_rain: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        avghumidity: number;
        maxwind_kph: number;
        maxwind_mph: number;
      };
      uv: number;
      astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
        moon_illumination: number;
      };
      hour: {
        time_epoch: number;
        temp_c: number;
        humidity: number;
      };
    }[];
  };
}

export interface HourlyData {
  time_epoch: number;
  temp_c: number;
  humidity: number;
  time: number;
  temperature: number;
}
