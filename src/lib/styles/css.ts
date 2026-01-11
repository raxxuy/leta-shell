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
  "active",
  "focus",
  "disabled",
  "first-child",
  "last-child",
];

const SPACINGS = Object.fromEntries(
  range(193).map((i) => [
    String(i * 0.5),
    `${(i * 0.125).toFixed(3).replace(/\.?0+$/, "")}rem`,
  ]),
);

const OPACITIES = range(21).map((i) => i * 5);

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
};

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
  "": 0.5,
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

const FILTERS = [
  "blur",
  "brightness",
  "contrast",
  "grayscale",
  "invert",
  "saturate",
  "sepia",
];

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

/* Utility generators */

type UtilityMap = Record<string, string[]>;

class UtilityBuilder {
  private utilities: UtilityMap = {};

  add(key: string, val: string[]): void {
    this.utilities[key] = val;
  }

  addWithOpacity(base: string, prop: string, color: string): void {
    this.add(base, [`${prop}: ${color}`]);
    OPACITIES.forEach((o) => {
      this.add(`${base}/${o}`, [`${prop}: rgba(${color}, ${o}%)`]);
    });
  }

  getUtilities(): UtilityMap {
    return this.utilities;
  }
}

const generateColors = (builder: UtilityBuilder, prefix: string): void => {
  Object.entries(COLORS).forEach(([c, cv]) => {
    Object.entries(COLOR_PROPS).forEach(([n, prop]) => {
      Object.entries(COLOR_VARIANTS).forEach(([v, suffix]) => {
        const cls = `${prefix}${n}-${c}${v ? `-${v}` : ""}`;
        const val = `${cv}${suffix ? `_${suffix}` : ""}`;
        builder.addWithOpacity(cls, prop, val);
      });
    });
  });
};

const generateSpacing = (builder: UtilityBuilder, prefix: string): void => {
  Object.entries(SPACING_PROPS).forEach(([n, prop]) => {
    Object.entries(SPACINGS).forEach(([k, v]) => {
      if (["w", "h"].includes(n)) {
        builder.add(`${prefix}${n}-${k}`, [`${prop}: ${v}`]);
      } else {
        Object.entries(DIRECTIONS).forEach(([d, parts]) => {
          builder.add(
            `${prefix}${n}${d}-${k}`,
            parts.map((p) => `${prop}${p ? `-${p}` : ""}: ${v}`),
          );
        });
      }
    });
  });
};

const generateRounded = (builder: UtilityBuilder, prefix: string): void => {
  Object.entries(ROUNDED_SIZES).forEach(([n, v]) => {
    Object.entries(ROUNDED_DIRS).forEach(([d, dv]) => {
      builder.add(
        `${prefix}rounded${d ? `-${d}` : ""}-${n}`,
        dv.map((dr) => `border${dr ? `-${dr}` : ""}-radius: ${v}rem`),
      );
    });
  });
};

const generateTypography = (builder: UtilityBuilder, prefix: string): void => {
  Object.entries(FONT_WEIGHTS).forEach(([n, v]) => {
    builder.add(`${prefix}font-${n}`, [`font-weight: ${v}`]);
  });

  Object.entries(FONT_SIZES).forEach(([n, sz]) => {
    builder.add(`${prefix}text-${n}`, [`font-size: ${sz}rem`]);
  });
};

const generateBorders = (builder: UtilityBuilder, prefix: string): void => {
  range(16).forEach((i) => {
    Object.entries(DIRECTIONS).forEach(([d, parts]) => {
      builder.add(`${prefix}border${d ? `-${d}` : ""}-${i}`, [
        ...parts.map((p) => `border${p ? `-${p}` : ""}-width: ${i}px`),
        "border-style: solid",
      ]);
    });
  });

  BORDER_STYLES.forEach((style) => {
    builder.add(`${prefix}border-${style}`, [`border-style: ${style}`]);
  });
};

const generateFilters = (builder: UtilityBuilder, prefix: string): void => {
  FILTERS.forEach((f) => {
    if (["grayscale", "invert", "sepia"].includes(f)) {
      builder.add(`${prefix}${f}`, [`filter: ${f}(1)`]);
    }

    if (f === "blur") {
      Object.entries(BLUR_SIZES).forEach(([n, v]) => {
        builder.add(`${prefix}blur-${n}`, [`filter: blur(${v}px)`]);
      });
    } else {
      range(100).forEach((i) => {
        builder.add(`${prefix}${f}-${i}`, [`filter: ${f}(${i}%)`]);
      });
    }
  });
};

const generateOpacities = (builder: UtilityBuilder, prefix: string): void => {
  OPACITIES.forEach((o) => {
    builder.add(`${prefix}opacity-${o}`, [`opacity: ${o}%`]);
  });
};

export const generateUtilityClasses = (): UtilityMap => {
  const builder = new UtilityBuilder();

  STATES.forEach((state) => {
    const prefix = state ? `${state}:` : "";

    generateColors(builder, prefix);
    generateSpacing(builder, prefix);
    generateRounded(builder, prefix);
    generateTypography(builder, prefix);
    generateBorders(builder, prefix);
    generateFilters(builder, prefix);
    generateOpacities(builder, prefix);
  });

  return builder.getUtilities();
};
