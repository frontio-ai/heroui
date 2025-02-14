import {readableColor} from "color2k";

import {colorsId, baseColorsId, showcaseId, otherColorsId, defaultColorsId} from "./constants";
import {ColorPickerType, Config, ConfigLayout, ThemeType, ThemeColor} from "./types";
import {generateThemeColor, hexToHsl} from "./utils/colors";
import {templates} from "./templates";

export function setCssColor(
  colorType: ColorPickerType,
  value: string,
  heroUIValue: string,
  theme: ThemeType,
) {
  const baseColorEl = document.getElementById(colorsId);
  const commonColorsEl = document.getElementById(baseColorsId);
  const showcaseEl = document.getElementById(showcaseId);
  const defaultColorEl = document.getElementById(defaultColorsId);
  const configurationContainer = document.getElementById("configuration-container");

  const themeColor = generateThemeColor(value, colorType, theme);
  const heroThemeColor = generateThemeColor(heroUIValue, colorType, theme);

  if (!baseColorEl || !commonColorsEl || !showcaseEl || !defaultColorEl) {
    // eslint-disable-next-line no-console
    console.error("One or more required elements are missing from the DOM.");

    return;
  }

  Object.keys(themeColor).forEach((key) => {
    const value = hexToHsl(themeColor[key as keyof ThemeColor]);
    const heroValue = hexToHsl(heroThemeColor[key as keyof ThemeColor]);

    if (key === "DEFAULT") {
      baseColorEl.style.setProperty(`--heroui-${colorType}`, value);
      commonColorsEl.style.setProperty(`--heroui-${colorType}`, value);
      showcaseEl.style.setProperty(`--heroui-${colorType}`, value);
      defaultColorEl.style.setProperty(`--heroui-${colorType}`, value);
      configurationContainer?.style.setProperty(`--heroui-${colorType}`, heroValue);
    } else {
      baseColorEl.style.setProperty(`--heroui-${colorType}-${key}`, value);
      commonColorsEl.style.setProperty(`--heroui-${colorType}-${key}`, value);
      showcaseEl.style.setProperty(`--heroui-${colorType}-${key}`, value);
      defaultColorEl.style.setProperty(`--heroui-${colorType}`, value);
      configurationContainer?.style.setProperty(`--heroui-${colorType}-${key}`, heroValue);
    }
  });
}

export function setCssBackground(value: string) {
  const showcaseEl = document.getElementById(showcaseId);
  const baseColor = document.getElementById(baseColorsId);
  const hslValue = hexToHsl(value);

  baseColor?.style.setProperty("--heroui-background", hslValue);
  showcaseEl?.style.setProperty("--heroui-background", hslValue);
}

export function setCssFontSize(type: keyof ConfigLayout["fontSize"], value: string) {
  const el = document.getElementById(showcaseId);

  el?.style.setProperty(`--heroui-font-size-${type}`, `${value}rem`);
}

export function setCssLineHeight(type: keyof ConfigLayout["lineHeight"], value: string) {
  const el = document.getElementById(showcaseId);

  el?.style.setProperty(`--heroui-line-height-${type}`, `${value}rem`);
}

export function setCssRadius(type: keyof ConfigLayout["radius"], value: string) {
  const el = document.getElementById(showcaseId);

  el?.style.setProperty(`--heroui-radius-${type}`, `${value}rem`);
}

export function setCssBorderWidth(type: keyof ConfigLayout["borderWidth"], value: string) {
  const el = document.getElementById(showcaseId);

  el?.style.setProperty(`--heroui-border-width-${type}`, `${value}px`);
}

export function setCssContentColor(level: 1 | 2 | 3 | 4, value: string, heroValue: string) {
  const showcaseEl = document.getElementById(showcaseId);
  const baseColorEl = document.getElementById(baseColorsId);
  const configurationContainer = document.getElementById("configuration-container");

  const hslValue = hexToHsl(value);
  const heroHslValue = hexToHsl(heroValue);

  showcaseEl?.style.setProperty(`--heroui-content${level}`, hslValue);
  showcaseEl?.style.setProperty(
    `--heroui-content${level}-foreground`,
    hexToHsl(readableColor(value)),
  );
  baseColorEl?.style.setProperty(`--heroui-content${level}`, hslValue);
  baseColorEl?.style.setProperty(
    `--heroui-content${level}-foreground`,
    hexToHsl(readableColor(value)),
  );

  configurationContainer?.style.setProperty(`--heroui-content${level}`, heroHslValue);
  configurationContainer?.style.setProperty(
    `--heroui-content${level}-foreground`,
    hexToHsl(readableColor(heroValue)),
  );
}

