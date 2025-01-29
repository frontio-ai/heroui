import type {AriaAccordionProps} from "@react-types/accordion";
import type {HTMLHeroUIProps, PropGetter} from "@heroui/system";

import {AccordionGroupVariantProps, accordion} from "@heroui/theme";
import {useProviderContext} from "@heroui/system";
import {ReactRef, filterDOMProps} from "@heroui/react-utils";
import {Children, isValidElement, Key, useCallback} from "react";
import {mergeProps} from "@react-aria/utils";
import {useDOMRef} from "@heroui/react-utils";
import {useMemo} from "react";
import {DividerProps} from "@heroui/divider";
import {useDisclosureGroupState} from "@react-stately/disclosure";
import {clsx} from "@heroui/shared-utils";

import {AccordionItemProps} from "./accordion-item";

interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * Whether to display a divider at the bottom of the each accordion item.
   *
   * @default true
   */
  showDivider?: boolean;
  /**
   * The divider props.
   */
  dividerProps?: Partial<DividerProps>;
  allowsMultipleExpanded?: boolean;
  /**
   * Whether to keep the accordion content mounted when collapsed.
   * @default false
   */
  keepContentMounted?: boolean;
  /**
   * The accordion items classNames.
   */
  itemClasses?: AccordionItemProps["classNames"];
  disabledKeys?: Iterable<Key>;
}

export type UseAccordionProps<T extends object = {}> = Props &
  AccordionGroupVariantProps &
  AriaAccordionProps<T> &
  AccordionGroupVariantProps &
  Pick<
    AccordionItemProps,
    "isCompact" | "isDisabled" | "hideIndicator" | "disableAnimation" | "disableIndicatorAnimation"
  >;

export type ValuesType = {
  focusedKey?: Key | null;
  isCompact?: AccordionItemProps["isCompact"];
  isDisabled?: AccordionItemProps["isDisabled"];
  hideIndicator?: AccordionItemProps["hideIndicator"];
  disableAnimation?: AccordionItemProps["disableAnimation"];
  keepContentMounted?: Props["keepContentMounted"];
  disableIndicatorAnimation?: AccordionItemProps["disableAnimation"];
  disabledKeys?: Iterable<Key>;
  lastChildId?: string;
  dividerProps?: Partial<DividerProps>;
  showDivider?: boolean;
  fullWidth?: boolean;
};

export function useAccordion<T extends object>(originalProps: UseAccordionProps<T>) {
  const globalContext = useProviderContext();

  const {
    as,
    ref,
    isCompact = false,
    isDisabled,
    hideIndicator = false,
    disableAnimation = globalContext?.disableAnimation ?? false,
    disableIndicatorAnimation = false,
    disabledKeys,
    variant,
    className,
    children,
    dividerProps,
    keepContentMounted,
    showDivider = true,
    fullWidth = true,
    onExpandedChange,
  } = originalProps;

  const state = useDisclosureGroupState({...originalProps, onExpandedChange});

  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";
  const lastChild = Children.toArray(children).at(-1);
  const lastChildId = isValidElement(lastChild) ? lastChild.props.id : undefined;

  const values: ValuesType = useMemo(
    () => ({
      isCompact,
      isDisabled,
      hideIndicator,
      disableAnimation,
      disableIndicatorAnimation,
      disabledKeys,
      lastChildId,
      dividerProps,
      keepContentMounted,
      showDivider,
      fullWidth,
    }),
    [
      isCompact,
      isDisabled,
      hideIndicator,
      disableAnimation,
      state?.expandedKeys.values,
      disableIndicatorAnimation,
      state.expandedKeys.size,
      disabledKeys,
      lastChildId,
      keepContentMounted,
      showDivider,
      fullWidth,
    ],
  );

  const domRef = useDOMRef(ref);
  const classNames = useMemo(
    () =>
      accordion({
        variant,
        className,
      }),
    [variant, className],
  );

  const getBaseProps: PropGetter = useCallback((props = {}) => {
    return {
      ref: domRef,
      "data-orientation": "vertical",
      ...mergeProps(
        filterDOMProps(originalProps, {
          enabled: shouldFilterDOMProps,
        }),
        props,
      ),
      className: clsx(classNames, className),
    };
  }, []);

  return {
    state,
    values,
    children,
    Component,
    getBaseProps,
    domRef,
    showDivider,
  };
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>;
