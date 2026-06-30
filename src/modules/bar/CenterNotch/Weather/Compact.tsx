import { Align } from "@/enums";
import { useWeatherService } from "@/hooks/services/useWeatherService";

export default function WeatherCompact() {
  const { temperature, windSpeed, weatherCode, humidity, unit } =
    useWeatherService();

  return (
    <label
      class="font-medium"
      halign={Align.CENTER}
      hexpand
      label={temperature(String)}
    />
  );
}
