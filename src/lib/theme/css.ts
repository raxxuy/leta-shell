import Gdk from "gi://Gdk?version=4.0";
import Gtk from "gi://Gtk?version=4.0";
import { execAsync } from "@gnim-js/io/process";

import { CACHE_SCSS_DIR } from "./constants";

const cssFile = `${CACHE_SCSS_DIR}/index.css`;
const state: {
  cssProvider?: Gtk.CssProvider;
  pendingCompilation: Promise<void>;
} = { pendingCompilation: Promise.resolve() };

const compileAndApplyCss = async (): Promise<void> => {
  await execAsync([
    "sass",
    `${CACHE_SCSS_DIR}/index.scss`,
    cssFile,
    `--load-path=${CACHE_SCSS_DIR}`,
  ]);

  const display = Gdk.Display.get_default();
  if (!display) throw new Error("No default display available");

  if (!state.cssProvider) {
    state.cssProvider = new Gtk.CssProvider();
    Gtk.StyleContext.add_provider_for_display(
      display,
      state.cssProvider,
      Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION,
    );
  }
  state.cssProvider.load_from_path(cssFile);
};

export const compileCss = (): Promise<void> => {
  state.pendingCompilation = state.pendingCompilation
    .then(compileAndApplyCss)
    .catch((error) => console.error("Failed to compile CSS:", error));
  return state.pendingCompilation;
};
