import AstalTray from "gi://AstalTray";
import { createBinding } from "ags";

export default function useTray() {
  const tray = AstalTray.get_default();

  const items = createBinding(
    tray,
    "items",
  )((items) => items.filter((item) => item.gicon !== null));

  const hasItems = items((i) => i.length > 0);

  return { items, hasItems };
}
