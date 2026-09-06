import Image from "@/components/Image";
import { Cursors, THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from "@/constants";
import { Overflow } from "@/enums";
import { scan } from "@/lib/theme/plugin";
import type { Reactive } from "@/types/reactive";

interface ThumbnailButtonProps {
  onClicked: () => void;
  source: Reactive<string | null>;
}

export default function ThumbnailButton({
  onClicked,
  source,
}: ThumbnailButtonProps) {
  if (!source) return <box />;

  return (
    <box $={scan} class="animate-spring-in">
      <overlay class="rounded-2xl px-1 shadow-md transition duration-200 hover:shadow-xl active:scale-97 active:shadow-lg">
        <button
          class="rounded-2xl outline-2 outline-transparent transition-all duration-150 ease-out hover:outline-primary/40 focus:outline-primary"
          cursor={Cursors.POINTER}
          heightRequest={THUMBNAIL_HEIGHT}
          onClicked={onClicked}
          overflow={Overflow.HIDDEN}
          widthRequest={THUMBNAIL_WIDTH}
        >
          <Image file src={source} />
        </button>
      </overlay>
    </box>
  );
}
