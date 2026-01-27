export type LauncherResultType = "app" | "command" | "calc" | "web" | "action";

export interface LauncherResult {
  id: string;
  type: LauncherResultType;
  title: string;
  description?: string;
  icon?: string;
  score: number;
  execute: () => void;
  data?: unknown; // Provider-specific data
}

export interface LauncherProvider {
  name: string;
  priority: number;
  canHandle: (query: string) => boolean;
  search: (query: string) => Promise<LauncherResult[]>;
}
