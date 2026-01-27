import { type Accessor, createComputed, createState } from "ags";
import { timeout } from "ags/time";
import {
  Align,
  EllipsizeMode,
  Orientation,
  RevealerTransitionType,
} from "@/enums";
import { loadClasses } from "@/lib/styles";
import ConfigService from "@/services/config";
import type { LauncherResult } from "@/services/launcher/types";

interface LauncherItemProps {
  result: LauncherResult;
  index?: Accessor<number>;
}

export default function LauncherItem({ result, index }: LauncherItemProps) {
  const icons = ConfigService.bind("global", "icons");
  const spacings = ConfigService.bind("global", "spacings");
  const items = ConfigService.bind("launcher", "modules.items");

  const [revealed, setRevealed] = createState<boolean>(false);

  const duration = createComputed(() => {
    return index ? index() * items().delay : items().delay;
  });

  const handleClick = () => {
    result.execute();
  };

  timeout(0, () => setRevealed(true));

  return (
    <revealer
      $={loadClasses(LauncherItem)}
      revealChild={revealed}
      transitionDuration={duration}
      transitionType={RevealerTransitionType.NONE}
    >
      <button
        class="h-11 rounded-xl px-4 py-1 transition duration-100 hover:bg-background-light/60 focus:bg-background-lighter/60 active:bg-background-lighter/60"
        focusOnClick={false}
        onClicked={handleClick}
      >
        <box spacing={spacings((s) => s.large)}>
          {result.icon && (
            <image
              iconName={result.icon}
              pixelSize={icons((i) => i.pixelSize.small * 1.5)}
            />
          )}
          <box orientation={Orientation.VERTICAL} valign={Align.CENTER}>
            <label
              class="font-semibold text-foreground-lighter"
              ellipsize={EllipsizeMode.END}
              halign={Align.START}
              label={result.title}
              xalign={0}
            />
            {result.description && (
              <label
                class="text-foreground-light text-sm"
                ellipsize={EllipsizeMode.END}
                halign={Align.START}
                label={result.description}
                xalign={0}
              />
            )}
          </box>
        </box>
      </button>
    </revealer>
  );
}
