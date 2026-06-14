export const windows = [
  "bar",
  "launcher",
  "lock-screen",
  "notifications",
  "screenshot",
  "settings",
  "wallpaper",
  "wallpaper-selector",
] as const;

export const isWindowName = (x: string): x is WindowName =>
  windows.includes(x as WindowName);

export type WindowName = (typeof windows)[number];
