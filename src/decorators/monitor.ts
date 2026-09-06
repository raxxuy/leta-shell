/** biome-ignore-all lint/suspicious/noExplicitAny: <> */

import type Gio from "gi://Gio";

import { onCleanup } from "ags";
import { monitorFile } from "ags/file";

export function monitor<T extends object>(
  path: string | ((self: T) => string),
  ...events: Gio.FileMonitorEvent[]
) {
  return (
    method: (this: T, event: Gio.FileMonitorEvent) => any,
    ctx: ClassMethodDecoratorContext<T, typeof method>,
  ) => {
    ctx.addInitializer(function (this: T) {
      const resolvedPath = typeof path === "function" ? path(this) : path;

      const handler = (_file: string, event: Gio.FileMonitorEvent) => {
        if (!events.length || events.includes(event)) {
          method.call(this, event);
        }
      };

      const fileMonitor = monitorFile(resolvedPath, handler);
      onCleanup(() => fileMonitor.cancel());
    });
  };
}
