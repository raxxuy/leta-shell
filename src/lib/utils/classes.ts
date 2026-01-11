import { compact } from "es-toolkit";

export const cls = (...items: Array<string | boolean>): string =>
  compact(items).join(" ");
