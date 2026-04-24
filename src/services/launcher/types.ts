export interface LauncherProvider {
  id: string;
  priority: number;
  search(query: string): LauncherResult[];
  shouldSearch(query: string): boolean;
}

export type LauncherResult = {
  activate(): void;
  category?: string;
  description?: string;
  icon?: string;
  id: string;
  label: string;
};
