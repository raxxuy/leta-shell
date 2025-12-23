import type AstalApps from "gi://AstalApps";
import { type Accessor, createState } from "ags";
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
const {
  modules: { items },
} = getConfig("launcher");

interface LauncherItemProps {
  app: AstalApps.Application;
  index?: Accessor<number>;
}

export default function LauncherItem({ app, index }: LauncherItemProps) {
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
      transitionDuration={index ? index((i) => i * items.delay) : items.delay}
      transitionType={RevealerTransitionType.SLIDE_UP}
    >
      <button
        class="mx-4 h-11 rounded-xl px-4 py-1 transition hover:bg-background-light focus:bg-background-lighter active:bg-background-lighter"
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
              class="font-semibold text-foreground-lighter"
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
