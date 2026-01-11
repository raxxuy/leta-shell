import type AstalWp from "gi://AstalWp";
import { clamp } from "es-toolkit/math";

const VOLUME_STEP = 0.05;
const MIN_VOLUME = 0;
const MAX_VOLUME = 1;

export const adjustVolume = (
  endpoint: AstalWp.Endpoint,
  direction: number,
): void => {
  endpoint.volume = clamp(
    endpoint.volume - Math.sign(direction) * VOLUME_STEP,
    MIN_VOLUME,
    MAX_VOLUME,
  );
};

export const toggleMute = (endpoint: AstalWp.Endpoint): void => {
  endpoint.mute = !endpoint.mute;
};
