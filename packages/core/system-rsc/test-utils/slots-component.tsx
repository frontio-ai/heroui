import type {HTMLHeroUIProps} from "../src/types";
import type {VariantProps} from "@heroui/theme";

import React, {useMemo} from "react";
import {SlotsToClasses, tv} from "@heroui/theme";
import {filterDOMProps, ReactRef, useDOMRef} from "@heroui/react-utils";
import {objectToDeps} from "@heroui/shared-utils";
import clsx from "clsx";

import {forwardRef, mapPropsVariants} from "../src/utils";

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
      "p-5",
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
      disableAnimation: false,
      class: "data-[pressed=true]:scale-95 tap-highlight-transparent",
    },
  ],
  defaultVariants: {
    radius: "lg",
    shadow: "md",
    fullWidth: false,
    isHoverable: false,
    isPressable: false,
    isDisabled: false,
    disableAnimation: false,
    isFooterBlurred: false,
  },
});

type CardVariantProps = VariantProps<typeof card>;
type CardSlots = keyof ReturnType<typeof card>;

interface CardProps extends HTMLHeroUIProps, CardVariantProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  ref?: ReactRef<HTMLDivElement | null>;
  classNames?: SlotsToClasses<CardSlots>;
}

export const Card = forwardRef<"div", CardProps>((originalProps, ref) => {
  const [props, variantProps] = mapPropsVariants(originalProps, card.variantKeys);

  const {header, footer, className, children, classNames, ...otherProps} = props;

  const styles = useMemo(() => card({...variantProps}), [objectToDeps(variantProps)]);

  const baseStyles = clsx(classNames?.base, className);

  const domRef = useDOMRef(ref);

  return (
    <div
      ref={domRef}
      className={styles.base({class: baseStyles})}
      data-testid="base"
      {...filterDOMProps(otherProps)}
    >
      <div className={styles.header({class: classNames?.header})} data-testid="header">
        {header}
      </div>
      <div className={styles.body({class: classNames?.body})} data-testid="body">
        {children}
      </div>
      <div className={styles.footer({class: classNames?.footer})} data-testid="footer">
        {footer}
      </div>
    </div>
  );
});

Card.displayName = "Card";
