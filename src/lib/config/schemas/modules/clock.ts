import { z } from "zod";

export const clockDefaults = {
  format: "%H:%M",
};

export const ClockSchema = z.object({
  format: z.string().default(clockDefaults.format),
});
