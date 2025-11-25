import type AstalWp from "gi://AstalWp";

export const roundVolume = (v: number) => Math.round(v * 100);

export const adjustVolume = (endpoint: AstalWp.Endpoint, direction: number) => {
  if (Math.round(direction) === -1)
    endpoint.set_volume(Math.min(1, endpoint.volume + 0.05));
  else endpoint.set_volume(Math.max(0, endpoint.volume - 0.05));
};

export const muteEndpoint = (endpoint: AstalWp.Endpoint) => {
  endpoint.mute = !endpoint.mute;
};
