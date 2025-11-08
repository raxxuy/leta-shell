import type GObject from "ags/gobject";
import { configs } from "@/lib/config";
import Workspaces from "@/modules/bar/Workspaces";
import Container from "@/widgets/Container";
import Clock from "./Clock";

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
  <box $type="start" class="bar-module-left">
    {wrap(<Workspaces maxWorkspaces={maxWorkspaces} />)}
  </box>
);

const Center = () => (
  <box $type="center" class="bar-module-center">
    {wrap(<Clock />)}
  </box>
);

const End = () => <box $type="end" class="bar-module-right"></box>;

export default function BarModule() {
  return (
    <centerbox class="bar-module-container">
      <Start />
      <Center />
      <End />
    </centerbox>
  );
}
