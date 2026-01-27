import { exec } from "@/lib/utils";
import type { LauncherProvider, LauncherResult } from "../types";

export class CalculatorProvider implements LauncherProvider {
  name = "calculator";
  priority = 15;

  canHandle(query: string): boolean {
    return /^[\d+\-*/().\s]+$/.test(query);
  }

  async search(query: string): Promise<LauncherResult[]> {
    try {
      // biome-ignore lint/security/noGlobalEval: <avoid security error>
      const result = eval(query);

      if (typeof result !== "number" || !Number.isFinite(result)) {
        return [];
      }

      return [
        {
          id: `calc-${query}`,
          type: "calc",
          title: `${result}`,
          description: query,
          icon: "calculator",
          score: 95,
          execute: () => {
            exec(`wl-copy "${result}"`);
          },
        },
      ];
    } catch {
      return [];
    }
  }
}
