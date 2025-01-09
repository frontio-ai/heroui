import type {DisclosureSlots, DisclosureVariantProps, SlotsToClasses} from "@nextui-org/theme";

import {disclosure} from "@nextui-org/theme";
import {As, HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {useDisclosure as useAriaDisclosure} from "@react-aria/disclosure";
import {DisclosureProps, useDisclosureState} from "@react-stately/disclosure";
import {ReactNode, useCallback, useMemo, useRef} from "react";
import {clsx, dataAttr, objectToDeps} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";
import {useButton} from "@react-aria/button";

export type DisclosureItemIndicatorProps = {
  /**
   * The current indicator, usually an arrow icon.
   */
  indicator?: ReactNode;
  /**
   * The current open status.
   */
  isExpanded?: boolean;
  /**
   * The current disabled status.
   * @default false
   */
  isDisabled?: boolean;
};

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * Start icon to be displayed inside the disclosure.
   */
  startContent?: ReactNode;
  /**
   * The accordion item `expanded` indicator, it's usually an arrow icon.
   * If you pass a function, NextUI will expose the current indicator and the open status,
   * In case you want to use a custom indicator or modify the current one.
   */
  indicator?: ReactNode | ((props: DisclosureItemIndicatorProps) => ReactNode) | null;
  /**
   * Customizable heading tag for Web accessibility:
   * use headings to describe content and use them consistently and semantically.
   * This will help all users to better find the content they are looking for.
   */
  HeadingComponent?: As;
  /**
   * The content of the component.
   */
  children?: ReactNode | null;
  title: string;
  subtitle?: string;
  classNames?: SlotsToClasses<DisclosureSlots>;
}

export type UseDisclosureProps = Props & DisclosureVariantProps & DisclosureProps;

export function useDisclosure(originalProps: UseDisclosureProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, disclosure.variantKeys);
  const {
    ref,
    as,
    className,
    defaultExpanded,
    onExpandedChange,
    classNames,
    title,
    subtitle,
    startContent,
    children,
    HeadingComponent = as || "h2",
    indicator,
  } = props;

  const Component = as || "div";
  const domRef = useDOMRef(ref);
  const {isDisabled, isExpanded, hideIndicator = false} = originalProps;

  const styles = useMemo(
    () =>
      disclosure({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );
  const slots = useMemo(() => disclosure(), []);
  const state = useDisclosureState({
    isExpanded,
    defaultExpanded,
    onExpandedChange: (isExpanded) => {
      onExpandedChange?.(isExpanded);
    },
  });

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const {buttonProps: triggerProps, panelProps: contentProps} = useAriaDisclosure(
    props,
    state,
    contentRef,
  );

  const {buttonProps} = useButton(triggerProps, triggerRef);

  const getBaseProps = useCallback<PropGetter>(
    (props = {}) => ({
      className: slots.base({class: clsx(classNames?.base, props?.className)}),
      ...props,
    }),
    [],
  );

  const getHeadingProps = useCallback<PropGetter>(
    (props = {}) => ({
      className: slots.heading({class: clsx(classNames?.heading, props?.className)}),
      ...props,
    }),
    [],
  );

  const getTriggerProps = useCallback<PropGetter>(
    (props = {}) => ({
      ref: triggerRef,
      className: slots.trigger({class: clsx(classNames?.trigger, props?.className)}),
      ...mergeProps(buttonProps, props),
    }),
    [triggerProps],
  );

  const getContentProps = useCallback<PropGetter>(
    (props = {}) => ({
      ref: contentRef,
      className: slots.content({class: clsx(classNames?.content, props?.className)}),
      ...mergeProps(contentProps, props),
    }),
    [contentProps, contentRef],
  );

  const getTitleProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-open": dataAttr(state.isExpanded),
        "data-disabled": dataAttr(isDisabled),
        className: slots.title({class: classNames?.title}),
        ...props,
      };
    },
    [slots, classNames?.title, state.isExpanded, isDisabled],
  );

  const getSubtitleProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-open": dataAttr(state.isExpanded),
        "data-disabled": dataAttr(isDisabled),
        className: slots.subtitle({class: classNames?.subtitle}),
        ...props,
      };
    },
    [slots, classNames?.subtitle, state.isExpanded, isDisabled],
  );

  const getIndicatorProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "aria-hidden": dataAttr(true),
        "data-open": dataAttr(isExpanded),
        "data-disabled": dataAttr(isDisabled),
        className: slots.indicator({class: classNames?.indicator}),
        ...props,
      };
    },
    [slots, classNames?.indicator, isExpanded, isDisabled, classNames?.indicator],
  );

  return {
    Component,
    HeadingComponent,
    styles,
    domRef,
    startContent,
    classNames,
    slots,
    title,
    subtitle,
    children,
    isExpanded,
    isDisabled,
    indicator,
    hideIndicator,
    getBaseProps,
    getTriggerProps,
    getContentProps,
    getHeadingProps,
    getTitleProps,
    getSubtitleProps,
    getIndicatorProps,
  };
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>;
