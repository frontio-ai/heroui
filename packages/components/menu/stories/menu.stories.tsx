import React from "react";
import {Meta} from "@storybook/react";
import {menuItem} from "@heroui/theme";
import {
  AddNoteBulkIcon,
  CopyDocumentBulkIcon,
  EditDocumentBulkIcon,
  DeleteDocumentBulkIcon,
} from "@heroui/shared-icons";
import {clsx} from "@heroui/shared-utils";

import {Menu, MenuItem, MenuSection, MenuProps} from "../src";

export default {
  title: "Components/Menu",
  component: Menu,
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
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
          <Story />
        </div>
      </div>
    ),
  ],
} as Meta<typeof Menu>;

const defaultProps = {
  ...menuItem.defaultVariants,
};

const Template = ({color, variant, ...args}: MenuProps) => (
  <Menu aria-label="Actions" color={color} variant={variant} onAction={alert} {...args}>
    <MenuItem key="new" onPress={() => alert("[onPress] New file")}>
      New file
    </MenuItem>
    <MenuItem key="copy">Copy link</MenuItem>
    <MenuItem key="edit">Edit file</MenuItem>
    <MenuItem key="delete" className="text-danger" color="danger">
      Delete file
    </MenuItem>
  </Menu>
);

const DisabledKeysTemplate = ({color, variant, ...args}: MenuProps) => (
  <Menu
    aria-label="Actions"
    color={color}
    disabledKeys={["edit", "delete"]}
    variant={variant}
    onAction={alert}
    {...args}
  >
    <MenuItem key="new">New file</MenuItem>
    <MenuItem key="copy">Copy link</MenuItem>
    <MenuItem key="edit">Edit file</MenuItem>
    <MenuItem key="delete" className="text-danger" color="danger">
      Delete file
    </MenuItem>
  </Menu>
);

const SingleSelectionTemplate = ({color, variant, ...args}: MenuProps) => {
  const [selected, setSelected] = React.useState<string | Set<React.Key>>(new Set(["text"]));

  return (
    <Menu
      disallowEmptySelection
      aria-label="Actions"
      color={color}
      selectedKeys={selected}
      selectionMode="single"
      variant={variant}
      onSelectionChange={setSelected}
      {...args}
    >
      <MenuItem key="text">Text</MenuItem>
      <MenuItem key="number">Number</MenuItem>
      <MenuItem key="date">Date</MenuItem>
      <MenuItem key="single_date">Single Date</MenuItem>
      <MenuItem key="iteration">Iteration</MenuItem>
    </Menu>
  );
};

const MultipleSelectionTemplate = ({color, variant, ...args}: MenuProps) => {
  const [selected, setSelected] = React.useState<string | Set<React.Key>>(new Set(["text"]));

  return (
    <Menu
      disallowEmptySelection
      aria-label="Actions"
      closeOnSelect={false}
      color={color}
      selectedKeys={selected}
      selectionMode="multiple"
      variant={variant}
      onSelectionChange={setSelected}
      {...args}
    >
      <MenuItem key="text">Text</MenuItem>
      <MenuItem key="number">Number</MenuItem>
      <MenuItem key="date">Date</MenuItem>
      <MenuItem key="single_date">Single Date</MenuItem>
      <MenuItem key="iteration">Iteration</MenuItem>
    </Menu>
  );
};

const WithShortcutTemplate = ({color, variant, ...args}) => (
  <Menu aria-label="Actions" color={color} variant={variant} onAction={alert} {...args}>
    <MenuItem key="new" shortcut="⌘N">
      New file
    </MenuItem>
    <MenuItem key="copy" shortcut="⌘C">
      Copy link
    </MenuItem>
    <MenuItem key="edit" shortcut="⌘⇧E">
      Edit file
    </MenuItem>
    <MenuItem key="delete" className="text-danger" color="danger" shortcut="⌘⇧D">
      Delete file
    </MenuItem>
  </Menu>
);

