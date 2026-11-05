import type GObject from "gi://GObject?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import { GtkRenderer } from "@gnim-js/gtk4";
import type { CCProps, JSX } from "gnim";
import { LayerWindow } from "gnim-kit";
import { cleanupWidget, scan } from "@/lib/theme/plugin";

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
  override setChildren(
    parent: GObject.Object,
    children: GObject.Object[],
    prev: GObject.Object[],
  ): void {
    super.setChildren(parent, children, prev);

    for (const child of children) {
      if (child instanceof Gtk.Widget && !prev.includes(child)) {
        Promise.resolve(scan?.(child)).catch(console.error);
      }
    }
  }

  override disposeObject(object: GObject.Object): void {
    if (object instanceof Gtk.Widget) {
      cleanupWidget?.(object);
    }

    super.disposeObject(object);
  }

  override resolveTag(tag: string) {
    return Object.hasOwn(intrinsicWidgets, tag)
      ? intrinsicWidgets[tag as keyof typeof intrinsicWidgets]
      : super.resolveTag(tag);
  }
}
