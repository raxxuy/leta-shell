import { With } from "ags";
import clsx from "clsx/lite";
import { Orientation } from "@/enums";
import { useCenterNotchMode } from "@/hooks/useCenterNotchMode";
import { usePixelSize } from "@/hooks/usePixelSize";
import { useSpacing } from "@/hooks/useSpacing";
import MediaPlayer from "./MediaPlayer";

const components = {
  media: () => <MediaPlayer />,
  weather: () => <box>test</box>,
};

const icons = {
  media: "music-note-01",
  weather: "cloud-03",
};

export default function Expanded() {
  const spacing = useSpacing();
  const pixelSize = usePixelSize();

  const { mode, modes, selectMode } = useCenterNotchMode();

  const buttonClassName = (currentMode: (typeof modes)[number]) =>
    mode((m) =>
      clsx(
        "min-h-4 min-w-6 rounded-xl px-3 py-1 transition-colors",
        m === currentMode
          ? "bg-slate-200/20"
          : "hover:bg-slate-200/20 active:bg-slate-200/40",
      ),
    );

  return (
    <box orientation={Orientation.VERTICAL} spacing={spacing.md}>
      <box class="mt-1" spacing={spacing.sm}>
        {modes.map((m) => (
          <button class={buttonClassName(m)} onClicked={() => selectMode(m)}>
            <image class="shadow-xl" iconName={icons[m]} pixelSize={pixelSize.sm} />
          </button>
        ))}
      </box>

      <With value={mode}>{(m) => components[m]()}</With>
    </box>
  );
}
