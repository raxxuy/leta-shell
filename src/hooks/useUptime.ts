import { createState, onCleanup } from "ags";
import { interval } from "ags/time";
import { exec, formatSeconds } from "@/utils";

export const useUptime = () => {
  const [uptime, setUptime] = createState("");

  const updateUptime = async () => {
    const time = await exec("cat /proc/uptime");
    const seconds = Math.floor(Number(time.split(" ")[0]));
    setUptime(formatSeconds(seconds, "Uptime: %H:%M:%S"));
  };

  const uptimeInterval = interval(1000, updateUptime);
  updateUptime();

  onCleanup(() => uptimeInterval.cancel());

  return uptime;
};
