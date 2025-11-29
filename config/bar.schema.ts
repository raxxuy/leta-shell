export type BarSchema = {
  window: {
    defaultHeight: number;
    background: {
      enabled: boolean;
      opacity: number;
      color: string;
    };
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
    pixelSize: {
      small: number;
      large: number;
    };
  };
};
