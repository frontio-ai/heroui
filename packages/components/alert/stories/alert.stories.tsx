import React from "react";
import {Meta} from "@storybook/react";
import {alert} from "@nextui-org/theme";

import {Alert} from "../src";

export default {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Alert>;

const defaultProps = {
  ...alert.defaultVariants,
  title: "Email Sent!!",
  description: "You will get a reply soon",
};

const Template = (args) => <Alert {...args} />;

const ColorTemplate = (args) => {
  return (
    <div className="flex flex-col">
      {["default", "primary", "secondary", "success", "warning", "danger"].map((color) => (
        <div key={color} className="w-full flex justify-between items-center my-3">
          <h4 className="h4 mx-4 text-md">{color}</h4>
          <Alert {...args} color={color} />
        </div>
      ))}
    </div>
  );
};
const RadiusTemplate = (args) => {
  return (
    <div className="flex flex-col">
      {["none", "sm", "md", "lg", "full"].map((radius) => (
        <div key={radius} className="w-full flex justify-between items-center my-3">
          <h4 className="h4 mx-4 text-md">{radius}</h4>
          <Alert {...args} radius={radius} />
        </div>
      ))}
    </div>
  );
};

const isClosableTemplate = (args) => {
  return (
    <div className="flex flex-col">
      <div className="w-full flex items-center my-3">
        <h2 className="my-2 mx-3">isClosable = true</h2>
        <Alert {...args} isClosable={true} />
      </div>
      <div className="w-full flex items-center my-3">
        <h2 className="my-2 mx-3">isClosable = false</h2>
        <Alert {...args} isClosable={false} />
      </div>
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
export const Color = {
  render: ColorTemplate,
  args: {
    ...defaultProps,
  },
};
export const Radius = {
  render: RadiusTemplate,
  args: {
    ...defaultProps,
  },
};
export const isClosable = {
  render: isClosableTemplate,
  args: {
    ...defaultProps,
  },
};
