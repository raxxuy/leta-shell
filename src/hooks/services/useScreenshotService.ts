import ScreenshotService from "@/services/screenshot";

export const useScreenshotService = () => {
  const service = ScreenshotService.get_default();

  const captureFull = async (outputPath: string) =>
    service.captureFull(outputPath);
  const captureWindow = async (outputPath: string) =>
    service.captureWindow(outputPath);
  const captureRegion = async (
    outputPath: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ) => service.captureRegion(outputPath, x, y, width, height);

  return {
    captureFull,
    captureWindow,
    captureRegion,
  };
};
