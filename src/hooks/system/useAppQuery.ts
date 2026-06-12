import AstalApps from "gi://AstalApps";

const apps = new AstalApps.Apps();

export const useAppQuery = (entry: string) => {
  return apps.exact_query(entry);
};
