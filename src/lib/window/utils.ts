import type { Astal } from "ags/gtk4";
import app from "ags/gtk4/app";

import type { WindowName } from "./registry";

export const toggleWindow = (name: WindowName): void => {
  const window = app.get_window(name);
  if (!window) {
    console.warn(`Window "${name}" not found`);
    return;
  }

  if (window.visible) {
    window.hide();
  } else {
    window.show();
  }
};

export const getWindow = (name: WindowName): Astal.Window | undefined => {
  return app.get_window(name) as Astal.Window | undefined;
};
