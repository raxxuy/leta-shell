import { Align } from "@/enums";
import Clock from "@/modules/bar/Dashboard/Clock";
import Media from "@/modules/bar/Dashboard/Media";
import Container from "@/widgets/Container";

export default function Dashboard() {
  return (
    <menubutton class="dashboard">
      <Clock />
      <popover widthRequest={500} heightRequest={300}>
        <Container
          hexpand
          spacing={10}
          widthRequest={500}
          heightRequest={300}
          halign={Align.CENTER}
        >
          <Media />
          <box hexpand>bye</box>
        </Container>
      </popover>
    </menubutton>
  );
}
