import { Gtk } from "ags/gtk4";
import { ContentFit } from "@/enums";
import { createImageFile } from "@/lib/gtk";
import type { Reactive } from "@/types/reactive";

type ImageProps = JSX.IntrinsicElements["overlay"] & {
  src: Reactive<string | null>;
  file?: Reactive<boolean>;
  contentFit?: Reactive<Gtk.ContentFit>;
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
