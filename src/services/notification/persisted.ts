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
  n: AstalNotifd.Notification,
): PersistedNotification => ({
  id: n.id,
  appName: n.appName,
  appIcon: n.appIcon,
  summary: n.summary,
  body: n.body,
  time: n.time,
});
