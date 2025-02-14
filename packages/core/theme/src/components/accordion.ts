import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {dataFocusVisibleClasses} from "../utils";

/**
 * Accordion wrapper **Tailwind Variants** component
 *
 * const styles = accordion({...})
 *
 * @example
 * <div role="group" className={styles())}>
 *   // accordion elements
 * </div>
 */
const accordion = tv({
  base: "px-2",
  variants: {
    variant: {
      light: "",
      shadow: "px-4 shadow-medium rounded-medium bg-content1",
      bordered: "px-4 border-medium border-divider rounded-medium",
      splitted: "flex flex-col gap-2",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    variant: "light",
    fullWidth: true,
  },
});

/**
 * AccordionItem wrapper **Tailwind Variants** component
 *
 * const {base, heading, indicator, trigger, startContent, title, subtitle, content } = accordionItem({...})
 *
 * @example
 * <div className={base())}>
 *   <div className={heading())}>
 *    <button className={trigger())}>
 *      <div className={startContent()}>
 *         // content
 *      </div>
 *      <div className={titleWrapper()}>
 *        <h3 className={title())}>Title</h3>
 *        <span className={subtitle())}>Subtitle</span>
 *      </div>
 *      <span className={indicator())}>Indicator</span>
 *    </button>
 *  </div>
 *  <div className={content())}>Content</div>
 * </div>
 */
const accordionItem = tv({
  slots: {
    base: "",
    heading: "",
    trigger: [
      "flex py-4 w-full h-full gap-3 outline-hidden items-center tap-highlight-transparent",
      // focus ring
      ...dataFocusVisibleClasses,
    ],
    startContent: "shrink-0",
    indicator: "text-default-400",
    titleWrapper: "flex-1 flex flex-col text-start",
    title: "text-foreground text-medium",
    subtitle: "text-small text-foreground-500 font-normal",
    content: "py-2",
  },
  variants: {
    variant: {
      splitted: {
        base: "px-4 bg-content1 shadow-medium rounded-medium",
      },
    },
    isCompact: {
      true: {
        trigger: "py-2",
        title: "text-medium",
        subtitle: "text-small",
        indicator: "text-medium",
        content: "py-1",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
      },
    },
    hideIndicator: {
      true: {
        indicator: "hidden",
      },
    },
    disableAnimation: {
      true: {
        content: "hidden data-[open=true]:block",
      },
      false: {
        indicator: "transition-transform",
        trigger: "transition-opacity",
      },
    },
    disableIndicatorAnimation: {
      true: {
        indicator: "transition-none",
      },
      false: {
        indicator:
          "rotate-0 data-[open=true]:-rotate-90 rtl:-rotate-180 rtl:data-[open=true]:-rotate-90",
      },
    },
  },
  defaultVariants: {
    size: "md",
    radius: "lg",
    isDisabled: false,
    hideIndicator: false,
    disableIndicatorAnimation: false,
  },
});

export type AccordionGroupVariantProps = VariantProps<typeof accordion>;

export type AccordionItemVariantProps = VariantProps<typeof accordionItem>;
export type AccordionItemSlots = keyof ReturnType<typeof accordionItem>;

export {accordion, accordionItem};
