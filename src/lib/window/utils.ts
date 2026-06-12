import type { Astal } from "ags/gtk4";
import app from "ags/gtk4/app";
import AuthService from "@/services/auth";
import type { WindowName } from "./registry";
import type { WindowWithClose } from "./types";

export const toggleWindow = (name: WindowName): void => {
  if (AuthService.isLocked() && name !== "lock-screen") return;

  const window = app.get_window(name) as WindowWithClose | undefined;
  if (!window) {
    console.warn(`Window "${name}" not found`);
    return;
  }

  if (window.visible) {
    window.requestClose ? window.requestClose() : window.hide();
  } else {
    window.show();
  }
};

export const getWindow = (name: WindowName): Astal.Window | undefined => {
  return app.get_window(name) as Astal.Window | undefined;
};
