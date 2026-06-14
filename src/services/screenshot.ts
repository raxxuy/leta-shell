import { register } from "ags/gobject";
import { getActiveWindow } from "@/lib/hyprland/clients";
import { exec } from "@/lib/process";
import Service from "./base";

@register({ GTypeName: "ScreenshotService" })
export default class ScreenshotService extends Service {
  private static instance: ScreenshotService;

  static get_default(): ScreenshotService {
    if (!ScreenshotService.instance)
      ScreenshotService.instance = new ScreenshotService();
    return ScreenshotService.instance;
  }

  async captureFull(outputPath: string): Promise<string> {
    await exec([
      "leta-toolkit",
      "screenshot",
      "capture",
      "--output",
      outputPath,
    ]);
    return outputPath;
  }

  async captureWindow(outputPath: string): Promise<string> {
    const active = await getActiveWindow();
    const [x, y] = active.at;
    const [w, h] = active.size;

    await exec([
      "leta-toolkit",
      "screenshot",
      "capture",
      "--output",
      outputPath,
      "--x",
      String(x),
      "--y",
      String(y),
      "--width",
      String(w),
      "--height",
      String(h),
    ]);

    return outputPath;
  }

  async captureRegion(
    outputPath: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ): Promise<string> {
    await exec([
      "leta-toolkit",
      "screenshot",
      "capture",
      "--output",
      outputPath,
      "--x",
      String(x),
      "--y",
      String(y),
      "--width",
      String(width),
      "--height",
      String(height),
    ]);
    return outputPath;
  }
}
