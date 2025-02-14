import type {VariantProps} from "tailwind-variants";

import {dataFocusVisibleClasses} from "../utils";
import {tv} from "../utils/tv";

/**
 * BreadcrumbsItem wrapper **Tailwind Variants** component
 *
 * const { base, item, separator } = breadcrumbItem({...})
 *
 * @example
 */
const breadcrumbItem = tv({
  slots: {
    base: "flex items-center",
    item: [
      "flex gap-1 items-center",
      "cursor-pointer",
      "whitespace-nowrap",
      "line-clamp-1",
      "outline-hidden",
      "tap-highlight-transparent",
      // focus ring
      ...dataFocusVisibleClasses,
    ],
    separator: "text-default-400 px-1 rtl:rotate-180",
  },
  variants: {
    color: {
      foreground: {
        item: "text-foreground/50",
        separator: "text-foreground/50",
      },
      primary: {
        item: "text-primary/80",
        separator: "text-primary/80",
      },
      secondary: {
        item: "text-secondary/80",
        separator: "text-secondary/80",
      },
      success: {
        item: "text-success/80",
        separator: "text-success/80",
      },
      warning: {
        item: "text-warning/80",
        separator: "text-warning/80",
      },
      danger: {
        item: "text-danger/80",
        separator: "text-danger/80",
      },
    },
    size: {
      sm: {
        item: "text-tiny",
      },
      md: {
        item: "text-small",
      },
      lg: {
        item: "text-medium",
      },
    },
    underline: {
      none: {
        item: "no-underline",
      },
      hover: {
        item: "hover:underline",
      },
      always: {
        item: "underline",
      },
      active: {
        item: "active:underline",
      },
      focus: {
        item: "focus:underline",
      },
    },
    isCurrent: {
      true: {
        item: "cursor-default",
      },
      false: {
        item: ["hover:opacity-80", "active:opacity-disabled"],
      },
    },
    isDisabled: {
      true: {
        item: "opacity-disabled pointer-events-none",
        separator: "opacity-disabled",
      },
    },
    disableAnimation: {
      false: {
        item: "transition-opacity",
      },
      true: {
        item: "transition-none",
      },
    },
  },
  defaultVariants: {
    size: "md",
    color: "foreground",
    underline: "hover",
    isDisabled: false,
  },
  compoundVariants: [
    // isCurrent && color
    {
      isCurrent: true,
      color: "foreground",
      class: {
        item: "text-foreground",
      },
    },
    {
      isCurrent: true,
      color: "primary",
      class: {
        item: "text-primary",
      },
    },
    {
      isCurrent: true,
      color: "secondary",
      class: {
        item: "text-secondary",
      },
    },
    {
      isCurrent: true,
      color: "success",
      class: {
        item: "text-success",
      },
    },
    {
      isCurrent: true,
      color: "warning",
      class: {
        item: "text-warning",
      },
    },
    {
      isCurrent: true,
      color: "danger",
      class: {
        item: "text-danger",
      },
    },
    // !isCurrent && underline
    {
      isCurrent: false,
      underline: "none",
      class: {
        item: "no-underline",
      },
    },
    // Underline
    {
      underline: ["hover", "always", "active", "focus"],
      class: "underline-offset-4",
    },
  ],
});

/**
 * Breadcrumbs wrapper **Tailwind Variants** component
 *
 * const { base, list, ellipsis, separator } = breadcrumbs({...})
 *
 * @example
 */
const breadcrumbs = tv({
  slots: {
    base: "",
    list: "flex flex-wrap list-none",
    ellipsis: "text-medium",
    separator: "text-default-400 px-1",
  },
  variants: {
    size: {
      sm: {},
      md: {},
      lg: {},
    },
    radius: {
      none: {
        list: "rounded-none",
      },
      sm: {
        list: "rounded-small",
      },
      md: {
        list: "rounded-medium",
      },
      lg: {
        list: "rounded-large",
      },
      full: {
        list: "rounded-full",
      },
    },
    variant: {
      solid: {
        list: "bg-default-100",
      },
      bordered: {
        list: "border-medium border-default-200 shadow-xs",
      },
      light: {},
    },
  },
  defaultVariants: {
    size: "md",
    radius: "sm",
    variant: "light",
  },
  compoundVariants: [
    // variant
    {
      variant: ["solid", "bordered"],
      class: {
        list: "max-w-fit",
      },
    },
    // variant={solid,bordered} && size
    {
      variant: ["solid", "bordered"],
      size: "sm",
      class: {
        list: "px-2 py-1",
      },
    },
    {
      variant: ["solid", "bordered"],
      size: "md",
      class: {
        list: "px-2.5 py-1.5",
      },
    },
    {
      variant: ["solid", "bordered"],
      size: "lg",
      class: {
        list: "px-3 py-2",
      },
    },
  ],
});

export type BreadcrumbsVariantProps = VariantProps<typeof breadcrumbs>;
export type BreadcrumbsSlots = keyof ReturnType<typeof breadcrumbs>;
export type BreadcrumbItemVariantProps = VariantProps<typeof breadcrumbItem>;
export type BreadcrumbItemSlots = keyof ReturnType<typeof breadcrumbItem>;

export {breadcrumbs, breadcrumbItem};
