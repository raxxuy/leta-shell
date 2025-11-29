import AstalNotifd from "gi://AstalNotifd";
import { onCleanup } from "ags";
import type GObject from "ags/gobject";
import { getter, register, signal } from "ags/gobject";
import Service from "@/services/base";

interface NotificationsSignals extends GObject.Object.SignalSignatures {
  notified: Notifications["notified"];
  resolved: Notifications["resolved"];
}

@register({ GTypeName: "Notifications" })
export default class Notifications extends Service<NotificationsSignals> {
  private static instance: Notifications;
  #notifd: AstalNotifd.Notifd = AstalNotifd.get_default();
  #notifications: AstalNotifd.Notification[] = [];

  static get_default() {
    if (!Notifications.instance) {
      Notifications.instance = new Notifications();
    }
    return Notifications.instance;
  }

  @signal()
  notified() {}

  @signal()
  resolved() {}

  @getter(Array)
  get notifications() {
    return this.#notifications;
  }

  constructor() {
    super();

    const notifiedHandler = this.#notifd.connect(
      "notified",
      (_, id, replaced) => {
        const notification = this.#notifd.get_notification(id);

        if (!notification) return;

        if (replaced && this.#notifications.some((n) => n.id === id)) {
          this.#notifications = this.#notifications.map((n) =>
            n.id === id ? notification : n,
          );
        } else {
          this.#notifications = [notification, ...this.#notifications];
        }

        this.notify("notifications");
        this.emit("notified");
      },
    );

    const resolvedHandler = this.#notifd.connect("resolved", (_, id) => {
      this.#notifications = this.#notifications.filter((n) => n.id !== id);
      this.notify("notifications");
      this.emit("resolved");
    });

    onCleanup(() => {
      this.#notifd.disconnect(notifiedHandler);
      this.#notifd.disconnect(resolvedHandler);
    });
  }
}
