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
  items: Reactive<ContextMenuItem[]>;
}

export default function ContextMenu({ items: itemsProp }: ContextMenuProps) {
  const items = createReactiveMemo(itemsProp);

  return (
    <box
      class="rounded-lg border border-white/10 bg-zinc-900 p-1.5 shadow-lg"
      orientation={Orientation.VERTICAL}
    >
      <For cleanup={cleanupWidget} each={items}>
        {(item) => (
          <button
            $={scan}
            class="rounded-md px-3 py-1.5 hover:bg-white/5 active:bg-white/8"
            focusable={false}
            onClicked={() => item.onClick()}
          >
            <label
              class="font-medium text-sm capitalize"
              halign={Align.START}
              label={item.label}
            />
          </button>
        )}
      </For>
    </box>
  );
}
