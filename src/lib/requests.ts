import type Gtk from "gi://Gtk?version=4.0";

export const handleRequest = (
  application: Gtk.Application,
  args: string[],
): void => {
  const [command, name] = args;

  if (command !== "toggle" || !name || args.length !== 2) {
    throw new Error("Usage: toggle <window-name>");
  }

  const windows = application
    .get_windows()
    .filter((window) => window.get_name() === name);

  if (windows.length === 0) {
    throw new Error(`No window named "${name}"`);
  }

  for (const window of windows) {
    window.set_visible(!window.get_visible());
  }
};
