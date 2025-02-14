import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {dataFocusVisibleClasses} from "../utils";

/**
 * Card **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, header, body, footer} = card({...})
 *
 * <div className={base()}>
 *    <div className={header()}>Header</div>
 *    <div className={body()}>Body</div>
 *    <div className={footer()}>Footer</div>
 * </div>
 * ```
 */
const card = tv({
  slots: {
    base: [
      "flex",
      "flex-col",
      "relative",
      "overflow-hidden",
      "h-auto",
      "outline-hidden",
      "text-foreground",
      "box-border",
      "bg-content1",
      // focus ring
      ...dataFocusVisibleClasses,
    ],
    header: [
      "flex",
      "p-3",
      "z-10",
      "w-full",
      "justify-start",
      "items-center",
      "shrink-0",
      "overflow-inherit",
      "color-inherit",
      "subpixel-antialiased",
    ],
    body: [
      "relative",
      "flex",
      "flex-1",
      "w-full",
      "p-3",
      "flex-auto",
      "flex-col",
      "place-content-inherit",
      "align-items-inherit",
      "h-auto",
      "break-words",
      "text-left",
      "overflow-y-auto",
      "subpixel-antialiased",
    ],
    footer: [
      "p-3",
      "h-auto",
      "flex",
      "w-full",
      "items-center",
      "overflow-hidden",
      "color-inherit",
      "subpixel-antialiased",
    ],
  },
  variants: {
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
    radius: {
      none: {
        base: "rounded-none",
        header: "rounded-none",
        footer: "rounded-none",
      },
      sm: {
        base: "rounded-small",
        header: "rounded-t-small",
        footer: "rounded-b-small",
      },
      md: {
        base: "rounded-medium",
        header: "rounded-t-medium",
        footer: "rounded-b-medium",
      },
      lg: {
        base: "rounded-large",
        header: "rounded-t-large",
        footer: "rounded-b-large",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
      },
    },
    isHoverable: {
      true: {
        base: "data-[hover=true]:bg-content2 dark:data-[hover=true]:bg-content2",
      },
    },
    isPressable: {
      true: {base: "cursor-pointer"},
    },
    isBlurred: {
      true: {
        base: [
          "bg-background/80",
          "dark:bg-background/20",
          "backdrop-blur-md",
          "backdrop-saturate-150",
        ],
      },
    },
    isFooterBlurred: {
      true: {
        footer: ["bg-background/10", "backdrop-blur", "backdrop-saturate-150"],
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled cursor-not-allowed",
      },
    },
    disableAnimation: {
      true: "",
      false: {base: "transition-transform-background motion-reduce:transition-none"},
    },
  },
  compoundVariants: [
    {
      isPressable: true,
      class: "data-[pressed=true]:scale-[0.97] tap-highlight-transparent",
    },
  ],
  defaultVariants: {
    radius: "lg",
    shadow: "md",
    fullWidth: false,
    isHoverable: false,
    isPressable: false,
    isDisabled: false,
    isFooterBlurred: false,
  },
});

export type CardVariantProps = VariantProps<typeof card>;
export type CardSlots = keyof ReturnType<typeof card>;
export type CardReturnType = ReturnType<typeof card>;

export {card};
