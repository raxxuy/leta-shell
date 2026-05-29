import { For, type Setter } from "ags";
import { Align, Orientation } from "@/enums";
import { useDragAndDrop } from "@/hooks/ui/interactions/useDragAndDrop";
import { createReactiveMemo } from "@/lib/reactive";
import { scan } from "@/lib/theme";
import type { Reactive } from "@/types/reactive";

interface ReorderableProps<T extends string> {
  items: Reactive<T[] | readonly T[]>;
  setItems: Setter<T[]>;
}

export default function Reorderable<T extends string>({
  items: itemsProp,
  setItems,
}: ReorderableProps<T>) {
  const items = createReactiveMemo(itemsProp, (list) =>
    list.map((item) => ({
      id: item,
      label: item,
    })),
  );

  const { entries, makeDraggable } = useDragAndDrop(
    items.peek(),
    (reordered) => {
      setItems(reordered.map((x) => x.label));
    },
  );

  return (
    <box orientation={Orientation.VERTICAL} spacing={4}>
      <box class="reorderable">
        <For each={entries}>
          {(entry) => (
            <button
              $={(self) => {
                scan?.(self);
                makeDraggable(entry.id)(self);
              }}
              class="reorderable-item"
              focusable={false}
            >
              <label
                class="font-medium text-sm capitalize"
                halign={Align.START}
                label={entry.label}
              />
            </button>
          )}
        </For>
      </box>
    </box>
  );
}
