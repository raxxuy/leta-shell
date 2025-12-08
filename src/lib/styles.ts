import app from "ags/gtk4/app";
import {
  COLORS_DEST,
  COLORS_SOURCE,
  CSS_FILE,
  SRC_STYLES_DIR,
  STYLES_DIR,
} from "@/constants";
import { dirExists, ensureDir, exec, generateColors } from "@/lib/utils";

const isFirstRun = (): boolean => !dirExists(STYLES_DIR);

const initStyles = async (): Promise<void> => {
  ensureDir(STYLES_DIR);

  await generateColors();

  await exec(
    [
      `cp -r ${SRC_STYLES_DIR}/. ${STYLES_DIR}`,
      `chmod -R u+w ${STYLES_DIR}`,
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
        `sass ${STYLES_DIR}/index.scss ${CSS_FILE} --load-path=${STYLES_DIR}`,
        "hyprctl reload",
      ].join(" && "),
    );

    app.apply_css(CSS_FILE, true);
  } catch (error) {
    console.error("Failed to apply theme:", error);
  }
};
