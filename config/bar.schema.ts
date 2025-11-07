export type BarSchema = {
  window: {
    defaultHeight: number;
  };
  modules: {
    workspaces: {
      count: number;
      spacing: number;
    };
  };
  extras: {
    container: {
      enabled: boolean;
      gradient: boolean;
      spacing: number;
    };
  };
};
