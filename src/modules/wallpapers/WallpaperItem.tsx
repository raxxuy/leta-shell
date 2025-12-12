import { Overflow } from "@/enums";
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
      file
      src={src}
      type="button"
      class="transition rounded-4xl"
      widthRequest={width}
      heightRequest={height}
      overflow={Overflow.HIDDEN}
      onClicked={() => onClicked(src)}
    />
  );
}
