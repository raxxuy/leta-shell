import { onCleanup } from "ags";
import { fetch, URL } from "ags/fetch";
import { getter, register } from "ags/gobject";
import { emitNotify } from "@/decorators/gobject";
import type { CenterNotchWeatherConfig } from "@/lib/config/schemas/bar/modules/center-notch";
import Service from "./base";
import ConfigService from "./config";

type WeatherData = {
  humidity: number;
  temperature: number;
  unit: string;
  weatherCode: number;
  windSpeed: number;
};

@register({ GTypeName: "WeatherService" })
export default class WeatherService extends Service {
  private static instance: WeatherService;

  #data: WeatherData = {
    humidity: 0,
    temperature: 0,
    unit: "celsius",
    weatherCode: 0,
    windSpeed: 0,
  };

  #interval: ReturnType<typeof setInterval> | null = null;

  static get_default(): WeatherService {
    if (!WeatherService.instance)
      WeatherService.instance = new WeatherService();
    return WeatherService.instance;
  }

  private get config(): CenterNotchWeatherConfig {
    return ConfigService.get_default().configs.bar.settings.centerNotch.modules
      .weather;
  }

  cleanup() {
    if (this.#interval !== null) clearInterval(this.#interval);
  }

  @getter(Number)
  get temperature() {
    return this.#data.temperature;
  }

  @getter(Number)
  get windSpeed() {
    return this.#data.windSpeed;
  }

  @getter(Number)
  get weatherCode() {
    return this.#data.weatherCode;
  }

  @getter(Number)
  get humidity() {
    return this.#data.humidity;
  }

  @getter(String)
  get unit() {
    return this.#data.unit;
  }

  private async resolveCoords(location: CenterNotchWeatherConfig["location"]) {
    if (location === "auto") {
      const res = await fetch("http://ip-api.com/json/");
      const data = await res.json();
      return { lat: Number(data.lat), lon: Number(data.lon) };
    }

    if (typeof location === "string") {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`,
      );
      const data = await res.json();
      const r = data.results?.[0];
      if (!r) throw new Error(`Location not found: ${location}`);
      return { lat: Number(r.latitude), lon: Number(r.longitude) };
    }

    return { lat: location.lat, lon: location.lon };
  }

  @emitNotify("temperature", "wind_speed", "weather_code", "humidity", "unit")
  private async refresh(config: CenterNotchWeatherConfig) {
    const { lat, lon } = await this.resolveCoords(config.location);

    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", lat.toString());
    url.searchParams.set("longitude", lon.toString());
    url.searchParams.set("current", "temperature_2m");
    url.searchParams.set("temperature_unit", config.unit);

    const res = await fetch(url.toString());
    const data = await res.json();
    const current = data.current;

    this.#data = {
      temperature: current.temperature_2m,
      weatherCode: current.weathercode,
      windSpeed: current.wind_speed_10m,
      humidity: current.relative_humidity_2m,
      unit: config.unit,
    };
  }

  constructor() {
    super();

    this.refresh(this.config);

    this.#interval = setInterval(
      () => this.refresh(this.config),
      this.config.interval,
    );

    onCleanup(() => {
      if (this.#interval) clearInterval(this.#interval);
    });
  }
}
