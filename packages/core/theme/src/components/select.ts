import type {VariantProps} from "tailwind-variants";

import {dataFocusVisibleClasses} from "../utils";
import {tv} from "../utils/tv";

const select = tv({
  slots: {
    base: ["group inline-flex flex-col relative"],
    label: [
      "block",
      "absolute",
      "z-10",
      "origin-top-left",
      "flex-shrink-0",
      // Using RTL here as Tailwind CSS doesn't support `start` and `end` logical properties for transforms yet.
      "rtl:origin-top-right",
      "subpixel-antialiased",
      "text-small",
      "text-foreground-500",
      "pointer-events-none",
    ],
    mainWrapper: "w-full flex flex-col",
    trigger:
      "relative px-3 gap-3 w-full inline-flex flex-row items-center shadow-sm outline-none tap-highlight-transparent",
    innerWrapper:
      "inline-flex h-fit w-[calc(100%_-_theme(spacing.6))] min-h-4 items-center gap-1.5 box-border",
    selectorIcon: "absolute end-3 w-4 h-4",
    spinner: "absolute end-3",
    value: ["text-foreground-500", "font-normal", "w-full", "text-start"],
    listboxWrapper: "scroll-py-6 w-full",
    listbox: "",
    popoverContent: "w-full p-1 overflow-hidden",
    helperWrapper: "p-1 flex relative flex-col gap-1.5 group-data-[has-helper=true]:flex",
    description: "text-tiny text-foreground-400",
    errorMessage: "text-tiny text-danger",
  },
  variants: {
    variant: {
      flat: {
        trigger: [
          "bg-default-100",
          "data-[hover=true]:bg-default-200",
          "group-data-[focus=true]:bg-default-200",
        ],
      },
      faded: {
        trigger: [
          "bg-default-100",
          "border-medium",
          "border-default-200",
          "data-[hover=true]:border-default-400 data-[focus=true]:border-default-400 data-[open=true]:border-default-400",
        ],
        value: "group-data-[has-value=true]:text-default-foreground",
      },
      bordered: {
        trigger: [
          "border-medium",
          "border-default-200",
          "data-[hover=true]:border-default-400",
          "data-[open=true]:border-default-foreground",
          "data-[focus=true]:border-default-foreground",
        ],
        value: "group-data-[has-value=true]:text-default-foreground",
      },
      underlined: {
        trigger: [
          "!px-1",
          "!pb-0",
          "!gap-0",
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
          "data-[open=true]:after:w-full",
          "data-[focus=true]:after:w-full",
        ],
        value: "group-data-[has-value=true]:text-default-foreground",
      },
    },
    color: {
      default: {},
      primary: {
        selectorIcon: "text-primary",
      },
      secondary: {
        selectorIcon: "text-secondary",
      },
      success: {
        selectorIcon: "text-success",
      },
      warning: {
        selectorIcon: "text-warning",
      },
      danger: {
        selectorIcon: "text-danger",
      },
    },
    size: {
      sm: {
        label: "text-tiny",
        trigger: "h-8 min-h-8 px-2 rounded-small",
        value: "text-small",
      },
      md: {
        trigger: "h-10 min-h-10 rounded-medium",
        value: "text-small",
      },
      lg: {
        trigger: "h-12 min-h-12 rounded-large",
        value: "text-medium",
      },
    },
    radius: {
      none: {
        trigger: "rounded-none",
      },
      sm: {
        trigger: "rounded-small",
      },
      md: {
        trigger: "rounded-medium",
      },
      lg: {
        trigger: "rounded-large",
      },
      full: {
        trigger: "rounded-full",
      },
    },
    labelPlacement: {
      outside: {
        base: "flex flex-col",
      },
      "outside-left": {
        base: "flex-row items-center flex-nowrap data-[has-helper=true]:items-start",
        label: "relative pe-2 text-foreground",
      },
      inside: {
        label: "text-tiny cursor-pointer",
        trigger: "flex-col items-start justify-center gap-0",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
      },
      false: {
        base: "min-w-40",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
        trigger: "pointer-events-none",
      },
    },
    isInvalid: {
      true: {
        label: "!text-danger",
        value: "!text-danger",
        selectorIcon: "text-danger",
      },
    },
    isRequired: {
      true: {
        label: "after:content-['*'] after:text-danger after:ms-0.5",
      },
    },
    isMultiline: {
      true: {
        label: "relative",
        trigger: "!h-auto",
      },
      false: {
        value: "truncate",
      },
    },
    disableAnimation: {
      true: {
        trigger: "after:transition-none",
        base: "transition-none",
        label: "transition-none",
        selectorIcon: "transition-none",
      },
      false: {
        base: "transition-background motion-reduce:transition-none !duration-150",
        label: [
          "will-change-auto",
          "origin-top-left",
          // Using RTL here as Tailwind CSS doesn't support `start` and `end` logical properties for transforms yet.
          "rtl:origin-top-right",
          "!duration-200",
          "!ease-out",
          "transition-[transform,color,left,opacity]",
          "motion-reduce:transition-none",
        ],
        selectorIcon: "transition-transform duration-150 ease motion-reduce:transition-none",
      },
    },
    disableSelectorIconRotation: {
      true: {},
      false: {
        selectorIcon: "data-[open=true]:rotate-180",
      },
    },
  },
  defaultVariants: {
    variant: "flat",
    color: "default",
    size: "md",
    fullWidth: true,
    isDisabled: false,
    isMultiline: false,
    disableSelectorIconRotation: false,
  },
  compoundVariants: [
    // flat & color
    {
      variant: "flat",
      color: "default",
      class: {
        value: "group-data-[has-value=true]:text-default-foreground",
        trigger: ["bg-default-100", "data-[hover=true]:bg-default-200"],
      },
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        trigger: [
          "bg-primary-100",
          "text-primary",
          "data-[hover=true]:bg-primary-50",
          "group-data-[focus=true]:bg-primary-50",
        ],
        value: "text-primary",
        label: "text-primary",
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        trigger: [
          "bg-secondary-100",
          "text-secondary",
          "data-[hover=true]:bg-secondary-50",
          "group-data-[focus=true]:bg-secondary-50",
        ],
        value: "text-secondary",
        label: "text-secondary",
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        trigger: [
          "bg-success-100",
          "text-success-600",
          "dark:text-success",
          "data-[hover=true]:bg-success-50",
          "group-data-[focus=true]:bg-success-50",
        ],
        value: "text-success-600 dark:text-success",
        label: "text-success-600 dark:text-success",
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        trigger: [
          "bg-warning-100",
          "text-warning-600",
          "dark:text-warning",
          "data-[hover=true]:bg-warning-50",
          "group-data-[focus=true]:bg-warning-50",
        ],
        value: "text-warning-600 dark:text-warning",
        label: "text-warning-600 dark:text-warning",
      },
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        trigger: [
          "bg-danger-100",
          "text-danger",
          "dark:text-danger-500",
          "data-[hover=true]:bg-danger-50",
          "group-data-[focus=true]:bg-danger-50",
        ],
        value: "text-danger dark:text-danger-500",
        label: "text-danger dark:text-danger-500",
      },
    },
    // faded & color
    {
      variant: "faded",
      color: "primary",
      class: {
        trigger:
          "data-[hover=true]:border-primary data-[focus=true]:border-primary data-[open=true]:border-primary",
        label: "text-primary",
      },
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        trigger:
          "data-[hover=true]:border-secondary data-[focus=true]:border-secondary data-[open=true]:border-secondary",
        label: "text-secondary",
      },
    },
    {
      variant: "faded",
      color: "success",
      class: {
        trigger:
          "data-[hover=true]:border-success data-[focus=true]:border-success data-[open=true]:border-success",
        label: "text-success",
      },
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        trigger:
          "data-[hover=true]:border-warning data-[focus=true]:border-warning data-[open=true]:border-warning",
        label: "text-warning",
      },
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        trigger:
          "data-[hover=true]:border-danger data-[focus=true]:border-danger data-[open=true]:border-danger",
        label: "text-danger",
      },
    },
    // underlined & color
    // underlined & color
    {
      variant: "underlined",
      color: "default",
      class: {
        value: "group-data-[has-value=true]:text-foreground",
      },
    },
    {
      variant: "underlined",
      color: "primary",
      class: {
        trigger: "after:bg-primary",
        label: "text-primary",
      },
    },
    {
      variant: "underlined",
      color: "secondary",
      class: {
        trigger: "after:bg-secondary",
        label: "text-secondary",
      },
    },
    {
      variant: "underlined",
      color: "success",
      class: {
        trigger: "after:bg-success",
        label: "text-success",
      },
    },
    {
      variant: "underlined",
      color: "warning",
      class: {
        trigger: "after:bg-warning",
        label: "text-warning",
      },
    },
    {
      variant: "underlined",
      color: "danger",
      class: {
        trigger: "after:bg-danger",
        label: "text-danger",
      },
    },
    // bordered & color
    {
      variant: "bordered",
      color: "primary",
      class: {
        trigger: ["data-[open=true]:border-primary", "data-[focus=true]:border-primary"],
        label: "text-primary",
      },
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        trigger: ["data-[open=true]:border-secondary", "data-[focus=true]:border-secondary"],
        label: "text-secondary",
      },
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        trigger: ["data-[open=true]:border-success", "data-[focus=true]:border-success"],
        label: "text-success",
      },
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        trigger: ["data-[open=true]:border-warning", "data-[focus=true]:border-warning"],
        label: "text-warning",
      },
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        trigger: ["data-[open=true]:border-danger", "data-[focus=true]:border-danger"],
        label: "text-danger",
      },
    },
    // labelPlacement=outside & default
    {
      labelPlacement: "inside",
      color: "default",
      class: {
        label: "group-data-[filled=true]:text-default-600",
      },
    },
    // labelPlacement=outside & default
    {
      labelPlacement: "outside",
      color: "default",
      class: {
        label: "group-data-[filled=true]:text-foreground",
      },
    },
    // radius-full & size
    {
      radius: "full",
      size: ["sm"],
      class: {
        trigger: "px-3",
      },
    },
    {
      radius: "full",
      size: "md",
      class: {
        trigger: "px-4",
      },
    },
    {
      radius: "full",
      size: "lg",
      class: {
        trigger: "px-5",
      },
    },
    // !disableAnimation & variant
    {
      disableAnimation: false,
      variant: ["faded", "bordered"],
      class: {
        trigger: "transition-colors motion-reduce:transition-none",
      },
    },
    {
      disableAnimation: false,
      variant: "underlined",
      class: {
        trigger: "after:transition-width motion-reduce:after:transition-none",
      },
    },
    // flat & faded
    {
      variant: ["flat", "faded"],
      class: {
        trigger: [
          // focus ring
          ...dataFocusVisibleClasses,
        ],
      },
    },
    // isInvalid & variant
    {
      isInvalid: true,
      variant: "flat",
      class: {
        trigger: [
          "bg-danger-50",
          "data-[hover=true]:bg-danger-100",
          "group-data-[focus=true]:bg-danger-50",
        ],
      },
    },
    {
      isInvalid: true,
      variant: "bordered",
      class: {
        trigger: "!border-danger group-data-[focus=true]:border-danger",
      },
    },
    {
      isInvalid: true,
      variant: "underlined",
      class: {
        trigger: "after:bg-danger",
      },
    },
    // size & labelPlacement
    {
      labelPlacement: "inside",
      size: "sm",
      class: {
        trigger: "h-12 min-h-12 py-1.5 px-3",
      },
    },
    {
      labelPlacement: "inside",
      size: "md",
      class: {
        trigger: "h-14 min-h-14 py-2",
      },
    },
    {
      labelPlacement: "inside",
      size: "lg",
      class: {
        label: "text-medium",
        trigger: "h-16 min-h-16 py-2.5 gap-0",
      },
    },
    {
      labelPlacement: "outside",
      isMultiline: false,
      class: {
        base: "group relative justify-end",
        label: ["pb-0", "z-20", "top-1/2", "-translate-y-1/2", "group-data-[filled=true]:start-0"],
      },
    },
    // labelPlacement=[inside]
    {
      labelPlacement: ["inside"],
      class: {
        label: "group-data-[filled=true]:scale-85",
      },
    },
    // inside & size
    {
      labelPlacement: "inside",
      size: ["sm", "md"],
      class: {
        label: "text-small",
      },
    },
    {
      labelPlacement: "inside",
      isMultiline: false,
      size: "sm",
      class: {
        label: ["group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.tiny)/2_-_8px)]"],
        innerWrapper: "group-data-[has-label=true]:pt-4",
      },
    },
    {
      labelPlacement: "inside",
      isMultiline: false,
      size: "md",
      class: {
        label: [
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px)]",
        ],
        innerWrapper: "group-data-[has-label=true]:pt-4",
      },
    },
    {
      labelPlacement: "inside",
      isMultiline: false,
      size: "lg",
      class: {
        label: [
          "text-medium",
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_8px)]",
        ],
        innerWrapper: "group-data-[has-label=true]:pt-5",
      },
    },
    // inside & size & [faded, bordered]
    {
      labelPlacement: "inside",
      variant: ["faded", "bordered"],
      isMultiline: false,
      size: "sm",
      class: {
        label: [
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.tiny)/2_-_8px_-_theme(borderWidth.medium))]",
        ],
      },
    },
    {
      labelPlacement: "inside",
      variant: ["faded", "bordered"],
      isMultiline: false,
      size: "md",
      class: {
        label: [
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px_-_theme(borderWidth.medium))]",
        ],
      },
    },
    {
      labelPlacement: "inside",
      variant: ["faded", "bordered"],
      isMultiline: false,
      size: "lg",
      class: {
        label: [
          "text-medium",
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_8px_-_theme(borderWidth.medium))]",
        ],
      },
    },
    // inside & size & underlined
    {
      labelPlacement: "inside",
      variant: "underlined",
      isMultiline: false,
      size: "sm",
      class: {
        label: ["group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.tiny)/2_-_5px)]"],
      },
    },
    {
      labelPlacement: "inside",
      variant: "underlined",
      isMultiline: false,
      size: "md",
      class: {
        label: [
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_3.5px)]",
        ],
      },
    },
    {
      labelPlacement: "inside",
      variant: "underlined",
      isMultiline: false,
      size: "lg",
      class: {
        label: [
          "text-medium",
          "group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_4px)]",
        ],
      },
    },
    // outside & size
    {
      labelPlacement: "outside",
      size: "sm",
      isMultiline: false,
      class: {
        label: [
          "start-2",
          "text-tiny",
          "group-data-[filled=true]:-translate-y-[calc(100%_+_theme(fontSize.tiny)/2_+_16px)]",
        ],
        base: "data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_8px)]",
      },
    },
    {
      labelPlacement: "outside",
      isMultiline: false,
      size: "md",
      class: {
        label: [
          "start-3",
          "text-small",
          "group-data-[filled=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_20px)]",
        ],
        base: "data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_10px)]",
      },
    },
    {
      labelPlacement: "outside",
      isMultiline: false,
      size: "lg",
      class: {
        label: [
          "start-3",
          "text-medium",
          "group-data-[filled=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_24px)]",
        ],
        base: "data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_12px)]",
      },
    },
    // outside-left & size & hasHelper
    {
      labelPlacement: "outside-left",
      size: "sm",
      class: {
        label: "group-data-[has-helper=true]:pt-2",
      },
    },
    {
      labelPlacement: "outside-left",
      size: "md",
      class: {
        label: "group-data-[has-helper=true]:pt-3",
      },
    },
    {
      labelPlacement: "outside-left",
      size: "lg",
      class: {
        label: "group-data-[has-helper=true]:pt-4",
      },
    },
    // isMultiline & labelPlacement="outside"
    {
      labelPlacement: "outside",
      isMultiline: true,
      class: {
        label: "pb-1.5",
      },
    },
    // text truncate labelPlacement=[inside,outside]
    {
      labelPlacement: ["inside", "outside"],
      class: {
        label: ["pe-2", "max-w-full", "text-ellipsis", "overflow-hidden"],
      },
    },
  ],
});

export type SelectVariantProps = VariantProps<typeof select>;
export type SelectSlots = keyof ReturnType<typeof select>;

export {select};
