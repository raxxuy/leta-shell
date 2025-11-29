import app from "ags/gtk4/app";
import {
  CACHE_DIR,
  COLORS_DEST,
  COLORS_SOURCE,
  CSS_FILE,
  SRC_STYLES_DIR,
  STYLES_DIR,
  WAL_DIR,
  WAL_FILE,
} from "@/constants";
import {
  dirExists,
  ensureDir,
  fileExists,
  readFile,
  writeFile,
} from "@/lib/utils/fs";
import { exec } from "@/lib/utils/shell";
import { generateFromImage, generateRandom } from "@/lib/utils/wal";

export const initCache = (): void => {
  ensureDir(CACHE_DIR);
  ensureDir(WAL_DIR);

  if (!fileExists(WAL_FILE)) {
    writeFile(WAL_FILE, "");
  }
};

const isFirstRun = (): boolean => !dirExists(STYLES_DIR);

const initStyles = async (): Promise<void> => {
  ensureDir(STYLES_DIR);

  await exec(
    [
      `cp -r ${SRC_STYLES_DIR}/. ${STYLES_DIR}`,
      `chmod -R u+w ${STYLES_DIR}`,
    ].join(" && "),
  );

  await generateRandom();
};

export const applyTheme = async (): Promise<void> => {
  if (isFirstRun()) {
    await initStyles();
  }

  await exec(
    [
      `cp ${COLORS_SOURCE} ${COLORS_DEST}`,
      `sass ${STYLES_DIR}/index.scss ${CSS_FILE}`,
      "hyprctl reload",
    ].join(" && "),
  );

  app.apply_css(CSS_FILE, true);
};

export const getWallpaper = (): string => readFile(WAL_FILE);

export const setWallpaper = async (path: string): Promise<void> => {
  if (!path) {
    writeFile(WAL_FILE, "");
    await applyTheme();
    return;
  }

  writeFile(WAL_FILE, path);
  await generateFromImage(path);
  await applyTheme();
};
