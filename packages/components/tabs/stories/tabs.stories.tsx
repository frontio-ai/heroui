import React from "react";
import {Meta} from "@storybook/react";
import {button, link, tabs} from "@heroui/theme";
import Lorem from "react-lorem-component";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {Card, CardBody} from "@heroui/card";
import {
  AlignVerticallyBoldIcon,
  AlignHorizontallyBoldIcon,
  AlignBottomBoldIcon,
  AlignLeftBoldIcon,
  AlignRightBoldIcon,
  AlignTopBoldIcon,
  ChevronDownIcon,
} from "@heroui/shared-icons";

import {Tabs, Tab, TabsProps} from "../src";

export default {
  title: "Components/Tabs",
  component: Tabs,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "underlined", "bordered", "light"],
    },
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
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof Tabs>;

const defaultProps = {
  ...tabs.defaultVariants,
};

const StaticTemplate = (args: TabsProps) => (
  <Tabs aria-label="Tabs example" {...args}>
    <Tab key="world" title="World">
      <Lorem count={1} sentenceUpperBound={20} />
    </Tab>
    <Tab key="ny" title="N.Y">
      <Lorem count={1} sentenceUpperBound={30} />
    </Tab>
    <Tab key="business" title="Business">
      <Lorem count={1} sentenceUpperBound={10} />
    </Tab>
    <Tab key="arts" title="Arts">
      <Lorem count={1} sentenceUpperBound={50} />
    </Tab>
    <Tab key="science" title="Science">
      <Lorem count={1} sentenceUpperBound={24} />
    </Tab>
  </Tabs>
);

const TabsWithNavigationButtonTemplate = (args: TabsProps) => (
  <>
    <Tabs aria-label="Tabs with many items" {...args}>
      {[...Array(25)].map((_, index) => (
        <Tab key={`tab-${index + 1}`} title={`Tab ${index + 1}`}>
          <Lorem count={1} sentenceUpperBound={5} />
        </Tab>
      ))}
    </Tabs>

    <div className="my-4">Custom More Icon</div>
    <Tabs aria-label="Tabs with many items" {...args} moreIcon={ChevronDownIcon}>
      {[...Array(25)].map((_, index) => (
        <Tab key={`tab-${index + 1}`} title={`Tab ${index + 1}`}>
          <Lorem count={1} sentenceUpperBound={5} />
        </Tab>
      ))}
    </Tabs>

    <div className="my-4">Tabs with 1000 items</div>
    <Tabs aria-label="Tabs with many items" {...args}>
      {[...Array(1000)].map((_, index) => (
        <Tab key={`tab-${index + 1}`} title={`Tab ${index + 1}`}>
          <Lorem count={1} sentenceUpperBound={5} />
        </Tab>
      ))}
    </Tabs>
  </>
);

const WithIconsTemplate = (args: TabsProps) => (
  <Tabs
    aria-label="Tabs example"
    {...args}
    classNames={{
      tab: "text-lg",
    }}
  >
    <Tab key="align-left" title={<AlignLeftBoldIcon />} titleValue="Align left" />
    <Tab key="align-vertically" title={<AlignVerticallyBoldIcon />} titleValue="Align vertically" />
    <Tab key="align-right" title={<AlignRightBoldIcon />} titleValue="Align right" />
    <Tab key="align-top" title={<AlignTopBoldIcon />} titleValue="Align top" />
    <Tab
      key="align-horizontally"
      title={<AlignHorizontallyBoldIcon />}
      titleValue="Align horizontally"
    />
    <Tab key="align-bottom" title={<AlignBottomBoldIcon />} titleValue="Align bottom" />
  </Tabs>
);

const ControlledTemplate = (args: TabsProps) => {
  const [selected, setSelected] = React.useState<React.Key>("world");

  return (
    <div className="flex flex-col gap-2">
      <Tabs
        aria-label="Tabs example"
        {...args}
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key="world" title="World">
          <Lorem count={1} sentenceUpperBound={20} />
        </Tab>
        <Tab key="ny" title="N.Y">
          <Lorem count={1} sentenceUpperBound={30} />
        </Tab>
        <Tab key="business" title="Business">
          <Lorem count={1} sentenceUpperBound={10} />
        </Tab>
        <Tab key="arts" title="Arts">
          <Lorem count={1} sentenceUpperBound={50} />
        </Tab>
        <Tab key="science" title="Science">
          <Lorem count={1} sentenceUpperBound={24} />
        </Tab>
      </Tabs>

      <p className="text-default-500">Selected: {selected}</p>

      <div className="flex gap-2 justify-start">
        <button
          className={button({color: "secondary", variant: "flat"})}
          onClick={() => setSelected("arts")}
        >
          Select &quot;Arts&quot;
        </button>
        <button
          className={button({color: "secondary", variant: "flat"})}
          onClick={() => setSelected("science")}
        >
          Select &quot;Science&quot;
        </button>
      </div>
    </div>
  );
};

