import type AstalWp from "gi://AstalWp";
import { clamp } from "es-toolkit/math";

const VOLUME_STEP = 0.05;
const MIN_VOLUME = 0;
const MAX_VOLUME = 1;

export const formatVolume = (volume: number): string =>
  `${Math.round(volume * 100)}%`;

export const adjustVolume = (
  endpoint: AstalWp.Endpoint,
  direction: number,
): void => {
  const delta = -Math.sign(direction) * VOLUME_STEP;
  const newVolume = clamp(endpoint.volume + delta, MIN_VOLUME, MAX_VOLUME);
  endpoint.volume = newVolume;
};

export const toggleMute = (endpoint: AstalWp.Endpoint): void => {
  endpoint.mute = !endpoint.mute;
};
