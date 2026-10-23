import z from "zod";

export const launcherDefaults = {
  maxResults: 5,
  providers: {
    apps: {
      enabled: true,
      query: "exact",
    },
  },
} as const;

export const AppsQuerySchema = z.enum(["exact", "fuzzy"]);

export const LauncherSchema = z.object({
  maxResults: z.coerce
    .number({ error: (iss) => `Expected a number, got ${iss.input}` })
    .int({ error: (iss) => `Expected an integer, got ${iss.input}` })
    .positive({
      error: (iss) => `Expected a positive number, got ${iss.input}`,
    })
    .max(10, {
      error: (iss) =>
        `Expected a number less than or equal to 10, got ${iss.input}`,
    })
    .default(launcherDefaults.maxResults),
  providers: z.object({
    apps: z.object({
      enabled: z.boolean().default(launcherDefaults.providers.apps.enabled),
      query: AppsQuerySchema.default(launcherDefaults.providers.apps.query),
    }),
  }),
});

export type AppsQuerySchema = z.infer<typeof AppsQuerySchema>;
export type LauncherConfig = z.infer<typeof LauncherSchema>;
