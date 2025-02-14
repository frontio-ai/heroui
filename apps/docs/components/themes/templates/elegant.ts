import {colors} from "@heroui/theme";

import {initialLayout} from "../constants";
import {Config} from "../types";

export const elegant: Config = {
  light: {
    defaultColor: {
      default: "#8f8f8f",
    },
    baseColor: {
      primary: "#000000",
      secondary: "#d1c4e9",
      success: "#81c784",
      warning: "#ffb74d",
      danger: "#e57373",
    },
    layoutColor: {
      foreground: "#4a4a4a",
      background: "#ffffff",
      overlay: colors.black,
      focus: "#db924b",
    },
    contentColor: {
      content1: "#f0f0f0",
      content2: "#e6e6e6",
      content3: "#dcdcdc",
      content4: "#d2d2d2",
    },
  },
  dark: {
    defaultColor: {
      default: "#8f8f8f",
    },
    baseColor: {
      primary: "#FFFFFF",
      secondary: "#5e5e5e",
      success: "#388e3c",
      warning: "#f57c00",
      danger: "#d32f2f",
    },
    layoutColor: {
      foreground: "#b0b0b0",
      background: "#000000",
      overlay: colors.white,
      focus: "#000000",
    },
    contentColor: {
      content1: "#2a2a2a",
      content2: "#3b3b3b",
      content3: "#4c4c4c",
      content4: "#5d5d5d",
    },
  },
  layout: initialLayout,
};