export function setCssOtherColor(
  type: "background" | "foreground" | "focus" | "overlay",
  value: string,
) {
  const showcaseEl = document.getElementById(showcaseId);
  const otherColors = document.getElementById(otherColorsId);
  const hslValue = hexToHsl(value);

  otherColors?.style.setProperty(`--heroui-${type}`, hslValue);
  showcaseEl?.style.setProperty(`--heroui-${type}`, hslValue);
}

export function setOtherCssParams(type: keyof ConfigLayout["otherParams"], value: string) {
  const el = document.getElementById(showcaseId);

  if (!el) return;

  switch (type) {
    case "disabledOpacity":
      el.style.setProperty("--heroui-disabled-opacity", value);
      break;
    case "dividerWeight":
      el.style.setProperty("--heroui-divider-weight", `${value}px`);
      break;
    case "hoverOpacity":
      el.style.setProperty("--heroui-hover-opacity", value);
      break;
  }
}

export function setAllCssVars(config: Config, theme: ThemeType) {
  if (!config[theme] || !config[theme].baseColor || !config[theme].layoutColor || !config.layout) {
    // eslint-disable-next-line no-console
    console.error("Invalid configuration or theme provided.");

    return;
  }

  setCssColor(
    "default",
    config[theme].defaultColor.default,
    templates[0].value[theme].defaultColor.default,
    theme,
  );
  setCssColor(
    "primary",
    config[theme].baseColor.primary,
    templates[0].value[theme].baseColor.primary,
    theme,
  );
  setCssColor(
    "secondary",
    config[theme].baseColor.secondary,
    templates[0].value[theme].baseColor.secondary,
    theme,
  );
  setCssColor(
    "success",
    config[theme].baseColor.success,
    templates[0].value[theme].baseColor.success,
    theme,
  );
  setCssColor(
    "warning",
    config[theme].baseColor.warning,
    templates[0].value[theme].baseColor.warning,
    theme,
  );
  setCssColor(
    "danger",
    config[theme].baseColor.danger,
    templates[0].value[theme].baseColor.danger,
    theme,
  );
  setCssColor(
    "foreground",
    config[theme].layoutColor.foreground,
    templates[0].value[theme].layoutColor.foreground,
    theme,
  );
  setCssContentColor(
    1,
    config[theme].contentColor.content1,
    templates[0].value[theme].contentColor.content1,
  );
  setCssContentColor(
    2,
    config[theme].contentColor.content2,
    templates[0].value[theme].contentColor.content2,
  );
  setCssContentColor(
    3,
    config[theme].contentColor.content3,
    templates[0].value[theme].contentColor.content3,
  );
  setCssContentColor(
    4,
    config[theme].contentColor.content4,
    templates[0].value[theme].contentColor.content4,
  );
  setCssBackground(config[theme].layoutColor.background);
  setCssFontSize("tiny", config.layout.fontSize.tiny);
  setCssFontSize("small", config.layout.fontSize.small);
  setCssFontSize("medium", config.layout.fontSize.medium);
  setCssFontSize("large", config.layout.fontSize.large);
  setCssLineHeight("tiny", config.layout.lineHeight.tiny);
  setCssLineHeight("small", config.layout.lineHeight.small);
  setCssLineHeight("medium", config.layout.lineHeight.medium);
  setCssLineHeight("large", config.layout.lineHeight.large);
  setCssRadius("small", config.layout.radius.small);
  setCssRadius("medium", config.layout.radius.medium);
  setCssRadius("large", config.layout.radius.large);
  setCssBorderWidth("small", config.layout.borderWidth.small);
  setCssBorderWidth("medium", config.layout.borderWidth.medium);
  setCssBorderWidth("large", config.layout.borderWidth.large);
  setCssOtherColor("focus", config[theme].layoutColor.focus);
  setCssOtherColor("overlay", config[theme].layoutColor.overlay);
  setOtherCssParams("disabledOpacity", config.layout.otherParams.disabledOpacity);
  setOtherCssParams("dividerWeight", config.layout.otherParams.dividerWeight);
  setOtherCssParams("hoverOpacity", config.layout.otherParams.hoverOpacity);
}
