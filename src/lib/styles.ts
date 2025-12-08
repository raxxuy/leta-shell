import app from "ags/gtk4/app";
import {
  CACHE_STYLES_DIR,
  COLORS_DEST,
  COLORS_SOURCE,
  CSS_FILE,
  SRC_STYLES_DIR,
} from "@/constants";
import { dirExists, ensureDir, exec, generateColors } from "@/lib/utils";

const isFirstRun = (): boolean => !dirExists(CACHE_STYLES_DIR);

const initStyles = async (): Promise<void> => {
  ensureDir(CACHE_STYLES_DIR);

  await generateColors();

  await exec(
    [
      `cp -r ${SRC_STYLES_DIR}/. ${CACHE_STYLES_DIR}`,
      `chmod -R u+w ${CACHE_STYLES_DIR}`,
    ].join(" && "),
  );
};

export const applyTheme = async (): Promise<void> => {
  try {
    if (isFirstRun()) {
      await initStyles();
    }

    await exec(
      [
        `cp ${COLORS_SOURCE} ${COLORS_DEST}`,
        `sass ${CACHE_STYLES_DIR}/index.scss ${CSS_FILE} --load-path=${CACHE_STYLES_DIR}`,
        "hyprctl reload",
      ].join(" && "),
    );

    app.apply_css(CSS_FILE, true);
  } catch (error) {
    console.error("Failed to apply theme:", error);
  }
};
