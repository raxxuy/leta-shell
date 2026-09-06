import z from "zod";

export const launcherDefaults = {
  maxResults: 5,
  providers: {
    apps: {
      query: "exact",
    },
  },
} as const;

const AppsQuerySchema = z.enum(["exact", "fuzzy"]);

export const LauncherSchema = z.object({
  maxResults: z
    .number({ error: (iss) => `Expected a number, got ${iss.input}` })
    .min(1, {
      error: (iss) =>
        `Expected a number greater than or equal to 1, got ${iss.input}`,
    })
    .max(10, {
      error: (iss) =>
        `Expected a number less than or equal to 10, got ${iss.input}`,
    })
    .default(launcherDefaults.maxResults),
  providers: z.object({
    apps: z.object({
      query: AppsQuerySchema.default(launcherDefaults.providers.apps.query),
    }),
  }),
});

export type AppsQuerySchema = z.infer<typeof AppsQuerySchema>;
export type LauncherConfig = z.infer<typeof LauncherSchema>;
