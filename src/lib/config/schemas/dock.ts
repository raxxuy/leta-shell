import z from "zod";

export const dockDefaults = {
  autohide: false,
} as const;

export const DockSchema = z.object({
  autohide: z.boolean().default(dockDefaults.autohide),
});

export type DockConfig = z.infer<typeof DockSchema>;
