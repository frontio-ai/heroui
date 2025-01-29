import type {Selection} from "@react-types/shared";

import React from "react";
import {Meta} from "@storybook/react";
import {button} from "@heroui/theme";
import {
  AnchorIcon,
  MoonIcon,
  SunIcon,
  InfoIcon,
  ShieldSecurityIcon,
  MonitorMobileIcon,
  InvalidCardIcon,
} from "@heroui/shared-icons";
import {Avatar} from "@heroui/avatar";
import {Input, Textarea} from "@heroui/input";
import {Button} from "@heroui/button";

import {Accordion, AccordionProps, AccordionItem, AccordionItemProps} from "../src";

export default {
  title: "Components/Accordion",
  component: Accordion,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["default", "shadow", "bordered", "splitted"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    allowsMultipleExpanded: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
    showDivider: {
      control: {
        type: "boolean",
      },
    },
    hideIndicator: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof Accordion>;

const defaultProps = {
  allowsMultipleExpanded: false,
};

const defaultContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const Template = (args: AccordionProps) => (
  <Accordion {...args}>
    <AccordionItem aria-label="Accordion 1" id="1" title="Accordion 1">
      {defaultContent}
    </AccordionItem>
    <AccordionItem aria-label="Accordion 2" id="2" title="Accordion 2">
      {defaultContent}
    </AccordionItem>
    <AccordionItem aria-label="Accordion 3" id="3" title="Accordion 3">
      {defaultContent}
    </AccordionItem>
  </Accordion>
);

const TemplateWithSubtitle = (args: AccordionProps) => (
  <Accordion {...args}>
    <AccordionItem aria-label="Accordion 1" id="1" subtitle="Press to expand" title="Accordion 1">
      {defaultContent}
    </AccordionItem>
    <AccordionItem
      aria-label="Accordion 2"
      id="2"
      subtitle={
        <span>
          Press to expand <strong>id 2</strong>
        </span>
      }
      title="Accordion 2"
    >
      {defaultContent}
    </AccordionItem>
    <AccordionItem aria-label="Accordion 3" id="3" subtitle="Press to expand" title="Accordion 3">
      {defaultContent}
    </AccordionItem>
  </Accordion>
);

const TemplateWithStartContent = (args: AccordionProps) => (
  <Accordion {...args} variant="shadow">
    <AccordionItem
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
    </AccordionItem>
    <AccordionItem
      aria-label="Janelle Lenard"
      id="2"
      startContent={
        <Avatar
          isBordered
          color="success"
          radius="lg"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      }
      subtitle="3 incompleted steps"
      title="Janelle Lenard"
    >
      {defaultContent}
    </AccordionItem>
    <AccordionItem
      aria-label="Zoey Lang"
      id="3"
      startContent={
        <Avatar
          isBordered
          color="warning"
          radius="lg"
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
        />
      }
      subtitle={
        <p className="flex">
          2 issues to&nbsp;<span className="text-primary">fix now</span>
        </p>
      }
      title="Zoey Lang"
    >
      {defaultContent}
    </AccordionItem>
  </Accordion>
);

const VariantsTemplate = (args: AccordionProps) => (
  <div className="flex flex-col gap-8 mb-24">
    <div className="flex flex-col gap-4">
      <h3>Default</h3>
      <Accordion {...args}>
        <AccordionItem id="1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem id="2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem id="3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
    <div className="flex flex-col gap-4">
      <h3>Shadow</h3>
      <Accordion {...args} variant="shadow">
        <AccordionItem aria-label="Accordion 1" id="1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem aria-label="Accordion 2" id="2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem aria-label="Accordion 3" id="3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
    <div className="flex flex-col gap-4">
      <h3>Bordered</h3>
      <Accordion {...args} variant="bordered">
        <AccordionItem aria-label="Accordion 1" id="1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem aria-label="Accordion 2" id="2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem aria-label="Accordion 3" id="3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
    <div className="flex flex-col gap-4">
      <h3>Splitted</h3>
      <Accordion {...args} variant="splitted">
        <AccordionItem aria-label="Accordion 1" id="1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem aria-label="Accordion 2" id="2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem aria-label="Accordion 3" id="3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  </div>
);

const CustomAnimationTemplate = (args: AccordionProps) => {
  const classNames = {
    content: "ease-soft-spring",
  };

  return (
    <Accordion {...args}>
      <AccordionItem aria-label="Accordion 1" classNames={classNames} id="1" title="Accordion 1">
        {defaultContent}
      </AccordionItem>
      <AccordionItem aria-label="Accordion 2" classNames={classNames} id="2" title="Accordion 2">
        {defaultContent}
      </AccordionItem>
      <AccordionItem aria-label="Accordion 3" classNames={classNames} id="3" title="Accordion 3">
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
};

const CustomInidicatorTemplate = (args: AccordionProps) => (
  <Accordion {...args}>
    <AccordionItem aria-label="Anchor" id="anchor" indicator={<AnchorIcon />} title="Anchor">
      {defaultContent}
    </AccordionItem>
    <AccordionItem aria-label="Moon" id="moon" indicator={<MoonIcon />} title="Moon">
      {defaultContent}
    </AccordionItem>
    <AccordionItem aria-label="Sun" id="sun" indicator={<SunIcon />} title="Sun">
      {defaultContent}
    </AccordionItem>
  </Accordion>
);

const ControlledTemplate = (args: AccordionProps) => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["1"]));

  // eslint-disable-next-line no-console
  console.log(selectedKeys);

  return (
    <div className="flex flex-col gap-4">
      <Accordion {...args} expandedKeys={selectedKeys}>
        <AccordionItem aria-label="Accordion 1" id="1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem aria-label="Accordion 2" id="2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem aria-label="Accordion 3" id="3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>

      <div className="flex gap-2">
        <Button
          onPress={() => {
            setSelectedKeys(new Set(["1"]));
          }}
        >
          Open 1
        </Button>
        <Button
          onPress={() => {
            setSelectedKeys(new Set(["2"]));
          }}
        >
          Open 2
        </Button>
        <Button
          onPress={() => {
            setSelectedKeys(new Set(["3"]));
          }}
        >
          Open 3
        </Button>
      </div>
    </div>
  );
};

