import type GObject from "ags/gobject";
import { configs } from "@/lib/config";
import Battery from "@/modules/bar/Battery";
import Clock from "@/modules/bar/Clock";
import Tray from "@/modules/bar/Tray";
import Workspaces from "@/modules/bar/Workspaces";
import Container from "@/widgets/Container";
import Sound from "./Sound";

const { count: maxWorkspaces } = configs.bar.modules.workspaces;
const {
  enabled: containerEnabled,
  gradient,
  spacing,
} = configs.bar.extras.container;

const wrap = (children: GObject.Object) =>
  containerEnabled ? (
    <Container gradient={gradient} spacing={spacing}>
      {children}
    </Container>
  ) : (
    children
  );

const Start = () => (
  <box $type="start" class="bar-module-left" spacing={10}>
    {wrap(<Workspaces maxWorkspaces={maxWorkspaces} />)}
    {wrap(<Tray />)}
  </box>
);

const Center = () => (
  <box $type="center" class="bar-module-center">
    {wrap(<Clock />)}
  </box>
);

const End = () => (
  <box $type="end" class="bar-module-right">
    {wrap(
      <>
        <Battery />
        <Sound />
      </>,
    )}
  </box>
);

export default function BarModule() {
  return (
    <centerbox class="bar-module-container">
      <Start />
      <Center />
      <End />
    </centerbox>
  );
}
