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
  onCacheUpdate: () => debouncedCompileCss(),
  tailwindConfig: {
    theme: {
      apply: {
        "bar-popover":
          "m-[5px_10px_15px] mt-4 rounded-2xl border border-tertiary/20 bg-zinc-950/95 p-6 shadow-md",
        "bar-tray-item": [
          "checked:[&_popover_scrolledwindow]:animate-spring-in",
          "[&_popover]:[transition-property:transform,translate,scale,rotate]",
          "[&_popover_scrolledwindow]:m-[5px_10px_15px] [&_popover_scrolledwindow]:rounded-2xl [&_popover_scrolledwindow]:border [&_popover_scrolledwindow]:border-solid [&_popover_scrolledwindow]:border-tertiary/20 [&_popover_scrolledwindow]:bg-zinc-950/95 [&_popover_scrolledwindow]:p-4 [&_popover_scrolledwindow]:pb-2 [&_popover_scrolledwindow]:shadow-md",
          "[&_popover_scrolledwindow_box>modelbutton]:rounded-lg [&_popover_scrolledwindow_box>modelbutton]:px-2 [&_popover_scrolledwindow_box>modelbutton]:py-1 [&_popover_scrolledwindow_box>modelbutton]:transition-colors [&_popover_scrolledwindow_box>modelbutton]:mb-2",
          "[&_popover_scrolledwindow_box>modelbutton]:hover:bg-white/10 [&_popover_scrolledwindow_box>modelbutton]:focus:bg-white/10 [&_popover_scrolledwindow_box>modelbutton]:active:bg-white/15",
          "[&_popover_scrolledwindow_box>modelbutton>label]:text-zinc-100 [&_popover_scrolledwindow_box>modelbutton>label]:disabled:text-zinc-400",
        ],
        "bar-menubutton":
          "min-h-6.5 min-w-6.5 rounded-lg transition-colors checked:bg-white/20 hover:bg-white/15 active:bg-white/20",
        "bar-endpoint-slider": [
          "rounded-full bg-white/12",
          "[&_highlight]:rounded-full [&_highlight]:bg-white/95",
          "[&_slider:hover]:-my-0.5 [&_slider:hover]:min-h-[0.7rem] [&_slider:hover]:min-w-[0.7rem] [&_slider]:-my-px [&_slider]:min-h-2 [&_slider]:min-w-2 [&_slider]:rounded-full [&_slider]:bg-white",
          "active:[&_slider]:-my-0.5 active:[&_slider]:min-h-[0.7rem] active:[&_slider]:min-w-[0.7rem]",
        ],
        "bar-switch": [
          "min-h-4 min-w-8 rounded-full bg-white/15 p-0.5 transition-colors duration-200 checked:bg-primary/90",
          "[&>slider]:min-h-3.5 [&>slider]:min-w-3.5 [&>slider]:rounded-full [&>slider]:bg-white [&>slider]:shadow-sm",
        ],
        "bar-container":
          "border border-tertiary/20 bg-zinc-950/95 px-4 shadow-md animate-spring-in",
        "button-outline-custom":
          "rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 transition-colors hover:bg-white/10 active:bg-white/15 disabled:opacity-50",
        "menubutton-custom":
          "rounded-lg border border-white/10 transition-colors checked:bg-white/8 hover:bg-white/5 active:bg-white/8 [&>button]:px-4 [&>button]:py-1.5",
      },
      // spacing: "",``
      colors: {
        primary: "var(--primary)",
        tertiary: "var(--tertiary)",
      },
      keyframes: {
        "slide-up-fade": {
          "0%": {
            opacity: "0",
            transform: "translateY(8px) scale(0.98)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },

        "slide-down-fade": {
          "0%": {
            opacity: "0",
            transform: "translateY(-8px) scale(0.98)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },

        "spring-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)",
          },
          "60%": {
            opacity: "1",
            transform: "scale(1.03)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },

        "popover-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(4px) scale(0.96)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },

        "popover-out": {
          "0%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(4px) scale(0.96)",
          },
        },

        "workspace-focus": {
          "0%": {
            opacity: "0.6",
            transform: "scaleX(0.6)",
          },
          "100%": {
            opacity: "1",
            transform: "scaleX(1) scaleY(1.2)",
          },
        },

        emphasize: {
          "0%": {
            transform: "scale(1)",
          },
          "40%": {
            transform: "scale(1.08)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },

        breathe: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.04)",
          },
        },
      },

      animation: {
        "slide-up-fade":
          "slide-up-fade 180ms cubic-bezier(0.16, 1, 0.3, 1) forwards",

        "slide-down-fade":
          "slide-down-fade 180ms cubic-bezier(0.16, 1, 0.3, 1) forwards",

        "spring-in": "spring-in 300ms cubic-bezier(0.22, 1, 0.36, 1) forwards",

        "popover-in": "popover-in 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards",

        "popover-out": "popover-out 120ms ease-out forwards",

        "workspace-focus":
          "workspace-focus 250ms cubic-bezier(0.22, 1, 0.36, 1) forwards",

        emphasize: "emphasize 300ms cubic-bezier(0.2, 0, 0, 1) forwards",

        breathe: "breathe 2s ease-in-out infinite",
      },
    },
  },
});
