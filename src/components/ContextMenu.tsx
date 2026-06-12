import { For } from "ags";
import { Align, Orientation } from "@/enums";
import { createReactiveMemo } from "@/lib/reactive";
import { cleanupWidget, scan } from "@/lib/theme";
import type { Reactive } from "@/types/reactive";

type ContextMenuItem = {
  label: string;
  onClick: () => void;
};

interface ContextMenuProps {
  buttonClass?: Reactive<string>;
  class?: Reactive<string>;
  items: Reactive<ContextMenuItem[]>;
  labelClass?: Reactive<string>;
  spacing?: Reactive<number>;
}

export default function ContextMenu({
  items: itemsProp,
  class: classProp,
  buttonClass: buttonClassProp,
  labelClass: labelClassProp,
  spacing: spacingProp,
}: ContextMenuProps) {
  const items = createReactiveMemo(itemsProp);
  const spacing = createReactiveMemo(spacingProp, (s) => s ?? 0);
  const classMemo = createReactiveMemo(
    classProp ??
      "rounded-lg border border-white/10 bg-zinc-900 p-1.5 shadow-lg",
  );
  const buttonClassMemo = createReactiveMemo(
    buttonClassProp ??
      "rounded-md px-3 py-1.5 hover:bg-white/5 active:bg-white/8",
  );
  const labelClassMemo = createReactiveMemo(
    labelClassProp ?? "font-medium text-sm capitalize",
  );

  return (
    <box class={classMemo} orientation={Orientation.VERTICAL} spacing={spacing}>
      <For cleanup={cleanupWidget} each={items}>
        {(item) => (
          <button
            $={scan}
            class={buttonClassMemo}
            focusable={false}
            onClicked={() => item.onClick()}
          >
            <label
              class={labelClassMemo}
              halign={Align.START}
              label={item.label}
            />
          </button>
        )}
      </For>
    </box>
  );
}
