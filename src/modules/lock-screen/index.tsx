import { Align, Orientation } from "@/enums";
import { useLockScreen } from "@/hooks/features/lock-screen/useLockScreen";
import { usePixelSize } from "@/hooks/services/usePixelSize";
import { useSpacing } from "@/hooks/services/useSpacing";

export default function LockScreenModule() {
  const spacing = useSpacing();
  const pixelSize = usePixelSize();

  const {
    password,
    setPassword,
    setVisible,
    visible,
    visibilityIconName,
    error,
    loading,
    submit,
    canSubmit,
  } = useLockScreen();

  return (
    <box class="bg-black/50" hexpand vexpand>
      <box
        class="min-w-md rounded-3xl border border-white/10 bg-zinc-950/80 p-8 shadow-2xl"
        halign={Align.CENTER}
        hexpand
        orientation={Orientation.VERTICAL}
        spacing={spacing.lg}
        valign={Align.CENTER}
        vexpand
      >
        <label class="text-6xl text-primary" halign={Align.CENTER} label="󰌾" />

        <box orientation={Orientation.VERTICAL} spacing={spacing.xs}>
          <label
            class="font-semibold text-2xl"
            halign={Align.CENTER}
            label="Unlock"
          />

          <label
            class="text-[15px] text-muted-foreground"
            halign={Align.CENTER}
            label="Enter your password to continue"
          />
        </box>

        <box class="min-h-12 rounded-xl bg-background/70 px-4 text-lg outline outline-transparent transition-all ease-in-out focus-within:outline-white/80 hover:outline-white/40">
          <entry
            class="[&_placeholder]:opacity-80"
            hexpand
            onActivate={submit}
            onNotifyText={(self) => setPassword(self.text)}
            placeholderText="Password"
            text={password}
            visibility={visible}
          />
          <button onClicked={() => setVisible((v) => !v)}>
            <image iconName={visibilityIconName} pixelSize={pixelSize.sm} />
          </button>
        </box>

        <button
          class="min-h-12 rounded-xl bg-primary/70 text-primary-foreground hover:opacity-90 disabled:bg-primary/50"
          onClicked={submit}
          sensitive={canSubmit}
        >
          <label label={loading((v) => (v ? "Unlocking..." : "Unlock"))} />
        </button>

        <revealer revealChild={error}>
          <label
            class="text-[15px] text-destructive"
            halign={Align.CENTER}
            label="Incorrect password"
          />
        </revealer>
      </box>
    </box>
  );
}
