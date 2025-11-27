export type BarSchema = {
  window: {
    defaultHeight: number;
  };
  modules: {
    workspaces: {
      count: number;
    };
    clock: {
      format: string;
    };
  };
  extras: {
    container: {
      enabled: true;
      gradient: false;
    };
  };
  spacings: {
    medium: number;
    small: number;
  };
  icons: {
    pixelSize: number;
  };
};