const CustomWithClassNamesTemplate = (args: AccordionProps) => {
  const itemClasses: AccordionItemProps["classNames"] = {
    base: "py-0 w-full",
    title: "font-normal text-base",
    trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-base",
    content: "text-sm px-2",
  };

  return (
    <Accordion
      {...args}
      className="p-2 flex flex-col gap-1 w-full max-w-[300px]"
      showDivider={false}
      variant="shadow"
    >
      <AccordionItem
        aria-label="Connected devices"
        classNames={itemClasses}
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
      </AccordionItem>
      <AccordionItem
        aria-label="Apps Permissions"
        classNames={itemClasses}
        id="2"
        startContent={<ShieldSecurityIcon />}
        subtitle="3 apps have read permissions"
        title="Apps Permissions"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        aria-label="Pending tasks"
        classNames={{...itemClasses, subtitle: "text-warning"}}
        id="3"
        startContent={<InfoIcon className="text-warning" />}
        subtitle="Complete your profile"
        title="Pending tasks"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        aria-label="Card expired"
        classNames={{...itemClasses, subtitle: "text-danger"}}
        id="4"
        startContent={<InvalidCardIcon className="text-danger" />}
        subtitle="Please, update now"
        title={"Card expired"}
      >
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
};

const WithFormTemplate = (args: AccordionProps) => {
  const form = (
    <form className="flex flex-col gap-4">
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
    <Accordion {...args}>
      <AccordionItem aria-label="Accordion 1" id="1" title="Accordion 1">
        {form}
      </AccordionItem>
      <AccordionItem aria-label="Accordion 2" id="2" title="Accordion 2">
        {defaultContent}
      </AccordionItem>
      <AccordionItem aria-label="Accordion 3" id="3" title="Accordion 3">
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
};

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const IsCompact = {
  render: Template,

  args: {
    ...defaultProps,
    isCompact: true,
  },
};

export const Multiple = {
  render: Template,

  args: {
    ...defaultProps,
    allowsMultipleExpanded: "multiple",
  },
};

export const DefaultExpanded = {
  render: Template,

  args: {
    ...defaultProps,
    defaultExpandedKeys: ["2"],
  },
};

export const KeepContentMounted = {
  render: Template,

  args: {
    ...defaultProps,
    keepContentMounted: true,
  },
};

export const DisabledKeys = {
  render: Template,

  args: {
    ...defaultProps,
    disabledKeys: ["2"],
  },
};

export const WithSubtitle = {
  render: TemplateWithSubtitle,

  args: {
    ...defaultProps,
  },
};

export const WithStartContent = {
  render: TemplateWithStartContent,

  args: {
    ...defaultProps,
  },
};

export const Variants = {
  render: VariantsTemplate,

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
