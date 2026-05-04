import { createState } from "ags";
import clsx from "clsx/lite";

export default function useCenterNotchState() {
  const [open, setOpen] = createState(false);
  const [hovered, setHovered] = createState(false);

  const className = open((o) =>
    clsx(
      "my-1 rounded-lg transform-cpu bg-zinc-950/95 px-4 py-2 transition-all hover:px-6 shadow-lg",
      o && "scale-[0.001] shadow-none -mt-8 duration-100",
    ),
  );

  return { open, setOpen, hovered, setHovered, className };
}
