import app from "ags/gtk4/app";
import { toggleWindow } from "@/lib/utils/widget";

export default function request(
  args: string[],
  response: (res: string) => void,
) {
  switch (args[0]) {
    case "quit":
      response("Quitting AGS");
      app.quit();
      break;
    case "toggle":
      if (!args[1]) {
        response("ERROR: Must set an instance name");
        return;
      }

      switch (args[1]) {
        case "wallpapers":
          response("Wallpapers toggled");
          toggleWindow("wallpapers");
          break;
        default:
          response("Unknown request");
      }
  }
}
