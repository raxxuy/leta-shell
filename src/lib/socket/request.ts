import app from "ags/gtk4/app";

import { isWindowName } from "../window/registry";
import { toggleWindow } from "../window/utils";

type RequestHandler = (args: string[], response: (msg: string) => void) => void;

const handlers: Record<string, RequestHandler> = {
  quit: (_, response) => {
    response("Quitting");
    app.quit();
  },

  toggle: ([, target], response) => {
    if (!target) return response("ERROR: Must specify a window name");

    if (!isWindowName(target)) {
      return response(`ERROR: Unknown window "${target}"`);
    }

    toggleWindow(target);
    response(`Toggled ${target}`);
  },
};

export default (args: string[], response: (msg: string) => void): void => {
  const handler = handlers[args[0]];

  if (!handler) {
    response(`ERROR: Unknown command "${args[0]}"`);
    return;
  }

  handler(args, response);
};
