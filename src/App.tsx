import Gdk from "gi://Gdk?version=4.0";
import type Gio from "gi://Gio?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import { createState, For, type MaybeAccessor, render } from "gnim";
import { register } from "gnim/gobject";
import { createDomain } from "gnim/intl";
import { AppRenderer } from "./components/renderer";
import { ApplicationFlags } from "./enums";
import BarWindow from "./features/bar/BarWindow";
import WallpaperPickerWindow from "./features/wallpaper/WallpaperPickerWindow";
import WallpaperWindow from "./features/wallpaper/WallpaperWindow";
import { initCache } from "./lib/cache";
import { handleRequest } from "./lib/requests";
import { applyTheme } from "./lib/theme/apply";
import { ThemeProvider } from "./providers/ConfigProvider";
import ConfigService from "./services/config";

@register
export class App extends Gtk.Application {
  static gettext = createDomain("dev.raxxuy.leta-shell");

  constructor() {
    super({
      applicationId: "dev.raxxuy.leta-shell",
      flags: ApplicationFlags.HANDLES_COMMAND_LINE,
    });
  }

  override vfunc_command_line(
    this: App,
    cmd: Gio.ApplicationCommandLine,
  ): number {
    const [, ...args] = cmd.get_arguments();

    try {
      if (cmd.isRemote) handleRequest(this, args);
      else this.main();
      return 0;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      cmd.printerr_literal(`${message}\n`);
      cmd.set_exit_status(1);
      return 1;
    } finally {
      cmd.done();
    }
  }

  protected main(this: App): void {
    const display = Gdk.Display.get_default();
    if (!display) throw new Error("No display available");

    const config = ConfigService.get_default();
    const [visible, setVisible] = createState(false);

    initCache();

    const dispose = render(
      new AppRenderer(),
      () => <Windows application={this} display={display} visible={visible} />,
      this,
    );

    applyTheme(this)
      .then(() => setVisible(true))
      .catch((error) => console.error("Failed to apply theme:", error));

    this.connect("shutdown", () => {
      dispose();
      config.dispose();
    });
  }
}

const Windows = ({
  application,
  display,
  visible,
}: {
  application: Gtk.Application;
  display: Gdk.Display;
  visible: MaybeAccessor<boolean>;
}) => (
  <ThemeProvider>
    <For each={display.get_monitors()}>
      {(monitor: Gdk.Monitor) => {
        const props = {
          application,
          monitor,
          visible,
        };

        return (
          <>
            <BarWindow {...props} />
            <WallpaperWindow {...props} />
            <WallpaperPickerWindow {...props} />
          </>
        );
      }}
    </For>
  </ThemeProvider>
);
