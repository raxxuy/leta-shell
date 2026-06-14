import { createState } from "ags";
import type { Gtk } from "ags/gtk4";
import { PICTURES_DIR } from "@/constants";
import { Align } from "@/enums";
import { useSelection } from "@/hooks/interactions/useSelection";
import { useScreenshotService } from "@/hooks/services/useScreenshotService";
import { toggleWindow } from "@/lib/window";

interface ScreenshotModuleProps {
  height: number;
  width: number;
}

interface Selection {
  h: number;
  w: number;
  x: number;
  y: number;
}

export default function ScreenshotModule({
  width,
  height,
}: ScreenshotModuleProps) {
  const { captureRegion } = useScreenshotService();
  const [selection, setSelection] = createState<Selection | null>(null);

  const init = (self: Gtk.Widget) => {
    useSelection(
      self,
      (x, y, w, h) => {
        setSelection({ x, y, w, h });
      },
      onRelease,
    );
  };

  const onRelease = () => {
    const sel = selection.peek();
    if (sel && sel.w > 0 && sel.h > 0) {
      captureRegion(
        `${PICTURES_DIR}/screenshot_${Date.now()}.png`,
        sel.x,
        sel.y,
        sel.w,
        sel.h,
      );
      toggleWindow("screenshot");
    }
    setSelection(null);
  };

  const x = selection((s) => s?.x ?? 0);
  const y = selection((s) => s?.y ?? 0);
  const w = selection((s) => s?.w ?? 0);
  const h = selection((s) => s?.h ?? 0);

  return (
    <overlay $={init} heightRequest={height} widthRequest={width}>
      {/* top */}
      <box
        $type="overlay"
        class="bg-black/40"
        halign={Align.FILL}
        heightRequest={y}
        valign={Align.START}
        widthRequest={width}
      />
      {/* bottom */}
      <box
        $type="overlay"
        class="bg-black/40"
        halign={Align.FILL}
        heightRequest={selection((s) => height - (s?.y ?? 0) - (s?.h ?? 0))}
        valign={Align.END}
        widthRequest={width}
      />
      {/* left */}
      <box
        $type="overlay"
        class="bg-black/40"
        halign={Align.START}
        heightRequest={h}
        marginTop={y}
        valign={Align.START}
        widthRequest={x}
      />
      {/* right */}
      <box
        $type="overlay"
        class="bg-black/40"
        halign={Align.END}
        heightRequest={h}
        marginTop={y}
        valign={Align.START}
        widthRequest={selection((s) => width - (s?.x ?? 0) - (s?.w ?? 0))}
      />
      {/* selection border */}
      <box
        $type="overlay"
        class="border border-white/80"
        halign={Align.START}
        heightRequest={h}
        marginStart={x}
        marginTop={y}
        valign={Align.START}
        widthRequest={w}
      />
    </overlay>
  );
}
