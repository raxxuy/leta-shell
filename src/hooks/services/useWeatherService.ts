import { createBinding } from "ags";
import WeatherService from "@/services/weather";

export const useWeatherService = () => {
  const service = WeatherService.get_default();

  const temperature = createBinding(service, "temperature");
  const windSpeed = createBinding(service, "windSpeed");
  const weatherCode = createBinding(service, "weatherCode");
  const humidity = createBinding(service, "humidity");
  const unit = createBinding(service, "unit");

  return { temperature, windSpeed, weatherCode, humidity, unit };
};
