import type { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { compact, isString, range } from "es-toolkit";

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

export const generateUtilityClasses = (): Record<string, string[]> => {
  const utilities: Record<string, string[]> = {};

  const add = (key: string, val: string[]) => {
    utilities[key] = val;
  };

  const states = [
    "",
    "hover",
    "active",
    "focus",
    "disabled",
    "first-child",
    "last-child",
  ];

  const spacings = Object.fromEntries(
    range(193).map((i) => [
      String(i * 0.5),
      `${(i * 0.125).toFixed(3).replace(/\.?0+$/, "")}rem`,
    ]),
  );

  const opacities = range(21).map((i) => i * 5);

  const props = { p: "padding", m: "margin", w: "min-width", h: "min-height" };

  const dirs = {
    "": [""],
    x: ["left", "right"],
    y: ["top", "bottom"],
    t: ["top"],
    b: ["bottom"],
    l: ["left"],
    r: ["right"],
  };

  const colors = {
    transparent: "transparent",
    ...Object.fromEntries(
      ["background", "foreground", ...range(16).map((i) => `color-${i}`)].map(
        (c) => [c, `$${c.replace(/-/g, "")}`],
      ),
    ),
  };

  const colorProps = {
    bg: "background-color",
    text: "color",
    border: "border-color",
  };

  const colorVariants = {
    "": "",
    dark: "dark",
    darker: "darker",
    light: "light",
    lighter: "lighter",
  };

  const rounded = {
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
  };

  const roundedDirs = {
    "": [""],
    s: ["start-start", "end-start"],
    e: ["start-end", "end-end"],
    t: ["top-left", "top-right"],
    r: ["top-right", "bottom-right"],
    b: ["bottom-left", "bottom-right"],
    l: ["top-left", "bottom-left"],
  };

  const weights = {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  };

  const sizes = {
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
  };

  const filters = [
    "blur",
    "brightness",
    "contrast",
    "grayscale",
    "invert",
    "saturate",
    "sepia",
  ];

  const blurSizes = {
    "2xs": 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    "2xl": 40,
    "3xl": 64,
  };

  const addWithOpacity = (base: string, prop: string, color: string) => {
    add(base, [`${prop}: ${color}`]);
    opacities.forEach((o) => {
      add(`${base}/${o}`, [`${prop}: rgba(${color}, ${o}%)`]);
      add(`opacity-${o}`, [`opacity: ${o}%`]);
    });
  };

  states.forEach((s) => {
    const px = s ? `${s}:` : "";

    // Colors
    Object.entries(colors).forEach(([c, cv]) => {
      Object.entries(colorProps).forEach(([n, prop]) => {
        Object.entries(colorVariants).forEach(([v, suffix]) => {
          const cls = `${px}${n}-${c}${v ? `-${v}` : ""}`;
          const val = `${cv}${suffix ? `_${suffix}` : ""}`;
          addWithOpacity(cls, prop, val);
        });
      });
    });

    // Spacing & dimensions
    Object.entries(props).forEach(([n, prop]) => {
      Object.entries(spacings).forEach(([k, v]) => {
        if (["w", "h"].includes(n)) {
          add(`${px}${n}-${k}`, [`${prop}: ${v}`]);
        } else {
          Object.entries(dirs).forEach(([d, parts]) => {
            add(
              `${px}${n}${d}-${k}`,
              parts.map((p) => `${prop}${p ? `-${p}` : ""}: ${v}`),
            );
          });
        }
      });
    });

    // Rounded
    Object.entries(rounded).forEach(([n, v]) => {
      Object.entries(roundedDirs).forEach(([d, dv]) => {
        add(
          `${px}rounded${d ? `-${d}` : ""}-${n}`,
          dv.map((dr) => `border${dr ? `-${dr}` : ""}-radius: ${v}rem`),
        );
      });
    });

    // Font weight
    Object.entries(weights).forEach(([n, v]) => {
      add(`${px}font-${n}`, [`font-weight: ${v}`]);
    });

    // Font size
    Object.entries(sizes).forEach(([n, sz]) => {
      add(`${px}text-${n}`, [`font-size: ${sz}rem`]);
    });

    // Borders
    range(8).forEach((i) => {
      Object.entries(dirs).forEach(([d, parts]) => {
        add(`${px}border${d ? `-${d}` : ""}-${i}`, [
          ...parts.map((p) => `border${p ? `-${p}` : ""}-width: ${i}px`),
          "border-style: solid",
        ]);
      });
    });

    ["solid", "dashed", "dotted", "none"].forEach((style) => {
      add(`${px}border-${style}`, [`border-style: ${style}`]);
    });

    // Filters
    filters.forEach((f) => {
      if (["grayscale", "invert", "sepia"].includes(f))
        add(`${px}${f}`, [`filter: ${f}(100%)`]);

      if (f === "blur") {
        Object.entries(blurSizes).forEach(([n, v]) => {
          add(`${px}blur-${n}`, [`filter: blur(${v}px)`]);
        });
      }

      range(100).forEach((i) => {
        add(`${px}${f}-${i}`, [`filter: ${f}(${i}%)`]);
      });
    });
  });

  return utilities;
};

export const cls = (...items: Array<string | boolean>): string =>
  compact(items).join(" ");

export const extractAllClasses = (
  ...items: Array<string | boolean>
): string[] => {
  return items
    .filter(isString)
    .flatMap((str) => str.split(" "))
    .filter(Boolean);
};
