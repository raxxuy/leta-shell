import clsx from "clsx/lite";
import { useNotificationService } from "@/hooks/services/useNotificationsService";

export const useNotifications = () => {
  const {
    notifications: rawNotifications,
    dontDisturb,
    history,
    clearHistory,
    toggleDnD,
  } = useNotificationService();

  const notifications = rawNotifications((n) => [...n].reverse());
  const iconName = dontDisturb((dnd) => (dnd ? "bell-off-01" : "bell-01"));
  const hasNotifications = rawNotifications((n) => n.length > 0);
  const hasHistory = history((h) => h.length > 0);

  const dndButtonClassName = dontDisturb((dnd) =>
    clsx(
      "button-outline-custom",
      dnd && "bg-primary/20 hover:bg-primary/25 active:bg-primary/30",
    ),
  );

  return {
    history,
    notifications,
    iconName,
    hasNotifications,
    hasHistory,
    dndButtonClassName,
    clearHistory,
    toggleDnD,
  };
};
