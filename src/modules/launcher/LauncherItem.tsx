import { Gdk, Gtk } from "ags/gtk4";
import clsx from "clsx/lite";
import { Align, EllipsizeMode, ModifierType, Orientation } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import { loadClasses } from "@/lib/styles";
import type { LauncherResult } from "@/types/launcher";

interface LauncherItemProps {
  result: LauncherResult;
  entry: Gtk.Entry;
}

export default function LauncherItem({ result, entry }: LauncherItemProps) {
  const { spacing, iconSize } = useGlobalConfig();

  const handleClick = () => result.execute();

  const handleKeyPress = (
    _e: Gtk.EventControllerKey,
    key: number,
    _code: number,
    mod: number,
  ) => {
    if (mod === ModifierType.CONTROL_MASK && key === Gdk.KEY_Right) {
      if (result.type === "command") entry.set_text(`>${result.title}`);
    }
  };

  return (
    <button
      $={loadClasses(LauncherItem)}
      class={clsx(
        "h-11 rounded-xl px-4 py-1 -outline-offset-2 transition duration-100",
        "hover:bg-background-lighter/20 hover:outline hover:outline-background-lighter/40",
        "focus:bg-background-lighter/60 focus:outline focus:outline-background-lighter",
        "active:bg-background-lighter/60 active:outline active:outline-background-lighter",
      )}
      focusOnClick={false}
      onClicked={handleClick}
    >
      <Gtk.EventControllerKey onKeyPressed={handleKeyPress} />
      <box spacing={spacing("large")}>
        {result.icon && (
          <image iconName={result.icon} pixelSize={iconSize("small", 1.5)} />
        )}
        <box orientation={Orientation.VERTICAL} valign={Align.CENTER}>
          <label
            class="font-semibold text-on-surface-lighter"
            ellipsize={EllipsizeMode.END}
            halign={Align.START}
            label={result.title}
            xalign={0}
          />
          {result.description && (
            <label
              class="text-on-surface-light text-sm"
              ellipsize={EllipsizeMode.END}
              halign={Align.START}
              label={result.description}
              xalign={0}
            />
          )}
        </box>
      </box>
    </button>
  );
}
