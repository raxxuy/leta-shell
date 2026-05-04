import type AstalWp from "gi://AstalWp";
import { createBinding, createComputed } from "ags";

export default function useEndpoint(
  endpoint: AstalWp.Endpoint,
  resolveIcon: (muted: boolean, volume: number) => string,
) {
  const mute = createBinding(endpoint, "mute");
  const volume = createBinding(endpoint, "volume");
  const rawDescription = createBinding(endpoint, "description");

  const description = rawDescription((d) => d ?? "");
  const iconName = createComputed(() => resolveIcon(mute(), volume()));
  const formattedVolume = createComputed(() =>
    mute() ? "Muted" : `${Math.round(volume() * 100)}%`,
  );

  const setVolume = (volume: number) => endpoint.set_volume(volume);
  const toggleMute = () => endpoint.set_mute(!mute.peek());

  return {
    mute,
    toggleMute,
    volume,
    setVolume,
    iconName,
    description,
    formattedVolume,
  };
}
