import { createBinding } from "ags";
import NotificationService from "@/services/notification";

export const useNotificationService = () => {
  const service = NotificationService.get_default();

  const notifications = createBinding(service, "notifications");
  const dontDisturb = createBinding(service, "dontDisturb");
  const history = createBinding(service, "history");

  const clearHistory = () => service.clearHistory();
  const toggleDnD = () => (service.dontDisturb = !service.dontDisturb);

  return {
    notifications,
    dontDisturb,
    history,
    clearHistory,
    toggleDnD,
  };
};
