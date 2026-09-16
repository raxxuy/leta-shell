import { createState } from "ags";

import { Align } from "@/enums";
import { createReactiveMemo } from "@/lib/reactive";
import type { Reactive } from "@/types/reactive";

interface NumberFieldProps {
  onCommit: (value: number) => void;
  placeholder?: Reactive<string>;
  value: Reactive<number>;
}

export default function NumberField({
  value: valueProp,
  placeholder: placeholderProp,
  onCommit,
}: NumberFieldProps) {
  const value = createReactiveMemo(valueProp);
  const placeholder = createReactiveMemo(placeholderProp ?? "");
  const [draft, setDraft] = createState(value.peek().toString());

  const commit = (text: string) => {
    const parsed = Number(text);

    if (!Number.isFinite(parsed)) {
      setDraft(value.peek().toString());
      return;
    }

    onCommit(parsed);
    setDraft(parsed.toString());
  };

  return (
    <entry
      class="min-w-20 rounded-lg border border-white/10 bg-white/5 px-3 py-2 [&_placeholder]:text-white/30"
      halign={Align.END}
      onActivate={(entry) => commit(entry.text)}
      onChanged={(entry) => setDraft(entry.text)}
      onNotifyHasFocus={(entry) => {
        if (!entry.hasFocus) commit(entry.text);
      }}
      placeholderText={placeholder}
      text={draft}
    />
  );
}
