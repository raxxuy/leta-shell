import { Align, Orientation } from "@/enums";
import useSpacing from "@/hooks/services/useSpacing";

interface SectionProps {
  children: JSX.Element | JSX.Element[];
  title: string;
}

export default function Section({ title, children }: SectionProps) {
  const spacing = useSpacing();

  return (
    <box
      class="rounded-lg border border-white/10 bg-zinc-900/40 p-4"
      orientation={Orientation.VERTICAL}
      spacing={spacing.md}
    >
      <label
        class="font-bold text-lg opacity-90"
        halign={Align.START}
        label={title}
      />
      {children}
    </box>
  );
}
