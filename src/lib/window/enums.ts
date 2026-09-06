import {
  WindowAnchor,
  Exclusivity as WindowExclusivity,
  Keymode as WindowKeymode,
  Layer as WindowLayer,
} from "@/enums";
import { defineEnum } from "../enum";

const {
  NONE,
  TOP: TOP_ANCHOR,
  LEFT,
  RIGHT,
  BOTTOM: BOTTOM_ANCHOR,
} = WindowAnchor;

const { NORMAL, IGNORE, EXCLUSIVE } = WindowExclusivity;

const {
  NONE: NONE_MODE,
  EXCLUSIVE: EXCLUSIVE_MODE,
  ON_DEMAND: ON_DEMAND_MODE,
} = WindowKeymode;

const {
  BACKGROUND,
  BOTTOM: BOTTOM_LAYER,
  TOP: TOP_LAYER,
  OVERLAY,
} = WindowLayer;

export const anchor = defineEnum(
  {
    none: NONE,
    top: TOP_ANCHOR,
    left: LEFT,
    right: RIGHT,
    bottom: BOTTOM_ANCHOR,
    "top-left": TOP_ANCHOR | LEFT,
    "top-right": TOP_ANCHOR | RIGHT,
    "bottom-left": BOTTOM_ANCHOR | LEFT,
    "bottom-right": BOTTOM_ANCHOR | RIGHT,
    "top-full": TOP_ANCHOR | LEFT | RIGHT,
    "bottom-full": BOTTOM_ANCHOR | LEFT | RIGHT,
    center: LEFT | RIGHT | TOP_ANCHOR | BOTTOM_ANCHOR,
    "center-inline": LEFT | RIGHT,
  },
  "none",
);

export const exclusivity = defineEnum(
  {
    normal: NORMAL,
    ignore: IGNORE,
    exclusive: EXCLUSIVE,
  },
  "normal",
);

export const keymode = defineEnum(
  {
    none: NONE_MODE,
    exclusive: EXCLUSIVE_MODE,
    "on-demand": ON_DEMAND_MODE,
  },
  "none",
);

export const layer = defineEnum(
  {
    background: BACKGROUND,
    bottom: BOTTOM_LAYER,
    top: TOP_LAYER,
    overlay: OVERLAY,
  },
  "top",
);

export type Anchor = keyof typeof anchor.values;
export type Exclusivity = keyof typeof exclusivity.values;
export type Keymode = keyof typeof keymode.values;
export type Layer = keyof typeof layer.values;
