import { createMemo } from "ags";
import clsx from "clsx/lite";
import { BarConfigContext } from "@/contexts/BarConfigContext";
import { CenterNotchContext } from "@/contexts/CenterNotchContext";

export const useCenterNotch = () => {
  const {
    position: [position],
    centerNotchMode: [, setCenterNotchMode],
  } = BarConfigContext.use();
  const { open, setOpen, hovered, setHovered, mode, modes } =
    CenterNotchContext.use();

  const cycle = (direction: "next" | "prev") => {
    const currentIndex = modes.indexOf(mode.peek());
    const nextIndex =
      (direction === "next" ? currentIndex + 1 : currentIndex - 1) %
      modes.length;
    setCenterNotchMode(modes[nextIndex]);
  };

  let prev = false;

  const className = createMemo(() => {
    const o = open();

    const justClosed = prev === true && o === false;
    prev = o;

    return clsx(
      "my-1 rounded-lg transform-cpu bg-zinc-950/95 px-4 py-2 transition-all hover:px-6 shadow-lg",
      o
        ? `scale-[0.001] shadow-none ${position() === "top" ? "-mt-8" : "-mb-8"} duration-100 opacity-0`
        : clsx(
            "scale-100 duration-200",
            justClosed && "animate-wobble duration-300",
          ),
    );
  });

  return {
    open,
    setOpen,
    hovered,
    setHovered,
    mode,
    modes,
    cycle,
    className,
  };
};
