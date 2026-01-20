import type { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { range } from "es-toolkit";

export const getUsedClasses = (widget?: Gtk.Widget): string[] => {
  const classes = new Set<string>();

  const traverse = (w: Gtk.Widget) => {
    w.get_css_classes().forEach((cls) => {
      classes.add(cls);
    });

    const children = w.observe_children();

    range(children.get_n_items()).forEach((i) => {
      const child = children.get_item(i);
      if (child) traverse(child as Gtk.Widget);
    });
  };

  (widget ? [widget] : app.windows).forEach(traverse);
  return Array.from(classes);
};

/* Constants */

const STATES = [
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
] as const;

const SPACING_PROPS = {
  p: "padding",
  m: "margin",
  w: "min-width",
  h: "min-height",
} as const;

const DIRECTIONS = {
  "": [""],
  x: ["left", "right"],
  y: ["top", "bottom"],
  t: ["top"],
  b: ["bottom"],
  l: ["left"],
  r: ["right"],
} as const;

const COLORS = {
  transparent: "transparent",
  ...Object.fromEntries(
    ["background", "foreground", ...range(16).map((i) => `color-${i}`)].map(
      (c) => [c, `$${c.replace(/-/g, "")}`],
    ),
  ),
} as const;

const COLOR_PROPS = {
  bg: "background-color",
  text: "color",
  border: "border-color",
} as const;

const COLOR_VARIANTS = {
  "": "",
  dark: "dark",
  darker: "darker",
  light: "light",
  lighter: "lighter",
} as const;

const ROUNDED_SIZES = {
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

const ROUNDED_DIRS = {
  "": [""],
  s: ["start-start", "end-start"],
  e: ["start-end", "end-end"],
  t: ["top-left", "top-right"],
  r: ["top-right", "bottom-right"],
  b: ["bottom-left", "bottom-right"],
  l: ["top-left", "bottom-left"],
} as const;

const FONT_WEIGHTS = {
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

const FONT_SIZES = {
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

// const FILTERS = [
//   "blur",
//   "brightness",
//   "contrast",
//   "grayscale",
//   "invert",
//   "saturate",
//   "sepia",
// ];

const BLUR_SIZES = {
  "2xs": 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 40,
  "3xl": 64,
} as const;

const BORDER_STYLES = ["solid", "dashed", "dotted", "none"];

const ANIMATIONS = {
  spin: "spin 1s linear infinite",
  ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
  pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  bounce: "bounce 1s infinite",
} as const;

const TRANSITION_PROPERTIES = {
  none: "none",
  all: "all",
  colors: "color, background-color, border-color",
  opacity: "opacity",
  shadow: "box-shadow",
} as const;

const TRANSITION_TIMINGS = {
  linear: "linear",
  in: "ease-in",
  out: "ease-out",
  "in-out": "ease-in-out",
} as const;

/* Utility generators */

type UtilityMap = Record<string, string[]>;

const utilities: UtilityMap = {};

const parseState = (className: string): [string, string] => {
  for (const state of STATES.slice(1)) {
    if (className.startsWith(`${state}:`)) {
      return [state, className.slice(state.length + 1)];
    }
  }
  return ["", className];
};

const generateSpacing = (cls: string): string[] | null => {
  // Match arbitrary values: w-[64px], p-[2.5rem], m-[10%]
  const arbitraryMatch = cls.match(/^([pmwh])([xytrbl])?-\[(.+)\]$/);

  if (arbitraryMatch) {
    const [, prop, dir = "", value] = arbitraryMatch;
    const cssProp = SPACING_PROPS[prop as keyof typeof SPACING_PROPS];

    if (["w", "h"].includes(prop)) {
      return [`${cssProp}: ${value}`];
    } else {
      const parts = DIRECTIONS[dir as keyof typeof DIRECTIONS] || [""];
      return parts.map((p) => `${cssProp}${p ? `-${p}` : ""}: ${value}`);
    }
  }

  // Match regular values: p-4, m-2.5, w-64
  const match = cls.match(/^([pmwh])([xytrbl])?-([\d.]+)$/);

  if (!match) return null;

  const [, prop, dir = "", value] = match;
  const numValue = parseFloat(value);

  if (Number.isNaN(numValue) || numValue < 0) return null;

  const remValue = (numValue * 0.25).toFixed(3).replace(/\.?0+$/, "");
  const cssProp = SPACING_PROPS[prop as keyof typeof SPACING_PROPS];

  if (["w", "h"].includes(prop)) {
    return [`${cssProp}: ${remValue}rem`];
  } else {
    const parts = DIRECTIONS[dir as keyof typeof DIRECTIONS] || [""];
    return parts.map((p) => `${cssProp}${p ? `-${p}` : ""}: ${remValue}rem`);
  }
};

const generateColor = (cls: string): string[] | null => {
  const match = cls.match(
    /^(bg|text|border)-([a-z0-9-]+?)(-(?:dark|darker|light|lighter))?(\/(\d+))?$/,
  );

  if (!match) return null;

  const [, propKey, colorName, variant = "", , opacity] = match;
  const color = COLORS[colorName as keyof typeof COLORS];
  const prop = COLOR_PROPS[propKey as keyof typeof COLOR_PROPS];

  if (!color || !prop) return null;

  const variantKey = variant.slice(1) as keyof typeof COLOR_VARIANTS;
  const variantSuffix = COLOR_VARIANTS[variantKey] || COLOR_VARIANTS[""];
  const colorValue = `${color}${variantSuffix ? `_${variantSuffix}` : ""}`;

  if (opacity) {
    const opacityVal = parseInt(opacity, 10);

    if (opacityVal >= 0 && opacityVal <= 100) {
      return [`${prop}: rgba(${colorValue}, ${opacityVal}%)`];
    }

    return null;
  }

  return [`${prop}: ${colorValue}`];
};

const generateRounded = (cls: string): string[] | null => {
  // Match arbitrary values: rounded-[12px], rounded-t-[0.5rem]
  const arbitraryMatch = cls.match(/^rounded(?:-([setrbl]))?-\[(.+)\]$/);

  if (arbitraryMatch) {
    const [, dir = "", value] = arbitraryMatch;
    const parts = ROUNDED_DIRS[dir as keyof typeof ROUNDED_DIRS] || [""];
    return parts.map((dr) => `border${dr ? `-${dr}` : ""}-radius: ${value}`);
  }

  // Match regular values: rounded, rounded-lg, rounded-t-xl
  const match = cls.match(/^rounded(?:-([setrbl]))?(?:-(.+))?$/);

  if (!match) return null;

  const [, dir = "", size = ""] = match;
  const sizeValue = size
    ? ROUNDED_SIZES[size as keyof typeof ROUNDED_SIZES]
    : 0.5;

  if (sizeValue === undefined) return null;

  const parts = ROUNDED_DIRS[dir as keyof typeof ROUNDED_DIRS] || [""];
  return parts.map(
    (dr) => `border${dr ? `-${dr}` : ""}-radius: ${sizeValue}rem`,
  );
};

const generateTypography = (cls: string): string[] | null => {
  const weightMatch = cls.match(/^font-(.+)$/);

  if (weightMatch) {
    const weight = FONT_WEIGHTS[weightMatch[1] as keyof typeof FONT_WEIGHTS];
    if (weight !== undefined) return [`font-weight: ${weight}`];
  }

  const sizeMatch = cls.match(/^text-(.+)$/);

  if (sizeMatch) {
    const size = FONT_SIZES[sizeMatch[1] as keyof typeof FONT_SIZES];
    if (size !== undefined) return [`font-size: ${size}rem`];
  }

  return null;
};

const generateOpacity = (cls: string): string[] | null => {
  // Match arbitrary values: opacity-[0.73]
  const arbitraryMatch = cls.match(/^opacity-\[(.+)\]$/);

  if (arbitraryMatch) {
    return [`opacity: ${arbitraryMatch[1]}`];
  }

  // Match regular values: opacity-50
  const match = cls.match(/^opacity-(\d+)$/);

  if (!match) return null;

  const opacity = parseInt(match[1], 10);

  if (opacity >= 0 && opacity <= 100) {
    return [`opacity: ${opacity}%`];
  }

  return null;
};

const generateBorder = (cls: string): string[] | null => {
  // Match border styles
  const styleMatch = cls.match(/^border-(.+)$/);

  if (styleMatch && BORDER_STYLES.includes(styleMatch[1])) {
    return [`border-style: ${styleMatch[1]}`];
  }

  // Match arbitrary values: border-[3px], border-x-[2px]
  const arbitraryMatch = cls.match(/^border(?:-([xytrbl]))?-\[(.+)\]$/);

  if (arbitraryMatch) {
    const [, dir = "", value] = arbitraryMatch;
    const parts = DIRECTIONS[dir as keyof typeof DIRECTIONS] || [""];
    return [
      ...parts.map((p) => `border${p ? `-${p}` : ""}-width: ${value}`),
      "border-style: solid",
    ];
  }

  // Match regular values: border-2, border-x-4
  const widthMatch = cls.match(/^border(?:-([xytrbl]))?-(\d+)$/);

  if (widthMatch) {
    const [, dir = "", width] = widthMatch;
    const parts = DIRECTIONS[dir as keyof typeof DIRECTIONS] || [""];
    const numWidth = parseInt(width, 10);

    if (numWidth >= 0) {
      return [
        ...parts.map((p) => `border${p ? `-${p}` : ""}-width: ${numWidth}px`),
        "border-style: solid",
      ];
    }
  }

  return null;
};

const generateFilter = (cls: string): string[] | null => {
  if (["grayscale", "invert", "sepia"].includes(cls)) {
    return [`filter: ${cls}(1)`];
  }

  const blurMatch = cls.match(/^blur-(.+)$/);

  if (blurMatch) {
    const size = BLUR_SIZES[blurMatch[1] as keyof typeof BLUR_SIZES];
    if (size !== undefined) return [`filter: blur(${size}px)`];
  }

  const filterMatch = cls.match(/^(brightness|contrast|saturate)-(\d+)$/);

  if (filterMatch) {
    const [, filter, value] = filterMatch;
    const numValue = parseInt(value, 10);

    if (numValue >= 0 && numValue <= 300) {
      return [`filter: ${filter}(${numValue}%)`];
    }
  }

  return null;
};

const generateAnimation = (cls: string): string[] | null => {
  // Match: animate-spin, animate-pulse, animate-none
  if (cls === "animate-none") {
    return ["animation: none"];
  }

  const match = cls.match(/^animate-(.+)$/);

  if (!match) return null;

  const animation = ANIMATIONS[match[1] as keyof typeof ANIMATIONS];

  if (animation) {
    return [`animation: ${animation}`];
  }

  return null;
};

const generateTransition = (cls: string): string[] | null => {
  // Match: transition, transition-none, transition-all, transition-colors
  if (cls === "transition") {
    return ["transition: all 150ms ease-in-out"];
  }

  const propertyMatch = cls.match(/^transition-(.+)$/);

  if (propertyMatch) {
    const prop =
      TRANSITION_PROPERTIES[
        propertyMatch[1] as keyof typeof TRANSITION_PROPERTIES
      ];
    if (prop) {
      return prop === "none"
        ? ["transition: none"]
        : [`transition: ${prop} 150ms ease-in-out`];
    }
  }

  // Match arbitrary: duration-[300ms], duration-[0.5s]
  const durationArbitraryMatch = cls.match(/^duration-\[(.+)\]$/);

  if (durationArbitraryMatch) {
    return [`transition-duration: ${durationArbitraryMatch[1]}`];
  }

  // Match numeric: duration-300, duration-500
  const durationMatch = cls.match(/^duration-(\d+)$/);

  if (durationMatch) {
    return [`transition-duration: ${durationMatch[1]}ms`];
  }

  // Match: ease-in, ease-out, ease-in-out, ease-linear
  const timingMatch = cls.match(/^ease-(.+)$/);

  if (timingMatch) {
    const timing =
      TRANSITION_TIMINGS[timingMatch[1] as keyof typeof TRANSITION_TIMINGS];
    if (timing) {
      return [`transition-timing-function: ${timing}`];
    }
  }

  // Match arbitrary: delay-[150ms], delay-[0.2s]
  const delayArbitraryMatch = cls.match(/^delay-\[(.+)\]$/);

  if (delayArbitraryMatch) {
    return [`transition-delay: ${delayArbitraryMatch[1]}`];
  }

  // Match numeric: delay-300, delay-500
  const delayMatch = cls.match(/^delay-(\d+)$/);

  if (delayMatch) {
    return [`transition-delay: ${delayMatch[1]}ms`];
  }

  return null;
};

const generateUtility = (className: string): string[] | null => {
  const [_, cls] = parseState(className);

  const generators = [
    generateSpacing,
    generateColor,
    generateRounded,
    generateTypography,
    generateOpacity,
    generateBorder,
    generateFilter,
    generateAnimation,
    generateTransition,
  ];

  for (const generator of generators) {
    const result = generator(cls);
    if (result) return result;
  }

  return null;
};

export const generateUtilityClasses = (): UtilityMap => {
  return utilities;
};

export const getUtility = (className: string): string[] | null => {
  if (utilities[className]) {
    return utilities[className];
  }

  const generated = generateUtility(className);

  if (generated) {
    utilities[className] = generated;
    return generated;
  }

  return null;
};
