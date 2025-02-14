import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {colorVariants, dataFocusVisibleClasses} from "../utils";

/**
 * Pagination wrapper **Tailwind Variants** component
 *
 * const {base,cursor, prev, next, item } = pagination({...})
 *
 * @example
 * <ul className={base()} aria-label="pagination navigation">
 *    <li className={cursor()} aria-hidden="true">{active page}</li> // this marks the active page
 *    <li role="button" className={prev()} aria-label="Go to previous page" data-disabled="true">Prev</li>
 *    <li role="button" className={item()} aria-label="page 1" data-active="true">1</li>
 *    <li role="button" className={item()} aria-label="page 2">2</li>
 *    <li role="button" className={item()} aria-hidden="true">...</li>
 *    <li role="button" className={item()} aria-label="page 10">10</li>
 *    <li role="button" className={next()} aria-label="Go to next page">Next</li>
 *  </ul>
 */
const pagination = tv({
  slots: {
    base: ["p-2.5", "-m-2.5", "overflow-x-scroll", "scrollbar-hide"],
    wrapper: [
      "flex",
      "flex-nowrap",
      "h-fit",
      "max-w-fit",
      "relative",
      "gap-1",
      "items-center",
      "overflow-visible",
    ],
    item: ["tap-highlight-transparent", "select-none", "touch-none"],
    prev: "",
    next: "",
    cursor: [
      "absolute",
      "flex",
      "overflow-visible",
      "items-center",
      "justify-center",
      "origin-center",
      "left-0",
      "select-none",
      "touch-none",
      "pointer-events-none",
      "z-20",
    ],
    forwardIcon: [
      "hidden",
      "group-hover:block",
      "group-data-[focus-visible=true]:block",
      "data-[before=true]:rotate-180",
    ],
    ellipsis: "group-hover:hidden group-data-[focus-visible=true]:hidden",
    chevronNext: "rotate-180",
  },
  variants: {
    variant: {
      bordered: {
        item: [
          "border-medium",
          "border-default",
          "bg-transparent",
          "data-[hover=true]:bg-default-100",
        ],
      },
      light: {
        item: "bg-transparent",
      },
      flat: {},
      faded: {
        item: ["border-medium", "border-default"],
      },
    },
    color: {
      default: {
        cursor: colorVariants.solid.default,
      },
      primary: {
        cursor: colorVariants.solid.primary,
      },
      secondary: {
        cursor: colorVariants.solid.secondary,
      },
      success: {
        cursor: colorVariants.solid.success,
      },
      warning: {
        cursor: colorVariants.solid.warning,
      },
      danger: {
        cursor: colorVariants.solid.danger,
      },
    },
    size: {
      sm: {},
      md: {},
      lg: {},
    },
    radius: {
      none: {},
      sm: {},
      md: {},
      lg: {},
      full: {},
    },
    isCompact: {
      true: {
        wrapper: "gap-0 shadow-xs",
        item: [
          "shadow-none",
          "first-of-type:rounded-e-none",
          "last-of-type:rounded-s-none",
          "[&:not(:first-of-type):not(:last-of-type)]:rounded-none",
        ],
        prev: "!rounded-e-none",
        next: "!rounded-s-none",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
      },
    },
    showShadow: {
      true: {},
    },
    disableCursorAnimation: {
      true: {
        cursor: "hidden",
      },
    },
    disableAnimation: {
      true: {
        item: "transition-none",
        cursor: "transition-none",
      },
      false: {
        item: ["data-[pressed=true]:scale-[0.97]", "transition-transform-background"],
        cursor: [
          "data-[moving=true]:transition-transform",
          "!data-[moving=true]:duration-300",
          // this hides the cursor and only shows it once it has been moved to its initial position
          "opacity-0",
          "data-[moving]:opacity-100",
        ],
      },
    },
  },
  defaultVariants: {
    variant: "flat",
    color: "primary",
    size: "md",
    radius: "md",
    isCompact: false,
    isDisabled: false,
    showShadow: false,
    disableCursorAnimation: false,
  },
  compoundVariants: [
    // showShadow / color
    {
      showShadow: true,
      color: "default",
      class: {
        cursor: [colorVariants.shadow.default, "shadow-md"],
      },
    },
    {
      showShadow: true,
      color: "primary",
      class: {
        cursor: [colorVariants.shadow.primary, "shadow-md"],
      },
    },
    {
      showShadow: true,
      color: "secondary",
      class: {
        cursor: [colorVariants.shadow.secondary, "shadow-md"],
      },
    },
    {
      showShadow: true,
      color: "success",
      class: {
        cursor: [colorVariants.shadow.success, "shadow-md"],
      },
    },
    {
      showShadow: true,
      color: "warning",
      class: {
        cursor: [colorVariants.shadow.warning, "shadow-md"],
      },
    },
    {
      showShadow: true,
      color: "danger",
      class: {
        cursor: [colorVariants.shadow.danger, "shadow-md"],
      },
    },
    // isCompact / bordered
    {
      isCompact: true,
      variant: "bordered",
      class: {
        item: "[&:not(:first-of-type)]:ms-[calc(theme(borderWidth.2)*-1)]",
      },
    },
    /**
     * --------------------------------------------------------
     * disableCursorAnimation
     * the classNames will be applied to the active item
     * --------------------------------------------------------
     */
    // disableCursorAnimation / color
    {
      disableCursorAnimation: true,
      color: "default",
      class: {
        item: [
          "data-[active=true]:bg-default-400",
          "data-[active=true]:border-default-400",
          "data-[active=true]:text-default-foreground",
        ],
      },
    },
    {
      disableCursorAnimation: true,
      color: "primary",
      class: {
        item: [
          "data-[active=true]:bg-primary",
          "data-[active=true]:border-primary",
          "data-[active=true]:text-primary-foreground",
        ],
      },
    },
    {
      disableCursorAnimation: true,
      color: "secondary",
      class: {
        item: [
          "data-[active=true]:bg-secondary",
          "data-[active=true]:border-secondary",
          "data-[active=true]:text-secondary-foreground",
        ],
      },
    },
    {
      disableCursorAnimation: true,
      color: "success",
      class: {
        item: [
          "data-[active=true]:bg-success",
          "data-[active=true]:border-success",
          "data-[active=true]:text-success-foreground",
        ],
      },
    },
    {
      disableCursorAnimation: true,
      color: "warning",
      class: {
        item: [
          "data-[active=true]:bg-warning",
          "data-[active=true]:border-warning",
          "data-[active=true]:text-warning-foreground",
        ],
      },
    },
    {
      disableCursorAnimation: true,
      color: "danger",
      class: {
        item: [
          "data-[active=true]:bg-danger",
          "data-[active=true]:border-danger",
          "data-[active=true]:text-danger-foreground",
        ],
      },
    },
    // shadow / color
    {
      disableCursorAnimation: true,
      showShadow: true,
      color: "default",
      class: {
        item: ["data-[active=true]:shadow-md", "data-[active=true]:shadow-default/50"],
      },
    },
    {
      disableCursorAnimation: true,
      showShadow: true,
      color: "primary",
      class: {
        item: ["data-[active=true]:shadow-md", "data-[active=true]:shadow-primary/40"],
      },
    },
    {
      disableCursorAnimation: true,
      showShadow: true,
      color: "secondary",
      class: {
        item: ["data-[active=true]:shadow-md", "data-[active=true]:shadow-secondary/40"],
      },
    },
    {
      disableCursorAnimation: true,
      showShadow: true,
      color: "success",
      class: {
        item: ["data-[active=true]:shadow-md", "data-[active=true]:shadow-success/40"],
      },
    },
    {
      disableCursorAnimation: true,
      showShadow: true,
      color: "warning",
      class: {
        item: ["data-[active=true]:shadow-md", "data-[active=true]:shadow-warning/40"],
      },
    },
    {
      disableCursorAnimation: true,
      showShadow: true,
      color: "danger",
      class: {
        item: ["data-[active=true]:shadow-md", "data-[active=true]:shadow-danger/40"],
      },
    },
  ],
  compoundSlots: [
    // without variant
    {
      slots: ["item", "prev", "next"],
      class: [
        "flex",
        "flex-wrap",
        "truncate",
        "box-border",
        "outline-hidden",
        "items-center",
        "justify-center",
        "text-default-foreground",
        // focus ring
        ...dataFocusVisibleClasses,
        // disabled
        "data-[disabled=true]:text-default-300",
        "data-[disabled=true]:pointer-events-none",
      ],
    },
    {
      slots: ["item", "prev", "next"],
      variant: ["flat", "bordered", "faded"],
      class: ["shadow-xs"],
    },
    {
      slots: ["item", "prev", "next"],
      variant: "flat",
      class: [
        "bg-default-100",
        "[&[data-hover=true]:not([data-active=true])]:bg-default-200",
        "active:bg-default-300",
      ],
    },
    {
      slots: ["item", "prev", "next"],
      variant: "faded",
      class: [
        "bg-default-50",
        "[&[data-hover=true]:not([data-active=true])]:bg-default-100",
        "active:bg-default-200",
      ],
    },
    {
      slots: ["item", "prev", "next"],
      variant: "light",
      class: [
        "[&[data-hover=true]:not([data-active=true])]:bg-default-100",
        "active:bg-default-200",
      ],
    },
    // size
    {
      slots: ["item", "cursor", "prev", "next"],
      size: "sm",
      class: "min-w-8 w-8 h-8 text-tiny",
    },
    {
      slots: ["item", "cursor", "prev", "next"],
      size: "md",
      class: "min-w-9 w-9 h-9 text-small",
    },
    {
      slots: ["item", "cursor", "prev", "next"],
      size: "lg",
      class: "min-w-10 w-10 h-10 text-medium",
    },
    // radius
    {
      slots: ["wrapper", "item", "cursor", "prev", "next"],
      radius: "none",
      class: "rounded-none",
    },
    {
      slots: ["wrapper", "item", "cursor", "prev", "next"],
      radius: "sm",
      class: "rounded-small",
    },
    {
      slots: ["wrapper", "item", "cursor", "prev", "next"],
      radius: "md",
      class: "rounded-medium",
    },
    {
      slots: ["wrapper", "item", "cursor", "prev", "next"],
      radius: "lg",
      class: "rounded-large",
    },
    {
      slots: ["wrapper", "item", "cursor", "prev", "next"],
      radius: "full",
      class: "rounded-full",
    },
  ],
});

export type PaginationVariantProps = VariantProps<typeof pagination>;
export type PaginationSlots = keyof ReturnType<typeof pagination>;

export {pagination};
