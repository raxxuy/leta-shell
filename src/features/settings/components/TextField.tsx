import { createState } from "ags";

import { Align } from "@/enums";
import { createReactiveMemo } from "@/lib/reactive";
import type { Reactive } from "@/types/reactive";

interface TextFieldProps {
  onCommit: (value: string) => void;
  placeholder?: Reactive<string>;
  value: Reactive<string>;
}

export default function TextField({
  value: valueProp,
  placeholder: placeholderProp,
  onCommit,
}: TextFieldProps) {
  const value = createReactiveMemo(valueProp);
  const placeholder = createReactiveMemo(placeholderProp ?? "");
  const [draft, setDraft] = createState(value.peek().toString());

  const commit = (text: string) => {
    onCommit(text);
    setDraft(text);
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
