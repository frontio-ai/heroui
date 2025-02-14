import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {colorVariants} from "../utils";

const toastRegion = tv({
  slots: {
    base: "relative z-50",
  },
  variants: {
    disableAnimation: {
      false: {
        base: "",
      },
      true: {
        base: [
          "data-[placement=bottom-right]:bottom-0 data-[placement=bottom-right]:right-0 w-full px-2 sm:w-auto sm:px-0 data-[placement=bottom-right]:fixed data-[placement=bottom-right]:flex data-[placement=bottom-right]:flex-col",
          "data-[placement=bottom-left]:bottom-0 data-[placement=bottom-left]:left-0 w-full px-2 sm:w-auto sm:px-0 data-[placement=bottom-left]:fixed data-[placement=bottom-left]:flex data-[placement=bottom-left]:flex-col",
          "data-[placement=bottom-center]:bottom-0 data-[placement=bottom-center]:fixed w-full px-2 sm:w-auto sm:px-0 data-[placement=bottom-center]:flex data-[placement=bottom-center]:flex-col data-[placement=bottom-center]:left-1/2 data-[placement=bottom-center]:-translate-x-1/2",
          "data-[placement=top-right]:top-0 data-[placement=top-right]:right-0 w-full px-2 sm:w-auto sm:px-0 data-[placement=top-right]:fixed data-[placement=top-right]:flex data-[placement=top-right]:flex-col",
          "data-[placement=top-left]:top-0 data-[placement=top-left]:left-0 w-full px-2 sm:w-auto sm:px-0 data-[placement=top-left]:fixed data-[placement=top-left]:flex data-[placement=top-left]:flex-col",
          "data-[placement=top-center]:top-0 data-[placement=top-center]:fixed w-full px-2 sm:w-auto sm:px-0 data-[placement=top-center]:flex data-[placement=top-center]:flex-col data-[placement=top-center]:left-1/2 data-[placement=top-center]:-translate-x-1/2",
        ],
      },
    },
  },
  defaultVariants: {
    disableAnimation: false,
  },
});

