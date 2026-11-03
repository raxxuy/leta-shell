import { debounce } from "es-toolkit";
import { agsPlugin } from "tailwind2gtk/plugins/ags";

import {
  CACHE_SCSS_UTILITIES_JSON,
  CACHE_SCSS_UTILITIES_SCSS,
  SRC_TAILWIND_EXTEND_CSS,
} from "./constants";
import { compileCss } from "./css";

export const { scan, cleanupWidget } = agsPlugin({
  jsonPath: CACHE_SCSS_UTILITIES_JSON,
  cssPath: CACHE_SCSS_UTILITIES_SCSS,
  extendPath: SRC_TAILWIND_EXTEND_CSS,
  onCacheUpdate: debounce(compileCss, 100),
});
