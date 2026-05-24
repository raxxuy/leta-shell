import { createState } from "ags";

const [open, setOpen] = createState(false);
const [hovered, setHovered] = createState(false);

export const centerNotchState = {
  open,
  setOpen,
  hovered,
  setHovered,
};
