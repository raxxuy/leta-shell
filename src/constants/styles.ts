export const STATES = [
  "",
  "hover",
  "focus",
  "active",
  "checked",
  "disabled",
  "selected",
  "first-child",
  "last-child",
  "focus-within",
  "focus-visible",
] as const;

export const SPACING_PROPS = {
  p: "padding",
  m: "margin",
  w: "min-width",
  h: "min-height",
} as const;

export const DIRECTIONS = {
  "": [""],
  x: ["left", "right"],
  y: ["top", "bottom"],
  t: ["top"],
  b: ["bottom"],
  l: ["left"],
  r: ["right"],
} as const;

export const COLORS = {
  transparent: "transparent",
  ...Object.fromEntries(
    [
      "background",
      "error",
      "error-container",
      "inverse-on-surface",
      "inverse-primary",
      "inverse-surface",
      "on-background",
      "on-error",
      "on-error-container",
      "on-primary",
      "on-primary-container",
      "on-primary-fixed",
      "on-primary-fixed-variant",
      "on-secondary",
      "on-secondary-container",
      "on-secondary-fixed",
      "on-secondary-fixed-variant",
      "on-surface",
      "on-surface-variant",
      "on-tertiary",
      "on-tertiary-container",
      "on-tertiary-fixed",
      "on-tertiary-fixed-variant",
      "outline",
      "outline-variant",
      "primary",
      "primary-container",
      "primary-fixed",
      "primary-fixed-dim",
      "scrim",
      "secondary",
      "secondary-container",
      "secondary-fixed",
      "secondary-fixed-dim",
      "shadow",
      "source-color",
      "surface",
      "surface-bright",
      "surface-container",
      "surface-container-high",
      "surface-container-highest",
      "surface-container-low",
      "surface-container-lowest",
      "surface-dim",
      "surface-tint",
      "surface-variant",
      "tertiary",
      "tertiary-container",
      "tertiary-fixed",
      "tertiary-fixed-dim",
    ].map((c) => [c, `$${c.replace(/-/g, "_")}`]),
  ),
} as const;

export const COLOR_PROPS = {
  bg: "background-color",
  text: "color",
  border: "border-color",
  outline: "outline-color",
} as const;

export const COLOR_VARIANTS = {
  "": "",
  dark: "dark",
  darker: "darker",
  light: "light",
  lighter: "lighter",
} as const;

export const ROUNDED_SIZES = {
  none: 0,
  xs: 0.125,
  sm: 0.25,
  md: 0.375,
  lg: 0.5,
  xl: 0.75,
  "2xl": 1,
  "3xl": 1.5,
  "4xl": 2,
  full: 9999,
} as const;

export const ROUNDED_DIRS = {
  "": [""],
  s: ["start-start", "end-start"],
  e: ["start-end", "end-end"],
  t: ["top-left", "top-right"],
  r: ["top-right", "bottom-right"],
  b: ["bottom-left", "bottom-right"],
  l: ["top-left", "bottom-left"],
} as const;

export const BORDER_STYLES = [
  "none",
  "hidden",
  "dotted",
  "dashed",
  "solid",
  "double",
  "groove",
  "ridge",
  "inset",
  "outset",
] as const;

export const OUTLINE_STYLES = ["solid", "dashed", "dotted", "none"] as const;

export const FONT_WEIGHTS = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

export const FONT_SIZES = {
  xs: 0.75,
  sm: 0.875,
  base: 1,
  lg: 1.125,
  xl: 1.25,
  "2xl": 1.5,
  "3xl": 1.875,
  "4xl": 2.25,
  "5xl": 3,
  "6xl": 3.75,
  "7xl": 4.5,
  "8xl": 6,
  "9xl": 8,
} as const;

export const FILTERS = [
  "blur",
  "brightness",
  "contrast",
  "drop-shadow",
  "grayscale",
  "invert",
  "saturate",
  "sepia",
] as const;

export const BLUR_SIZES = {
  none: 0,
  "2xs": 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 40,
  "3xl": 64,
} as const;

export const SHADOW_SIZES = {
  "2xs": "0 0 0.125rem 0.075rem rgba(0, 0, 0, 0.3)",
  xs: "0 0 0.25rem 0.15rem rgba(0, 0, 0, 0.3)",
  sm: "0 0 0.375rem 0.225rem rgba(0, 0, 0, 0.3)",
  md: "0 0 0.5rem 0.3rem rgba(0, 0, 0, 0.3)",
  lg: "0 0 0.75rem 0.45rem rgba(0, 0, 0, 0.3)",
  xl: "0 0 1rem 0.6rem rgba(0, 0, 0, 0.3)",
  "2xl": "0 0 1.5rem 0.9rem rgba(0, 0, 0, 0.3)",
  inner: "inset 0 0 0.5rem 0.3rem rgba(0, 0, 0, 0.3)",
  none: "none",
} as const;

export const ANIMATIONS = {
  spin: "spin 1s linear infinite",
  ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
  pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  bounce: "bounce 1s cubic-bezier(0.8, 0, 1, 1) infinite",
} as const;

export const TRANSITION_PROPERTIES = {
  none: "none",
  all: "all",
  colors: "color, background-color, border-color",
  opacity: "opacity",
  shadow: "box-shadow",
} as const;

export const TRANSITION_TIMINGS = {
  linear: "linear",
  in: "ease-in",
  out: "ease-out",
  "in-out": "ease-in-out",
} as const;
