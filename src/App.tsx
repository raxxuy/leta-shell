import Gdk from "gi://Gdk?version=4.0";
import Gio from "gi://Gio?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import { For, render } from "gnim";
import { register } from "gnim/gobject";
import { createDomain } from "gnim/intl";
import { AppRenderer } from "./components/renderer";
import BarWindow from "./features/bar/BarWindow";
import { initCache } from "./lib/cache";
import { applyTheme } from "./lib/theme/apply";

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

    initCache();
    applyTheme(this);

    const dispose = render(
      new AppRenderer(),
      () => <Windows application={this} display={display} />,
      this,
    );
    this.connect("shutdown", dispose);

    if (args.includes("--hello")) {
      print("Hello!");
    }
  }
}

const Windows = ({
  application,
  display,
}: {
  application: Gtk.Application;
  display: Gdk.Display;
}) => (
  <For each={display.get_monitors()}>
    {(monitor: Gdk.Monitor) => (
      <>
        <BarWindow application={application} monitor={monitor} />
      </>
    )}
  </For>
);
