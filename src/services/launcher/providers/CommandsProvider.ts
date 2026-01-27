import { exec, toggleWindow } from "@/lib/utils";
import type { LauncherProvider, LauncherResult } from "../types";

export class CommandsProvider implements LauncherProvider {
  name = "commands";
  priority = 8;

  canHandle(query: string): boolean {
    return query.startsWith(">");
  }

  async search(query: string): Promise<LauncherResult[]> {
    const command = query.slice(1).trim();

    if (!command) return [];

    return [
      {
        id: `cmd-${command}`,
        type: "command",
        title: command,
        description: "Run shell command",
        icon: "terminal",
        score: 90,
        execute: () => {
          toggleWindow("launcher");
          exec(command).catch(console.error);
        },
      },
    ];
  }
}