const WithStartContentTemplate = ({color, variant, disableAnimation, ...args}: MenuProps) => {
  const iconClasses = "text-2xl text-secondary pointer-events-none shrink-0";

  return (
    <Menu
      aria-label="Actions"
      color={color}
      disableAnimation={disableAnimation}
      variant={variant}
      onAction={alert}
      {...args}
    >
      <MenuItem key="new" shortcut="⌘N" startContent={<AddNoteBulkIcon className={iconClasses} />}>
        New file
      </MenuItem>
      <MenuItem
        key="copy"
        shortcut="⌘C"
        startContent={<CopyDocumentBulkIcon className={iconClasses} />}
      >
        Copy link
      </MenuItem>
      <MenuItem
        key="edit"
        shortcut="⌘⇧E"
        startContent={<EditDocumentBulkIcon className={iconClasses} />}
      >
        Edit file
      </MenuItem>
      <MenuItem
        key="delete"
        className="text-danger"
        color="danger"
        shortcut="⌘⇧D"
        startContent={<DeleteDocumentBulkIcon className={clsx(iconClasses, "!text-danger")} />}
      >
        Delete file
      </MenuItem>
    </Menu>
  );
};

const WithEndContentTemplate = ({color, variant, disableAnimation, ...args}) => {
  const iconClasses = "text-2xl text-default-500 pointer-events-none shrink-0";

  return (
    <Menu
      aria-label="Actions"
      color={color}
      disableAnimation={disableAnimation}
      variant={variant}
      onAction={alert}
      {...args}
    >
      <MenuItem key="new" endContent={<AddNoteBulkIcon className={iconClasses} />}>
        New file
      </MenuItem>
      <MenuItem key="copy" endContent={<CopyDocumentBulkIcon className={iconClasses} />}>
        Copy link
      </MenuItem>
      <MenuItem key="edit" endContent={<EditDocumentBulkIcon className={iconClasses} />}>
        Edit file
      </MenuItem>
      <MenuItem
        key="delete"
        className="text-danger"
        color="danger"
        endContent={<DeleteDocumentBulkIcon className={clsx(iconClasses, "!text-danger")} />}
      >
        Delete file
      </MenuItem>
    </Menu>
  );
};

const WithDescriptionTemplate = ({color, variant, disableAnimation, ...args}) => {
  const iconClasses = "text-2xl text-secondary pointer-events-none shrink-0";

  return (
    <Menu
      aria-label="Actions"
      color={color}
      disableAnimation={disableAnimation}
      variant={variant}
      onAction={alert}
      {...args}
    >
      <MenuItem
        key="new"
        description="Create a new file"
        shortcut="⌘N"
        startContent={<AddNoteBulkIcon className={iconClasses} />}
      >
        New file
      </MenuItem>
      <MenuItem
        key="copy"
        description="Copy the file link"
        shortcut="⌘C"
        startContent={<CopyDocumentBulkIcon className={iconClasses} />}
      >
        Copy link
      </MenuItem>
      <MenuItem
        key="edit"
        description="Allows you to edit the file"
        shortcut="⌘⇧E"
        startContent={<EditDocumentBulkIcon className={iconClasses} />}
      >
        Edit file
      </MenuItem>
      <MenuItem
        key="delete"
        className="text-danger"
        color="danger"
        description="Permanently delete the file"
        shortcut="⌘⇧D"
        startContent={<DeleteDocumentBulkIcon className={clsx(iconClasses, "!text-danger")} />}
      >
        Delete file
      </MenuItem>
    </Menu>
  );
};

const WithSectionsTemplate = ({color, variant, disableAnimation, ...args}) => {
  const iconClasses = "text-2xl text-secondary pointer-events-none shrink-0";

  return (
    <Menu
      aria-label="Actions"
      closeOnSelect={false}
      color={color}
      disableAnimation={disableAnimation}
      variant={variant}
      onAction={alert}
      {...args}
    >
      <MenuSection title="Actions">
        <MenuItem
          key="new"
          description="Create a new file"
          shortcut="⌘N"
          startContent={<AddNoteBulkIcon className={iconClasses} />}
        >
          New file
        </MenuItem>
        <MenuItem
          key="copy"
          description="Copy the file link"
          shortcut="⌘C"
          startContent={<CopyDocumentBulkIcon className={iconClasses} />}
        >
          Copy link
        </MenuItem>
        <MenuItem
          key="edit"
          description="Allows you to edit the file"
          shortcut="⌘⇧E"
          startContent={<EditDocumentBulkIcon className={iconClasses} />}
        >
          Edit file
        </MenuItem>
      </MenuSection>
      <MenuSection title="Danger zone">
        <MenuItem
          key="delete"
          className="text-danger"
          color="danger"
          description="Permanently delete the file"
          shortcut="⌘⇧D"
          startContent={<DeleteDocumentBulkIcon className={clsx(iconClasses, "!text-danger")} />}
        >
          Delete file
        </MenuItem>
      </MenuSection>
    </Menu>
  );
};

export const Default = {
  render: Template,
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
