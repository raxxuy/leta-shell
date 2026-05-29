export const windows = {
  bar: "bar",
  launcher: "launcher",
  notifications: "notifications",
  settings: "settings",
  wallpaper: "wallpaper",
  "wallpaper-selector": "wallpaper-selector",
} as const;

export const isWindowName = (x: string): x is WindowName => x in windows;

export type WindowName = keyof typeof windows;
