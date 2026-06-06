import z from "zod";

export const workspaceDefaults = {
  count: 10,
} as const;

export const WorkspaceSchema = z.object({
  count: z.number().default(workspaceDefaults.count),
});
