import Gio from "gi://Gio";
import { Accessor, createComputed } from "ags";
import { Gtk } from "ags/gtk4";

type ImageWrapperBase = {
  src: string | Accessor<string>;
  file?: boolean;
  contentFit?: Gtk.ContentFit;
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
  src,
  file = false,
  button = false,
  contentFit = Gtk.ContentFit.COVER,
  ...props
}: ImageWrapperProps) {
  const source = createComputed(() => {
    const url = src instanceof Accessor ? src() : src;
    return file ? Gio.File.new_for_path(url) : Gio.File.new_for_uri(url);
  });

  const image = (
    <Gtk.Picture $type="overlay" file={source} contentFit={contentFit} />
  );

  if (button) {
    return (
      <button {...(props as JSX.IntrinsicElements["button"])}>
        <overlay>{image}</overlay>
      </button>
    );
  }

  return (
    <overlay {...(props as JSX.IntrinsicElements["overlay"])}>{image}</overlay>
  );
}
