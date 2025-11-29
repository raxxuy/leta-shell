import app from "ags/gtk4/app";
import { toggleWindow } from "@/lib/utils/window";

type RequestHandler = (args: string[], response: (msg: string) => void) => void;

const handlers: Record<string, RequestHandler> = {
  quit: (_, response) => {
    response("Quitting AGS");
    app.quit();
  },

  toggle: (args, response) => {
    const [, target] = args;

    if (!target) {
      response("ERROR: Must specify a window name");
      return;
    }

    const validWindows = ["wallpapers", "launcher"] as const;

    if (!validWindows.includes(target as (typeof validWindows)[number])) {
      response(`ERROR: Unknown window "${target}"`);
      return;
    }

    toggleWindow(target);
    response(`${target} toggled`);
  },
};

export default function request(
  args: string[],
  response: (res: string) => void,
): void {
  const [command] = args;
  const handler = handlers[command];

  if (!handler) {
    response(`ERROR: Unknown command "${command}"`);
    return;
  }

  handler(args, response);
}
