import app from "ags/gtk4/app";
import { exec, toggleWindow } from "@/lib/utils";

type RequestHandler = (args: string[], response: (msg: string) => void) => void;

const handlers: Record<string, RequestHandler> = {
  quit: (_, response) => {
    response("Quitting shell");
    app.quit();
  },

  toggle: (args, response) => {
    const [, target] = args;

    if (!target) {
      response("ERROR: Must specify a window name");
      return;
    }

    if (!app.windows.some((w) => w.name === target)) {
      return response(`ERROR: Unknown window "${target}"`);
    }

    toggleWindow(target);
    response(`${target} toggled`);
  },

  restart: (_, response) => {
    exec(
      DEBUG
        ? "ags quit; ags run . --define DEBUG=true"
        : "leta-shell quit; leta-shell",
    );
    response("Restarting shell");
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
