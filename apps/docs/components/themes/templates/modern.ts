import {colors} from "@heroui/theme";

import {initialLayout} from "../constants";
import {Config} from "../types";

export const modern: Config = {
  light: {
    defaultColor: {
      default: "#897cc5",
    },
    baseColor: {
      primary: "#7828c8",
      secondary: "#5271ff",
      success: "#1bc47d",
      warning: "#ffb100",
      danger: "#ff4f4f",
    },
    layoutColor: {
      foreground: "#4a3d77",
      background: "#f9f7fd",
      overlay: colors.black,
      focus: "#7828c8",
    },
    contentColor: {
      content1: "#f2e8ff",
      content2: "#e8daff",
      content3: "#dccbff",
      content4: "#cfbcff",
    },
  },
  dark: {
    defaultColor: {
      default: "#282135",
    },
    baseColor: {
      primary: "#9353d3",
      secondary: "#637aff",
      success: "#23d98d",
      warning: "#ffca3a",
      danger: "#ff6b6b",
    },
    layoutColor: {
      foreground: "#d0aaff",
      background: "#1b1526",
      overlay: colors.white,
      focus: "#9353d3",
    },
    contentColor: {
      content1: "#392a4a",
      content2: "#4c3560",
      content3: "#5e4180",
      content4: "#704ea0",
    },
  },
  layout: initialLayout,
};
