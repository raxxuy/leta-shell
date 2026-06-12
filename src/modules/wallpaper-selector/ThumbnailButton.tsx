import { createState } from "ags";
import type { Gtk } from "ags/gtk4";
import ImageButton from "@/components/ImageButton";
import { Cursor, THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from "@/constants";
import { Overflow } from "@/enums";
import { useMouseHover } from "@/hooks/interactions/useMouseHover";
import { scan } from "@/lib/theme";

interface ThumbnailButtonProps {
  onClick: () => void;
  source: string | null;
}

export default function ThumbnailButton({
  onClick,
  source,
}: ThumbnailButtonProps) {
  if (!source) return <box />;

  const [hovered, setHovered] = createState(false);

  const init = (self: Gtk.Overlay) => {
    useMouseHover(
      self,
      () => setHovered(true),
      () => setHovered(false),
    );
    scan?.(self);
  };

  return (
    <overlay
      $={init}
      class="transform-cpu animate-spring-in rounded-2xl px-1 shadow-md transition duration-200 hover:shadow-xl active:scale-97 active:shadow-lg"
    >
      <ImageButton
        class="rounded-2xl outline-2 outline-transparent transition-all duration-150 ease-out hover:outline-white/40 focus:outline-white"
        cursor={Cursor.POINTER}
        file
        heightRequest={THUMBNAIL_HEIGHT}
        onClicked={onClick}
        overflow={Overflow.HIDDEN}
        src={source}
        widthRequest={THUMBNAIL_WIDTH}
      />
    </overlay>
  );
}
