import GTop from "gi://GTop";
import { createState, onCleanup } from "ags";
import { interval } from "ags/time";
import { useGlobalConfig } from "@/hooks/useConfig";

/* BAD GENERATED CODE, WILL CHANGE LATER */
export default function Usage() {
  const { spacing, iconSize } = useGlobalConfig();

  const [cpu, setCpu] = createState(0);
  const [ram, setRam] = createState({ used: 0, total: 0 });

  let lastCpuTotal = 0;
  let lastCpuUsed = 0;

  const updateStats = async () => {
    // CPU usage
    const cpuData = new GTop.glibtop_cpu();
    GTop.glibtop_get_cpu(cpuData);

    const total = cpuData.total;
    const used = cpuData.user + cpuData.nice + cpuData.sys;

    if (lastCpuTotal > 0) {
      const totalDiff = total - lastCpuTotal;
      const usedDiff = used - lastCpuUsed;

      if (totalDiff > 0) {
        setCpu(Math.round((usedDiff / totalDiff) * 100));
      }
    }

    lastCpuTotal = total;
    lastCpuUsed = used;

    // RAM usage
    const memData = new GTop.glibtop_mem();
    GTop.glibtop_get_mem(memData);
    setRam({
      used: Number((memData.used / 1024 ** 3).toFixed(1)),
      total: Number((memData.total / 1024 ** 3).toFixed(1)),
    });
  };

  const statsInterval = interval(2000, updateStats);
  updateStats();

  onCleanup(() => statsInterval.cancel());

  return (
    <box spacing={spacing("medium")}>
      <box class="w-14" spacing={spacing("small")}>
        <image iconName="system-cpu" pixelSize={iconSize("small")} />
        <label class="text-md" label={cpu((c) => `${c}%`)} />
      </box>
      <box class="w-14" spacing={spacing("small")}>
        <image iconName="system-memory" pixelSize={iconSize("small")} />
        <label class="text-md" label={ram((r) => `${r.used}/${r.total} GB`)} />
      </box>
    </box>
  );
}
