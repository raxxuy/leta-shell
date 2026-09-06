import type { Timer } from "ags/time";
import { timeout } from "ags/time";

import type { ValueOrUpdater } from "@/types/config";
import { writeConfig } from ".";
import type { ConfigKey, Configs } from "./schemas";

const writeQueue = new Map<ConfigKey, Timer>();

export const scheduleWrite = <K extends ConfigKey>(
  key: K,
  config: Configs[K],
  delay = 300,
): void => {
  const existing = writeQueue.get(key);
  if (existing) existing.cancel();

  writeQueue.set(
    key,
    timeout(delay, () => {
      writeConfig(key, config);
      writeQueue.delete(key);
    }),
  );
};

export const resolveUpdater = <T>(value: ValueOrUpdater<T>, current: T): T =>
  typeof value === "function" ? (value as (c: T) => T)(current) : value;
