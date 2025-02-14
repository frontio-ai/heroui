import type {KeyboardDelegate} from "@react-types/shared";

import {AriaListBoxProps, useListBox as useAriaListbox} from "@react-aria/listbox";
import {HTMLHeroUIProps, PropGetter, useProviderContext} from "@heroui/system";
import {listbox, ListboxVariantProps, ListboxSlots, SlotsToClasses} from "@heroui/theme";
import {ListState, useListState} from "@react-stately/list";
import {filterDOMProps, ReactRef, useDOMRef} from "@heroui/react-utils";
import {ReactNode, useMemo} from "react";
import {clsx} from "@heroui/shared-utils";

import {ListboxItemProps} from "./listbox-item";

interface AriaListBoxOptions<T> extends AriaListBoxProps<T> {
  /** Whether the listbox uses virtual scrolling. */
  isVirtualized?: boolean;
  /**
   * An optional keyboard delegate implementation for type to select,
   * to override the default.
   */
  keyboardDelegate?: KeyboardDelegate;
  /**
   * Whether the listbox items should use virtual focus instead of being focused directly.
   */
  shouldUseVirtualFocus?: boolean;
  /** Whether selection should occur on press up instead of press down. */
  shouldSelectOnPressUp?: boolean;
  /** Whether options should be focused when the user hovers over them. */
  shouldFocusOnHover?: boolean;
  /** Whether the item should display the same "hover" styles as when it is focused. */
  shouldHighlightOnFocus?: boolean;
}

interface Props<T> extends Omit<HTMLHeroUIProps<"ul">, "children"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The controlled state of the listbox.
   */
  state?: ListState<T>;
  /**
   * The listbox items variant.
   */
  variant?: ListboxItemProps["variant"];
  /**
   * The listbox items color.
   */
  color?: ListboxItemProps["color"];
  /**
   * Custom content to be included in the top of the listbox.
   */
  topContent?: ReactNode;
  /**
   * Custom content to be included in the bottom of the listbox.
   */
  bottomContent?: ReactNode;
  /**
   * Whether to not display the empty content when there are no items.
   * @default false
   */
  hideEmptyContent?: boolean;
  /**
   *  Provides content to display when there are no items.
   * @default "No items."
   */
  emptyContent?: ReactNode;
  /**
   * Whether to hide the check icon when the items are selected.
   * @default false
   */
  hideSelectedIcon?: boolean;
  /**
   * Whether to disable the items animation.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Listbox classNames={{
   *    base:"base-classes",
   *    emptyContent: "empty-content-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<ListboxSlots>;
  /**
   * The menu items classNames.
   */
  itemClasses?: ListboxItemProps["classNames"];
}

export type UseListboxProps<T = object> = Props<T> & AriaListBoxOptions<T> & ListboxVariantProps;

export function useListbox<T extends object>(props: UseListboxProps<T>) {
  const globalContext = useProviderContext();

  const {
    ref,
    as,
    state: propState,
    variant,
    color,
    onAction,
    children,
    onSelectionChange,
    disableAnimation = globalContext?.disableAnimation ?? false,
    itemClasses,
    className,
    topContent,
    bottomContent,
    emptyContent = "No items.",
    hideSelectedIcon = false,
    hideEmptyContent = false,
    shouldHighlightOnFocus = false,
    classNames,
    ...otherProps
  } = props;

  const Component = as || "ul";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);

  const innerState = useListState({...props, children, onSelectionChange});
  const state = propState || innerState;

  const {listBoxProps} = useAriaListbox({...props, onAction}, state, domRef);

  const slots = useMemo(() => listbox(), []);

  const baseStyles = clsx(classNames?.base, className);

  const getBaseProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      "data-slot": "base",
      className: slots.base({class: baseStyles}),
      ...filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps,
      }),
      ...props,
    };
  };

  const getListProps: PropGetter = (props = {}) => {
    return {
      "data-slot": "list",
      className: slots.list({class: classNames?.list}),
      ...listBoxProps,
      ...props,
    };
  };

  const getEmptyContentProps: PropGetter = (props = {}) => {
    return {
      "data-slot": "empty-content",
      children: emptyContent,
      className: slots.emptyContent({class: classNames?.emptyContent}),
      ...props,
    };
  };

  return {
    Component,
    state,
    variant,
    color,
    slots,
    classNames,
    topContent,
    bottomContent,
    emptyContent,
    hideEmptyContent,
    shouldHighlightOnFocus,
    hideSelectedIcon,
    disableAnimation,
    className,
    itemClasses,
    getBaseProps,
    getListProps,
    getEmptyContentProps,
  };
}

export type UseListboxReturn = ReturnType<typeof useListbox>;
