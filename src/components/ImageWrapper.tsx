import Gio from "gi://Gio";
import { type Accessor, createComputed } from "ags";
import { Gtk } from "ags/gtk4";
import { ContentFit } from "@/enums";
import { access } from "@/utils";
import { Button } from "./button";

type ImageWrapperBase = {
  src: string | Accessor<string>;
  file?: boolean | Accessor<boolean>;
  contentFit?: Gtk.ContentFit | Accessor<Gtk.ContentFit>;
};

type ImageWrapperButton = ImageWrapperBase &
  JSX.IntrinsicElements["button"] & {
    button: true;
    onSecondaryClicked?: (source: Gtk.Button) => void;
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
  contentFit = ContentFit.COVER,
  ...props
}: ImageWrapperProps) {
  const source = createComputed(() => {
    const src = access(srcProp);
    const isFile = access(fileProp);
    return isFile ? Gio.File.new_for_path(src) : Gio.File.new_for_uri(src);
  });

  const image = (
    <Gtk.Picture $type="overlay" contentFit={contentFit} file={source} />
  );

  if (button) {
    const buttonProps = props as ImageWrapperButton;
    const { onSecondaryClicked, ...restProps } = buttonProps;
    return (
      <Button onSecondaryClicked={onSecondaryClicked} {...restProps}>
        <overlay hexpand vexpand>
          {image}
        </overlay>
      </Button>
    );
  }

  return <overlay {...(props as ImageWrapperOverlay)}>{image}</overlay>;
}
