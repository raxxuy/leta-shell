import { For, With } from "ags";
import MenuButton from "@/components/ui/MenuButton";
import Popover from "@/components/ui/Popover";
import { Cursor } from "@/constants";
import { Align, Orientation } from "@/enums";
import usePixelSize from "@/hooks/services/config/usePixelSize";
import useSpacing from "@/hooks/services/config/useSpacing";
import useBluetooth from "@/hooks/system/useBluetooth";
import { loadClasses } from "@/lib/theme";
import BluetoothDeviceItem from "./BluetoothDeviceItem";

export default function Bluetooth() {
  const spacing = useSpacing();
  const pixelSize = usePixelSize();
  const {
    devices,
    isPowered,
    powerIcon,
    discoveringLabel,
    buttonClassName,
    togglePower,
    toggleScanning,
  } = useBluetooth();

  return (
    <MenuButton class="min-h-6.5 min-w-6.5 rounded-lg transition-colors checked:bg-zinc-700 hover:bg-zinc-800 active:bg-zinc-700">
      <image iconName={powerIcon} pixelSize={pixelSize.sm} />
      <Popover
        animated
        class="m-[5px_10px_15px] mt-4 min-w-sm rounded-2xl border border-(--tertiary)/20 bg-zinc-950/95 p-6 shadow-md"
        hasArrow={false}
      >
        <box orientation={Orientation.VERTICAL} spacing={spacing.lg}>
          <box hexpand valign={Align.CENTER}>
            <label class="font-bold" label="Bluetooth" />
            <switch
              active={isPowered}
              class="switch min-h-4 min-w-8 rounded-full bg-white/15 p-0.5 transition-colors duration-200 checked:bg-(--primary)/90"
              cursor={Cursor.POINTER}
              halign={Align.END}
              hexpand
              onNotifyActive={({ active }) => togglePower(active)}
            />
          </box>
          <With value={isPowered}>
            {(powered) =>
              powered ? (
                <box
                  $={loadClasses(Bluetooth)}
                  orientation={Orientation.VERTICAL}
                  spacing={spacing.lg}
                >
                  <box class="rounded-full border border-zinc-800" />
                  <scrolledwindow maxContentHeight={240} propagateNaturalHeight>
                    <box
                      orientation={Orientation.VERTICAL}
                      spacing={spacing.md}
                    >
                      <For each={devices}>
                        {(device) => <BluetoothDeviceItem device={device} />}
                      </For>
                    </box>
                  </scrolledwindow>
                  <button
                    $={loadClasses(Bluetooth, "bluetooth-toggle")}
                    class={buttonClassName}
                    hexpand
                    onClicked={toggleScanning}
                  >
                    <label class="font-semibold" label={discoveringLabel} />
                  </button>
                </box>
              ) : (
                <label label="Bluetooth isn't turned on" />
              )
            }
          </With>
        </box>
      </Popover>
    </MenuButton>
  );
}
