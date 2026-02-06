import type { LauncherProvider, LauncherResult } from "@/types/launcher";
import { exec, toggleWindow } from "@/utils";

interface SystemAction {
  keywords: string[];
  title: string;
  description: string;
  icon: string;
  command: string;
}

export class ActionsProvider implements LauncherProvider {
  name = "actions";
  priority = 5;

  private actions: SystemAction[] = [
    {
      keywords: ["shutdown", "poweroff", "power off", "shut down"],
      title: "Shutdown",
      description: "Power off the system",
      icon: "system-shutdown",
      command: "systemctl poweroff",
    },
    {
      keywords: ["reboot", "restart"],
      title: "Reboot",
      description: "Restart the system",
      icon: "system-reboot",
      command: "systemctl reboot",
    },
    {
      keywords: ["lock", "lock screen"],
      title: "Lock Screen",
      description: "Lock your session",
      icon: "system-lock-screen",
      command: "hyprlock", // or your lock command
    },
    {
      keywords: ["sleep", "suspend"],
      title: "Sleep",
      description: "Suspend the system",
      icon: "system-suspend",
      command: "systemctl suspend",
    },
    {
      keywords: ["logout", "log out"],
      title: "Logout",
      description: "End your session",
      icon: "system-log-out",
      command: "hyprctl dispatch exit",
    },
  ];

  canHandle(query: string): boolean {
    return query.length > 1;
  }

  async search(query: string): Promise<LauncherResult[]> {
    const lowerQuery = query.toLowerCase();

    return this.actions
      .filter((action) =>
        action.keywords.some((keyword) => keyword.includes(lowerQuery)),
      )
      .map((action) => ({
        id: `action-${action.title}`,
        type: "action" as const,
        title: action.title,
        description: action.description,
        icon: action.icon,
        score: 85,
        execute: () => {
          toggleWindow("launcher");
          exec(action.command);
        },
        data: action,
      }));
  }
}
