import Clock from "@/modules/bar/Dashboard/Clock";
import Container from "@/widgets/Container";
import MenuButton from "@/widgets/MenuButton";

export default function Dashboard() {
  return (
    <MenuButton class="dashboard button px-2">
      <Clock />
      <popover>
        <Container>
        </Container>
      </popover>
    </MenuButton>
  );
}
