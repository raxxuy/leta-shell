import z from "zod";
import { CenterNotchSchema, centerNotchDefaults } from "./center-notch";
import { ClockSchema, clockDefaults } from "./clock";
import { WorkspaceSchema, workspaceDefaults } from "./workspaces";

export const moduleSettingsDefaults = {
  clock: clockDefaults,
  workspaces: workspaceDefaults,
  centerNotch: centerNotchDefaults,
} as const;

export const ModuleSettingsSchema = z.object({
  clock: ClockSchema.default(clockDefaults),
  workspaces: WorkspaceSchema.default(workspaceDefaults),
  centerNotch: CenterNotchSchema.default(centerNotchDefaults),
});
