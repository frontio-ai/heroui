import React from "react";
import {Meta} from "@storybook/react";
import {popover} from "@heroui/theme";
import {Button} from "@heroui/button";

import {Tooltip, TooltipProps} from "../src";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "bordered", "light", "flat", "faded", "shadow"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["default", "foreground", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    showArrow: {
      control: {
        type: "boolean",
      },
    },
    placement: {
      control: {
        type: "select",
      },
      options: [
        "top",
        "bottom",
        "right",
        "left",
        "top-start",
        "top-end",
        "bottom-start",
        "bottom-end",
        "left-start",
        "left-end",
        "right-start",
        "right-end",
      ],
    },
    delay: {
      control: {
        type: "number",
      },
    },
    offset: {
      control: {
        type: "number",
      },
    },
    defaultOpen: {
      control: {
        type: "boolean",
      },
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
    children: {
      control: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Tooltip>;

const defaultProps = {
  ...popover.defaultVariants,
  placement: "top",
  delay: 0,
  offset: 7,
  defaultOpen: false,
  isDisabled: false,
  content: "I am a tooltip",
  children: <Button>Hover me</Button>,
};

const DelayTemplate = (args: TooltipProps) => (
  <div className="flex gap-2">
    <Tooltip {...args} content="Tooltip 1" delay={1000}>
      <Button color="success" variant="faded">
        Delay Open (1000ms)
      </Button>
    </Tooltip>
    <Tooltip {...args} closeDelay={2000} content="Tooltip 2">
      <Button color="success" variant="faded">
        Delay Close (2000ms)
      </Button>
    </Tooltip>
  </div>
);

const OpenChangeTemplate = (args: TooltipProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Tooltip {...args} onOpenChange={(open) => setIsOpen(open)}>
        <Button>Hover me</Button>
      </Tooltip>
      <p className="text-sm">isOpen: {isOpen ? "true" : "false"}</p>
    </div>
  );
};

const OffsetTemplate = (args: TooltipProps) => (
  <div className="flex gap-2">
    <Tooltip {...args} content="Tooltip 1">
      <Button color="secondary" variant="faded">
        Default offset (7)
      </Button>
    </Tooltip>
    <Tooltip {...args} content="Tooltip 2" offset={15}>
      <Button color="secondary" variant="faded">
        15 offset
      </Button>
    </Tooltip>
    <Tooltip {...args} content="Tooltip 3" offset={-7}>
      <Button color="secondary" variant="faded">
        -7 offset
      </Button>
    </Tooltip>
  </div>
);

const MultipleTemplate = (args: TooltipProps) => (
  <div className="flex gap-2">
    <Tooltip {...args} content="Tooltip 1" delay={1000}>
      <Button>Hover me (delay 1000ms)</Button>
    </Tooltip>
    <Tooltip {...args} content="Tooltip 2">
      <Button>Then hover me</Button>
    </Tooltip>
  </div>
);

const PlacementsTemplate = (args: TooltipProps) => {
  return (
    <div className="inline-grid grid-cols-3 gap-4">
      <Tooltip {...args} content="Top Start" placement="top-start">
        <Button color="primary" variant="flat">
          Top Start
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Top">
        <Button color="primary" variant="flat">
          Top
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Top End" placement="top-end">
        <Button color="primary" variant="flat">
          Top End
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Bottom Start" placement="bottom-start">
        <Button color="primary" variant="flat">
          Bottom Start
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Bottom" placement="bottom">
        <Button color="primary" variant="flat">
          Bottom
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Bottom End" placement="bottom-end">
        <Button color="primary" variant="flat">
          Bottom End
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Right Start" placement="right-start">
        <Button color="primary" variant="flat">
          Right Start
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Right" placement="right">
        <Button color="primary" variant="flat">
          Right
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Right End" placement="right-end">
        <Button color="primary" variant="flat">
          Right End
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Left Start" placement="left-start">
        <Button color="primary" variant="flat">
          Left Start
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Left" placement="left">
        <Button color="primary" variant="flat">
          Left
        </Button>
      </Tooltip>

      <Tooltip {...args} content="Left End" placement="left-end">
        <Button color="primary" variant="flat">
          Left End
        </Button>
      </Tooltip>
    </div>
  );
};

const ControlledTemplate = (args: TooltipProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    // eslint-disable-next-line no-console
    console.log("handleOpen");
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Tooltip {...args} content="Tooltip 1" isOpen={isOpen}>
        <Button onPress={handleOpen}>{isOpen ? "Close" : "Open"}</Button>
      </Tooltip>
    </div>
  );
};

const ManyTemplate = (args: TooltipProps) => (
  <div className="flex flex-col gap-2">
    <Tooltip {...args} closeDelay={0} content="Tooltip 1" openDelay={0}>
      <Button>Hover me</Button>
    </Tooltip>
    <Tooltip {...args} closeDelay={0} content="Tooltip 2" openDelay={0}>
      <Button>Then hover me</Button>
    </Tooltip>
    <Tooltip {...args} closeDelay={0} content="Tooltip 3" openDelay={0}>
      <Button>Then hover me</Button>
    </Tooltip>
    <Tooltip {...args} closeDelay={0} content="Tooltip 4" openDelay={0}>
      <Button>Then hover me</Button>
    </Tooltip>
    <Tooltip {...args} closeDelay={0} content="Tooltip 5" openDelay={0}>
      <Button>Then hover me</Button>
    </Tooltip>
    <Tooltip {...args} closeDelay={0} content="Tooltip 6" openDelay={0}>
      <Button>Then hover me</Button>
    </Tooltip>
    <Tooltip {...args} closeDelay={0} content="Tooltip 7" openDelay={0}>
      <Button>Then hover me</Button>
    </Tooltip>
    <Tooltip {...args} closeDelay={0} content="Tooltip 8" openDelay={0}>
      <Button>Then hover me</Button>
    </Tooltip>
  </div>
);

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const DisableAnimation = {
  args: {
    ...defaultProps,
    disableAnimation: true,
  },
};

export const WithArrow = {
  args: {
    ...defaultProps,
    showArrow: true,
  },
};

export const OpenChange = {
  render: OpenChangeTemplate,

  args: {
    ...defaultProps,
  },
};

export const Placements = {
  render: PlacementsTemplate,

  args: {
    ...defaultProps,
    color: "primary",
  },
};

export const WithOffset = {
  render: OffsetTemplate,

  args: {
    ...defaultProps,
    color: "secondary",
  },
};

export const withDelay = {
  render: DelayTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomContent = {
  args: {
    ...defaultProps,
    shouldCloseOnInteractOutside: false,
    content: (
      <div className="px-1 py-2">
        <div className="text-sm font-bold">Custom Content</div>
        <div className="text-xs">This is a custom tooltip content</div>
      </div>
    ),
  },
};

export const CustomMotion = {
  args: {
    ...defaultProps,
    motionProps: {
      variants: {
        exit: {
          opacity: 0,
          transition: {
            opacity: {duration: 0.1, easings: "easeInOut"},
          },
        },
        enter: {
          opacity: 1,
          transition: {
            opacity: {easings: "easeOut", duration: 0.15},
          },
        },
      },
    },
  },
};

export const Multiple = {
  render: MultipleTemplate,

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

export const DefaultOpen = {
  args: {
    ...defaultProps,
    defaultOpen: true,
  },
};

export const AlwaysOpen = {
  args: {
    ...defaultProps,
    isOpen: true,
    showArrow: true,
    content: (
      <div className="px-1 py-2">
        <div className="text-sm font-bold">Custom Content</div>
        <div className="text-xs">This is a custom tooltip content</div>
      </div>
    ),
  },
};

export const Disabled = {
  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const Many = {
  render: ManyTemplate,

  args: {
    ...defaultProps,
  },
};
