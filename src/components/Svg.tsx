import GLib from "gi://GLib";

import { Gtk } from "ags/gtk4";

import { getSvg } from "@/lib/icons";
import { createReactiveMemo } from "@/lib/reactive";
import type { Reactive } from "@/types/reactive";

type SvgProps = Omit<JSX.IntrinsicElements["image"], "paintable"> &
  (
    | { svg: Reactive<string>; iconName?: never }
    | { svg?: never; iconName: Reactive<string> }
  );

export default function Svg({ svg, iconName, ...props }: SvgProps) {
  const source = iconName
    ? createReactiveMemo(iconName, getSvg)
    : createReactiveMemo(svg);

  const paintable = createReactiveMemo(source, (s) => {
    const p = Gtk.Svg.new();
    p.load_from_bytes(GLib.Bytes.new(new TextEncoder().encode(s)));
    return p;
  });

  return <image {...props} paintable={paintable} />;
}
