import { Align } from "@/enums";
import type { Position } from "@/types/window";

export const positions: Position = {
  top: {
    halign: Align.CENTER,
    valign: Align.START,
  },
  bottom: {
    halign: Align.CENTER,
    valign: Align.END,
  },
  left: {
    halign: Align.START,
    valign: Align.CENTER,
  },
  right: {
    halign: Align.END,
    valign: Align.CENTER,
  },
  center: {
    halign: Align.CENTER,
    valign: Align.CENTER,
  },
  "top-left": {
    halign: Align.START,
    valign: Align.START,
  },
  "top-right": {
    halign: Align.END,
    valign: Align.START,
  },
  "bottom-left": {
    halign: Align.START,
    valign: Align.END,
  },
  "bottom-right": {
    halign: Align.END,
    valign: Align.END,
  },
};
