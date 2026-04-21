import z from "zod";

export const clockDefaults = {
  format: "%H:%M",
} as const;

export const ClockSchema = z.object({
  format: z.string().default(clockDefaults.format),
});
