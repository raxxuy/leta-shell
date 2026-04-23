import app from "ags/gtk4/app";
import { CACHE_CSS_FILE, CACHE_SCSS_DIR, SRC_SCSS_DIR } from "@/constants";
import { exec } from "@/lib/process/exec";
import { getUsedClasses, setClasses } from "./plugin";

export const compileCss = async (): Promise<void> => {
  try {
    await exec(
      `sass ${CACHE_SCSS_DIR}/index.scss ${CACHE_CSS_FILE} --load-path=${CACHE_SCSS_DIR}`,
    );
    app.apply_css(CACHE_CSS_FILE, true);
  } catch (error) {
    console.error("Failed to compile CSS:", error);
  }
};

const initializeStyles = async (): Promise<void> => {
  await exec(
    `rsync -a --exclude='utilities.scss' --exclude='colors.scss' ${SRC_SCSS_DIR}/ ${CACHE_SCSS_DIR}/ && chmod -R u+w ${CACHE_SCSS_DIR}`,
  );
};

export const applyTheme = async (): Promise<void> => {
  try {
    await initializeStyles();
    setClasses(getUsedClasses(app.windows));
    await compileCss();
  } catch (error) {
    console.error("Failed to apply theme:", error);
  }
};
