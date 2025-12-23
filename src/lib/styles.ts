import type { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
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
  generateUtilityClasses,
  getUsedClasses,
  readFile,
  writeFile,
} from "@/lib/utils";

const utilities: Record<string, string[]> = generateUtilityClasses();
const mappedWidgets = new Set<string>();
const usedSet = new Set<string>();
const sections: string[] = [
  "/* Auto-generated utility classes */\n",
  '@use "mixins" as *;',
  '@use "colors" as *;',
  '@use "colors-variations" as *;\n',
  "/* Utility classes */\n",
  ".transition { @include transition; }",
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

/* The restart parameter is used to have a workaround with dynamic css */
export const setClasses = (classes: string[], restart?: boolean): void => {
  const previous = usedSet.size;

  classes.forEach((cls) => {
    if (!usedSet.has(cls) && utilities[cls]) {
      usedSet.add(cls);
      const className =
        cls.replace(/[:./]/g, "\\$&") +
        `${cls.includes(":") ? `:${cls.split(":")[0]}` : ""}`;

      sections.push(`.${className} { ${utilities[cls].join("; ")}; }`);
    }
  });

  if (usedSet.size > previous) {
    const scss = sections.join("\n");
    const outputPath = buildPath(CACHE_STYLES_DIR, "_utilities.scss");
    const jsonPath = buildPath(CACHE_STYLES_DIR, "utilities.json");
    writeFile(outputPath, scss);
    writeFile(jsonPath, JSON.stringify(Array.from(usedSet)));

    console.log(`✅ Generated utilities for ${usedSet.size} classes`);
  }

  if (restart) {
    applyTheme();
  }
};

/* Primarily used for loading dynamic widgets who weren't rendered from the start */
export const loadWidgetClasses = async (widget: Gtk.Widget, name: string) => {
  if (mappedWidgets.has(name)) return;
  mappedWidgets.add(name);

  if (widget) {
    const usedClasses = getUsedClasses(widget);
    setClasses(usedClasses, true);
  }
};

export const applyTheme = async (): Promise<void> => {
  if (isApplying) return;
  isApplying = true;

  try {
    if (isFirstRun()) {
      await initStyles();
      const usedClasses = getUsedClasses();
      setClasses(usedClasses);
    }

    if (fileExists(UTILITIES_JSON_FILE)) {
      try {
        const content = readFile(UTILITIES_JSON_FILE);
        const json = JSON.parse(content);
        setClasses(json);
      } catch (error) {
        console.error("Failed to parse utilities.json:", error);
      }
    }

    setClasses(getUsedClasses());

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
  } finally {
    isApplying = false;
  }
};
