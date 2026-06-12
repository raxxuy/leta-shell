import app from "ags/gtk4/app";
import { isWindowName, toggleWindow } from "@/lib/window";
import AuthService from "@/services/auth";

type RequestHandler = (args: string[], response: (msg: string) => void) => void;

const handlers: Record<string, RequestHandler> = {
  quit: (_, response) => {
    if (AuthService.isLocked())
      return response("ERROR: Cannot quit while locked");
    response("Quitting");
    app.quit();
  },

  toggle: ([, target], response) => {
    if (!target) return response("ERROR: Must specify a window name");

    if (!isWindowName(target))
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
