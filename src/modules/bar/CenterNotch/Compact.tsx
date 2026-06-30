import { PolicyType } from "@/enums";
import { useCenterNotch } from "@/hooks/features/center-notch/useCenterNotch";
import { useHorizontalDragScroll } from "@/hooks/interactions/useHorizontalDragScroll";
import type { CenterNotchMode } from "@/lib/config/schemas/bar/modules/center-notch";
import { MprisProvider } from "@/providers/Mpris";
import MediaCompact from "./MediaPlayer/Compact";
import WeatherCompact from "./Weather/Compact";

const compactMap = {
  media: () => <MprisProvider>{() => <MediaCompact />}</MprisProvider>,
  weather: () => <WeatherCompact />,
} satisfies Record<CenterNotchMode, () => JSX.Element>;

export default function Compact() {
  const { modes, mode, setDragging, cycle, modeClassName } = useCenterNotch();
  const { ref: scrollRef, dragged } = useHorizontalDragScroll();

  return (
    <box class="min-w-56" hexpand={false}>
      {modes.map((m) => {
        const Module = compactMap[m];

        return (
          <scrolledwindow
            $={(self) => {
              scrollRef(self);

              const adj = self.hadjustment;

              // Initialize to center
              adj.connect("changed", () => {
                const center = (adj.upper - adj.page_size) / 2;
                if (center > 0 && adj.value !== center) {
                  adj.value = center;
                }
              });

              // Reset to center when not dragging
              dragged.subscribe(() => {
                setDragging(dragged());

                if (!dragged()) {
                  const center = (adj.upper - adj.page_size) / 2;
                  if (center > 0 && adj.value !== center) {
                    adj.value = center;
                  }
                }
              });

              adj.connect("value-changed", () => {
                if (!dragged()) return;
                const center = (adj.upper - adj.page_size) / 2;
                const offset = adj.value - center;
                if (offset >= center) cycle("next");
                else if (offset <= -center) cycle("prev");
              });
            }}
            class={modeClassName(m)}
            hscrollbarPolicy={PolicyType.EXTERNAL}
            visible={mode((mode) => mode === m)}
            vscrollbarPolicy={PolicyType.NEVER}
          >
            <box class="min-w-80">
              <Module />
            </box>
          </scrolledwindow>
        );
      })}
    </box>
  );
}
