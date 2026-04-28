import ImageButton from "@/components/ui/ImageButton";
import { Cursor, THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from "@/constants";
import { Overflow } from "@/enums";
import { loadClasses } from "@/lib/theme";

interface ThumbnailButtonProps {
  onClick: () => void;
  source: string | null;
}

export default function ThumbnailButton({
  onClick,
  source,
}: ThumbnailButtonProps) {
  if (!source) return <box />;

  return (
    <box
      $={loadClasses(ThumbnailButton)}
      class="active:transform-[scale(0.97)] rounded-2xl shadow-md transition duration-200 hover:shadow-xl active:shadow-lg"
    >
      <ImageButton
        class="rounded-2xl outline outline-2 outline-transparent transition-all duration-150 ease-out hover:outline-white/40 focus:outline-white"
        cursor={Cursor.POINTER}
        file
        heightRequest={THUMBNAIL_HEIGHT}
        onClicked={onClick}
        overflow={Overflow.HIDDEN}
        src={source}
        widthRequest={THUMBNAIL_WIDTH}
      />
    </box>
  );
}
