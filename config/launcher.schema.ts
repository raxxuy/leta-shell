export type LauncherSchema = {
  content: {
    spacing: number;
    list: {
      height: number;
      spacing: number;
      delay: number;
      item: {
        spacing: number;
        icon: {
          pixelSize: number;
        };
      };
    };
    search: {
      width: number;
    };
  };
};
