import { For, With } from "ags";
import MenuButton from "@/components/MenuButton";
import Popover from "@/components/Popover";
import { Cursor } from "@/constants";
import { Align, Orientation } from "@/enums";
import useBluetooth from "@/hooks/features/bluetooth/useBluetooth";
import { usePixelSize } from "@/hooks/services/usePixelSize";
import { useSpacing } from "@/hooks/services/useSpacing";
import { cleanupWidget, scan } from "@/lib/theme";
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
    <MenuButton class="bar-menubutton" focusable={false}>
      <image iconName={powerIcon} pixelSize={pixelSize.sm} />
      <Popover animated class="bar-popover min-w-sm" hasArrow={false}>
        <box orientation={Orientation.VERTICAL} spacing={spacing.lg}>
          <box hexpand valign={Align.CENTER}>
            <label class="font-semibold opacity-90" label="Bluetooth" />
            <switch
              active={isPowered}
              class="bar-switch"
              cursor={Cursor.POINTER}
              focusable={false}
              halign={Align.END}
              hexpand
              onNotifyActive={({ active }) => togglePower(active)}
            />
          </box>
          <With cleanup={cleanupWidget} value={isPowered}>
            {(powered) =>
              powered ? (
                <box
                  $={scan}
                  orientation={Orientation.VERTICAL}
                  spacing={spacing.lg}
                >
                  <box class="rounded-full border border-zinc-800" />
                  <scrolledwindow maxContentHeight={240} propagateNaturalHeight>
                    <box
                      orientation={Orientation.VERTICAL}
                      spacing={spacing.md}
                    >
                      <For
                        cleanup={cleanupWidget}
                        each={devices}
                        id={(device) => device.address}
                      >
                        {(device) => <BluetoothDeviceItem device={device} />}
                      </For>
                    </box>
                  </scrolledwindow>
                  <button
                    class={buttonClassName}
                    focusable={false}
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
