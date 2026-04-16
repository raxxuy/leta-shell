import { z } from "zod";
import { ClockSchema, clockDefaults } from "./clock";

export const moduleConfigDefaults = {
  clock: clockDefaults,
};

export const ModuleConfigSchema = z.object({
  clock: ClockSchema.default(clockDefaults),
});

export type ModuleConfig = z.infer<typeof ModuleConfigSchema>;
