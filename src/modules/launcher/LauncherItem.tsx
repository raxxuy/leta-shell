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
  const configManager = ConfigManager.get_default();
  const icons = configManager.bind("global", "icons");
  const spacings = configManager.bind("global", "spacings");
  const items = configManager.bind("launcher", "modules.items");

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
        class="mx-4 h-11 rounded-xl px-4 py-1 transition hover:bg-background-light/80 focus:bg-background-lighter/80 active:bg-background-lighter/80"
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
