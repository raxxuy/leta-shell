import type AstalNotifd from "gi://AstalNotifd";

export interface PersistedNotification {
  appIcon: string;
  appName: string;
  body: string;
  id: number;
  summary: string;
  time: number;
}

export const toPersistedNotification = (
  notification: AstalNotifd.Notification,
): PersistedNotification => ({
  id: notification.id,
  appName: notification.appName,
  appIcon: notification.appIcon,
  summary: notification.summary,
  body: notification.body,
  time: notification.time,
});
