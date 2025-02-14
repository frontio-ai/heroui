import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {ringClasses, colorVariants} from "../utils";

/**
 * Chip wrapper **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, content, dot, avatar, closeButton} = chip({...})
 *
 * <div className={base())}>
 *    // left content
 *   <span className={avatar()}/>
 *   <svg className={dot()}/>
 *   <span className={content()}>Default</span>
 *   <svg className={closeButton()}>close button</svg>
 *    // right content
 * </div>
 * ```
 */
const chip = tv({
  slots: {
    base: [
      "relative",
      "max-w-fit",
      "min-w-min",
      "inline-flex",
      "items-center",
      "justify-between",
      "box-border",
      "whitespace-nowrap",
    ],
    content: "flex-1 text-inherit font-normal",
    dot: ["w-2", "h-2", "ml-1", "rounded-full"],
    avatar: "shrink-0",
    closeButton: [
      "z-10",
      "appearance-none",
      "outline-hidden",
      "select-none",
      "transition-opacity",
      "opacity-70",
      "hover:opacity-100",
      "cursor-pointer",
      "active:opacity-disabled",
      "tap-highlight-transparent",
    ],
  },
  variants: {
    variant: {
      solid: {},
      bordered: {
        base: "border-medium bg-transparent",
      },
      light: {
        base: "bg-transparent",
      },
      flat: {},
      faded: {
        base: "border-medium",
      },
      shadow: {},
      dot: {
        base: "border-medium border-default text-foreground bg-transparent",
      },
    },
    color: {
      default: {
        dot: "bg-default-400",
      },
      primary: {
        dot: "bg-primary",
      },
      secondary: {
        dot: "bg-secondary",
      },
      success: {
        dot: "bg-success",
      },
      warning: {
        dot: "bg-warning",
      },
      danger: {
        dot: "bg-danger",
      },
    },
    size: {
      sm: {
        base: "px-1 h-6 text-tiny",
        content: "px-1",
        closeButton: "text-medium",
        avatar: "w-4 h-4",
      },
      md: {
        base: "px-1 h-7 text-small",
        content: "px-2",
        closeButton: "text-large",
        avatar: "w-5 h-5",
      },
      lg: {
        base: "px-2 h-8 text-medium",
        content: "px-2",
        closeButton: "text-xl",
        avatar: "w-6 h-6",
      },
    },
    radius: {
      none: {
        base: "rounded-none",
      },
      sm: {
        base: "rounded-small",
      },
      md: {
        base: "rounded-medium",
      },
      lg: {
        base: "rounded-large",
      },
      full: {
        base: "rounded-full",
      },
    },
    isOneChar: {
      true: {},
      false: {},
    },
    isCloseable: {
      true: {},
      false: {},
    },
    hasStartContent: {
      true: {},
    },
    hasEndContent: {
      true: {},
    },
    isDisabled: {
      true: {base: "opacity-disabled pointer-events-none"},
    },
    isCloseButtonFocusVisible: {
      true: {
        closeButton: [...ringClasses, "ring-1", "rounded-full"],
      },
    },
  },
  defaultVariants: {
    variant: "solid",
    color: "default",
    size: "md",
    radius: "full",
    isDisabled: false,
  },
  compoundVariants: [
    // solid / color
    {
      variant: "solid",
      color: "default",
      class: {
        base: colorVariants.solid.default,
      },
    },
    {
      variant: "solid",
      color: "primary",
      class: {
        base: colorVariants.solid.primary,
      },
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        base: colorVariants.solid.secondary,
      },
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: colorVariants.solid.success,
      },
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: colorVariants.solid.warning,
      },
    },
    {
      variant: "solid",
      color: "danger",
      class: {
        base: colorVariants.solid.danger,
      },
    },
    // shadow / color
    {
      variant: "shadow",
      color: "default",
      class: {
        base: colorVariants.shadow.default,
      },
    },
    {
      variant: "shadow",
      color: "primary",
      class: {
        base: colorVariants.shadow.primary,
      },
    },
    {
      variant: "shadow",
      color: "secondary",
      class: {
        base: colorVariants.shadow.secondary,
      },
    },
    {
      variant: "shadow",
      color: "success",
      class: {
        base: colorVariants.shadow.success,
      },
    },
    {
      variant: "shadow",
      color: "warning",
      class: {
        base: colorVariants.shadow.warning,
      },
    },
    {
      variant: "shadow",
      color: "danger",
      class: {
        base: colorVariants.shadow.danger,
      },
    },
    // bordered / color
    {
      variant: "bordered",
      color: "default",
      class: {
        base: colorVariants.bordered.default,
      },
    },
    {
      variant: "bordered",
      color: "primary",
      class: {
        base: colorVariants.bordered.primary,
      },
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        base: colorVariants.bordered.secondary,
      },
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        base: colorVariants.bordered.success,
      },
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        base: colorVariants.bordered.warning,
      },
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        base: colorVariants.bordered.danger,
      },
    },
    // flat / color
    {
      variant: "flat",
      color: "default",
      class: {
        base: colorVariants.flat.default,
      },
    },
    {
      variant: "flat",
      color: "primary",
      class: {
        base: colorVariants.flat.primary,
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        base: colorVariants.flat.secondary,
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        base: colorVariants.flat.success,
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        base: colorVariants.flat.warning,
      },
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        base: colorVariants.flat.danger,
      },
    },
    // faded / color
    {
      variant: "faded",
      color: "default",
      class: {
        base: colorVariants.faded.default,
      },
    },
    {
      variant: "faded",
      color: "primary",
      class: {
        base: colorVariants.faded.primary,
      },
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        base: colorVariants.faded.secondary,
      },
    },
    {
      variant: "faded",
      color: "success",
      class: {
        base: colorVariants.faded.success,
      },
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        base: colorVariants.faded.warning,
      },
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        base: colorVariants.faded.danger,
      },
    },
    // light / color
    {
      variant: "light",
      color: "default",
      class: {
        base: colorVariants.light.default,
      },
    },
    {
      variant: "light",
      color: "primary",
      class: {
        base: colorVariants.light.primary,
      },
    },
    {
      variant: "light",
      color: "secondary",
      class: {
        base: colorVariants.light.secondary,
      },
    },
    {
      variant: "light",
      color: "success",
      class: {
        base: colorVariants.light.success,
      },
    },
    {
      variant: "light",
      color: "warning",
      class: {
        base: colorVariants.light.warning,
      },
    },
    {
      variant: "light",
      color: "danger",
      class: {
        base: colorVariants.light.danger,
      },
    },
    // isOneChar / size
    {
      isOneChar: true,
      hasStartContent: false,
      hasEndContent: false,
      size: "sm",
      class: {
        base: "w-5 h-5 min-w-5 min-h-5",
      },
    },
    {
      isOneChar: true,
      hasStartContent: false,
      hasEndContent: false,
      size: "md",
      class: {
        base: "w-6 h-6 min-w-6 min-h-6",
      },
    },
    {
      isOneChar: true,
      hasStartContent: false,
      hasEndContent: false,
      size: "lg",
      class: {
        base: "w-7 h-7 min-w-7 min-h-7",
      },
    },
    // isOneChar / isCloseable
    {
      isOneChar: true,
      isCloseable: false,
      hasStartContent: false,
      hasEndContent: false,
      class: {
        base: "px-0 justify-center",
        content: "px-0 flex-none",
      },
    },
    {
      isOneChar: true,
      isCloseable: true,
      hasStartContent: false,
      hasEndContent: false,
      class: {
        base: "w-auto",
      },
    },
    // isOneChar / dot
    {
      isOneChar: true,
      variant: "dot",
      class: {
        base: "w-auto h-7 px-1 items-center",
        content: "px-2",
      },
    },
    // hasStartContent / size
    {
      hasStartContent: true,
      size: "sm",
      class: {
        content: "pl-0.5",
      },
    },
    {
      hasStartContent: true,
      size: ["md", "lg"],
      class: {
        content: "pl-1",
      },
    },
    // hasEndContent / size
    {
      hasEndContent: true,
      size: "sm",
      class: {
        content: "pr-0.5",
      },
    },
    {
      hasEndContent: true,
      size: ["md", "lg"],
      class: {
        content: "pr-1",
      },
    },
  ],
});

export type ChipVariantProps = VariantProps<typeof chip>;
export type ChipSlots = keyof ReturnType<typeof chip>;

export {chip};

// calculated classNames
// src/components/chip/src/use-chip
// max-h-[80%]
