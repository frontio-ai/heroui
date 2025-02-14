import {Meta} from "@storybook/react";
import {kbd} from "@heroui/theme";

import {Kbd} from "../src";

export default {
  title: "Components/Kbd",
  component: Kbd,
  argTypes: {
    keys: {
      control: {
        type: "select",
      },
      options: [
        "command",
        "shift",
        "ctrl",
        "option",
        "enter",
        "delete",
        "escape",
        "tab",
        "capslock",
        "up",
        "right",
        "down",
        "left",
        "pageup",
        "pagedown",
        "home",
        "end",
        "help",
        "space",
        "fn",
        "win",
        "alt",
      ],
    },
  },
} as Meta<typeof Kbd>;

const defaultProps = {
  ...kbd.defaultVariants,
  keys: ["command"],
};

export const Default = {
  args: {
    ...defaultProps,
    children: "K",
  },
};
