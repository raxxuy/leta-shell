import { createBinding } from "ags";
import NotificationService from "@/services/notification";

export default function useNotifications() {
  const service = NotificationService.get_default();

  const rawNotifications = createBinding(service, "notifications");
  const notifications = rawNotifications((n) => [...n].reverse());
  const hasNotifications = notifications((n) => n.length > 0);

  return { notifications, hasNotifications };
}
