import Gtk from "gi://Gtk?version=4.0";
import { GtkRenderer } from "@gnim-js/gtk4";
import type { CCProps, JSX } from "gnim";
import { LayerWindow } from "./LayerWindow";

const intrinsicWidgets = {
  box: Gtk.Box,
  button: Gtk.Button,
  calendar: Gtk.Calendar,
  centerbox: Gtk.CenterBox,
  label: Gtk.Label,
  layerwindow: LayerWindow,
};

type WidgetProps<T> = T extends new (
  ...args: never[]
) => infer Widget
  ? CCProps<Widget> & JSX.IntrinsicClassAttributes<Widget>
  : T extends (props: infer Props) => unknown
    ? Props
    : never;

type IntrinsicProps = {
  [Name in keyof typeof intrinsicWidgets]: WidgetProps<
    (typeof intrinsicWidgets)[Name]
  >;
};

declare module "gnim" {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicProps {}
  }
}

export class AppRenderer extends GtkRenderer {
  override resolveTag(tag: string) {
    return Object.hasOwn(intrinsicWidgets, tag)
      ? intrinsicWidgets[tag as keyof typeof intrinsicWidgets]
      : super.resolveTag(tag);
  }
}
