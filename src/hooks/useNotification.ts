import { createBinding } from "ags";
import NotificationService from "@/services/notification";

export const useNotification = () => {
  const notificationService = NotificationService.get_default();

  return {
    clearNotifications: () => notificationService.clearNotifications(),
    getNotification: (id: number) => notificationService.getNotification(id),
    setDontDisturb: (value: boolean) =>
      notificationService.setDontDisturb(value),
    iconName: createBinding(notificationService, "iconName"),
    dontDisturb: createBinding(notificationService, "dontDisturb"),
    notifications: createBinding(notificationService, "notifications"),
  };
};
