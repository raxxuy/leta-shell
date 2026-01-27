import AstalNotifd from "gi://AstalNotifd";
import { onCleanup } from "ags";
import type GObject from "ags/gobject";
import { getter, register, setter, signal } from "ags/gobject";
import Service from "./base";

interface NotificationSignals extends GObject.Object.SignalSignatures {
  notified: NotificationService["notified"];
  resolved: NotificationService["resolved"];
}

@register({ GTypeName: "NotificationService" })
export default class NotificationService extends Service<NotificationSignals> {
  private static instance: NotificationService;
  #notifd: AstalNotifd.Notifd = AstalNotifd.get_default();
  #notifications: AstalNotifd.Notification[] = [];

  static get_default() {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  @signal(Number, Boolean)
  notified(_id: number, _replaced: boolean) {}

  @signal(Number)
  resolved(_id: number) {}

  @getter(Array)
  get notifications() {
    return this.#notifications;
  }

  @getter(Boolean)
  get dontDisturb() {
    return this.#notifd.dontDisturb;
  }

  @setter(Boolean)
  set dontDisturb(value: boolean) {
    this.#notifd.dontDisturb = value;
  }

  getNotification(id: number): AstalNotifd.Notification {
    const notification = this.#notifd.get_notification(id);

    if (!notification) throw new Error(`Notification with id ${id} not found`);

    return notification;
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
        this.emit("notified", id, replaced);
      },
    );

    const resolvedHandler = this.#notifd.connect("resolved", (_, id) => {
      this.#notifications = this.#notifications.filter((n) => n.id !== id);
      this.notify("notifications");
      this.emit("resolved", id);
    });

    onCleanup(() => {
      this.#notifd.disconnect(notifiedHandler);
      this.#notifd.disconnect(resolvedHandler);
    });
  }
}
