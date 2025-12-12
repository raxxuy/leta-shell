import type { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";

export const getUsedClasses = (): string[] => {
  const classes = new Set<string>();
  const windows = app.windows;

  windows.forEach((window) => {
    const traverse = (widget: Gtk.Widget) => {
      widget.get_css_classes().forEach((cls) => {
        classes.add(cls);
      });

      const children = widget.observe_children();
      for (let i = 0; i < children.get_n_items(); i++) {
        const child = children.get_item(i);
        if (child) traverse(child as Gtk.Widget);
      }
    };

    traverse(window);
  });

  return Array.from(classes);
};

export const generateUtilityClasses = (): Record<string, string[]> => {
  const utilities: Record<string, string[]> = {};

  const states = ["", "hover", "active", "focus", "disabled"];

  const spacings = Object.fromEntries(
    Array.from({ length: 193 }, (_, i) => {
      const val = i * 0.125;
      return [String(i * 0.5), `${val.toFixed(3).replace(/\.?0+$/, "")}rem`];
    }),
  );

  const opacities = Array.from({ length: 21 }, (_, i) => i * 5);

  const namings = {
    p: "padding",
    m: "margin",
    w: "min-width",
    h: "min-height",
  };

  const directions = {
    "": [""],
    x: ["left", "right"],
    y: ["top", "bottom"],
    t: ["top"],
    b: ["bottom"],
    l: ["left"],
    r: ["right"],
  };

  const colors = Object.fromEntries(
    [
      "background",
      "foreground",
      ...Array.from({ length: 16 }, (_, i) => `color-${i}`),
    ].map((c) => [c, `$${c.replace("-", "")}`]),
  );

  const colorNamings = {
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

  const roundedNamings = {
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

  const roundedDirections = {
    "": [""],
    s: ["start-start", "end-start"],
    e: ["start-end", "end-end"],
    t: ["top-left", "top-right"],
    r: ["top-right", "bottom-right"],
    b: ["bottom-left", "bottom-right"],
    l: ["top-left", "bottom-left"],
  };

  const weightNamings = {
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

  const sizeNamings: Record<string, number> = {
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

  const add = (key: string, val: string[]) => {
    utilities[key] = val;
  };

  states.forEach((s) => {
    const prefix = s ? `${s}:` : "";

    // Colors
    Object.keys(colors).forEach((c) => {
      Object.entries(colorNamings).forEach(([n, prop]) => {
        Object.entries(colorVariants).forEach(([v, suffix]) => {
          add(`${prefix}${n}-${c}${v ? `-${v}` : ""}`, [
            `${prop}: ${colors[c]}${suffix ? `_${suffix}` : ""}`,
          ]);

          opacities.forEach((opacity) => {
            add(`${prefix}${n}-${c}${v ? `-${v}` : ""}/${opacity}`, [
              `${prop}: rgba(${colors[c]}${suffix ? `_${suffix}` : ""}, ${opacity}%)`,
            ]);
          });
        });
      });
    });

    // Spacing & dimensions
    Object.entries(namings).forEach(([n, prop]) => {
      Object.entries(spacings).forEach(([k, v]) => {
        if (["w", "h"].includes(n)) {
          add(`${prefix}${n}-${k}`, [`${prop}: ${v}`]);
        } else {
          Object.entries(directions).forEach(([d, parts]) => {
            add(
              `${prefix}${n}${d}-${k}`,
              parts.map((p) => `${prop}${p ? `-${p}` : ""}: ${v}`),
            );
          });
        }
      });
    });

    // Rounded
    Object.entries(roundedNamings).forEach(([n, v]) => {
      Object.entries(roundedDirections).forEach(([d, dv]) => {
        add(
          `${prefix}rounded${d ? `-${d}` : ""}-${n}`,
          dv.map((dr) => `border${dr ? `-${dr}` : ""}-radius: ${v}rem`),
        );
      });
    });

    // Font weight
    Object.entries(weightNamings).forEach(([n, v]) => {
      add(`${prefix}font-${n}`, [`font-weight: ${v}`]);
    });

    // Text size
    Object.entries(sizeNamings).forEach(([n, size]) => {
      add(`${prefix}text-${n}`, [`font-size: ${size}rem`]);
    });

    // Borders
    Array.from({ length: 8 }, (_, i) =>
      Object.entries(directions).forEach(([d, parts]) => {
        add(
          `${prefix}border${d ? `-${d}` : ""}-${i}`,
          parts
            .map((p) => `border${p ? `-${p}` : ""}-width: ${i}px`)
            .concat(["border-style: solid"]),
        );
      }),
    );

    ["solid", "dashed", "dotted", "none"].forEach((style) => {
      add(`${prefix}border-${style}`, [`border-style: ${style}`]);
    });
  });

  return utilities;
};

export const cls = (...items: Array<string | boolean>): string =>
  items.filter(Boolean).join(" ");
