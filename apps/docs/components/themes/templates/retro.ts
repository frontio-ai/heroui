import {colors} from "@heroui/theme";

import {initialLayout} from "../constants";
import {Config} from "../types";

export const retro: Config = {
  light: {
    defaultColor: {
      default: "#ffcf77",
    },
    baseColor: {
      primary: "#FFD34E",
      secondary: "#EE457E",
      success: "#4CAF50",
      warning: "#FF9800",
      danger: "#F44336",
    },
    layoutColor: {
      foreground: "#5A4A42",
      background: "#F4E8D1",
      overlay: colors.black,
      focus: "#FFD34E",
    },
    contentColor: {
      content1: "#FBEEC1",
      content2: "#F7D8A5",
      content3: "#F4C68B",
      content4: "#F2B572",
    },
  },
  dark: {
    defaultColor: {
      default: "#a58956",
    },
    baseColor: {
      primary: "#FFD34E",
      secondary: "#EE457E",
      success: "#4CAF50",
      warning: "#FF9800",
      danger: "#F44336",
    },
    layoutColor: {
      foreground: "#000000",
      background: "#E1CA9E",
      overlay: colors.white,
      focus: "#FFD34E",
    },
    contentColor: {
      content1: "#634832",
      content2: "#755C44",
      content3: "#887059",
      content4: "#9A846E",
    },
  },
  layout: initialLayout,
};
