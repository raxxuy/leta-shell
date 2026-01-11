import type AstalMpris from "gi://AstalMpris";
import { createBinding, createComputed, createState } from "ags";
import { Align, EllipsizeMode, Orientation, Overflow } from "@/enums";
import { getConfig } from "@/lib/config";
import { getIcon } from "@/lib/icons";
import { formatSeconds } from "@/lib/utils";
import ImageWrapper from "@/widgets/ImageWrapper";
import PlayerButton from "./PlayerButton";
import { loadClasses } from "@/lib/styles";

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
          spacing={spacings.medium}
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
            orientation={Orientation.HORIZONTAL}
            value={position}
          />

          <box hexpand>
            <label
              class="w-12 text-sm"
              label={position((p) => formatSeconds(p, "%M:%S"))}
              valign={Align.START}
            />
            <box
              class="pt-1"
              halign={Align.CENTER}
              hexpand
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
              label={length((l) => formatSeconds(l, "%M:%S"))}
              valign={Align.START}
            />
          </box>
        </box>
      </overlay>
    </box>
  );
}
