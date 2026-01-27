import type { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { kebabCase } from "es-toolkit";
import {
  CACHE_STYLES_DIR,
  COLORS_DEST,
  COLORS_SOURCE,
  CSS_FILE,
  SRC_STYLES_DIR,
  UTILITIES_JSON_FILE,
} from "@/constants";
import {
  buildPath,
  dirExists,
  ensureDir,
  exec,
  fileExists,
  generateColors,
  getUsedClasses,
  readFile,
  writeFile,
} from "../utils";
import { getUtility } from "./generators";

const mappedWidgets = new Set<string>();
const usedSet = new Set<string>();
const sections: string[] = [
  "/* Auto-generated utility classes */\n",
  '@use "mixins" as *;',
  '@use "colors" as *;',
  '@use "keyframes" as *;',
  '@use "colors-variations" as *;\n',
  "/* Utility classes */\n",
];

let isApplying = false;

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

const escapeClassName = (cls: string): string => {
  const escaped = cls.replace(/[:./[\]]/g, "\\$&");
  const pseudoClass = cls.includes(":") ? `:${cls.split(":")[0]}` : "";
  return escaped + pseudoClass;
};

const writeUtilities = (): void => {
  const scss = sections.join("\n");
  writeFile(buildPath(CACHE_STYLES_DIR, "_utilities.scss"), scss);
  writeFile(
    buildPath(CACHE_STYLES_DIR, "utilities.json"),
    JSON.stringify([...usedSet]),
  );
  console.log(`✅ Generated utilities for ${usedSet.size} classes`);
};

export const setClasses = (classes: string[], restart = false): void => {
  const previous = usedSet.size;

  for (const cls of classes) {
    if (!usedSet.has(cls)) {
      const utility = getUtility(cls);

      if (utility) {
        usedSet.add(cls);
        const className = escapeClassName(cls);
        sections.push(`.${className} { ${utility.join("; ")}; }`);
      }
    }
  }

  if (usedSet.size > previous) {
    writeUtilities();
  }

  if (restart) {
    applyTheme();
  }
};

/* Primarily used for loading dynamic widgets who weren't rendered from the start */
export const loadClasses = (component: { name: string }, name?: string) => {
  const kebabName = name || kebabCase(component.name);
  let isFirstRun = true;

  return (self: Gtk.Widget) => {
    const shouldRestart = isFirstRun && !mappedWidgets.has(kebabName);

    if (isFirstRun) {
      mappedWidgets.add(kebabName);
      isFirstRun = false;
    }

    setClasses(getUsedClasses(self), shouldRestart);
  };
};

const loadCachedUtilities = (): void => {
  if (!fileExists(UTILITIES_JSON_FILE)) return;

  try {
    const cached = JSON.parse(readFile(UTILITIES_JSON_FILE));
    setClasses(cached);
  } catch (error) {
    console.error("Failed to parse utilities.json:", error);
  }
};

const compileStyles = async (): Promise<void> => {
  await exec(
    [
      `cp ${COLORS_SOURCE} ${COLORS_DEST}`,
      `sass ${CACHE_STYLES_DIR}/index.scss ${CSS_FILE} --load-path=${CACHE_STYLES_DIR}`,
      `hyprctl reload`,
    ].join(" && "),
  );
};

export const applyTheme = async (): Promise<void> => {
  if (isApplying) return;
  isApplying = true;

  try {
    if (isFirstRun()) await initStyles();

    loadCachedUtilities();
    setClasses(getUsedClasses());

    await compileStyles();
    app.apply_css(CSS_FILE, true);
  } catch (error) {
    console.error("Failed to apply theme:", error);
  } finally {
    isApplying = false;
  }
};
