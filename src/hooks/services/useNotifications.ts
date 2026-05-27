import { createBinding } from "ags";
import clsx from "clsx";
import NotificationService from "@/services/notification";

export default function useNotifications() {
  const service = NotificationService.get_default();

  const rawNotifications = createBinding(service, "notifications");
  const dontDisturb = createBinding(service, "dontDisturb");
  const history = createBinding(service, "history");

  const notifications = rawNotifications((n) => [...n].reverse());
  const hasNotifications = notifications((n) => n.length > 0);
  const hasHistory = history((h) => h.length > 0);
  const iconName = dontDisturb((dnd) => (dnd ? "bell-off-01" : "bell-01"));

  const dndClassName = dontDisturb((dnd) =>
    clsx(
      "button-outline-custom",
      dnd && "bg-primary/20 hover:bg-primary/25 active:bg-primary/30",
    ),
  );

  const toggleDnD = () => (service.dontDisturb = !service.dontDisturb);
  const clearHistory = () => service.clearHistory();

  return {
    history,
    hasHistory,
    notifications,
    hasNotifications,
    dontDisturb,
    iconName,
    dndClassName,
    toggleDnD,
    clearHistory,
  };
}
