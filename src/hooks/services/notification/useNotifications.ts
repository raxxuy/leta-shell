import { createBinding } from "ags";
import NotificationService from "@/services/notification";

export const useNotifications = () => {
  const notificationService = NotificationService.get_default();
  const notifications = createBinding(
    notificationService,
    "notifications",
  )((n) => n.reverse());

  return {
    notifications,
    hasNotifications: notifications((n) => n.length > 0),
  };
};
