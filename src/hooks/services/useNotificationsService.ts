import { createBinding } from "ags";
import NotificationService from "@/services/notification";

export const useNotificationService = () => {
  const service = NotificationService.get_default();

  const history = createBinding(service, "history");
  const dontDisturb = createBinding(service, "dontDisturb");
  const notifications = createBinding(service, "notifications");

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
