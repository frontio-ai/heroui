import {initialDarkTheme, initialLayout, initialLightTheme} from "../constants";
import {Config} from "../types";

export const emerald: Config = {
  light: {
    defaultColor: {
      default: "#b9c9be",
    },
    baseColor: {
      primary: "#66cc8a",
      secondary: "#377cfb",
      success: "#00a96e",
      warning: "#ffbe00",
      danger: "#ff5861",
    },
    layoutColor: {
      foreground: "#004c1b",
      background: "#f6fffa",
      focus: "#66cc8a",
      overlay: initialLightTheme.layoutColor.overlay,
    },
    contentColor: {
      content1: "#e0f5e8",
      content2: "#c2ebd0",
      content3: "#a3e0b9",
      content4: "#85d6a1",
    },
  },
  dark: {
    defaultColor: {
      default: "#485248",
    },
    baseColor: {
      primary: "#66cc8a",
      secondary: "#377cfb",
      success: "#00a96e",
      warning: "#ffbe00",
      danger: "#ff5861",
    },
    layoutColor: {
      foreground: "#99d2ad",
      background: "#010b06",
      focus: "#66cc8a",
      overlay: initialDarkTheme.layoutColor.overlay,
    },
    contentColor: {
      content1: "#14291c",
      content2: "#295237",
      content3: "#3d7a53",
      content4: "#52a36e",
    },
  },
  layout: initialLayout,
};
