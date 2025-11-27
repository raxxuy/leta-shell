import { execAsync } from "ags/process";

export const bash = async (command: string | string[]): Promise<string> => {
  const cmd = Array.isArray(command) ? command.join(" ") : command;

  try {
    return await execAsync(["bash", "-c", cmd]);
  } catch (error) {
    console.error(`Failed to execute: ${cmd}`, error);
    return "";
  }
};
