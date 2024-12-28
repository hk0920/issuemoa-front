import { useState, useEffect } from "react";
import { cloud } from "../../../images";
import * as AxiosUtil from "../../../lib/AxiosUtil";

interface weatherType {
  location: string;
  icon: string;
  temp: string;
  description: string;
}

interface typeProps {
  type?: string;
}

const WeatherComponent = ({ type }: typeProps) => {
  const [weather, setWeather] = useState<weatherType>({
    location: "",
    icon: cloud,
    temp: "",
    description: "",
  });

  const getWeather = async () => {
    const getPosition = (): Promise<GeolocationPosition> => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    try {
      const position = await getPosition();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const API_KEY = process.env.REACT_APP_OPEN_WEATHER_KEY;
      const url = `/weather-api/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`;
      const response = await AxiosUtil.send("GET", url, {}, "");
      const location = response.name;
      const weather = response.weather[0];
      const icon = weather.icon;
      const temp = Math.round(response.main.temp) + "°";
      const description = weather.description;
      const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      setWeather({
        location: location,
        icon: iconURL,
        temp: temp,
        description: description,
      });
      console.log(response);
    } catch (error) {
      console.error("Error getting geolocation or weather:", error);
    }
  };

  useEffect(() => {
    setWeather({
      location: "",
      icon: cloud,
      temp: "",
      description: "",
    });
    getWeather();
  }, []);
  return (
    <div className="box__component-weather">
      <span className="text__temp">{weather.temp}</span>
      <img src={weather.icon} alt="weather" className="image" />
      {type && (
        <>
          <span className="text__location">{weather.location}</span>
          <span className="text__desc">{weather.description}</span>
        </>
      )}
    </div>
  );
};

export default WeatherComponent;
