import type Gio from "gi://Gio?version=2.0";
import { monitorFile } from "@gnim-js/io/fs";
import { getMethod } from "./method";
import { createRegistry } from "./registry";
import type { WatchFileDecorator } from "./types";

const registry = createRegistry();

export const watchDecorated = registry.activate;

export const watchFile =
  (
    getPath: () => string,
    ...events: Gio.FileMonitorEvent[]
  ): WatchFileDecorator =>
  (prototype, name, descriptor) => {
    getMethod(descriptor, "watchFile");

    registry.add(prototype, (instance) => {
      const method = getMethod(
        { value: Reflect.get(instance, name) },
        "watchFile",
      );
      const monitor = monitorFile(getPath(), (path, event) => {
        if (events.length === 0 || events.includes(event)) {
          method.call(instance, path, event);
        }
      });

      return () => monitor.cancel();
    });
  };
