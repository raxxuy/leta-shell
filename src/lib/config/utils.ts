import type GLib from "gi://GLib";
import type { ValueOrUpdater } from "@/types/config";
import { writeConfig } from ".";
import type { ConfigKey, Configs } from "./schemas";

const writeQueue = new Map<ConfigKey, GLib.Source>();

export const scheduleWrite = <K extends ConfigKey>(
  key: K,
  config: Configs[K],
  delay = 300,
): void => {
  const existing = writeQueue.get(key);
  if (existing) clearTimeout(existing);

  writeQueue.set(
    key,
    setTimeout(() => {
      writeConfig(key, config);
      writeQueue.delete(key);
    }, delay),
  );
};

export const resolveUpdater = <T>(value: ValueOrUpdater<T>, current: T): T =>
  typeof value === "function" ? (value as (c: T) => T)(current) : value;
