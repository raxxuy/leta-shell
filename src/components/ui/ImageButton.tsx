import type { Gtk } from "ags/gtk4";
import { ContentFit } from "@/enums";
import type { Reactive } from "@/types/reactive";
import Image from "./Image";

type ImageButtonProps = JSX.IntrinsicElements["button"] & {
  src: Reactive<string>;
  file?: Reactive<boolean>;
  contentFit?: Reactive<Gtk.ContentFit>;
};

export default function ImageButton({
  src,
  file = false,
  contentFit = ContentFit.COVER,
  ...props
}: ImageButtonProps) {
  return (
    <button {...props}>
      <Image contentFit={contentFit} file={file} src={src} />
    </button>
  );
}
