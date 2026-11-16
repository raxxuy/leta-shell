import { range } from "es-toolkit";
import { useTheme } from "@/hooks/useTheme";
import WorkspaceButton from "./WorkspaceButton";

const WORKSPACE_IDS = range(1, 11);

export default function Workspaces() {
  const { spacing } = useTheme();

  return (
    <box spacing={spacing.sm}>
      {WORKSPACE_IDS.map((id) => (
        <WorkspaceButton id={id} />
      ))}
    </box>
  );
}
