import type AstalMpris from "gi://AstalMpris";
import { createBinding, createComputed, createState } from "ags";
import { timeout } from "ags/time";
import { Align, EllipsizeMode, Orientation } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import { getIcon } from "@/lib/icons";
import { loadClasses } from "@/lib/styles";
import { formatSeconds } from "@/utils";
import PlayerButton from "./PlayerButton";

interface PlayerControlsProps {
  player: AstalMpris.Player;
}

export default function PlayerControls({ player }: PlayerControlsProps) {
  const { spacing } = useGlobalConfig();
  const title = createBinding(player, "title");
  const artist = createBinding(player, "artist");
  const length = createBinding(player, "length")(Math.floor);
  const position = createBinding(player, "position")(Math.floor);
  const playbackStatus = createBinding(player, "playbackStatus");

  const [isDragging, setIsDragging] = createState<boolean>(false);
  const [dragPosition, setDragPosition] = createState<number>(0);

  const playbackIcon = playbackStatus((ps) =>
    getIcon({ type: "media", status: ps }),
  );

  const displayPosition = createComputed(() =>
    isDragging() ? dragPosition() : position(),
  );

  const handleSliderChange = ({ value }: { value: number }) => {
    setDragPosition(Math.floor(value));
  };

  const handleSliderInteraction = () => {
    if (isDragging.peek()) {
      player.position = dragPosition.peek();
      timeout(100, () => setIsDragging(false));
    } else {
      setIsDragging(true);
    }
  };

  return (
    <box
      $={loadClasses(PlayerControls)}
      $type="overlay"
      class="bg-background-dark/60 p-4"
      orientation={Orientation.VERTICAL}
      spacing={spacing("medium")}
      valign={Align.END}
    >
      <box orientation={Orientation.VERTICAL}>
        <label
          class="font-bold text-md"
          ellipsize={EllipsizeMode.END}
          halign={Align.START}
          label={title}
          maxWidthChars={24}
        />
        <label
          class="text-on-surface-dark text-sm"
          halign={Align.START}
          label={artist}
        />
      </box>

      <slider
        max={length}
        min={0}
        onChangeValue={handleSliderChange}
        onNotify={(_, event) => {
          if (event.name === "css-classes") {
            handleSliderInteraction();
          }
        }}
        orientation={Orientation.HORIZONTAL}
        value={displayPosition}
      />

      <box hexpand>
        <label
          class="w-12 text-sm"
          label={position((p) => formatSeconds(p, "%M:%S"))}
          valign={Align.START}
          xalign={0}
        />
        <box
          class="pt-1"
          halign={Align.CENTER}
          hexpand
          spacing={spacing("medium")}
        >
          <PlayerButton
            iconName="media-skip-backward"
            onClicked={() => player.previous()}
          />
          <PlayerButton
            iconName={playbackIcon}
            onClicked={() => player.play_pause()}
          />
          <PlayerButton
            iconName="media-skip-forward"
            onClicked={() => player.next()}
          />
        </box>
        <label
          class="w-12 text-sm"
          halign={Align.END}
          label={length((l) => formatSeconds(l, "%M:%S"))}
          valign={Align.START}
        />
      </box>
    </box>
  );
}
