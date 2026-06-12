import z from "zod";

export const launcherDefaults = {
  width: 558,
  maxResults: 5,
  providers: {
    web: {
      searchEngine: "google",
    },
  },
} as const;

export const WebSearchEngineEnum = z.enum(["google", "duckduckgo", "brave"]);

export const LauncherSchema = z.object({
  width: z.number().int().min(0).default(launcherDefaults.width),
  maxResults: z
    .number()
    .int()
    .min(1)
    .max(10)
    .default(launcherDefaults.maxResults),
  providers: z.object({
    web: z.object({
      searchEngine: WebSearchEngineEnum.default(
        launcherDefaults.providers.web.searchEngine,
      ).describe("The search engine used for web searches"),
    }),
  }),
});

export type WebSearchEngine = z.infer<typeof WebSearchEngineEnum>;
export type LauncherConfig = z.infer<typeof LauncherSchema>;
