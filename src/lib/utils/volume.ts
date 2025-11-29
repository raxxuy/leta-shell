import type AstalWp from "gi://AstalWp";

const VOLUME_STEP = 0.05;
const MIN_VOLUME = 0;
const MAX_VOLUME = 1;

const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

export const roundVolume = (v: number): number => Math.round(v * 100);

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

export const getIcon = (
  type: "speaker" | "microphone",
  endpoint: AstalWp.Endpoint,
) => {
  if (type === "speaker") {
    if (endpoint.volume === 0 || endpoint.mute) return "volume-off-symbolic";
    if (endpoint.volume < 0.5) return "volume-min-symbolic";
    return "volume-max-symbolic";
  }

  if (endpoint.volume === 0 || endpoint.mute) return "microphone-off-symbolic";
  return "microphone-1-symbolic";
};
