import type {ListboxItemBaseProps} from "./base/listbox-item-base";
import type {MenuItemVariantProps} from "@heroui/theme";

import {useMemo, useRef, useCallback} from "react";
import {listboxItem} from "@heroui/theme";
import {HTMLHeroUIProps, mapPropsVariants, PropGetter, useProviderContext} from "@heroui/system";
import {useFocusRing} from "@react-aria/focus";
import {Node} from "@react-types/shared";
import {filterDOMProps} from "@heroui/react-utils";
import {clsx, dataAttr, objectToDeps, removeEvents, warn} from "@heroui/shared-utils";
import {useOption} from "@react-aria/listbox";
import {mergeProps} from "@react-aria/utils";
import {useHover, usePress} from "@react-aria/interactions";
import {useIsMobile} from "@heroui/use-is-mobile";
import {ListState} from "@react-stately/list";

interface Props<T extends object> extends ListboxItemBaseProps<T> {
  item: Node<T>;
  state: ListState<T>;
}

export type UseListboxItemProps<T extends object> = Props<T> &
  Omit<HTMLHeroUIProps<"li">, keyof Props<T>> &
  MenuItemVariantProps;

export function useListboxItem<T extends object>(originalProps: UseListboxItemProps<T>) {
  const globalContext = useProviderContext();

  const [props, variantProps] = mapPropsVariants(originalProps, listboxItem.variantKeys);

  const {
    as,
    item,
    state,
    description,
    startContent,
    endContent,
    isVirtualized,
    selectedIcon,
    className,
    classNames,
    autoFocus,
    onPress,
    onPressUp,
    onPressStart,
    onPressEnd,
    onPressChange,
    onClick: deprecatedOnClick,
    shouldHighlightOnFocus,
    hideSelectedIcon = false,
    isReadOnly = false,
    ...otherProps
  } = props;

  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false;

  const domRef = useRef<HTMLLIElement>(null);

  const Component = as || (originalProps.href ? "a" : "li");
  const shouldFilterDOMProps = typeof Component === "string";

  const {rendered, key} = item;

  const isDisabled = state.disabledKeys.has(key) || originalProps.isDisabled;
  const isSelectable = state.selectionManager.selectionMode !== "none";

  const isMobile = useIsMobile();

  if (deprecatedOnClick && typeof deprecatedOnClick === "function") {
    warn(
      "onClick is deprecated, please use onPress instead. See: https://github.com/heroui-inc/heroui/issues/4292",
      "ListboxItem",
    );
  }

  const {pressProps, isPressed} = usePress({
    ref: domRef,
    isDisabled: isDisabled,
    onPress,
    onPressUp,
    onPressStart,
    onPressEnd,
    onPressChange,
  });

  const {isHovered, hoverProps} = useHover({
    isDisabled,
  });

  const {isFocusVisible, focusProps} = useFocusRing({
    autoFocus,
  });

  const {isFocused, isSelected, optionProps, labelProps, descriptionProps} = useOption(
    {
      key,
      isDisabled,
      "aria-label": props["aria-label"],
      isVirtualized,
    },
    state,
    domRef,
  );

  let itemProps = optionProps;

  const slots = useMemo(
    () =>
      listboxItem({
        ...variantProps,
        isDisabled,
        disableAnimation,
        hasTitleTextChild: typeof rendered === "string",
        hasDescriptionTextChild: typeof description === "string",
      }),
    [objectToDeps(variantProps), isDisabled, disableAnimation, rendered, description],
  );

  const baseStyles = clsx(classNames?.base, className);

  if (isReadOnly) {
    itemProps = removeEvents(itemProps);
  }

  const isHighlighted =
    (shouldHighlightOnFocus && isFocused) ||
    (isMobile ? isHovered || isPressed : isHovered || (isFocused && !isFocusVisible));

  const getItemProps: PropGetter = (props = {}) => ({
    ref: domRef,
    ...mergeProps(
      {
        onClick: deprecatedOnClick,
      },
      itemProps,
      isReadOnly ? {} : mergeProps(focusProps, pressProps),
      hoverProps,
      filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps,
      }),
      props,
    ),
    "data-selectable": dataAttr(isSelectable),
    "data-focus": dataAttr(isFocused),
    "data-hover": dataAttr(isHighlighted),
    "data-disabled": dataAttr(isDisabled),
    "data-selected": dataAttr(isSelected),
    "data-pressed": dataAttr(isPressed),
    "data-focus-visible": dataAttr(isFocusVisible),
    className: slots.base({class: clsx(baseStyles, props.className)}),
  });

  const getLabelProps: PropGetter = (props = {}) => ({
    ...mergeProps(labelProps, props),
    "data-label": dataAttr(true),
    className: slots.title({class: classNames?.title}),
  });

  const getDescriptionProps: PropGetter = (props = {}) => ({
    ...mergeProps(descriptionProps, props),
    className: slots.description({class: classNames?.description}),
  });

  const getWrapperProps: PropGetter = (props = {}) => ({
    ...mergeProps(props),
    className: slots.wrapper({class: classNames?.wrapper}),
  });

  const getSelectedIconProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "aria-hidden": dataAttr(true),
        "data-disabled": dataAttr(isDisabled),
        className: slots.selectedIcon({class: classNames?.selectedIcon}),
        ...props,
      };
    },
    [isDisabled, slots, classNames],
  );

  return {
    Component,
    domRef,
    slots,
    classNames,
    isSelectable,
    isSelected,
    isDisabled,
    rendered,
    description,
    startContent,
    endContent,
    selectedIcon,
    hideSelectedIcon,
    disableAnimation,
    getItemProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getSelectedIconProps,
  };
}

export type UseListboxItemReturn = ReturnType<typeof useListboxItem>;
