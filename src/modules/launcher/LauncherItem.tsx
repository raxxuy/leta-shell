import type AstalApps from "gi://AstalApps";
import { type Accessor, createComputed, createState } from "ags";
import { timeout } from "ags/time";
import {
  Align,
  EllipsizeMode,
  Orientation,
  RevealerTransitionType,
} from "@/enums";
import { loadClasses } from "@/lib/styles";
import { toggleWindow } from "@/lib/utils";
import ConfigManager from "@/services/configs";

interface LauncherItemProps {
  app: AstalApps.Application;
  index?: Accessor<number>;
}

export default function LauncherItem({ app, index }: LauncherItemProps) {
  const icons = ConfigManager.bind("global", "icons");
  const spacings = ConfigManager.bind("global", "spacings");
  const items = ConfigManager.bind("launcher", "modules.items");

  const [revealed, setRevealed] = createState<boolean>(false);

  const duration = createComputed(() => {
    return index ? index() * items().delay : items().delay;
  });

  const handleClick = () => {
    toggleWindow("launcher");
    app.launch();
  };

  timeout(0, () => setRevealed(true));

  return (
    <revealer
      $={loadClasses(LauncherItem)}
      revealChild={revealed}
      transitionDuration={duration}
      transitionType={RevealerTransitionType.SLIDE_UP}
    >
      <button
        class="h-11 rounded-xl px-4 py-1 transition duration-100 hover:bg-background-light/60 focus:bg-background-lighter/60 active:bg-background-lighter/60"
        focusOnClick={false}
        onClicked={handleClick}
      >
        <box spacing={spacings((s) => s.large)}>
          <image
            iconName={app.iconName}
            pixelSize={icons((i) => i.pixelSize.small * 1.5)}
          />
          <box orientation={Orientation.VERTICAL} valign={Align.CENTER}>
            <label
              class="font-semibold text-foreground-lighter"
              ellipsize={EllipsizeMode.END}
              halign={Align.START}
              label={app.name}
            />
            {app.description && (
              <label
                class="text-foreground-light text-sm"
                ellipsize={EllipsizeMode.END}
                label={app.description}
              />
            )}
          </box>
        </box>
      </button>
    </revealer>
  );
}
