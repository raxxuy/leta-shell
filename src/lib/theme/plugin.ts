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

export const { scan, cleanupWidget } = agsPlugin({
  jsonPath: CACHE_UTILITIES_JSON_FILE,
  cssPath: CACHE_UTILITIES_FILE,
  themePath: ENV === "dev" ? SRC_TAILWIND_FILE : undefined,
  resolveVarsFrom: CACHE_COLORS_FILE,
  onCacheUpdate: () => {
    debouncedCompileCss();
  },
  tailwindConfig: {
    theme: {
      apply: {
        "bar-popover":
          "m-[5px_10px_15px] mt-4 rounded-2xl border border-tertiary/20 bg-zinc-950/95 p-6 shadow-md",
        "bar-menubutton":
          "min-h-6.5 min-w-6.5 rounded-lg transition-colors checked:bg-zinc-700 hover:bg-zinc-800 active:bg-zinc-700",
        "bar-container":
          "border border-tertiary/20 bg-zinc-950/95 px-4 shadow-md",
      },
      // spacing: "",
      colors: {
        primary: "var(--primary)",
        tertiary: "var(--tertiary)",
      },
      keyframes: {
        "pop-in": {
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
        wobble: {
          "0%": {
            transform: "scale(1.05) skewY(5deg)",
          },
          "50%": {
            transform: "scale(0.95) skewY(-5deg)",
          },
          "100%": {
            transform: "scale(1) skewY(0deg)",
          },
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "scale-out": {
          "0%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(0.95)",
            opacity: "0",
          },
        },
      },
      animation: {
        "pop-in": "pop-in 250ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        wobble: "wobble 200ms ease-out forwards",
        "scale-in": "scale-in 100ms ease-out forwards",
        "scale-out": "scale-out 200ms ease-out forwards",
      },
    },
  },
});
