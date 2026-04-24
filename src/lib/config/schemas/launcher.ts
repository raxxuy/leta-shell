import z from "zod";

export const launcherDefaults = {
  providers: {
    web: {
      searchEngine: "google",
    },
  },
} as const;

export const WebSearchEngineEnum = z.enum(["google", "duckduckgo", "brave"]);

export const LauncherSchema = z.object({
  providers: z.object({
    web: z.object({
      searchEngine: WebSearchEngineEnum.default(
        launcherDefaults.providers.web.searchEngine,
      ),
    }),
  }),
});

export type LauncherConfig = z.infer<typeof LauncherSchema>;
