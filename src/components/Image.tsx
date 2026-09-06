import { Gtk } from "ags/gtk4";

import { ContentFit } from "@/enums";
import { createImageFile } from "@/lib/gtk/image";
import type { Reactive } from "@/types/reactive";

type ImageProps = JSX.IntrinsicElements["overlay"] & {
  contentFit?: Reactive<Gtk.ContentFit>;
  file?: Reactive<boolean>;
  src: Reactive<string | null>;
};

export default function Image({
  src,
  file = false,
  contentFit = ContentFit.COVER,
  ...props
}: ImageProps) {
  const fileRef = createImageFile(src, file);

  return (
    <overlay {...props}>
      <Gtk.Picture $type="overlay" contentFit={contentFit} file={fileRef} />
    </overlay>
  );
}
