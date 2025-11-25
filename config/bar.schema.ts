export type BarSchema = {
  window: {
    defaultHeight: number;
  };
  section: {
    spacing: number;
  };
  modules: {
    workspaces: {
      count: number;
      spacing: number;
    };
    clock: {
      format: string;
    };
    sound: {
      spacing: number;
      endpoint: {
        spacing: number;
      };
    };
    battery: {
      spacing: number;
    };
    tray: {
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
  icons: {
    pixelSize: number;
  };
};
