import type AstalTray from "gi://AstalTray";
import { createBinding } from "ags";

export const useTrayItem = (item: AstalTray.TrayItem) => {
  const gicon = createBinding(item, "gicon");
  const menuModel = createBinding(item, "menuModel");
  const actionGroup = createBinding(item, "actionGroup");

  return { gicon, menuModel, actionGroup };
};
