import app from "ags/gtk4/app";
import { toggleWindow } from "../lib/window";

type RequestHandler = (args: string[], response: (msg: string) => void) => void;

const validWindows = ["launcher", "wallpaper-selector"];

const handlers: Record<string, RequestHandler> = {
  quit: (_, response) => {
    response("Quitting");
    app.quit();
  },

  toggle: ([, target], response) => {
    if (!target) return response("ERROR: Must specify a window name");

    if (!validWindows.includes(target))
      return response(`ERROR: Unknown window "${target}"`);

    toggleWindow(target);
    response(`Toggled ${target}`);
  },
};

export default function request(
  args: string[],
  response: (msg: string) => void,
): void {
  const handler = handlers[args[0]];

  if (!handler) {
    response(`ERROR: Unknown command "${args[0]}"`);
    return;
  }

  handler(args, response);
}
