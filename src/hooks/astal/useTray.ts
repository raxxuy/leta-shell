import AstalTray from "gi://AstalTray";
import { createBinding } from "ags";

export const useTray = () => {
  const tray = AstalTray.get_default();
  return createBinding(
    tray,
    "items",
  )((items) => items.filter((item) => item?.gicon));
};
