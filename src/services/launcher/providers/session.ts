import { lock, logout, reboot, shutdown, suspend } from "@/lib/session";
import { toggleWindow } from "@/lib/window";
import type { LauncherProvider, LauncherResult } from "../types";

export default class SessionProvider implements LauncherProvider {
  private static readonly sessionActions: LauncherResult[] = [
    {
      id: "shutdown",
      aliases: ["power off", "turn off", "shut down"],
      label: "Shutdown",
      description: "Power off the system",
      icon: "power-01",
      activate: () => {
        shutdown();
        toggleWindow("launcher");
      },
    },
    {
      id: "reboot",
      aliases: ["restart"],
      label: "Reboot",
      description: "Restart the system",
      icon: "refresh-cw-01",
      activate: () => {
        reboot();
        toggleWindow("launcher");
      },
    },
    {
      id: "logout",
      aliases: ["log out", "sign out"],
      label: "Log Out",
      description: "End the current session",
      icon: "log-out-02",
      activate: () => {
        logout();
        toggleWindow("launcher");
      },
    },
    {
      id: "suspend",
      aliases: ["sleep"],
      label: "Suspend",
      description: "Sleep the system",
      icon: "moon-01",
      activate: () => {
        suspend();
        toggleWindow("launcher");
      },
    },
    {
      id: "lock",
      aliases: ["lock screen"],
      label: "Lock",
      description: "Lock the screen",
      icon: "lock-01",
      activate: () => {
        lock();
        toggleWindow("launcher");
      },
    },
  ];

  private matches(a: LauncherResult, query: string) {
    const q = query.toLowerCase();

    return (
      a.label.toLowerCase().includes(q) ||
      a.aliases?.some((alias) => alias.toLowerCase().includes(q))
    );
  }

  id = "session";
  priority = 3;

  shouldSearch(query: string): boolean {
    return (
      query.length > 0 &&
      SessionProvider.sessionActions.some((a) => this.matches(a, query))
    );
  }

  search(query: string): LauncherResult[] {
    return SessionProvider.sessionActions.filter((a) => this.matches(a, query));
  }
}
