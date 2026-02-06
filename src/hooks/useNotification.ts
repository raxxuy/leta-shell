import { createBinding } from "ags";
import NotificationService from "@/services/notification";

export const useNotification = () => {
  const notificationService = NotificationService.get_default();

  return {
    checkNotifications: () => notificationService.checkNotifications(),
    getNotification: (id: number) => notificationService.getNotification(id),
    iconName: createBinding(notificationService, "iconName"),
    dontDisturb: createBinding(notificationService, "dontDisturb"),
    notifications: createBinding(notificationService, "notifications"),
  };
};
