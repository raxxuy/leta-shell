import { Align } from "@/enums";
import { createReactiveMemo } from "@/lib/reactive";
import { useTheme } from "@/providers/ThemeProvider";
import type { Reactive } from "@/types/reactive";

interface ObjectFieldProps<T extends object> {
  children: (
    value: T,
    setValue: <K extends keyof T>(key: K, value: T[K]) => void,
  ) => JSX.Element;
  onCommit: (value: T) => void;
  value: Reactive<T>;
}

export default function ObjectField<T extends object>({
  value: valueProp,
  onCommit,
  children,
}: ObjectFieldProps<T>) {
  const { spacing } = useTheme();

  const value = createReactiveMemo(valueProp);

  const setValue = <K extends keyof T>(key: K, nextValue: T[K]) => {
    onCommit({
      ...value.peek(),
      [key]: nextValue,
    });
  };

  return (
    <box
      class="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
      spacing={spacing.sm}
      valign={Align.CENTER}
    >
      {children(value.peek(), setValue)}
    </box>
  );
}
