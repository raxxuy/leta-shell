import Clock from "@/modules/bar/Dashboard/Clock";
import Media from "@/modules/bar/Dashboard/Media";
import Container from "@/widgets/Container";
import MenuButton from "@/widgets/MenuButton";

export default function Dashboard() {
  return (
    <MenuButton class="dashboard button px-2">
      <Clock />
      <popover>
        <Container>
          <Media />
        </Container>
      </popover>
    </MenuButton>
  );
}
