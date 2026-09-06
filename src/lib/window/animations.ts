export const animations = {
  popover: {
    enter: "popover-in",
    exit: "popover-out",
  },
  none: {
    enter: "none",
    exit: "none",
  },
} as const;

export type AnimationKey = keyof typeof animations;
export type Animation = (typeof animations)[AnimationKey];
