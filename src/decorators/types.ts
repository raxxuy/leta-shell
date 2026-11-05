import type Gio from "gi://Gio?version=2.0";

export type Setup = (instance: object) => () => void;

type WatchFileHandler = (path: string, event: Gio.FileMonitorEvent) => void;

export type WatchFileDecorator = <T extends WatchFileHandler>(
  prototype: object,
  name: string | symbol,
  descriptor: TypedPropertyDescriptor<T>,
) => void;
