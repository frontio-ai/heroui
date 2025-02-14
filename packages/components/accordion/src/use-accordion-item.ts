import type {AccordionItemVariantProps} from "@heroui/theme";

import {HTMLHeroUIProps, PropGetter, useProviderContext} from "@heroui/system";
import {useFocusRing} from "@react-aria/focus";
import {accordionItem} from "@heroui/theme";
import {clsx, callAllHandlers, dataAttr, objectToDeps} from "@heroui/shared-utils";
import {ReactRef, useDOMRef, filterDOMProps} from "@heroui/react-utils";
import {NodeWithProps} from "@heroui/aria-utils";
import {useReactAriaAccordionItem} from "@heroui/use-aria-accordion";
import {useCallback, useMemo} from "react";
import {chain, mergeProps} from "@react-aria/utils";
import {useHover, usePress} from "@react-aria/interactions";
import {TreeState} from "@react-stately/tree";

import {AccordionItemBaseProps} from "./base/accordion-item-base";

export interface Props<T extends object> extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLButtonElement | null>;
  /**
   * The item node.
   */
  item: NodeWithProps<T, AccordionItemBaseProps<T>>;
  /**
   * The accordion tree state.
   */
  state: TreeState<T>;
  /**
   * Current focused key.
   */
  focusedKey: React.Key | null;
  /**
   * Callback fired when the focus state changes.
   */
  onFocusChange?: (isFocused: boolean, key?: React.Key) => void;
}

export type UseAccordionItemProps<T extends object = {}> = Props<T> &
  AccordionItemVariantProps &
  Omit<AccordionItemBaseProps, "onFocusChange">;

export function useAccordionItem<T extends object = {}>(props: UseAccordionItemProps<T>) {
  const globalContext = useProviderContext();

  const {ref, as, item, onFocusChange} = props;

  const {
    state,
    className,
    indicator,
    children,
    title,
    subtitle,
    startContent,
    motionProps,
    focusedKey,
    variant,
    isCompact = false,
    classNames: classNamesProp = {},
    isDisabled: isDisabledProp = false,
    hideIndicator = false,
    disableAnimation = globalContext?.disableAnimation ?? false,
    keepContentMounted = false,
    disableIndicatorAnimation = false,
    HeadingComponent = as || "h2",
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    onClick,
    ...otherProps
  } = props;

  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef<HTMLButtonElement>(ref);

  const isDisabled = state.disabledKeys.has(item.key) || isDisabledProp;
  const isOpen = state.selectionManager.isSelected(item.key);

  const {buttonProps: buttonCompleteProps, regionProps} = useReactAriaAccordionItem(
    {item, isDisabled},
    {...state, focusedKey: focusedKey},
    domRef,
  );

  const {onFocus: onFocusButton, onBlur: onBlurButton, ...buttonProps} = buttonCompleteProps;

  const {isFocused, isFocusVisible, focusProps} = useFocusRing({
    autoFocus: item.props?.autoFocus,
  });

  const {isHovered, hoverProps} = useHover({isDisabled});

  const {pressProps, isPressed} = usePress({
    ref: domRef,
    isDisabled,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
  });

  const handleFocus = useCallback(() => {
    onFocusChange?.(true, item.key);
  }, []);

  const handleBlur = useCallback(() => {
    onFocusChange?.(false, item.key);
  }, []);

  const classNames = useMemo(
    () => ({
      ...classNamesProp,
    }),
    [objectToDeps(classNamesProp)],
  );

  const slots = useMemo(
    () =>
      accordionItem({
        isCompact,
        isDisabled,
        hideIndicator,
        disableAnimation,
        disableIndicatorAnimation,
        variant,
      }),
    [isCompact, isDisabled, hideIndicator, disableAnimation, disableIndicatorAnimation, variant],
  );

  const baseStyles = clsx(classNames?.base, className);

  const getBaseProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        "data-slot": "base",
        className: slots.base({class: baseStyles}),
        ...mergeProps(
          filterDOMProps(otherProps, {
            enabled: shouldFilterDOMProps,
          }),
          props,
        ),
      };
    },
    [baseStyles, shouldFilterDOMProps, otherProps, slots, item.props, isOpen, isDisabled],
  );

  const getButtonProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      "data-open": dataAttr(isOpen),
      "data-focus": dataAttr(isFocused),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-disabled": dataAttr(isDisabled),
      "data-hover": dataAttr(isHovered),
      "data-pressed": dataAttr(isPressed),
      "data-slot": "trigger",
      className: slots.trigger({class: classNames?.trigger}),
      onFocus: callAllHandlers(
        handleFocus,
        onFocusButton,
        focusProps.onFocus,
        otherProps.onFocus,
        item.props?.onFocus,
      ),
      onBlur: callAllHandlers(
        handleBlur,
        onBlurButton,
        focusProps.onBlur,
        otherProps.onBlur,
        item.props?.onBlur,
      ),
      ...mergeProps(buttonProps, hoverProps, pressProps, props, {
        onClick: chain(pressProps.onClick, onClick),
      }),
    };
  };

  const getContentProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        "data-slot": "content",
        className: slots.content({class: classNames?.content}),
        ...mergeProps(regionProps, props),
      };
    },
    [slots, classNames, regionProps, isOpen, isDisabled, classNames?.content],
  );

  const getIndicatorProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "aria-hidden": dataAttr(true),
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        "data-slot": "indicator",
        className: slots.indicator({class: classNames?.indicator}),
        ...props,
      };
    },
    [slots, classNames?.indicator, isOpen, isDisabled, classNames?.indicator],
  );

  const getHeadingProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        "data-slot": "heading",
        className: slots.heading({class: classNames?.heading}),
        ...props,
      };
    },
    [slots, classNames?.heading, isOpen, isDisabled, classNames?.heading],
  );

  const getTitleProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        "data-slot": "title",
        className: slots.title({class: classNames?.title}),
        ...props,
      };
    },
    [slots, classNames?.title, isOpen, isDisabled, classNames?.title],
  );

  const getSubtitleProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        "data-slot": "subtitle",
        className: slots.subtitle({class: classNames?.subtitle}),
        ...props,
      };
    },
    [slots, classNames, isOpen, isDisabled, classNames?.subtitle],
  );

  return {
    Component,
    HeadingComponent,
    item,
    slots,
    classNames,
    domRef,
    indicator,
    children,
    title,
    subtitle,
    startContent,
    isOpen,
    isDisabled,
    hideIndicator,
    keepContentMounted,
    disableAnimation,
    motionProps,
    getBaseProps,
    getHeadingProps,
    getButtonProps,
    getContentProps,
    getIndicatorProps,
    getTitleProps,
    getSubtitleProps,
  };
}

export type UseAccordionItemReturn = ReturnType<typeof useAccordionItem>;
