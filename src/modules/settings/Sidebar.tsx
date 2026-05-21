import { Align, Orientation } from "@/enums";
import useSettingsCategory from "@/hooks/features/settings/useSettingsCategory";
import useSpacing from "@/hooks/services/useSpacing";

export default function Sidebar() {
  const spacing = useSpacing();
  const { setActive, categories, getCategoryClass } = useSettingsCategory();

  return (
    <box
      class="min-w-40 rounded-l-2xl border-white/5 border-r bg-zinc-900/60 p-3"
      orientation={Orientation.VERTICAL}
    >
      <label
        class="px-3 py-2 font-semibold text-sm uppercase tracking-widest opacity-40"
        halign={Align.START}
        label="Settings"
      />
      <box class="mt-1 mb-2 border-white/5 border-t" />
      <box orientation={Orientation.VERTICAL} spacing={spacing.sm}>
        {categories.map((category) => (
          <button
            class={getCategoryClass(category)}
            focusable={false}
            onClicked={() => setActive(category)}
          >
            <label class="capitalize" halign={Align.START} label={category} />
          </button>
        ))}
      </box>
    </box>
  );
}
