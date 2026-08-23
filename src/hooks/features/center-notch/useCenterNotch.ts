import { createMemo } from "ags";
import clsx from "clsx/lite";
import { BarConfigContext } from "@/contexts/BarConfig";
import { CenterNotchContext } from "@/contexts/CenterNotch";
import {
  type CenterNotchMode,
  CenterNotchModeEnum,
} from "@/lib/config/schemas/bar/modules/center-notch";

export const useCenterNotch = () => {
  const {
    position: [position],
    centerNotchMode: [mode, setMode],
  } = BarConfigContext.use();
  const {
    open,
    setOpen,
    hovered,
    setHovered,
    dragging,
    setDragging,
    transitioning,
    setTransitioning,
  } = CenterNotchContext.use();

  const modes = CenterNotchModeEnum.options;

  const cycle = (direction: "next" | "prev") => {
    const currentIndex = modes.indexOf(mode.peek());
    const nextIndex =
      ((direction === "next" ? currentIndex + 1 : currentIndex - 1) +
        modes.length) %
      modes.length;

    setTransitioning(direction);
    setMode(modes[nextIndex]);
    setTimeout(() => setTransitioning(null), 200);
  };

  let prev = false;

  const className = createMemo(() => {
    const o = open();

    const justClosed = prev === true && o === false;
    prev = o;

    return clsx(
      "my-1 rounded-lg bg-zinc-950/95 px-4 py-2 transition-all hover:px-6 shadow-lg",
      o
        ? `scale-[0.001] shadow-none ${position() === "top" ? "-mt-8" : "-mb-8"} duration-100 opacity-0`
        : clsx(
            "scale-100 duration-200",
            justClosed && "animate-wobble duration-300",
          ),
    );
  });

  const modeClassName = (m: CenterNotchMode) =>
    createMemo(() => {
      const t = transitioning();
      const active = mode() === m;

      return clsx(
        "min-w-56",
        !dragging() && "transition-all duration-300",
        t
          ? active
            ? t === "next"
              ? "animate-slide-in-right"
              : "animate-slide-in-left"
            : t === "next"
              ? "animate-slide-out-left"
              : "animate-slide-out-right"
          : active
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-0",
      );
    });

  return {
    open,
    setOpen,
    hovered,
    setHovered,
    dragging,
    setDragging,
    transitioning,
    mode,
    setMode,
    modes,
    cycle,
    className,
    modeClassName,
  };
};
