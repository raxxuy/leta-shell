import useTime from "@/hooks/system/useClock";

export default function Clock() {
  const time = useTime();
  const label = time(String);

  return <label class="font-bold text-base" label={label} />;
}
