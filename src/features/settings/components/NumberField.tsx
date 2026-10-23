import { createState } from "ags";

import { Align } from "@/enums";
import { createReactiveMemo } from "@/lib/reactive";
import type { Reactive } from "@/types/reactive";

interface NumberFieldProps {
  max?: Reactive<number>;
  min?: Reactive<number>;
  onCommit: (value: number) => void;
  placeholder?: Reactive<string>;
  value: Reactive<number>;
}

export default function NumberField({
  value: valueProp,
  placeholder: placeholderProp = "",
  max: maxProp = Number.POSITIVE_INFINITY,
  min: minProp = Number.NEGATIVE_INFINITY,
  onCommit,
}: NumberFieldProps) {
  const value = createReactiveMemo(valueProp);
  const placeholder = createReactiveMemo(placeholderProp);
  const max = createReactiveMemo(maxProp);
  const min = createReactiveMemo(minProp);
  const [draft, setDraft] = createState(value.peek().toString());

  const commit = (text: string) => {
    const parsed = Number(text);

    if (!Number.isFinite(parsed)) {
      setDraft(value.peek().toString());
      return;
    }

    if (parsed > max.peek()) {
      onCommit(max.peek());
      setDraft(max.peek().toString());
      return;
    }

    if (parsed < min.peek()) {
      onCommit(min.peek());
      setDraft(min.peek().toString());
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
