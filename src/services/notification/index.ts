import AstalNotifd from "gi://AstalNotifd";
import { getter, property, register } from "ags/gobject";
import { CACHE_NOTIFICATIONS_FILE } from "@/constants";
import { connect, emitNotify } from "@/decorators/gobject";
import { readFile, writeFile } from "@/lib/fs";
import Service from "../base";
import {
  type PersistedNotification,
  toPersistedNotification,
} from "./persisted";

@register({ GTypeName: "NotificationService" })
export default class NotificationService extends Service {
  private static instance: NotificationService;

  #notifications: AstalNotifd.Notification[] = [];
  #history: PersistedNotification[] = [];

  static get_default(): NotificationService {
    if (!NotificationService.instance)
      NotificationService.instance = new NotificationService();
    return NotificationService.instance;
  }

  @property(Boolean) dontDisturb = AstalNotifd.get_default().dontDisturb;

  @getter(Array<AstalNotifd.Notification>)
  get notifications(): AstalNotifd.Notification[] {
    return this.#notifications;
  }

  @getter(Array<PersistedNotification>)
  get history(): PersistedNotification[] {
    return this.#history;
  }

  @emitNotify("history")
  clearHistory(): void {
    this.#history = [];
    writeFile(CACHE_NOTIFICATIONS_FILE, "[]");
  }

  sendNotification(props: Partial<AstalNotifd.Notification.ConstructorProps>) {
    AstalNotifd.send_notification(
      new AstalNotifd.Notification(props),
      () => {},
    );
  }

  @emitNotify("notifications", "history")
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
      this.#history = [toPersistedNotification(notification), ...this.#history];
      writeFile(CACHE_NOTIFICATIONS_FILE, JSON.stringify(this.#history));
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
    if (this.dontDisturb) return;
    const notification = astalNotifd.get_notification(id);
    if (notification) this.upsertNotification(notification, replaced);
  }

  @connect("resolved", () => AstalNotifd.get_default())
  protected onResolved(_: AstalNotifd.Notifd, id: number): void {
    this.resolveNotification(id);
  }

  constructor() {
    super();
    const raw = readFile(CACHE_NOTIFICATIONS_FILE);
    if (raw) this.#history = JSON.parse(raw);
  }
}
