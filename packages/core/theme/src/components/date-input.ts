import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

/**
 * DateInput wrapper **Tailwind Variants** component
 *
 * @example
 */
const dateInput = tv({
  slots: {
    base: "group flex flex-col",
    label: [
      "block subpixel-antialiased text-small text-default-600",
      // isRequired=true
      "group-data-[required=true]:after:content-['*'] group-data-[required=true]:after:text-danger group-data-[required=true]:after:ml-0.5",
      // isInValid=true
      "group-data-[invalid=true]:text-danger",
    ],
    inputWrapper: [
      "relative px-3 gap-3 w-full inline-flex flex-row items-center",
      "cursor-text tap-highlight-transparent shadow-sm",
    ],
    input: "flex h-full gap-x-0.5 w-full font-normal",
    innerWrapper: [
      "flex items-center text-default-400 w-full gap-x-2 h-6",
      // isInValid=true
      "group-data-[invalid=true]:text-danger",
    ], // this wraps the input and the start/end content
    segment: [
      "group first:-ml-0.5 [&:not(:first-child)]:-ml-1 px-0.5 my-auto box-content tabular-nums text-start",
      "inline-block outline-none focus:shadow-sm rounded-md",
      "text-foreground-500 data-[editable=true]:text-foreground",
      "data-[editable=true]:data-[placeholder=true]:text-foreground-500",
      // isInvalid=true
      "data-[invalid=true]:text-danger-300 data-[invalid=true]:data-[editable=true]:text-danger",
      "data-[invalid=true]:focus:bg-danger-400/50 dark:data-[invalid=true]:focus:bg-danger-400/20",
      "data-[invalid=true]:data-[editable=true]:focus:text-danger",
    ],
    helperWrapper: "hidden group-data-[has-helper=true]:flex p-1 relative flex-col gap-1.5",
    description: "text-tiny text-foreground-400",
    errorMessage: "text-tiny text-danger",
  },
  variants: {
    variant: {
      flat: {
        inputWrapper: [
          "bg-default-100",
          "hover:bg-default-200",
          "focus-within:hover:bg-default-100",
          // isInvalid=true
          "group-data-[invalid=true]:bg-danger-50",
          "group-data-[invalid=true]:hover:bg-danger-100",
          "group-data-[invalid=true]:focus-within:hover:bg-danger-50",
        ],
      },
      faded: {
        inputWrapper: [
          "bg-default-100",
          "border-medium",
          "border-default-200",
          "hover:border-default-400",
          // isInvalid=true
          "group-data-[invalid=true]:bg-danger-50",
          "group-data-[invalid=true]:hover:bg-danger-100",
          "group-data-[invalid=true]:focus-within:hover:bg-danger-50",
        ],
      },
      bordered: {
        inputWrapper: [
          "border-medium",
          "border-default-200",
          "hover:border-default-400",
          "focus-within:border-default-foreground",
          "focus-within:hover:border-default-foreground",
          // isInvalid=true
          "group-data-[invalid=true]:border-danger",
          "group-data-[invalid=true]:hover:border-danger",
          "group-data-[invalid=true]:focus-within:hover:border-danger",
        ],
      },
      underlined: {
        inputWrapper: [
          "px-1",
          "pb-1",
          "gap-0",
          "relative",
          "box-border",
          "border-b-medium",
          "shadow-[0_1px_0px_0_rgba(0,0,0,0.05)]",
          "border-default-200",
          "!rounded-none",
          "hover:border-default-300",
          "after:content-['']",
          "after:w-0",
          "after:origin-center",
          "after:bg-default-foreground",
          "after:absolute",
          "after:left-1/2",
          "after:-translate-x-1/2",
          "after:-bottom-[2px]",
          "after:h-[2px]",
          "focus-within:after:w-full",
          // isInvalid=true
          "group-data-[invalid=true]:after:bg-danger",
        ],
      },
    },
    color: {
      default: {
        segment: "focus:bg-default-400/50 data-[editable=true]:focus:text-default-foreground",
      },
      primary: {
        segment: "focus:bg-primary-400/50 data-[editable=true]:focus:text-primary",
      },
      secondary: {
        segment: "focus:bg-secondary-400/50 data-[editable=true]:focus:text-secondary",
      },
      success: {
        segment:
          "focus:bg-success-400/50 dark:focus:bg-success-400/20 data-[editable=true]:focus:text-success",
      },
      warning: {
        segment:
          "focus:bg-warning-400/50 dark:focus:bg-warning-400/20 data-[editable=true]:focus:text-warning",
      },
      danger: {
        segment:
          "focus:bg-danger-400/50 dark:focus:bg-danger-400/20 data-[editable=true]:focus:text-danger",
      },
    },
    size: {
      sm: {
        label: "text-tiny",
        input: "text-small",
        inputWrapper: "h-8 min-h-8 px-2 rounded-small",
      },
      md: {
        input: "text-small",
        inputWrapper: "h-10 min-h-10 rounded-medium",
        clearButton: "text-large",
      },
      lg: {
        label: "text-medium",
        input: "text-medium",
        inputWrapper: "h-12 min-h-12 rounded-large",
      },
    },
    radius: {
      none: {
        inputWrapper: "rounded-none",
      },
      sm: {
        inputWrapper: "rounded-small",
      },
      md: {
        inputWrapper: "rounded-medium",
      },
      lg: {
        inputWrapper: "rounded-large",
      },
      full: {
        inputWrapper: "rounded-full",
      },
    },
    labelPlacement: {
      outside: {
        base: "flex flex-col data-[has-helper=true]:pb-[calc(theme(fontSize.tiny)_+8px)] gap-y-1.5",
        label: "w-full text-foreground",
        helperWrapper: "absolute top-[calc(100%_+_2px)] start-0",
      },
      "outside-left": {
        base: "flex-row items-center data-[has-helper=true]:pb-[calc(theme(fontSize.tiny)_+_8px)] gap-x-2 flex-nowrap",
        label: "relative text-foreground",
        inputWrapper: "relative flex-1",
        helperWrapper: "absolute top-[calc(100%_+_2px)] start-0",
      },
      inside: {
        label: "w-full text-tiny cursor-text",
        inputWrapper: "flex-col items-start justify-center gap-0",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
        inputWrapper: "w-full",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
        inputWrapper: "pointer-events-none",
        label: "pointer-events-none",
      },
    },
    disableAnimation: {
      true: {
        label: "transition-none",
        input: "transition-none",
        inputWrapper: "transition-none",
      },
      false: {
        label: [
          "!ease-out",
          "!duration-200",
          "will-change-auto",
          "motion-reduce:transition-none",
          "transition-[color,opacity]",
        ],
        inputWrapper: "transition-background motion-reduce:transition-none !duration-150",
        segment: "transition-colors motion-reduce:transition-none",
      },
    },
  },
  defaultVariants: {
    variant: "flat",
    color: "default",
    size: "md",
    fullWidth: true,
    isDisabled: false,
  },
  compoundVariants: [
    // flat & color
    {
      variant: "flat",
      color: "primary",
      class: {
        innerWrapper: "text-primary",
        inputWrapper: ["bg-primary-100", "hover:bg-primary-50", "focus-within:bg-primary-50"],
        segment:
          "text-primary-300 data-[editable=true]:data-[placeholder=true]:text-primary-300 data-[editable=true]:text-primary",
        label: "text-primary",
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        innerWrapper: "text-secondary",
        inputWrapper: ["bg-secondary-100", "hover:bg-secondary-50", "focus-within:bg-secondary-50"],
        segment:
          "text-secondary-300 data-[editable=true]:data-[placeholder=true]:text-secondary-300 data-[editable=true]:text-secondary",
        label: "text-secondary",
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        innerWrapper: "text-success-600 dark:text-success",
        inputWrapper: ["bg-success-100", "hover:bg-success-50", "focus-within:bg-success-50"],
        segment:
          "text-success-400 data-[editable=true]:data-[placeholder=true]:text-success-400 data-[editable=true]:text-success-600 data-[editable=true]:focus:text-success-600",
        label: "text-success-600 dark:text-success",
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        innerWrapper: "text-warning-600 dark:text-warning",
        inputWrapper: ["bg-warning-100", "hover:bg-warning-50", "focus-within:bg-warning-50"],
        segment:
          "text-warning-400 data-[editable=true]:data-[placeholder=true]:text-warning-400 data-[editable=true]:text-warning-600 data-[editable=true]:focus:text-warning-600",
        label: "text-warning-600 dark:text-warning",
      },
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        innerWrapper: "text-danger",
        inputWrapper: ["bg-danger-100", "hover:bg-danger-50", "focus-within:bg-danger-50"],
        segment:
          "text-danger-300 data-[editable=true]:data-[placeholder=true]:text-danger-300 data-[editable=true]:text-danger",
        label: "text-danger",
      },
    },
    // faded & color
    {
      variant: "faded",
      color: "primary",
      class: {
        innerWrapper: "text-primary",
        inputWrapper: [
          "hover:border-primary",
          "focus-within:border-primary",
          "focus-within:hover:border-primary",
        ],
        label: "text-primary",
      },
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        innerWrapper: "text-secondary",
        inputWrapper: [
          "hover:border-secondary",
          "focus-within:border-secondary",
          "focus-within:hover:border-secondary",
        ],
        label: "text-secondary",
      },
    },
    {
      variant: "faded",
      color: "success",
      class: {
        innerWrapper: "text-success",
        inputWrapper: [
          "hover:border-success",
          "focus-within:border-success",
          "focus-within:hover:border-success",
        ],
        label: "text-success",
      },
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        innerWrapper: "text-warning",
        inputWrapper: [
          "hover:border-warning",
          "focus-within:border-warning",
          "focus-within:hover:border-warning",
        ],
        label: "text-warning",
      },
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        innerWrapper: "text-danger",
        inputWrapper: [
          "hover:border-danger",
          "focus-within:border-danger",
          "focus-within:hover:border-danger",
        ],
        label: "text-danger",
      },
    },
    // bordered & color
    {
      variant: "bordered",
      color: "primary",
      class: {
        innerWrapper: "text-primary",
        inputWrapper: ["focus-within:border-primary", "focus-within:hover:border-primary"],
        label: "text-primary",
      },
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        innerWrapper: "text-secondary",
        inputWrapper: ["focus-within:border-secondary", "focus-within:hover:border-secondary"],
        label: "text-secondary",
      },
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        innerWrapper: "text-success",
        inputWrapper: ["focus-within:border-success", "focus-within:hover:border-success"],
        label: "text-success",
      },
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        innerWrapper: "text-warning",
        inputWrapper: ["focus-within:border-warning", "focus-within:hover:border-warning"],
        label: "text-warning",
      },
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        innerWrapper: "text-danger",
        inputWrapper: ["focus-within:border-danger", "focus-within:hover:border-danger"],
        label: "text-danger",
      },
    },
    // underlined & color
    {
      variant: "underlined",
      color: "primary",
      class: {
        innerWrapper: "text-primary",
        inputWrapper: "after:bg-primary",
        label: "text-primary",
      },
    },
    {
      variant: "underlined",
      color: "secondary",
      class: {
        innerWrapper: "text-secondary",
        inputWrapper: "after:bg-secondary",
        label: "text-secondary",
      },
    },
    {
      variant: "underlined",
      color: "success",
      class: {
        innerWrapper: "text-success",
        inputWrapper: "after:bg-success",
        label: "text-success",
      },
    },
    {
      variant: "underlined",
      color: "warning",
      class: {
        innerWrapper: "text-warning",
        inputWrapper: "after:bg-warning",
        label: "text-warning",
      },
    },
    {
      variant: "underlined",
      color: "danger",
      class: {
        innerWrapper: "text-danger",
        inputWrapper: "after:bg-danger",
        label: "text-danger",
      },
    },
    // size & labelPlacement
    {
      labelPlacement: "inside",
      size: "sm",
      class: {
        inputWrapper: "h-12 py-1.5 px-3",
      },
    },
    {
      labelPlacement: "inside",
      size: "md",
      class: {
        inputWrapper: "h-14 py-2",
      },
    },
    {
      labelPlacement: "inside",
      size: "lg",
      class: {
        label: "text-medium",
        inputWrapper: "h-16 py-2.5 gap-0",
      },
    },
    // !disableAnimation & variant
    {
      disableAnimation: false,
      variant: ["faded", "bordered"],
      class: {
        inputWrapper: "transition-colors motion-reduce:transition-none",
      },
    },
    {
      disableAnimation: false,
      variant: "underlined",
      class: {
        inputWrapper: "after:transition-width motion-reduce:after:transition-none",
      },
    },
  ],
});

export type DateInputReturnType = ReturnType<typeof dateInput>;
export type DateInputVariantProps = VariantProps<typeof dateInput>;
export type DateInputSlots = keyof ReturnType<typeof dateInput>;

export {dateInput};
