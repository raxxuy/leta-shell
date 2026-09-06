import { debounce } from "es-toolkit";
import { agsPlugin } from "tailwind2gtk/plugins/ags";

import {
  CACHE_UTILITIES_FILE,
  CACHE_UTILITIES_JSON_FILE,
  SRC_TAILWIND_EXTEND_FILE,
  SRC_TAILWIND_FILE,
} from "@/constants";
import { compileCss } from "./apply";

const debouncedCompileCss = debounce(() => compileCss(), 100);

export const { scan, cleanupWidget } = agsPlugin({
  jsonPath: CACHE_UTILITIES_JSON_FILE,
  cssPath: CACHE_UTILITIES_FILE,
  themePath: ENV === "dev" ? SRC_TAILWIND_FILE : undefined,
  extendPath: SRC_TAILWIND_EXTEND_FILE,
  onCacheUpdate: () => debouncedCompileCss(),
});
