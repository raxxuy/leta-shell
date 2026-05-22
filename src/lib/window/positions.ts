import { Align } from "@/enums";

export const positions = {
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
} as const;

export type PositionKey = keyof typeof positions;
export type Position = (typeof positions)[PositionKey];
