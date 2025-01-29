import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

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

export type AccordionGroupVariantProps = VariantProps<typeof accordion>;

export {accordion};
