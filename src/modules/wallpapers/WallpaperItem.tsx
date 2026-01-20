import { Overflow } from "@/enums";
import { loadClasses } from "@/lib/styles";
import ImageWrapper from "@/widgets/ImageWrapper";

interface WallpaperItemProps {
  src: string;
  width: number;
  height: number;
  onClicked: (src: string) => void;
}

export default function WallpaperItem({
  src,
  width,
  height,
  onClicked,
}: WallpaperItemProps) {
  const handleClick = () => onClicked(src);

  return (
    <ImageWrapper
      $={loadClasses(WallpaperItem)}
      button
      class="m-4 rounded-3xl shadow transition focus:m-0"
      file
      heightRequest={height}
      hexpand={false}
      onClicked={handleClick}
      overflow={Overflow.HIDDEN}
      src={src}
      vexpand={false}
      widthRequest={width}
    />
  );
}
