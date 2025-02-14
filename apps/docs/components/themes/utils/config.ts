import {HeroUIPluginConfig} from "@heroui/theme";
import {readableColor} from "color2k";

import {Config, ThemeType} from "../types";

import {generateThemeColor} from "./colors";
function generateLayoutConfig(config: Config): HeroUIPluginConfig["layout"] {
  return {
    disabledOpacity: config.layout.otherParams.disabledOpacity,
  };
}

function generateThemeColorsConfig(config: Config, theme: ThemeType) {
  return {
    default: generateThemeColor(config[theme].defaultColor.default, "default", "light"),
    primary: generateThemeColor(config[theme].baseColor.primary, "primary", "light"),
    secondary: generateThemeColor(config[theme].baseColor.secondary, "secondary", "light"),
    success: generateThemeColor(config[theme].baseColor.success, "success", "light"),
    warning: generateThemeColor(config[theme].baseColor.warning, "warning", "light"),
    danger: generateThemeColor(config[theme].baseColor.danger, "danger", "light"),
    background: config[theme].layoutColor.background,
    foreground: generateThemeColor(config[theme].layoutColor.foreground, "foreground", "light"),
    content1: {
      DEFAULT: config[theme].contentColor.content1,
      foreground: readableColor(config[theme].contentColor.content1),
    },
    content2: {
      DEFAULT: config[theme].contentColor.content2,
      foreground: readableColor(config[theme].contentColor.content2),
    },
    content3: {
      DEFAULT: config[theme].contentColor.content3,
      foreground: readableColor(config[theme].contentColor.content3),
    },
    content4: {
      DEFAULT: config[theme].contentColor.content4,
      foreground: readableColor(config[theme].contentColor.content4),
    },
    focus: config[theme].layoutColor.focus,
    overlay: config[theme].layoutColor.overlay,
  };
}

/**
 * Generate plugin configuration
 */
export function generatePluginConfig(config: Config): HeroUIPluginConfig {
  return {
    themes: {
      light: {
        colors: generateThemeColorsConfig(config, "light"),
      },
      dark: {
        colors: generateThemeColorsConfig(config, "dark"),
      },
    },
    layout: generateLayoutConfig(config),
  };
}
