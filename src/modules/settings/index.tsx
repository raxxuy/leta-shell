interface SettingsModuleProps {
  height: number;
  width: number;
}

export default function SettingsModule({ width, height }: SettingsModuleProps) {
  return (
    <box
      class="rounded-2xl border border-tertiary/20 bg-zinc-950/95 p-4 shadow-lg"
      heightRequest={height * 0.8}
      widthRequest={width * 0.4}
    >
      Settings
    </box>
  );
}
