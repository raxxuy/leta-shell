import { Overflow } from "@/enums";
import { loadWidgetClasses } from "@/lib/styles";
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
  return (
    <ImageWrapper
      $={(self) => loadWidgetClasses(self, "wallpaper-item")}
      class="rounded-4xl transition"
      widthRequest={width}
      heightRequest={height}
      overflow={Overflow.HIDDEN}
      file
      button
      src={src}
      onClicked={() => onClicked(src)}
    />
  );
}
