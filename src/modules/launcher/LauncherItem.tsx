import type AstalApps from "gi://AstalApps";
import { createState } from "ags";
import { timeout } from "ags/time";
import {
  Align,
  EllipsizeMode,
  Orientation,
  RevealerTransitionType,
} from "@/enums";
import { getConfig } from "@/lib/config";
import { loadWidgetClasses } from "@/lib/styles";
import { toggleWindow } from "@/lib/utils";

const { spacings, icons } = getConfig("global");

interface LauncherItemProps {
  app: AstalApps.Application;
  delay?: number;
}

export default function LauncherItem({ app, delay = 0 }: LauncherItemProps) {
  const [revealed, setRevealed] = createState<boolean>(false);

  const handleClick = () => {
    toggleWindow("launcher");
    app.launch();
  };

  timeout(0, () => setRevealed(true));

  return (
    <revealer
      $={(self) => loadWidgetClasses(self, "launcher-item")}
      revealChild={revealed}
      transitionDuration={delay}
      transitionType={RevealerTransitionType.SLIDE_UP}
    >
      <button
        class="transition h-11 rounded-xl px-4 py-1 hover:bg-background-light focus:bg-background-lighter active:bg-background-lighter"
        focusOnClick={false}
        onClicked={handleClick}
      >
        <box spacing={spacings.large}>
          <image
            iconName={app.iconName}
            pixelSize={icons.pixelSize.small * 1.5}
          />
          <box valign={Align.CENTER} orientation={Orientation.VERTICAL}>
            <label
              class="text-foreground-lighter font-semibold"
              label={app.name}
              halign={Align.START}
              ellipsize={EllipsizeMode.END}
            />
            {app.description && (
              <label
                class="text-foreground-light text-sm"
                label={app.description}
                ellipsize={EllipsizeMode.END}
              />
            )}
          </box>
        </box>
      </button>
    </revealer>
  );
}
