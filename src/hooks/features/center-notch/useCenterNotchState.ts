import { createState } from "ags";
import clsx from "clsx/lite";

export default function useCenterNotchState() {
  const [open, setOpen] = createState(false);
  const [hovered, setHovered] = createState(false);

  let prev: boolean | null = null;

  const className = open((o) => {
    const justClosed = prev === true && o === false;
    prev = o;

    return clsx(
      "my-1 rounded-lg transform-cpu bg-zinc-950/95 px-4 py-2 transition-all hover:px-6 shadow-lg",
      o
        ? "scale-[0.001] shadow-none -mt-8 duration-100 opacity-0"
        : clsx(
            "scale-100 duration-200",
            justClosed && "animate-wobble duration-300",
          ),
    );
  });

  return { open, setOpen, hovered, setHovered, className };
}
