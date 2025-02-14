import {colors} from "@heroui/theme";

import {initialLayout} from "../constants";
import {Config} from "../types";

export const coffee: Config = {
  light: {
    defaultColor: {
      default: "#b4afa8",
    },
    baseColor: {
      primary: "#db924b",
      secondary: "#5a8486",
      success: "#9db787",
      warning: "#ffd25f",
      danger: "#fc9581",
    },
    layoutColor: {
      foreground: "#a27225",
      background: "#fffbf6",
      overlay: colors.black,
      focus: "#db924b",
    },
    contentColor: {
      content1: "#fff2e0",
      content2: "#ffe9cc",
      content3: "#ffe0b8",
      content4: "#ffd7a3",
    },
  },
  dark: {
    defaultColor: {
      default: "#413841",
    },
    baseColor: {
      primary: "#db924b",
      secondary: "#5a8486",
      success: "#9db787",
      warning: "#ffd25f",
      danger: "#fc9581",
    },
    layoutColor: {
      foreground: "#c59f60",
      background: "#20161F",
      focus: "#db924b",
      overlay: colors.white,
    },
    contentColor: {
      content1: "#2c1f2b",
      content2: "#3e2b3c",
      content3: "#50374d",
      content4: "#62435f",
    },
  },
  layout: initialLayout,
};
