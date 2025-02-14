import React from "react";
import {Meta} from "@storybook/react";
import {dropdown, popover} from "@heroui/theme";
import {Button} from "@heroui/button";
import {Avatar} from "@heroui/avatar";
import {User} from "@heroui/user";
import {
  AddNoteBulkIcon,
  CopyDocumentBulkIcon,
  EditDocumentBulkIcon,
  DeleteDocumentBulkIcon,
} from "@heroui/shared-icons";
import {clsx} from "@heroui/shared-utils";

import {
  Dropdown,
  DropdownSection,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownProps,
  DropdownMenuProps,
} from "../src";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "bordered", "light", "flat", "faded", "shadow"],
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
    backdrop: {
      control: {
        type: "select",
      },
      options: ["transparent", "blur", "opaque"],
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
    showArrow: {
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
    shouldBlockScroll: {
      control: {
        type: "boolean",
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
} as Meta<typeof Dropdown>;

const defaultProps = {
  ...popover.defaultVariants,
  ...dropdown.defaultVariants,
  placement: "bottom",
  offset: 7,
  isDisabled: false,
  defaultOpen: false,
};

const items = [
  {
    key: "new",
    label: "New file",
  },
  {
    key: "copy",
    label: "Copy link",
  },
  {
    key: "edit",
    label: "Edit file",
  },
  {
    key: "delete",
    label: "Delete file",
  },
];

const Template = ({
  color,
  variant,
  label = "Trigger",
  ...args
}: DropdownProps & DropdownMenuProps & {label: string}) => (
  <Dropdown {...args}>
    <DropdownTrigger>
      <Button>{label}</Button>
    </DropdownTrigger>
    <DropdownMenu aria-label="Actions" color={color} variant={variant}>
      <DropdownItem key="new" onPress={() => alert("New file")}>
        New file
      </DropdownItem>
      <DropdownItem key="copy">Copy link</DropdownItem>
      <DropdownItem key="edit">Edit file</DropdownItem>
      <DropdownItem key="delete" className="text-danger" color="danger">
        Delete file
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

const ItemCloseOnSelectTemplate = ({
  color,
  variant,
  ...args
}: DropdownProps & DropdownMenuProps) => (
  <>
    <Dropdown {...args}>
      <DropdownTrigger>
        <Button>Trigger</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions" color={color} variant={variant}>
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" closeOnSelect={false} color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Dropdown {...args}>
      <DropdownTrigger>
        <Button>Trigger</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions" closeOnSelect={false} color={color} variant={variant}>
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </>
);

const DynamicTemplate = ({color, variant, ...args}: DropdownProps & DropdownMenuProps) => (
  <Dropdown {...args}>
    <DropdownTrigger>
      <Button>Trigger</Button>
    </DropdownTrigger>
    <DropdownMenu
      aria-label="Actions"
      color={color}
      items={items}
      variant={variant}
      onAction={alert}
    >
      {(item) => (
        <DropdownItem
          key={item.key}
          className={item.key === "delete" ? "text-danger" : ""}
          color={item.key === "delete" ? "danger" : "default"}
        >
          {item.label}
        </DropdownItem>
      )}
    </DropdownMenu>
  </Dropdown>
);

const DividerTemplate = ({color, variant, ...args}: DropdownProps & DropdownMenuProps) => (
  <Dropdown {...args}>
    <DropdownTrigger>
      <Button>Trigger</Button>
    </DropdownTrigger>
    <DropdownMenu aria-label="Actions" color={color} variant={variant} onAction={alert}>
      <DropdownItem key="new">New file</DropdownItem>
      <DropdownItem key="copy">Copy link</DropdownItem>
      <DropdownItem key="edit" showDivider>
        Edit file
      </DropdownItem>
      <DropdownItem key="delete" className="text-danger" color="danger">
        Delete file
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

const DisabledKeysTemplate = ({color, variant, ...args}: DropdownProps & DropdownMenuProps) => (
  <Dropdown {...args}>
    <DropdownTrigger>
      <Button>Trigger</Button>
    </DropdownTrigger>
    <DropdownMenu
      aria-label="Actions"
      color={color}
      disabledKeys={["edit", "delete"]}
      variant={variant}
      onAction={alert}
    >
      <DropdownItem key="new">New file</DropdownItem>
      <DropdownItem key="copy">Copy link</DropdownItem>
      <DropdownItem key="edit">Edit file</DropdownItem>
      <DropdownItem key="delete" className="text-danger" color="danger">
        Delete file
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

const SingleSelectionTemplate = ({color, variant, ...args}: DropdownProps & DropdownMenuProps) => {
  const [selected, setSelected] = React.useState<string | Set<React.Key>>(new Set(["text"]));

  const selectedValue = React.useMemo(
    () =>
      Array.from(selected)
        .map((key) => key.toString().replace("_", " "))
        .join(", "),
    [selected],
  );

  return (
    <Dropdown {...args}>
      <DropdownTrigger>
        <Button>{selectedValue}</Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Actions"
        color={color}
        selectedKeys={selected}
        selectionMode="single"
        variant={variant}
        onSelectionChange={setSelected}
      >
        <DropdownItem key="text">Text</DropdownItem>
        <DropdownItem key="number">Number</DropdownItem>
        <DropdownItem key="date">Date</DropdownItem>
        <DropdownItem key="single_date">Single Date</DropdownItem>
        <DropdownItem key="iteration">Iteration</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const MultipleSelectionTemplate = ({
  color,
  variant,
  ...args
}: DropdownProps & DropdownMenuProps) => {
  const [selected, setSelected] = React.useState<string | Set<React.Key>>(new Set(["text"]));

  const selectedValue = React.useMemo(
    () =>
      Array.from(selected)
        .map((key) => key.toString().replace("_", " "))
        .join(", "),
    [selected],
  );

  return (
    <Dropdown {...args}>
      <DropdownTrigger>
        <Button>{selectedValue}</Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Actions"
        closeOnSelect={false}
        color={color}
        selectedKeys={selected}
        selectionMode="multiple"
        variant={variant}
        onSelectionChange={setSelected}
      >
        <DropdownItem key="text">Text</DropdownItem>
        <DropdownItem key="number">Number</DropdownItem>
        <DropdownItem key="date">Date</DropdownItem>
        <DropdownItem key="single_date">Single Date</DropdownItem>
        <DropdownItem key="iteration">Iteration</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const WithShortcutTemplate = ({color, variant, ...args}) => (
  <Dropdown {...args}>
    <DropdownTrigger>
      <Button>Trigger</Button>
    </DropdownTrigger>
    <DropdownMenu aria-label="Actions" color={color} variant={variant} onAction={alert}>
      <DropdownItem key="new" shortcut="⌘N">
        New file
      </DropdownItem>
      <DropdownItem key="copy" shortcut="⌘C">
        Copy link
      </DropdownItem>
      <DropdownItem key="edit" shortcut="⌘⇧E">
        Edit file
      </DropdownItem>
      <DropdownItem key="delete" className="text-danger" color="danger" shortcut="⌘⇧D">
        Delete file
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

const WithStartContentTemplate = ({
  color,
  variant,
  disableAnimation,
  ...args
}: DropdownProps & DropdownMenuProps) => {
  const iconClasses = "text-2xl text-secondary pointer-events-none shrink-0";

  return (
    <Dropdown {...args} disableAnimation={disableAnimation}>
      <DropdownTrigger>
        <Button color="secondary" disableAnimation={disableAnimation} variant="flat">
          Trigger
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions" color={color} variant={variant} onAction={alert}>
        <DropdownItem
          key="new"
          shortcut="⌘N"
          startContent={<AddNoteBulkIcon className={iconClasses} />}
        >
          New file
        </DropdownItem>
        <DropdownItem
          key="copy"
          shortcut="⌘C"
          startContent={<CopyDocumentBulkIcon className={iconClasses} />}
        >
          Copy link
        </DropdownItem>
        <DropdownItem
          key="edit"
          shortcut="⌘⇧E"
          startContent={<EditDocumentBulkIcon className={iconClasses} />}
        >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          shortcut="⌘⇧D"
          startContent={<DeleteDocumentBulkIcon className={clsx(iconClasses, "!text-danger")} />}
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const WithEndContentTemplate = ({color, variant, disableAnimation, ...args}) => {
  const iconClasses = "text-2xl text-default-500 pointer-events-none shrink-0";

  return (
    <Dropdown {...args} disableAnimation={disableAnimation}>
      <DropdownTrigger>
        <Button color="success" disableAnimation={disableAnimation} variant="faded">
          Trigger
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions" color={color} variant={variant} onAction={alert}>
        <DropdownItem key="new" endContent={<AddNoteBulkIcon className={iconClasses} />}>
          New file
        </DropdownItem>
        <DropdownItem key="copy" endContent={<CopyDocumentBulkIcon className={iconClasses} />}>
          Copy link
        </DropdownItem>
        <DropdownItem key="edit" endContent={<EditDocumentBulkIcon className={iconClasses} />}>
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          endContent={<DeleteDocumentBulkIcon className={clsx(iconClasses, "!text-danger")} />}
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const WithDescriptionTemplate = ({color, variant, disableAnimation, ...args}) => {
  const iconClasses = "text-2xl text-secondary pointer-events-none shrink-0";

  return (
    <Dropdown {...args} disableAnimation={disableAnimation}>
      <DropdownTrigger>
        <Button color="secondary" disableAnimation={disableAnimation} variant="flat">
          Trigger
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions" color={color} variant={variant} onAction={alert}>
        <DropdownItem
          key="new"
          description="Create a new file"
          shortcut="⌘N"
          startContent={<AddNoteBulkIcon className={iconClasses} />}
        >
          New file
        </DropdownItem>
        <DropdownItem
          key="copy"
          description="Copy the file link"
          shortcut="⌘C"
          startContent={<CopyDocumentBulkIcon className={iconClasses} />}
        >
          Copy link
        </DropdownItem>
        <DropdownItem
          key="edit"
          description="Allows you to edit the file"
          shortcut="⌘⇧E"
          startContent={<EditDocumentBulkIcon className={iconClasses} />}
        >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          description="Permanently delete the file"
          shortcut="⌘⇧D"
          startContent={<DeleteDocumentBulkIcon className={clsx(iconClasses, "!text-danger")} />}
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const WithSectionsTemplate = ({color, variant, disableAnimation, ...args}) => {
  const iconClasses = "text-2xl text-secondary pointer-events-none shrink-0";

  return (
    <Dropdown {...args} disableAnimation={disableAnimation}>
      <DropdownTrigger>
        <Button color="secondary" disableAnimation={disableAnimation} variant="flat">
          Trigger
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Actions"
        closeOnSelect={false}
        color={color}
        variant={variant}
        onAction={alert}
      >
        <DropdownSection title="Actions">
          <DropdownItem
            key="new"
            description="Create a new file"
            shortcut="⌘N"
            startContent={<AddNoteBulkIcon className={iconClasses} />}
          >
            New file
          </DropdownItem>
          <DropdownItem
            key="copy"
            description="Copy the file link"
            shortcut="⌘C"
            startContent={<CopyDocumentBulkIcon className={iconClasses} />}
          >
            Copy link
          </DropdownItem>
          <DropdownItem
            key="edit"
            description="Allows you to edit the file"
            shortcut="⌘⇧E"
            startContent={<EditDocumentBulkIcon className={iconClasses} />}
          >
            Edit file
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger zone">
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            description="Permanently delete the file"
            shortcut="⌘⇧D"
            startContent={<DeleteDocumentBulkIcon className={clsx(iconClasses, "!text-danger")} />}
          >
            Delete file
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

const CustomTriggerTemplate = ({variant, ...args}) => {
  return (
    <div className="flex items-center gap-10">
      <Dropdown {...args} placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            size="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" color="secondary" variant={variant}>
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@example.com</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown {...args} placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              color: "primary",
              size: "md",
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            description="@tonyreichert"
            name="Tony Reichert"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" color="primary" variant={variant}>
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">@tonyreichert</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const CustomHTMLTrigger = ({variant, ...args}) => {
  return (
    <Dropdown {...args}>
      <DropdownTrigger>
        <span className="flex items-center gap-2">Profile</span>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions" variant={variant}>
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export const Default = {
  render: Template,

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

export const WithArrow = {
  render: Template,

  args: {
    ...defaultProps,
    showArrow: true,
  },
};

export const WithDivider = {
  render: DividerTemplate,

  args: {
    ...defaultProps,
  },
};

export const DisabledKeys = {
  render: DisabledKeysTemplate,

  args: {
    ...defaultProps,
  },
};

export const DisabledTrigger = {
  render: Template,

  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const SingleSelection = {
  render: SingleSelectionTemplate,

  args: {
    ...defaultProps,
  },
};

export const MultipleSelection = {
  render: MultipleSelectionTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithShortcut = {
  render: WithShortcutTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithStartContent = {
  render: WithStartContentTemplate,

  args: {
    ...defaultProps,
    variant: "flat",
    color: "secondary",
  },
};

export const WithEndContent = {
  render: WithEndContentTemplate,

  args: {
    ...defaultProps,
    variant: "faded",
    color: "success",
  },
};

export const WithDescription = {
  render: WithDescriptionTemplate,

  args: {
    ...defaultProps,
    variant: "flat",
    color: "secondary",
    className: "min-w-[240px]",
  },
};

export const WithSections = {
  render: WithSectionsTemplate,

  args: {
    ...defaultProps,
    variant: "flat",
    color: "secondary",
    className: "min-w-[240px]",
  },
};

export const WithCustomTrigger = {
  render: CustomTriggerTemplate,

  args: {
    ...defaultProps,
    variant: "flat",
    offset: 14,
  },
};

export const WithCustomHTMLTrigger = {
  render: CustomHTMLTrigger,

  args: {
    ...defaultProps,
    variant: "flat",
    offset: 14,
  },
};

export const DisableAnimation = {
  render: WithStartContentTemplate,

  args: {
    ...defaultProps,
    showArrow: true,
    variant: "flat",
    color: "secondary",
    disableAnimation: true,
  },
};

export const ItemCloseOnSelect = {
  render: ItemCloseOnSelectTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithFallbackPlacements = {
  args: {
    ...defaultProps,
  },
  render: (args) => (
    <div className="relative h-screen w-screen">
      <div className="absolute top-0 left-0 p-8 flex gap-4">
        <Template {...args} label="placement: top" placement="top" />
        <Template {...args} label="placement: bottom" placement="bottom" />
      </div>
      <div className="absolute bottom-0 left-0 p-8 flex gap-4">
        <Template {...args} label="placement: bottom" placement="bottom" />
        <Template {...args} label="placement: top" placement="top" />
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 p-8 flex flex-col gap-4">
        <Template {...args} label="placement: left" placement="left" />
        <Template {...args} label="placement: right" placement="right" />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 p-8 flex flex-col gap-4">
        <Template {...args} label="placement: right" placement="right" />
        <Template {...args} label="placement: left" placement="left" />
      </div>
    </div>
  ),
};

export const WithShouldBlockScroll = {
  render: (args) => {
    return (
      <div className="flex gap-8">
        <Template {...args} label="shouldBlockScroll: false" shouldBlockScroll={false} />
        <Template {...args} label="shouldBlockScroll: true" shouldBlockScroll={true} />
      </div>
    );
  },

  args: {
    ...defaultProps,
  },
};

export const Placements = {
  args: {
    ...defaultProps,
  },
  render: (args) => (
    <div className="inline-grid grid-cols-3 gap-4">
      <Template {...args} label="Top Start" placement="top-start" />
      <Template {...args} label="Top" placement="top" />
      <Template {...args} label="Top End" placement="top-end" />

      <Template {...args} label="Bottom Start" placement="bottom-start" />
      <Template {...args} label="Bottom" placement="bottom" />
      <Template {...args} label="Bottom End" placement="bottom-end" />

      <Template {...args} label="Right Start" placement="right-start" />
      <Template {...args} label="Right" placement="right" />
      <Template {...args} label="Right End" placement="right-end" />

      <Template {...args} label="Left Start" placement="left-start" />
      <Template {...args} label="Left" placement="left" />
      <Template {...args} label="Left End" placement="left-end" />
    </div>
  ),
};