type Item = {
  id: string;
  label: string;
  content?: React.ReactNode;
};

const DynamicTemplate = (args: TabsProps<Item>) => {
  let tabs: Item[] = [
    {
      id: "world",
      label: "World",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "ny",
      label: "N.Y.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non diam id libero rutrum aliquam. Sed eget nunc vitae nisl aliquam aliquet. Sed vitae nisl eget nunc aliquam aliquet. Sed eget nunc vitae nisl aliquam aliquet. Sed vitae nisl eget nunc aliquam aliquet. Sed eget nunc vitae nisl aliquam aliquet. ",
    },
    {
      id: "business",
      label: "Business",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non diam id libero rutrum aliquam. Sed eget nunc vitae nisl aliquam aliquet.",
    },
    {
      id: "arts",
      label: "Arts",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non diam id libero rutrum aliquam. Sed eget nunc vitae nisl aliquam aliquet. Sed vitae nisl eget nunc aliquam aliquet. Sed eget nunc vitae nisl aliquam aliquet. Sed vitae nisl eget nunc aliquam aliquet. Sed eget nunc vitae nisl aliquam aliquet. ",
    },
    {
      id: "science",
      label: "Science",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non diam id libero rutrum aliquam. Sed eget nunc vitae nisl aliquam aliquet. Sed vitae nisl eget nunc aliquam aliquet. Sed eget nunc vitae nisl aliquam aliquet. Sed vitae nisl eget nunc aliquam aliquet. Sed eget nunc vitae nisl aliquam aliquet. ",
    },
  ];

  return (
    <Tabs aria-label="Dynamic tabs" {...args} items={tabs}>
      {(item) => (
        <Tab key={item.id} title={item.label}>
          {item.content}
        </Tab>
      )}
    </Tabs>
  );
};

const WithFormTemplate = (args: TabsProps) => {
  const [selected, setSelected] = React.useState<React.Key>("login");

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <Card className="w-[340px] h-[400px]">
        <CardBody>
          <Tabs
            aria-label="Tabs form"
            {...args}
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4">
                <Input isRequired label="Email" placeholder="Enter your email" type="email" />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-sm">
                  Need to create an account?&nbsp;
                  <button className={link({size: "sm"})} onClick={() => setSelected("sign-up")}>
                    Sign up
                  </button>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 h-[300px]">
                <Input isRequired label="Name" placeholder="Enter your name" type="password" />
                <Input isRequired label="Email" placeholder="Enter your email" type="email" />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-sm">
                  Already have an account?&nbsp;
                  <button className={link({size: "sm"})} onClick={() => setSelected("login")}>
                    Login
                  </button>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export const Default = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
  },
};

export const Dynamic = {
  render: DynamicTemplate,

  args: {
    ...defaultProps,
  },
};

export const TabsWithNavigation = {
  render: TabsWithNavigationButtonTemplate,

  args: {
    ...defaultProps,
    variant: "solid",
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithIcons = {
  render: WithIconsTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithForm = {
  render: WithFormTemplate,

  args: {
    ...defaultProps,
    fullWidth: true,
    variant: "underlined",
  },
};

export const ManualKeyboardActivation = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    keyboardActivation: "manual",
  },
};

export const Placement = {
  render: StaticTemplate,

  args: {
    placement: "top",
  },
  argTypes: {
    placement: {
      options: ["top", "bottom", "start", "end"],
      control: {
        type: "inline-radio",
      },
    },
    isVertical: {
      type: "boolean",
    },
  },
};

export const Vertical = {
  render: StaticTemplate,

  args: {
    isVertical: true,
  },
  argTypes: {
    isVertical: {
      type: "boolean",
    },
  },
};

export const DisabledItems = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    disabledKeys: ["ny", "arts"],
  },
};

export const Disabled = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const DisableAnimation = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    disableAnimation: true,
  },
};
