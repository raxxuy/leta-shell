import Gdk from "gi://Gdk?version=4.0";
import Gio from "gi://Gio?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import { createState, For, type MaybeAccessor, render } from "gnim";
import { register } from "gnim/gobject";
import { createDomain } from "gnim/intl";
import { AppRenderer } from "./components/renderer";
import BarWindow from "./features/bar/BarWindow";
import { initCache } from "./lib/cache";
import { applyTheme } from "./lib/theme/apply";
import { ThemeProvider } from "./providers/ConfigProvider";
import ConfigService from "./services/config";

@register
export class App extends Gtk.Application {
  static gettext = createDomain("dev.raxxuy.leta-shell");

  constructor() {
    super({
      applicationId: "dev.raxxuy.leta-shell",
      flags: Gio.ApplicationFlags.HANDLES_COMMAND_LINE,
    });
  }

  override vfunc_command_line(
    this: App,
    cmd: Gio.ApplicationCommandLine,
  ): number {
    const [, ...args] = cmd.get_arguments();
    if (cmd.isRemote) cmd.print_literal("Hello!\n");
    else this.main(args);
    cmd.done();
    return 0;
  }

  protected main(this: App, args: string[]) {
    const display = Gdk.Display.get_default();
    if (!display) throw new Error("No display available");

    const configService = ConfigService.get_default();

    initCache();
    const [visible, setVisible] = createState(false);

    const dispose = render(
      new AppRenderer(),
      () => <Windows application={this} display={display} visible={visible} />,
      this,
    );

    void applyTheme(this).then(() => setVisible(true));

    this.connect("shutdown", () => {
      dispose();
      configService.dispose();
    });

    if (args.includes("--hello")) {
      print("Hello!");
    }
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
      {(monitor: Gdk.Monitor) => (
        <>
          <BarWindow application={application} monitor={monitor} visible={visible} />
        </>
      )}
    </For>
  </ThemeProvider>
);
