import type AstalMpris from "gi://AstalMpris";
import { createBinding, createComputed, createState } from "ags";
import { timeout } from "ags/time";
import ImageWrapper from "@/components/ImageWrapper";
import { Align, EllipsizeMode, Orientation, Overflow } from "@/enums";
import { getIcon } from "@/lib/icons";
import { loadClasses } from "@/lib/styles";
import { formatSeconds } from "@/lib/utils";
import PlayerButton from "@/modules/bar/QuickSettings/Media/PlayerButton";
import ConfigManager from "@/services/configs";

interface PlayerProps {
  player: AstalMpris.Player;
}

export default function Player({ player }: PlayerProps) {
  const spacings = ConfigManager.bind("global", "spacings");
  const title = createBinding(player, "title");
  const artist = createBinding(player, "artist");
  const artUrl = createBinding(player, "artUrl");
  const length = createBinding(player, "length")(Math.floor);
  const position = createBinding(player, "position")(Math.floor);
  const playbackStatus = createBinding(player, "playbackStatus");

  const [isDragging, setIsDragging] = createState<boolean>(false);
  const [dragPosition, setDragPosition] = createState<number>(0);

  const playbackIcon = playbackStatus((ps) => getIcon("media", ps));

  const displayPosition = createComputed(() =>
    isDragging() ? dragPosition() : position(),
  );

  const handleSliderChange = ({ value }: { value: number }) => {
    setDragPosition(Math.floor(value));
  };

  const handleSliderInteraction = () => {
    if (isDragging()) {
      player.position = dragPosition();
      timeout(100, () => setIsDragging(false));
    } else {
      setIsDragging(true);
    }
  };

  return (
    <box
      $={loadClasses(Player)}
      class="rounded-xl font-semibold"
      orientation={Orientation.VERTICAL}
      overflow={Overflow.HIDDEN}
    >
      <overlay>
        <ImageWrapper
          class="brightness-70"
          heightRequest={140}
          src={artUrl}
          widthRequest={300}
        />
        <box
          $type="overlay"
          class="bg-background-dark/50 p-4"
          orientation={Orientation.VERTICAL}
          spacing={spacings((s) => s.medium)}
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
              class="text-foreground-dark text-sm"
              halign={Align.START}
              label={artist}
            />
          </box>

          <slider
            heightRequest={5}
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
              spacing={spacings((s) => s.medium)}
            >
              <PlayerButton
                iconName="skip-back"
                onClicked={() => player.previous()}
              />
              <PlayerButton
                iconName={playbackIcon}
                onClicked={() => player.play_pause()}
              />
              <PlayerButton
                iconName="skip-forward"
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
      </overlay>
    </box>
  );
}
