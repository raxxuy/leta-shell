import { configs } from "@/lib/config";
import Battery from "@/modules/bar/Battery";
import Dashboard from "@/modules/bar/Dashboard";
import Sound from "@/modules/bar/Sound";
import Tray from "@/modules/bar/Tray";
import Workspaces from "@/modules/bar/Workspaces";
import Container from "@/widgets/Container";

const {
  section: { spacing },
  extras: {
    container: {
      enabled: containerEnabled,
      gradient: containerGradient,
      spacing: containerSpacing,
    },
  },
} = configs.bar;

const wrap = (children: JSX.Element | JSX.Element[]) =>
  containerEnabled ? (
    <Container gradient={containerGradient} spacing={containerSpacing}>
      {children}
    </Container>
  ) : (
    children
  );

const Section = ({
  type,
  className,
  children,
}: {
  type: "start" | "center" | "end";
  className: string;
  children: JSX.Element | JSX.Element[];
}) => (
  <box $type={type} class={className} spacing={spacing}>
    {wrap(children)}
  </box>
);

export default function BarModule() {
  return (
    <centerbox class="bar-module-container">
      <Section type="start" className="bar-module-left">
        <Workspaces />
        <Tray />
      </Section>

      <Section type="center" className="bar-module-center">
        <Dashboard />
      </Section>

      <Section type="end" className="bar-module-right">
        <Battery />
        <Sound />
      </Section>
    </centerbox>
  );
}
