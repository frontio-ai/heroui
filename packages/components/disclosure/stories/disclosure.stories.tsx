import React from "react";
import {Meta} from "@storybook/react";
import {button, disclosure} from "@heroui/theme";
import {Avatar} from "@heroui/avatar";
import {Button} from "@heroui/button";
import {Input, Textarea} from "@heroui/input";
import {MonitorMobileIcon, MoonIcon} from "@heroui/shared-icons";

import {Disclosure, DisclosureProps} from "../src";

export default {
  title: "Components/Disclosure",
  component: Disclosure,
  argTypes: {
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof Disclosure>;

const defaultProps = {
  ...disclosure.defaultVariants,
};

const defaultContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamcolaboris nisi ut aliquip ex ea commodo consequat.";

const Template = (args: DisclosureProps) => (
  <Disclosure {...args} title="Disclosure Title">
    {defaultContent}
  </Disclosure>
);

const TemplateWithStartContent = () => (
  <Disclosure
    aria-label="Chung Miller"
    id="1"
    startContent={
      <Avatar
        isBordered
        color="primary"
        radius="lg"
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
      />
    }
    subtitle="4 unread messages"
    title="Chung Miller"
  >
    {defaultContent}
  </Disclosure>
);

const WithFormTemplate = (args: DisclosureProps) => {
  const form = (
    <form className="flex flex-col gap-4 p-2">
      <Input
        isRequired
        label="Email"
        placeholder="Enter your email"
        type="email"
        onValueChange={(value) =>
          // eslint-disable-next-line no-console
          console.log(value)
        }
      />
      <Input isRequired label="Password" placeholder="Enter your password" type="password" />
      <Textarea label="Message" placeholder="Enter your message" />
      <div className="flex gap-2 justify-end">
        <button className={button({color: "primary"})}>Login</button>
      </div>
    </form>
  );

  return (
    <Disclosure {...args} title="Disclosure With Form">
      {form}
    </Disclosure>
  );
};

const CustomAnimationTemplate = (args: DisclosureProps) => {
  const classNames = {
    content: "ease-soft-spring",
  };

  return (
    <>
      <Disclosure {...args} classNames={classNames} title="Custom Animation Disclosure">
        {defaultContent}
      </Disclosure>
    </>
  );
};

const CustomInidicatorTemplate = () => (
  <Disclosure aria-label="Moon" id="moon" indicator={<MoonIcon />} title="Moon Icon Disclosure">
    {defaultContent}
  </Disclosure>
);

const ControlledTemplate = () => {
  const [isExpanded, onExpandedChange] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button
          onPress={() => {
            onExpandedChange(!isExpanded);
          }}
        >
          Click
        </Button>
      </div>
      <Disclosure
        isExpanded={isExpanded}
        title="Controlled Disclosure"
        onExpandedChange={onExpandedChange}
      >
        {defaultContent}
      </Disclosure>
    </div>
  );
};

const CustomWithClassNamesTemplate = () => {
  const classNames: DisclosureProps["classNames"] = {
    base: "py-0 w-full",
    title: "font-normal text-base",
    trigger: "data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center border p-4",
    indicator: "text-base",
    content: "text-sm px-2",
  };

  return (
    <Disclosure
      aria-label="Connected devices"
      classNames={classNames}
      id="1"
      startContent={<MonitorMobileIcon className="text-primary" />}
      subtitle={
        <p className="flex">
          2 issues to&nbsp;<span className="text-primary">fix now</span>
        </p>
      }
      title="Connected devices"
    >
      {defaultContent}
    </Disclosure>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const WithSubtitle = {
  render: Template,
  args: {
    ...defaultProps,
    subtitle: "disclosure subtitle",
  },
};

export const IsCompact = {
  render: Template,

  args: {
    ...defaultProps,
    isCompact: true,
  },
};

export const DefaultExpanded = {
  render: Template,

  args: {
    ...defaultProps,
    defaultExpanded: true,
  },
};

export const KeepContentMounted = {
  render: Template,

  args: {
    ...defaultProps,
    keepContentMounted: true,
  },
};

export const isDisabled = {
  render: Template,

  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const WithStartContent = {
  render: TemplateWithStartContent,

  args: {
    ...defaultProps,
  },
};

export const WithForm = {
  render: WithFormTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomMotion = {
  render: CustomAnimationTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomIndicator = {
  render: CustomInidicatorTemplate,

  args: {
    ...defaultProps,
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomWithClassNames = {
  render: CustomWithClassNamesTemplate,

  args: {
    ...defaultProps,
  },
};
