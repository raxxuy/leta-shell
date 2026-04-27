import AstalApps from "gi://AstalApps";

const apps = new AstalApps.Apps();

export default function useAppQuery(entry: string) {
  return apps.exact_query(entry);
}
