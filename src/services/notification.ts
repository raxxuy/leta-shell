import AstalNotifd from "gi://AstalNotifd";
import { getter, register } from "ags/gobject";
import { connect, emitNotify } from "@/decorators/gobject";
import Service from "./base";

@register({ GTypeName: "NotificationService" })
export default class NotificationService extends Service {
  private static instance: NotificationService;

  #notifications: AstalNotifd.Notification[] = [];

  static get_default(): NotificationService {
    if (!NotificationService.instance)
      NotificationService.instance = new NotificationService();
    return NotificationService.instance;
  }

  @getter(Array<AstalNotifd.Notification>)
  get notifications(): AstalNotifd.Notification[] {
    return this.#notifications;
  }

  @emitNotify("notifications")
  private upsertNotification(
    notification: AstalNotifd.Notification,
    replaced: boolean,
  ): void {
    if (replaced && this.#notifications.some((n) => n.id === notification.id)) {
      this.#notifications = this.#notifications.map((n) =>
        n.id === notification.id ? notification : n,
      );
    } else {
      this.#notifications = [notification, ...this.#notifications];
    }
  }

  @emitNotify("notifications")
  private resolveNotification(id: number): void {
    this.#notifications = this.#notifications.filter((n) => n.id !== id);
  }

  @connect("notified", () => AstalNotifd.get_default())
  protected onNotified(
    astalNotifd: AstalNotifd.Notifd,
    id: number,
    replaced: true,
  ): void {
    const notification = astalNotifd.get_notification(id);
    if (notification) this.upsertNotification(notification, replaced);
  }

  @connect("resolved", () => AstalNotifd.get_default())
  protected onResolved(_: AstalNotifd.Notifd, id: number): void {
    this.resolveNotification(id);
  }
}
