import { onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { debounce, kebabCase } from "es-toolkit";
import {
  CACHE_STYLES_DIR,
  CSS_FILE,
  SRC_STYLES_DIR,
  UTILITIES_FILE,
  UTILITIES_JSON_FILE,
} from "@/constants";
import {
  exec,
  fileExists,
  generateColors,
  getUsedClasses,
  readFile,
  writeFile,
} from "@/utils";
import { getUtility } from "./generators";

// State
const state = {
  mappedWidgets: new Set<string>(),
  usedClasses: new Set<string>(),
  utilitySections: [] as string[],
  isApplying: false,
  isInitialized: false,
  initPromise: null as Promise<void> | null,
};

const SCSS_HEADERS = [
  "/* Auto-generated utility classes */",
  '@use "mixins" as *;',
  '@use "colors" as *;',
  '@use "keyframes" as *;',
  '@use "colors-variations" as *;',
  "",
  "/* Utility classes */",
].join("\n");

// Utilities
const escapeClassName = (cls: string) => {
  const escaped = cls.replace(/[:.#/[\]]/g, "\\$&");
  return escaped + (cls.includes(":") ? `:${cls.split(":")[0]}` : "");
};

const generateUtilityScss = (cls: string) => {
  const utility = getUtility(cls);
  if (!utility) return null;
  return `.${escapeClassName(cls)} { ${utility.join("; ")}; }`;
};

const addUtilityClass = (cls: string) => {
  if (state.usedClasses.has(cls) || !getUtility(cls)) return false;

  state.usedClasses.add(cls);
  const scss = generateUtilityScss(cls);
  if (scss) state.utilitySections.push(scss);

  return true;
};

const writeUtilities = () => {
  writeFile(
    UTILITIES_FILE,
    `${SCSS_HEADERS}\n${state.utilitySections.join("\n")}`,
  );
  writeFile(UTILITIES_JSON_FILE, JSON.stringify([...state.usedClasses]));
  console.log(`✅ Generated utilities for ${state.usedClasses.size} classes`);
};

const loadCachedUtilities = () => {
  if (!fileExists(UTILITIES_JSON_FILE)) return;
  try {
    const cached: string[] = JSON.parse(readFile(UTILITIES_JSON_FILE));
    cached.forEach(addUtilityClass);
    console.log(`📦 Loaded ${state.usedClasses.size} cached utilities`);
    writeUtilities();
  } catch (error) {
    console.error("Failed to load cached utilities:", error);
  }
};

const compileAndApply = async () => {
  await exec(
    `sass ${CACHE_STYLES_DIR}/index.scss ${CSS_FILE} --load-path=${CACHE_STYLES_DIR}`,
  );
  app.apply_css(CSS_FILE, true);
};

const debouncedRecompile = debounce(async () => {
  if (!state.isApplying) await compileAndApply();
}, 100);

const initStyles = async () => {
  await generateColors();
  await exec(
    `cp -r ${SRC_STYLES_DIR}/. ${CACHE_STYLES_DIR} && chmod -R u+w ${CACHE_STYLES_DIR}`,
  );
  loadCachedUtilities();
  state.isInitialized = true;
  console.log("✅ Styles initialized");
};

const ensureInitialized = async () => {
  if (state.isInitialized) return;
  if (!state.initPromise) state.initPromise = initStyles();
  await state.initPromise;
};

export const setClasses = async (classes: string[], restart = false) => {
  await ensureInitialized();
  let hasNewClasses = false;

  for (const cls of classes) {
    if (addUtilityClass(cls)) hasNewClasses = true;
  }

  if (hasNewClasses) {
    writeUtilities();
    debouncedRecompile();
  }

  if (restart) applyTheme();
};

export const loadClasses = (component: { name: string }, name?: string) => {
  const kebabName = name || kebabCase(component.name);
  let isFirstRun = true;

  return (self: Gtk.Widget) => {
    const shouldRestart = isFirstRun && !state.mappedWidgets.has(kebabName);

    if (isFirstRun) {
      state.mappedWidgets.add(kebabName);
      isFirstRun = false;
    }

    setClasses(getUsedClasses(self), shouldRestart);

    const handler = self.connect("notify::css-classes", () =>
      setClasses(getUsedClasses(self)),
    );

    onCleanup(() => self.disconnect(handler));
  };
};

export const applyTheme = async () => {
  if (state.isApplying) return;
  state.isApplying = true;

  try {
    await ensureInitialized();
    await setClasses(getUsedClasses());
    await compileAndApply();
  } catch (error) {
    console.error("Failed to apply theme:", error);
  } finally {
    state.isApplying = false;
  }
};
