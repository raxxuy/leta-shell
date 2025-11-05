import GLib from "gi://GLib";
import app from "ags/gtk4/app";
import { execAsync } from "ags/process";
import { cacheDir } from "@/constants";

export const createCacheDir = () => {
  try {
    if (!GLib.file_test(cacheDir, GLib.FileTest.IS_DIR)) {
      GLib.mkdir_with_parents(cacheDir, 0o755);
      const walDir = GLib.build_filenamev([cacheDir, "wal"]);
      GLib.mkdir_with_parents(walDir, 0o755);

      const walFile = GLib.build_filenamev([walDir, "wal"]);
      GLib.file_set_contents(walFile, "");
    }
  } catch (error) {
    console.error("Failed to create cache directory:", error);
    throw error;
  }
};

export const setWallpaper = async (wallpaper: string) => {
  if (!GLib.file_test(wallpaper, GLib.FileTest.EXISTS)) {
    throw new Error(`Wallpaper file does not exist: ${wallpaper}`);
  }

  const walDir = GLib.build_filenamev([cacheDir, "wal"]);
  const stylesDir = GLib.build_filenamev([cacheDir, "styles"]);
  const srcStylesDir = GLib.build_filenamev([SRC, "src", "styles"]);

  try {
    // Copy all styles on first run only
    if (!GLib.file_test(stylesDir, GLib.FileTest.IS_DIR)) {
      GLib.mkdir_with_parents(stylesDir, 0o755);
      await execAsync(["cp", "-r", `${srcStylesDir}/.`, stylesDir]);
      await execAsync(["chmod", "-R", "u+w", stylesDir]);
    }

    // Run wal and sass compilation in parallel after colors are copied
    const walPromise = execAsync([
      "bash",
      "-c",
      `env PYWAL_CACHE_DIR='${walDir}' wal -i '${wallpaper}' --out-dir '${walDir}'`,
    ]).then(async () => {
      const colorsSource = GLib.build_filenamev([walDir, "colors.scss"]);
      const colorsDest = GLib.build_filenamev([stylesDir, "colors.scss"]);
      await execAsync(["cp", colorsSource, colorsDest]);

      await execAsync([
        "sass",
        GLib.build_filenamev([stylesDir, "index.scss"]),
        GLib.build_filenamev([stylesDir, "index.css"]),
      ]);

      const cssFile = GLib.build_filenamev([stylesDir, "index.css"]);
      app.apply_css(cssFile, true);
    });

    await walPromise;
  } catch (error) {
    console.error("Failed to set wallpaper:", error);
    throw error;
  }
};
