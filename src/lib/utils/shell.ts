import { execAsync } from "ags/process";

export const bash = async (command: string | string[]): Promise<string> => {
  return await execAsync([
    "bash",
    "-c",
    Array.isArray(command) ? command.join(" ") : command,
  ]).catch((error) => {
    console.error("Error executing bash command:", error);
    return "";
  });
};
