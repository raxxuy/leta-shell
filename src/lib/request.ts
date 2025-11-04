import { toggleWindow } from "@/lib/utils/widget";

export default function request(
  args: string[],
  response: (res: string) => void,
) {
  if (args[0] === "toggle" && args[1]) {
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
