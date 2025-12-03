import { Overflow } from "@/enums";
import { getConfig } from "@/lib/config";
import ImageWrapper from "@/widgets/ImageWrapper";

interface WallpaperItemProps {
  src: string;
  onClicked: (src: string) => void;
}

const {
  list: { picture },
} = getConfig("wallpapers").main;

export default function WallpaperItem({ src, onClicked }: WallpaperItemProps) {
  return (
    <ImageWrapper
      file
      src={src}
      type="button"
      overflow={Overflow.HIDDEN}
      onClicked={() => onClicked(src)}
      widthRequest={picture.width}
      heightRequest={picture.height}
    />
  );
}
