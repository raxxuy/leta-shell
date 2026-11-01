import { createState, With } from "ags";
import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";

import Popup from "@/components/Popup";
import Svg from "@/components/Svg";
import { Align, Orientation, PolicyType } from "@/enums";
import type { ConfigKey } from "@/lib/config/schemas";
import { cleanupWidget, scan } from "@/lib/theme/plugin";
import { ThemeProvider, useTheme } from "@/providers/ThemeProvider";
import LauncherSettings from "./sections/LauncherSettings";
import ThemeSettings from "./sections/ThemeSettings";

const sections: Record<ConfigKey, () => JSX.Element> = {
  theme: ThemeSettings,
  launcher: LauncherSettings,
  wallpaper: () => <box />,
};

const sectionInfo: Record<ConfigKey, { title: string; description: string }> = {
  theme: {
    title: "Theme",
    description: "Customize the appearance, spacing, and sizing of leta-shell.",
  },
  launcher: {
    title: "Launcher",
    description: "Configure the application launcher and its behavior.",
  },
  wallpaper: {
    title: "Wallpaper",
    description: "Customize your wallpaper and desktop background.",
  },
};

const SettingsWindowInner = ({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) => {
  const { spacing, pixelSize, colors } = useTheme();

  const [currentSection, setCurrentSection] = createState<ConfigKey>("theme");

  const baseColor = colors.base(
    (b) =>
      `min-h-216 min-w-6xl rounded-2xl border border-secondary/15 bg-${b} shadow-2xl/30`,
  );

  return (
    <Popup
      anchor="center"
      animation="popover"
      application={app}
      exclusivity="exclusive"
      gdkmonitor={gdkmonitor}
      keymode="on-demand"
      layer="overlay"
      name="settings"
      namespace="leta-shell"
    >
      <box class={baseColor}>
        <box
          class="border-secondary/10 min-w-56 border-r bg-white/3"
          orientation={Orientation.VERTICAL}
        >
          <label
            class="px-5 pt-6 pb-5 text-lg font-semibold"
            halign={Align.START}
            label="Settings"
          />

          <box
            class="px-3"
            orientation={Orientation.VERTICAL}
            spacing={spacing.sm}
            vexpand
          >
            {Object.keys(sections).map((key) => {
              const section = key as ConfigKey;

              return (
                <button
                  class={currentSection(
                    (current) =>
                      `rounded-lg px-3 py-2 transition-all hover:[&_svg]:-mr-1 ${
                        current === section
                          ? "bg-white/10"
                          : "hover:bg-white/5 active:bg-white/10"
                      }`,
                  )}
                  focusable={false}
                  onClicked={() => setCurrentSection(section)}
                >
                  <box hexpand={false}>
                    <label
                      class={currentSection(
                        (current) =>
                          `text-base text-shadow-xs ${
                            current === section ? "font-medium" : "opacity-65"
                          }`,
                      )}
                      halign={Align.START}
                      label={sectionInfo[section].title}
                      valign={Align.CENTER}
                      xalign={0}
                    />

                    <Svg
                      class={currentSection(
                        (current) =>
                          `opacity-65 transition-all ${
                            current === section ? "-mr-1" : "mr-0"
                          }`,
                      )}
                      halign={Align.END}
                      hexpand
                      iconName="chevron-right"
                      pixelSize={pixelSize.sm}
                    />
                  </box>
                </button>
              );
            })}
          </box>
        </box>

        <box
          class="px-10 py-8"
          hexpand
          orientation={Orientation.VERTICAL}
          vexpand
        >
          <With cleanup={cleanupWidget} value={currentSection}>
            {(section) => (
              <box
                $={scan}
                hexpand
                orientation={Orientation.VERTICAL}
                spacing={spacing.lg}
                vexpand
              >
                <box orientation={Orientation.VERTICAL} spacing={spacing.xs}>
                  <label
                    class="text-2xl font-semibold"
                    halign={Align.START}
                    label={sectionInfo[section].title}
                    xalign={0}
                  />

                  <label
                    class="text-sm font-medium text-white/50"
                    halign={Align.START}
                    label={sectionInfo[section].description}
                    xalign={0}
                  />
                </box>

                <box class="min-h-px bg-white/10" />

                <scrolledwindow
                  hexpand
                  hscrollbarPolicy={PolicyType.NEVER}
                  vexpand
                >
                  <box hexpand vexpand>
                    {sections[section]()}
                  </box>
                </scrolledwindow>
              </box>
            )}
          </With>
        </box>
      </box>
    </Popup>
  );
};

export default function SettingsWindow(gdkmonitor: Gdk.Monitor) {
  return (
    <ThemeProvider>
      {() => <SettingsWindowInner gdkmonitor={gdkmonitor} />}
    </ThemeProvider>
  );
}
