import React from "react";
import {Meta} from "@storybook/react";
import {alert, cn} from "@heroui/theme";
import {Button} from "@heroui/button";

import {Alert, AlertProps} from "../src";

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
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "flat", "bordered", "faded"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    isClosable: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="w-full max-w-[542px]">
          <Story />
        </div>
      </div>
    ),
  ],
} as Meta<typeof Alert>;

const defaultProps = {
  ...alert.defaultVariants,
  title: "This is an alert with a title",
};

const Template = (args) => <Alert {...args} />;

const ColorTemplate = (args) => {
  return (
    <div className="flex flex-col w-full">
      {["default", "primary", "secondary", "success", "warning", "danger"].map((color) => (
        <div key={color} className="w-full flex items-center my-3">
          <Alert {...args} color={color} title={`This is a ${color} alert`} />
        </div>
      ))}
    </div>
  );
};

const RadiusTemplate = (args) => {
  return (
    <div className="flex flex-col w-full">
      {["none", "sm", "md", "lg", "full"].map((radius) => (
        <div key={radius} className="w-full flex items-center my-3">
          <Alert {...args} radius={radius} title={`This is a ${radius} radius alert`} />
        </div>
      ))}
    </div>
  );
};

const VariantTemplate = (args) => {
  return (
    <div className="flex flex-col w-full">
      {["solid", "flat", "bordered", "faded"].map((variant) => (
        <div key={variant} className="w-full flex items-center my-3">
          <Alert {...args} isClosable title={`This is a ${variant} alert`} variant={variant} />
        </div>
      ))}
    </div>
  );
};

const CloseableTemplate = (args) => {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isVisible ? (
        <Alert {...args} isClosable isVisible={isVisible} onClose={() => setIsVisible(false)} />
      ) : (
        <Button className="max-w-[200px]" variant="bordered" onPress={() => setIsVisible(true)}>
          Re-open Alert
        </Button>
      )}
    </div>
  );
};

const WithEndContentTemplate = (args) => {
  return (
    <Alert
      {...args}
      color="warning"
      description="Upgrade to a paid plan to continue"
      endContent={
        <Button color="warning" size="sm" variant="flat">
          Upgrade
        </Button>
      }
      title="You have no credits left"
      variant="faded"
    />
  );
};

const CustomAlert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {title, children, variant = "faded", color = "secondary", className, classNames, ...props},
    ref,
  ) => {
    const colorClass = React.useMemo(() => {
      switch (color) {
        case "default":
          return "before:bg-default-300";
        case "primary":
          return "before:bg-primary";
        case "secondary":
          return "before:bg-secondary";
        case "success":
          return "before:bg-success";
        case "warning":
          return "before:bg-warning";
        case "danger":
          return "before:bg-danger";
        default:
          return `before:bg-default-200`;
      }
    }, []);

    return (
      <Alert
        ref={ref}
        classNames={{
          ...classNames,
          base: cn(
            [
              "bg-default-50 dark:bg-background shadow-xs",
              "border-1 border-default-200 dark:border-default-100",
              "relative before:content-[''] before:absolute before:z-10",
              "before:left-0 before:top-[-1px] before:bottom-[-1px] before:w-1",
              "rounded-l-none border-l-0",
              colorClass,
            ],
            classNames?.base,
            className,
          ),
          mainWrapper: cn("pt-1", classNames?.mainWrapper),
          iconWrapper: cn("dark:bg-transparent", classNames?.iconWrapper),
        }}
        color={color}
        title={title}
        variant={variant}
        {...props}
      >
        <div className="flex items-center gap-1 mt-3">{children}</div>
      </Alert>
    );
  },
);

CustomAlert.displayName = "CustomAlert";

const CustomStylesTemplate = (args) => {
  const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

  return (
    <div className="flex flex-col w-full gap-y-6">
      {colors.map((color) => (
        <CustomAlert
          {...args}
          key={color}
          color={color}
          title="The documents you requested are ready to be viewed"
        >
          <div className="flex items-center gap-1">
            <Button
              className="bg-background text-default-700 font-medium border-1 shadow-small"
              size="sm"
              variant="bordered"
            >
              View documents
            </Button>
            <Button
              className="text-default-500 font-medium underline underline-offset-4"
              size="sm"
              variant="light"
            >
              Maybe later
            </Button>
          </div>
        </CustomAlert>
      ))}
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const WithDescription = {
  render: Template,
  args: {
    ...defaultProps,
    description: "This is an alert with a description",
  },
};

export const WithoutIconWrapper = {
  render: Template,
  args: {
    ...defaultProps,
    hideIconWrapper: true,
  },
};

export const Color = {
  render: ColorTemplate,
  args: {
    ...defaultProps,
    variant: "faded",
  },
};

export const Variant = {
  render: VariantTemplate,
  args: {
    ...defaultProps,
  },
};

export const WithIcon = {
  render: Template,
  args: {
    ...defaultProps,
    title: "This is an alert with a custom icon",
    icon: (
      <svg height={24} viewBox="0 0 24 24" width={24}>
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={1.5}
        >
          <path
            d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
            data-name="Stroke 1"
          />
          <path d="M11.837 11.174a4.372 4.372 0 10-.031 0z" data-name="Stroke 3" />
        </g>
      </svg>
    ),
  },
};

export const Radius = {
  render: RadiusTemplate,
  args: {
    ...defaultProps,
  },
};

export const Closable = {
  render: CloseableTemplate,
  args: {
    ...defaultProps,
  },
};

export const WithEndContent = {
  render: WithEndContentTemplate,
  args: {
    ...defaultProps,
  },
};

export const CustomStyles = {
  render: CustomStylesTemplate,
  args: {
    ...defaultProps,
  },
};
