import app from "ags/gtk4/app";
import {
  CACHE_STYLES_DIR,
  COLORS_DEST,
  COLORS_SOURCE,
  CSS_FILE,
  SRC_STYLES_DIR,
} from "@/constants";
import {
  buildPath,
  dirExists,
  ensureDir,
  exec,
  generateColors,
  generateUtilityClasses,
  getUsedClasses,
  writeFile,
} from "@/lib/utils";

const utilities: Record<string, string[]> = generateUtilityClasses();
const usedSet = new Set<string>();
const sections: string[] = [
  "/* Auto-generated utility classes */\n",
  '@use "mixins" as *;',
  '@use "colors" as *;',
  '@use "colors-variations" as *;\n',
  "/* Utility classes */\n",
  ".transition { @include transition; }",
];

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

export const setClasses = (classes: string[]): void => {
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
    writeFile(outputPath, scss);

    console.log(`✅ Generated utilities for ${usedSet.size} classes`);
  }
};

export const applyTheme = async (): Promise<void> => {
  try {
    if (isFirstRun()) {
      await initStyles();
    }

    const usedClasses = getUsedClasses();
    setClasses(usedClasses);

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
