export interface LauncherProvider {
  id: string;
  priority: number;
  search: (query: string) => LauncherResult[];
  shouldSearch: (query: string) => boolean;
}

export interface LauncherResult {
  activate: () => void;
  aliases?: string[];
  category?: string;
  description?: string;
  icon?: string;
  id: string;
  label: string;
  symbolic?: boolean;
}
