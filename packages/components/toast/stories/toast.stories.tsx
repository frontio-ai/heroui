import React, {useEffect} from "react";
import {Meta} from "@storybook/react";
import {cn, toast} from "@heroui/theme";
import {Button} from "@heroui/button";

import {Toast, ToastProps, ToastProvider, addToast, closeAll} from "../src";

export default {
  title: "Components/Toast",
  component: Toast,
  argTypes: {
    variant: {
      control: {type: "select"},
      options: ["flat", "bordered", "solid"],
    },
    severity: {
      control: {type: "select"},
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    color: {
      control: {type: "select"},
      options: ["default", "foreground", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {type: "select"},
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {type: "select"},
      options: ["sm", "md", "lg"],
    },
    hideIcon: {
      control: {
        type: "boolean",
      },
    },
    shadow: {
      control: {type: "select"},
      options: ["sm", "md", "lg"],
    },
    placement: {
      control: {type: "select"},
      options: [
        "bottom-right",
        "bottom-left",
        "bottom-center",
        "top-right",
        "top-left",
        "top-center",
      ],
    },
    hideCloseButton: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex justify-start items-start w-screen h-screen">
        <Story />
      </div>
    ),
    (Story) => {
      useEffect(() => {
        return () => {
          closeAll();
        };
      }, []);

      return <Story />;
    },
  ],
} as Meta<typeof Toast>;

const defaultProps = {
  ...toast.defaultVariants,
};

const Template = (args: ToastProps) => {
  return (
    <>
      <ToastProvider placement={args.placement} />
      <div>
        <Button
          onPress={() => {
            addToast({
              title: "Toast Title",
              ...args,
            });
          }}
        >
          Show toast
        </Button>
      </div>
    </>
  );
};

const ShowTimeoutProgressTemplate = (args: ToastProps) => {
  return (
    <>
      <ToastProvider placement={args.placement} />
      <Button
        onPress={() => {
          addToast({
            title: "Toast Title",
            description: "Toast Description",
            timeout: 3000,
            shouldShowTimeoutProgess: true,
            ...args,
          });
        }}
      >
        Toast
      </Button>
    </>
  );
};

const WithEndContentTemplate = (args) => {
  return (
    <>
      <ToastProvider placement={args.placement} />
      <Button
        onPress={() => {
          addToast({
            title: "Toast Title",
            description: "Toast Description",
            endContent: (
              <Button color="warning" size="sm" variant="flat">
                Upgrade
              </Button>
            ),
            color: "warning",
            variant: "faded",
            ...args,
          });
        }}
      >
        Toast
      </Button>
    </>
  );
};

const PlacementTemplate = (args: ToastProps) => {
  return (
    <>
      <ToastProvider placement={args.placement} />
      <div>
        <Button
          onPress={() => {
            addToast({
              title: "Toast Title",
              description: "Toast Displayed Successfully",
              ...args,
            });
          }}
        >
          Show toast
        </Button>
      </div>
    </>
  );
};

const DisableAnimationTemplate = (args: ToastProps) => {
  return (
    <>
      <ToastProvider disableAnimation={true} placement={args.placement} />
      <div>
        <Button
          onPress={() => {
            addToast({
              title: "Toast Title",
              description: "Toast Displayed Successfully",
              ...args,
            });
          }}
        >
          Show toast
        </Button>
      </div>
    </>
  );
};

const PromiseToastTemplate = (args: ToastProps) => {
  return (
    <>
      <ToastProvider placement={args.placement} />
      <div>
        <Button
          onPress={() => {
            addToast({
              title: "Toast Title",
              description: "Toast Displayed Successfully",
              promise: new Promise((resolve) => setTimeout(resolve, 4000)),
              ...args,
            });
          }}
        >
          Show toast
        </Button>
      </div>
    </>
  );
};

const CustomToastComponent = (args) => {
  const color = args.color;
  const colorMap = {
    primary: "before:bg-primary border-primary-200 dark:border-primary-100",
    secondary: "before:bg-secondary border-secondary-200 dark:border-secondary-100",
    success: "before:bg-success border-success-200 dark:border-success-100",
    warning: "before:bg-warning border-warning-200 dark:border-warning-100",
    danger: "before:bg-danger border-danger-200 dark:border-danger-100",
  };

  return (
    <>
      <Button
        color={color}
        variant="bordered"
        onPress={() => {
          addToast({
            title: "Sucessful!",
            description: "Document uploaded to cloud successful.",
            classNames: {
              base: cn([
                "bg-default-50 dark:bg-background shadow-sm",
                "border-1",
                "relative before:content-[''] before:absolute before:z-10",
                "before:left-0 before:top-[-1px] before:bottom-[-1px] before:w-1",
                "rounded-l-none border-l-0",
                "rounded-md",
                "flex flex-col items-start",
                colorMap[color],
              ]),
              icon: "w-6 h-6 fill-current",
            },
            endContent: (
              <div className="ms-11 my-2 flex gap-x-2">
                <Button color={color} size="sm" variant="bordered">
                  View Document
                </Button>
                <Button className="underline-offset-2" color={color} size="sm" variant="light">
                  Maybe Later
                </Button>
              </div>
            ),
            color: color,
          });
        }}
      >
        Toast
      </Button>
    </>
  );
};

const CustomToastTemplate = (args) => {
  const colors = ["primary", "secondary", "warning", "danger", "success"];

  return (
    <>
      <ToastProvider placement={args.placement} />
      <div className="flex gap-2">
        {colors.map((color, idx) => (
          <CustomToastComponent key={idx} color={color} />
        ))}
      </div>
    </>
  );
};

const CustomCloseButtonTemplate = (args) => {
  return (
    <>
      <ToastProvider
        placement={args.placement}
        toastProps={{
          classNames: {
            closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
          },
        }}
      />
      <Button
        onPress={() =>
          addToast({
            title: "Toast Title",
            description: "Toast Description",
            closeIcon: (
              <svg
                fill="none"
                height="32"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="32"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ),
          })
        }
      >
        Toast
      </Button>
    </>
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
    description: "Toast displayed successfully.",
    ...defaultProps,
  },
};

export const WithCustomIcon = {
  render: Template,
  args: {
    ...defaultProps,
    title: "Custom Icon",
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

export const iconHidden = {
  render: Template,
  args: {
    ...defaultProps,
    hideIcon: true,
  },
};

export const DisableAnimation = {
  render: DisableAnimationTemplate,
  args: {
    ...defaultProps,
  },
};

export const PromiseToast = {
  render: PromiseToastTemplate,
  args: {
    ...defaultProps,
  },
};

export const ShowTimeoutProgress = {
  render: ShowTimeoutProgressTemplate,
  args: {
    ...defaultProps,
  },
};

export const Placement = {
  render: PlacementTemplate,
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
  render: CustomToastTemplate,
  args: {
    ...defaultProps,
  },
};

export const CustomCloseButton = {
  render: CustomCloseButtonTemplate,
  args: {
    ...defaultProps,
  },
};
