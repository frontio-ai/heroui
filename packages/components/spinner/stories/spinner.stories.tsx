import React from "react";
import {Meta} from "@storybook/react";
import {spinner} from "@heroui/theme";

import {Spinner, SpinnerProps} from "../src";

export default {
  title: "Components/Spinner",
  component: Spinner,
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    labelColor: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: {
        type: "select",
      },
      options: ["default", "gradient", "spinner", "wave", "dots"],
    },
  },
  decorators: [
    (Story) => (
      <div className="ml-4">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Spinner>;

const defaultProps = {
  ...spinner.defaultVariants,
};

const VariantsTemplate = (args: SpinnerProps) => {
  return (
    <div className="flex flex-wrap items-end gap-8 py-4">
      <Spinner {...args} label="default" variant="default" />
      <Spinner {...args} label="gradient" variant="gradient" />
      <Spinner {...args} label="spinner" variant="spinner" />
      <Spinner {...args} label="wave" variant="wave" />
      <Spinner {...args} label="dots" variant="dots" />
    </div>
  );
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const WithLabel = {
  args: {
    ...defaultProps,
    label: "Loading...",
  },
};

export const Variants = {
  args: {
    ...defaultProps,
    classNames: {
      label: "text-primary-400 mt-4",
    },
  },

  render: VariantsTemplate,
};
