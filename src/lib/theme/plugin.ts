import { debounce } from "es-toolkit";
import { createSimpleAgsPlugin } from "tailwind2gtk/plugins/ags-simple";
import { CACHE_UTILITIES_FILE, CACHE_UTILITIES_JSON_FILE } from "@/constants";
import { compileCss } from "./apply";
import { SCSS_HEADER, VARIABLES } from "./constants";

const debouncedCompileCss = debounce(compileCss, 100);

export const { loadClasses, setClasses, getUsedClasses } =
  createSimpleAgsPlugin({
    utilitiesFile: CACHE_UTILITIES_FILE,
    utilitiesJsonFile: CACHE_UTILITIES_JSON_FILE,

    scssOptions: {
      header: SCSS_HEADER,
    },

    onNewClasses: debouncedCompileCss,

    tailwindConfig: {
      theme: {
        variables: VARIABLES,
      },
    },
  });
