import Workspaces from "@/modules/bar/Workspaces";

const Start = () => {
  return (
    <box $type="start" class="bar-module-left">
      <Workspaces maxWorkspaces={10} />
    </box>
  );
};

const Center = () => {
  return <box $type="center" class="bar-module-center"></box>;
};

const End = () => {
  return <box $type="end" class="bar-module-right"></box>;
};

export default function BarModule() {
  return (
    <centerbox class="bar-module">
      <Start />
      <Center />
      <End />
    </centerbox>
  );
}
