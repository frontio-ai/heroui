import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {groupDataFocusVisibleClasses, hiddenInputClasses} from "../utils";

/**
 * Radio wrapper **Tailwind Variants** component
 *
 * const {base, wrapper, point, labelWrapper, label, description} = radio({...})
 *
 * @example
 * <label
 *    className={base())}
 *    data-selected={boolean}
 *    data-hover-unselected={boolean}
 *    data-focus-visible={boolean}
 * >
 *  // input
 *  <span className={wrapper()} aria-hidden="true" data-selected={selected} data-hover-unselected={hoverUnchecked}>
 *     <span className={point()}/>
 *  </span>
 *  <div className={labelWrapper()}>
 *    <span className={label()}>Label</span>
 *    <span className={description()}>Description</span>
 *  </div>
 * </label>
 */
const radio = tv({
  slots: {
    base: "group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2 select-none",
    wrapper: [
      "relative",
      "inline-flex",
      "items-center",
      "justify-center",
      "shrink-0",
      "overflow-hidden",
      "border-solid",
      "border-medium",
      "box-border",
      "border-default",
      "rounded-full",
      "group-data-[hover-unselected=true]:bg-default-100",
      // focus ring
      ...groupDataFocusVisibleClasses,
    ],
    hiddenInput: hiddenInputClasses,
    labelWrapper: "flex flex-col ml-1",
    control: [
      "z-10",
      "w-2",
      "h-2",
      "opacity-0",
      "scale-0",
      "origin-center",
      "rounded-full",
      "group-data-[selected=true]:opacity-100",
      "group-data-[selected=true]:scale-100",
    ],
    label: "relative text-foreground select-none",
    description: "relative text-foreground-400",
  },
  variants: {
    color: {
      default: {
        control: "bg-default-500 text-default-foreground",
        wrapper: "group-data-[selected=true]:border-default-500",
      },
      primary: {
        control: "bg-primary text-primary-foreground",
        wrapper: "group-data-[selected=true]:border-primary",
      },
      secondary: {
        control: "bg-secondary text-secondary-foreground",
        wrapper: "group-data-[selected=true]:border-secondary",
      },
      success: {
        control: "bg-success text-success-foreground",
        wrapper: "group-data-[selected=true]:border-success",
      },
      warning: {
        control: "bg-warning text-warning-foreground",
        wrapper: "group-data-[selected=true]:border-warning",
      },
      danger: {
        control: "bg-danger text-danger-foreground",
        wrapper: "group-data-[selected=true]:border-danger",
      },
    },
    size: {
      sm: {
        wrapper: "w-4 h-4",
        control: "w-1.5 h-1.5",
        labelWrapper: "ml-1",
        label: "text-small",
        description: "text-tiny",
      },
      md: {
        wrapper: "w-5 h-5",
        control: "w-2 h-2",
        labelWrapper: "ms-2",
        label: "text-medium",
        description: "text-small",
      },
      lg: {
        wrapper: "w-6 h-6",
        control: "w-2.5 h-2.5",
        labelWrapper: "ms-2",
        label: "text-large",
        description: "text-medium",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
      },
    },
    isInvalid: {
      true: {
        control: "bg-danger text-danger-foreground",
        wrapper: "border-danger group-data-[selected=true]:border-danger",
        label: "text-danger",
        description: "text-danger-300",
      },
    },
    disableAnimation: {
      true: {},
      false: {
        wrapper: [
          "group-data-[pressed=true]:scale-95",
          "transition-transform-colors",
          "motion-reduce:transition-none",
        ],
        control: "transition-transform-opacity motion-reduce:transition-none",
        label: "transition-colors motion-reduce:transition-none",
        description: "transition-colors motion-reduce:transition-none",
      },
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    isDisabled: false,
    isInvalid: false,
  },
});

/**
 * RadioGroup wrapper **Tailwind Variants** component
 *
 * const {base, label, wrapper} = radioGroup({...})
 *
 * @example
 * <div className={base())}>
 *  <label className={label()}>Label</label>
 *  <div className={wrapper()} data-orientation="vertical/horizontal">
 *     // radios
 *  </div>
 * </div>
 */
const radioGroup = tv({
  slots: {
    base: "relative flex flex-col gap-2",
    label: "relative text-foreground-500",
    wrapper: "flex flex-col flex-wrap gap-2 data-[orientation=horizontal]:flex-row",
    description: "text-tiny text-foreground-400",
    errorMessage: "text-tiny text-danger",
  },
  variants: {
    isRequired: {
      true: {
        label: "after:content-['*'] after:text-danger after:ml-0.5",
      },
    },
    isInvalid: {
      true: {
        description: "text-danger",
      },
    },
    disableAnimation: {
      true: {},
      false: {
        description: "transition-colors !duration-150 motion-reduce:transition-none",
      },
    },
  },
  defaultVariants: {
    isInvalid: false,
    isRequired: false,
  },
});

export type RadioGroupSlots = keyof ReturnType<typeof radioGroup>;

export type RadioVariantProps = VariantProps<typeof radio>;
export type RadioSlots = keyof ReturnType<typeof radio>;

export {radio, radioGroup};
