import AstalMpris from "gi://AstalMpris";
import { createBinding, createComputed } from "ags";
import { CURSORS } from "@/constants";
import { Align, Orientation } from "@/enums";
import { getConfig } from "@/lib/config";
import { getIcon } from "@/lib/icons";
import { loadWidgetClasses, setClasses } from "@/lib/styles";
import { cls, formatSeconds } from "@/lib/utils";
import ImageWrapper from "@/widgets/ImageWrapper";

const { spacings, icons } = getConfig("global");

interface PlayerProps {
  player: AstalMpris.Player;
}

export default function Player({ player }: PlayerProps) {
  const title = createBinding(player, "title");
  const artist = createBinding(player, "artist");
  const artUrl = createBinding(player, "artUrl");
  const length = createBinding(player, "length")(Math.floor);
  const position = createBinding(player, "position")(Math.floor);
  const loopStatus = createBinding(player, "loopStatus");
  const shuffleStatus = createBinding(player, "shuffleStatus");
  const playbackStatus = createBinding(player, "playbackStatus");

  const currentPosition = createComputed(() => {
    return position() / length();
  });

  const playbackIcon = createComputed(() => {
    return getIcon("media", playbackStatus());
  });

  return (
    <box
      $={(self) => loadWidgetClasses(self, "player")}
      class="font-semibold"
      widthRequest={240}
      heightRequest={210}
      orientation={Orientation.VERTICAL}
      spacing={spacings.medium}
    >
      <box
        halign={Align.CENTER}
        valign={Align.START}
        orientation={Orientation.VERTICAL}
      >
        <label label={title} />
        <label class="text-sm" label={artist} />
      </box>

      <box class="pb-2" halign={Align.CENTER}>
        <ImageWrapper
          class="rounded-lg"
          src={artUrl}
          file={false}
          widthRequest={180}
          heightRequest={180}
        />
      </box>

      <levelbar
        orientation={Orientation.HORIZONTAL}
        heightRequest={5}
        value={currentPosition}
      />

      <box hexpand>
        <label
          halign={Align.START}
          label={position((p) => formatSeconds(p, "%M:%S"))}
        />
        <label
          hexpand
          halign={Align.END}
          label={length((l) => formatSeconds(l, "%M:%S"))}
        />
      </box>

      <box hexpand halign={Align.CENTER} spacing={spacings.medium}>
        <button
          onNotifyCssClasses={(self) => setClasses(self.cssClasses, true)}
          class={shuffleStatus((status) =>
            cls(
              "button p-1",
              status === AstalMpris.Shuffle.ON &&
                "bg-background-lighter rounded-lg",
            ),
          )}
          onClicked={() => player.shuffle()}
          cursor={CURSORS.pointer}
        >
          <image iconName="shuffle" pixelSize={icons.pixelSize.small * 1.5} />
        </button>
        <button
          class="button p-1"
          onClicked={() => player.previous()}
          cursor={CURSORS.pointer}
        >
          <image iconName="skip-back" pixelSize={icons.pixelSize.small * 1.5} />
        </button>
        <button
          class="button p-1"
          onClicked={() =>
            playbackStatus() === AstalMpris.PlaybackStatus.PLAYING
              ? player.pause()
              : player.play()
          }
          cursor={CURSORS.pointer}
        >
          <image
            iconName={playbackIcon}
            pixelSize={icons.pixelSize.small * 1.5}
          />
        </button>
        <button
          class="button p-1"
          onClicked={() => player.next()}
          cursor={CURSORS.pointer}
        >
          <image
            iconName="skip-forward"
            pixelSize={icons.pixelSize.small * 1.5}
          />
        </button>
        <button
          onNotifyCssClasses={(self) => setClasses(self.cssClasses, true)}
          class={loopStatus((status) =>
            cls(
              "button p-1",
              status !== AstalMpris.Loop.NONE &&
                "bg-background-lighter rounded-lg",
            ),
          )}
          onClicked={() => player.loop()}
          cursor={CURSORS.pointer}
        >
          <image iconName="repeat-01" pixelSize={icons.pixelSize.small * 1.5} />
        </button>
      </box>
    </box>
  );
}