const toast = tv({
  slots: {
    base: [
      "flex gap-x-4 items-center",
      "group",
      "cursor-pointer",
      "relative",
      "z-50",
      "box-border",
      "outline-none",
      "p-3 sm:mx-1",
      "my-1",
      "w-full sm:w-[270px] md:w-[300px]",
      "min-h-4",
    ],
    title: ["font-medium", "text-small", "me-4", "text-foreground"],
    description: ["text-small", "me-4", "text-default-600"],
    icon: ["w-6 h-6 fill-current"],
    loadingIcon: ["w-6 h-6 fill-current"],
    content: ["flex flex-grow flex-row gap-x-4 items-center relative"],
    progressTrack: ["absolute top-0 inset-0 bg-transparent overflow-hidden"],
    progressIndicator: ["h-full bg-default-400 opacity-20"],
    motionDiv: [
      "fixed",
      "px-4 sm:px-0",
      "data-[placement=bottom-right]:bottom-0 data-[placement=bottom-right]:right-0 data-[placement=bottom-right]:mx-auto w-full sm:data-[placement=bottom-right]:w-max mb-1 sm:data-[placement=bottom-right]:mr-2",
      "data-[placement=bottom-left]:bottom-0 data-[placement=bottom-left]:left-0 data-[placement=bottom-left]:mx-auto w-full sm:data-[placement=bottom-left]:w-max mb-1 sm:data-[placement=bottom-left]:ml-2",
      "data-[placement=bottom-center]:bottom-0 data-[placement=bottom-center]:left-0 data-[placement=bottom-center]:right-0 w-full sm:data-[placement=bottom-center]:w-max sm:data-[placement=bottom-center]:mx-auto",
      "data-[placement=top-right]:top-0 data-[placement=top-right]:right-0 data-[placement=top-right]:mx-auto w-full sm:data-[placement=top-right]:w-max sm:data-[placement=top-right]:mr-2",
      "data-[placement=top-left]:top-0 data-[placement=top-left]:left-0 data-[placement=top-left]:mx-auto w-full sm:data-[placement=top-left]:w-max sm:data-[placement=top-left]:ml-2",
      "data-[placement=top-center]:top-0 data-[placement=top-center]:left-0 data-[placement=top-center]:right-0 w-full sm:data-[placement=top-center]:w-max sm:data-[placement=top-center]:mx-auto",
    ],
    closeButton: [
      "opacity-0 pointer-events-none group-hover:pointer-events-auto p-0 group-hover:opacity-100 w-6 h-6 min-w-4 absolute -right-2 -top-2 items-center justify-center bg-transparent text-default-400 hover:text-default-600 border border-3 border-transparent",
      "data-[hidden=true]:hidden",
    ],
    closeIcon: ["rounded-full w-full h-full p-0.5 border border-default-400 bg-default-100"],
  },
  variants: {
    size: {
      sm: {
        icon: "w-5 h-5",
        loadingIcon: "w-5 h-5",
        title: "text-sm font-medium",
        description: "text-xs",
      },
      md: {
        title: "text-sm font-semibold",
        description: "text-xs",
      },
      lg: {
        title: "text-md font-semibold",
        description: "text-sm",
      },
    },
    variant: {
      flat: "bg-content1 border border-default-100",
      solid: colorVariants.solid.default,
      bordered: "bg-background border border-default-200",
    },
    color: {
      default: "",
      foreground: {
        progressIndicator: "h-full opacity-20 bg-foreground-400",
      },
      primary: {
        progressIndicator: "h-full opacity-20 bg-primary-400",
      },
      secondary: {
        progressIndicator: "h-full opacity-20 bg-secondary-400",
      },
      success: {
        progressIndicator: "h-full opacity-20 bg-success-400",
      },
      warning: {
        progressIndicator: "h-full opacity-20 bg-warning-400",
      },
      danger: {
        progressIndicator: "h-full opacity-20 bg-danger-400",
      },
    },
    radius: {
      none: {
        base: "rounded-none",
        progressTrack: "rounded-none",
      },
      sm: {
        base: "rounded-small",
        progressTrack: "rounded-small",
      },
      md: {
        base: "rounded-medium",
        progressTrack: "rounded-medium",
      },
      lg: {
        base: "rounded-large",
        progressTrack: "rounded-large",
      },
      full: {
        base: "rounded-full",
        closeButton: "-top-px -right-px",
        progressTrack: "rounded-full",
      },
    },
    disableAnimation: {
      true: {
        closeButton: "transition-none",
        base: "data-[animation=exiting]:opacity-0",
      },
      false: {
        closeButton: "transition-opacity ease-in duration-300",
        base: [
          "data-[animation=exiting]:transform",
          "data-[animation=exiting]:delay-100",
          "data-[animation=exiting]:data-[placement=bottom-right]:translate-x-28",
          "data-[animation=exiting]:data-[placement=bottom-left]:-translate-x-28",
          "data-[animation=exiting]:data-[placement=bottom-center]:translate-y-28",
          "data-[animation=exiting]:data-[placement=top-right]:translate-x-28",
          "data-[animation=exiting]:data-[placement=top-left]:-translate-x-28",
          "data-[animation=exiting]:data-[placement=top-center]:-translate-y-28",
          "data-[animation=exiting]:opacity-0",
          "data-[animation=exiting]:duration-200",
        ],
      },
    },
    shadow: {
      none: {
        base: "shadow-none",
      },
      sm: {
        base: "shadow-small",
      },
      md: {
        base: "shadow-medium",
      },
      lg: {
        base: "shadow-large",
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "flat",
    radius: "md",
    shadow: "sm",
  },
  compoundVariants: [
    // flat and color
    {
      variant: "flat",
      color: "foreground",
      class: {
        base: "bg-foreground text-background",
        closeButton: "text-foreground-400 hover:text-foreground-600",
        closeIcon: "border border-foreground-400 bg-foreground-100",
        title: "text-background-600",
        description: "text-background-500",
      },
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        base: "bg-primary-50 text-primary-600 border-primary-100",
        closeButton: "text-primary-400 hover:text-primary-600",
        closeIcon: "border border-primary-400 bg-primary-100",
        title: "text-primary-600",
        description: "text-primary-500",
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        base: "bg-secondary-50 text-secondary-600 border-secondary-100",
        closeButton: "text-secondary-400 hover:text-secondary-600",
        closeIcon: "border border-secondary-400 bg-secondary-100",
        title: "text-secondary-600",
        description: "text-secondary-500",
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        base: "bg-success-50 text-success-600 border-success-100",
        closeButton: "text-success-400 hover:text-success-600",
        closeIcon: "border border-success-400 bg-success-100",
        title: "text-success-600",
        description: "text-success-500",
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        base: "bg-warning-50 text-warning-600 border-warning-100",
        closeButton: "text-warning-400 hover:text-warning-600",
        closeIcon: "border border-warning-400 bg-warning-100",
        title: "text-warning-600",
        description: "text-warning-500",
      },
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        base: "bg-danger-50 text-danger-600 border-danger-100",
        closeButton: "text-danger-400 hover:text-danger-600",
        closeIcon: "border border-danger-400 bg-danger-100",
        title: "text-danger-600",
        description: "text-danger-500",
      },
    },
    // bordered and color
    {
      variant: "bordered",
      color: "foreground",
      class: {
        base: "bg-foreground border-foreground-400 text-background",
        closeButton: "text-foreground-400 hover:text-foreground-600",
        closeIcon: "border border-foreground-400 bg-foreground-100",
        title: "text-background-600",
        description: "text-background-500",
      },
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        base: "border-primary-400 text-primary-600",
        closeButton: "text-primary-400 hover:text-primary-600",
        closeIcon: "border border-primary-400 bg-primary-100",
        title: "text-primary-600",
        description: "text-primary-500",
      },
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        base: "border-secondary-400 text-secondary-600",
        closeButton: "text-secondary-400 hover:text-secondary-600",
        closeIcon: "border border-secondary-400 bg-secondary-100",
        title: "text-secondary-600",
        description: "text-secondary-500",
      },
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        base: "border-success-400 text-success-600",
        closeButton: "text-success-400 hover:text-success-600",
        closeIcon: "border border-success-400 bg-success-100",
        title: "text-success-600",
        description: "text-success-500",
      },
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        base: "border-warning-400 text-warning-600",
        closeButton: "text-warning-400 hover:text-warning-600",
        closeIcon: "border border-warning-400 bg-warning-100",
        title: "text-warning-600",
        description: "text-warning-500",
      },
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        base: "border-danger-400 text-danger-600",
        closeButton: "text-danger-400 hover:text-danger-600",
        closeIcon: "border border-danger-400 bg-danger-100",
        title: "text-danger-600",
        description: "text-danger-500",
      },
    },
    // solid and color
    {
      variant: "solid",
      color: "foreground",
      class: {
        base: colorVariants.solid.foreground,
        closeButton: "text-foreground-400 hover:text-foreground-600",
        closeIcon: "border border-foreground-400 bg-foreground-100",
        title: "text-background",
        description: "text-background",
      },
    },
    {
      variant: "solid",
      color: "primary",
      class: {
        base: colorVariants.solid.primary,
        closeButton: "text-primary-400 hover:text-primary-600",
        closeIcon: "border border-primary-400 bg-primary-100",
        title: "text-primary-foreground",
        description: "text-primary-foreground",
      },
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        base: colorVariants.solid.secondary,
        closeButton: "text-secondary-400 hover:text-secondary-600",
        closeIcon: "border border-secondary-400 bg-secondary-100",
        title: "text-secondary-foreground",
        description: "text-secondary-foreground",
      },
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: colorVariants.solid.success,
        closeButton: "text-success-400 hover:text-success-600",
        closeIcon: "border border-success-400 bg-success-100",
        title: "text-success-foreground",
        description: "text-success-foreground",
      },
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: colorVariants.solid.warning,
        closeButton: "text-warning-400 hover:text-warning-600",
        closeIcon: "border border-warning-400 bg-warning-100",
        title: "text-warning-foreground",
        description: "text-warning-foreground",
      },
    },
    {
      variant: "solid",
      color: "danger",
      class: {
        base: colorVariants.solid.danger,
        closeButton: "text-danger-400 hover:text-danger-600",
        closeIcon: "border border-danger-400 bg-danger-100",
        title: "text-danger-foreground",
        description: "text-danger-foreground",
      },
    },
  ],
});

export type ToastVariantProps = VariantProps<typeof toast>;
export type ToastSlots = keyof ReturnType<typeof toast>;

export type ToastRegionVariantProps = VariantProps<typeof toastRegion>;
export type ToastRegionSlots = keyof ReturnType<typeof toastRegion>;

export {toast, toastRegion};
