import clsx from "clsx/lite";
import ImageWrapper from "@/components/ImageWrapper";
import { Overflow } from "@/enums";
import { loadClasses } from "@/lib/styles";

interface WallpaperItemProps {
  src: string;
  width: number;
  height: number;
  onClicked: (src: string) => void;
  onSecondaryClicked: (src: string) => void;
}

export default function WallpaperItem({
  src,
  width,
  height,
  onClicked,
  onSecondaryClicked,
}: WallpaperItemProps) {
  const handleClick = () => onClicked(src);
  const _handleSecondaryClick = () => onSecondaryClicked(src);

  return (
    <ImageWrapper
      $={loadClasses(WallpaperItem)}
      button
      class={clsx(
        "m-4 rounded-3xl shadow-md transition",
        "hover:m-2",
        "focus:m-0",
      )}
      file
      heightRequest={height}
      hexpand={false}
      onClicked={handleClick}
      // onSecondaryClicked={handleSecondaryClick}
      overflow={Overflow.HIDDEN}
      src={src}
      vexpand={false}
      widthRequest={width}
    />
  );
}
