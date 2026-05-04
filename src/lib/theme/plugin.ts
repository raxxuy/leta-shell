import { debounce } from "es-toolkit";
import { agsPlugin } from "tailwind2gtk/plugins/ags";
import {
  CACHE_COLORS_FILE,
  CACHE_UTILITIES_FILE,
  CACHE_UTILITIES_JSON_FILE,
  SRC_TAILWIND_FILE,
} from "@/constants";
import { compileCss } from "./apply";

const debouncedCompileCss = debounce(() => compileCss(), 100);

export const { scan, setup } = agsPlugin({
  jsonPath: CACHE_UTILITIES_JSON_FILE,
  cssPath: CACHE_UTILITIES_FILE,
  themePath: PROD ? undefined : SRC_TAILWIND_FILE,
  resolveVarsFrom: CACHE_COLORS_FILE,
  onCacheUpdate: () => {
    debouncedCompileCss();
  },
  tailwindConfig: {
    theme: {
      // spacing: "",
      colors: {
        primary: "var(--primary)",
        tertiary: "var(--tertiary)",
      },
      keyframes: {
        "bounce-in": {
          "0%": {
            transform: "scale(0)",
            opacity: "0",
          },
          "80%": {
            transform: "scale(1.05)",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
      },
      animation: {
        "bounce-in":
          "bounce-in 250ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      },
    },
  },
});
