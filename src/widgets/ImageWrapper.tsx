import Gio from "gi://Gio";
import { type Accessor, createComputed } from "ags";
import { Gtk } from "ags/gtk4";
import { access } from "@/lib/utils";

type ImageWrapperBase = {
  src: string | Accessor<string>;
  file?: boolean | Accessor<boolean>;
  contentFit?: Gtk.ContentFit | Accessor<Gtk.ContentFit>;
};

type ImageWrapperButton = ImageWrapperBase &
  JSX.IntrinsicElements["button"] & {
    button: true;
  };

type ImageWrapperOverlay = ImageWrapperBase &
  JSX.IntrinsicElements["overlay"] & {
    button?: false;
  };

type ImageWrapperProps = ImageWrapperButton | ImageWrapperOverlay;

export default function ImageWrapper({
  src: srcProp,
  file: fileProp = false,
  button = false,
  contentFit = Gtk.ContentFit.COVER,
  ...props
}: ImageWrapperProps) {
  const source = createComputed(() => {
    const src = access(srcProp);
    const file = access(fileProp);
    return file ? Gio.File.new_for_path(src) : Gio.File.new_for_uri(src);
  });

  const image = (
    <Gtk.Picture $type="overlay" contentFit={contentFit} file={source} />
  );

  if (button) {
    return (
      <button {...(props as JSX.IntrinsicElements["button"])}>
        <overlay hexpand vexpand>
          {image}
        </overlay>
      </button>
    );
  }

  return (
    <overlay {...(props as JSX.IntrinsicElements["overlay"])}>{image}</overlay>
  );
}
