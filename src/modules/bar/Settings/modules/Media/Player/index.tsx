import type AstalMpris from "gi://AstalMpris";
import { createBinding, createComputed, createState } from "ags";
import { Align, EllipsizeMode, Orientation, Overflow } from "@/enums";
import { getConfig } from "@/lib/config";
import { getIcon } from "@/lib/icons";
import { loadWidgetClasses } from "@/lib/styles";
import { formatSeconds } from "@/lib/utils";
import ImageWrapper from "@/widgets/ImageWrapper";
import PlayerButton from "./PlayerButton";

const { spacings } = getConfig("global");

interface PlayerProps {
  player: AstalMpris.Player;
}

export default function Player({ player }: PlayerProps) {
  const [pendingValue, setPendingValue] = createState<number | null>(null);
  const title = createBinding(player, "title");
  const artist = createBinding(player, "artist");
  const artUrl = createBinding(player, "artUrl");
  const length = createBinding(player, "length")(Math.floor);
  const position = createBinding(player, "position")(Math.floor);
  const playbackStatus = createBinding(player, "playbackStatus");

  const playbackIcon = createComputed(() => {
    return getIcon("media", playbackStatus());
  });

  const handleChangeValue = ({ value }: { value: number }) => {
    setPendingValue(value);
  };

  return (
    <box
      $={(self) => loadWidgetClasses(self, "player")}
      class="rounded-xl font-semibold"
      orientation={Orientation.VERTICAL}
      overflow={Overflow.HIDDEN}
    >
      <overlay>
        <ImageWrapper
          class="brightness-70"
          src={artUrl}
          widthRequest={300}
          heightRequest={140}
        />
        <box
          $type="overlay"
          class="bg-background-dark/50 p-4"
          valign={Align.END}
          orientation={Orientation.VERTICAL}
          spacing={spacings.medium}
        >
          <box orientation={Orientation.VERTICAL}>
            <label
              halign={Align.START}
              class="font-bold text-md"
              label={title}
              maxWidthChars={24}
              ellipsize={EllipsizeMode.END}
            />
            <label
              halign={Align.START}
              class="text-foreground-dark text-sm"
              label={artist}
            />
          </box>

          <slider
            orientation={Orientation.HORIZONTAL}
            heightRequest={5}
            min={0}
            max={length}
            value={position}
            onChangeValue={handleChangeValue}
            onNotify={(_, event) => {
              // black magic
              if (event.name === "css-classes") {
                const pv = pendingValue();
                if (pv !== null) {
                  player.position = Math.floor(pv);
                  setPendingValue(null);
                }
              }
            }}
          />

          <box hexpand>
            <label
              class="w-12 text-sm"
              valign={Align.START}
              label={position((p) => formatSeconds(p, "%M:%S"))}
            />
            <box
              hexpand
              class="pt-1"
              halign={Align.CENTER}
              spacing={spacings.medium}
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
              valign={Align.START}
              label={length((l) => formatSeconds(l, "%M:%S"))}
            />
          </box>
        </box>
      </overlay>
    </box>
  );
}
