import { CACHE_DIR, SRC } from "@/constants";
import { buildPath } from "@/lib/fs";

export const SRC_SCSS_DIR = buildPath(SRC, "scss");
export const CACHE_SCSS_DIR = buildPath(CACHE_DIR, "scss");

export const SRC_COLORS_SCSS = buildPath(SRC_SCSS_DIR, "colors.scss");
export const CACHE_COLORS_SCSS = buildPath(CACHE_SCSS_DIR, "colors.scss");

export const CACHE_SCSS_UTILITIES_JSON = buildPath(
  CACHE_SCSS_DIR,
  "utilities.json",
);

export const CACHE_SCSS_UTILITIES_SCSS = buildPath(
  CACHE_SCSS_DIR,
  "utilities.scss",
);

export const SRC_TAILWIND_EXTEND_CSS = buildPath(SRC, "tailwind.extend.css");
