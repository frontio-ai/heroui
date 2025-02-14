import type {SelectSlots, SelectVariantProps, SlotsToClasses} from "@heroui/theme";
import type {HiddenSelectProps} from "./hidden-select";

import {
  DOMAttributes,
  HTMLHeroUIProps,
  mapPropsVariants,
  PropGetter,
  SharedSelection,
  useLabelPlacement,
  useProviderContext,
} from "@heroui/system";
import {select} from "@heroui/theme";
import {ReactRef, useDOMRef, filterDOMProps} from "@heroui/react-utils";
import {useMemo, useCallback, useRef, Key, ReactNode, useEffect} from "react";
import {ListboxProps} from "@heroui/listbox";
import {useAriaButton} from "@heroui/use-aria-button";
import {useFocusRing} from "@react-aria/focus";
import {clsx, dataAttr, objectToDeps} from "@heroui/shared-utils";
import {mergeProps} from "@react-aria/utils";
import {useHover} from "@react-aria/interactions";
import {PopoverProps} from "@heroui/popover";
import {ScrollShadowProps} from "@heroui/scroll-shadow";
import {
  MultiSelectProps,
  MultiSelectState,
  useMultiSelect,
  useMultiSelectState,
} from "@heroui/use-aria-multiselect";
import {SpinnerProps} from "@heroui/spinner";
import {useSafeLayoutEffect} from "@heroui/use-safe-layout-effect";
import {ariaShouldCloseOnInteractOutside} from "@heroui/aria-utils";
import {CollectionChildren, ValidationError} from "@react-types/shared";
import {FormContext, useSlottedContext} from "@heroui/form";

export type SelectedItemProps<T = object> = {
  /** A unique key for the item. */
  key?: Key;
  /** The props passed to the item. */
  props?: Record<string, any>;
  /** The item data. */
  data?: T | null;
  /** An accessibility label for this item. */
  "aria-label"?: string;
  /** The rendered contents of this item (e.g. JSX). */
  rendered?: ReactNode;
  /** A string value for this item, used for features like typeahead. */
  textValue?: string;
  /** The type of item this item represents. */
  type?: string;
};

export type SelectedItems<T = object> = Array<SelectedItemProps<T>>;

interface Props<T> extends Omit<HTMLHeroUIProps<"select">, keyof SelectVariantProps> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLSelectElement | null>;
  /**
   * The ref to the scroll element. Useful when having async loading of items.
   */
  scrollRef?: ReactRef<HTMLElement | null>;
  /**
   * The ref to the spinner element.
   */
  spinnerRef?: ReactRef<HTMLElement | null>;
  /**
   * Whether the select is required.
   * @default false
   */
  isRequired?: boolean;
  /**
   * The icon that represents the select open state. Usually a chevron icon.
   */
  selectorIcon?: ReactNode;
  /**
   * Element to be rendered in the left side of the select.
   */
  startContent?: React.ReactNode;
  /**
   * Element to be rendered in the right side of the select.
   */
  endContent?: ReactNode;
  /**
   * The placeholder for the select to display when no option is selected.
   * @default "Select an option"
   */
  placeholder?: string;
  /**
   * Whether to display a top and bottom arrow indicators when the listbox is scrollable.
   * @default true
   */
  showScrollIndicators?: boolean;
  /**
   * Props to be passed to the popover component.
   *
   * @default { placement: "bottom", triggerScaleOnOpen: false, offset: 5 }
   */
  popoverProps?: Partial<PopoverProps>;
  /**
   * Props to be passed to the listbox component.
   *
   * @default { disableAnimation: false }
   */
  listboxProps?: Partial<ListboxProps>;
  /**
   * Props to be passed to the scroll shadow component. This component
   * adds a shadow to the top and bottom of the listbox when it is scrollable.
   *
   * @default { hideScrollBar: true, offset: 15 }
   */
  scrollShadowProps?: Partial<ScrollShadowProps>;
  /**
   * Props to be passed to the spinner component.
   *
   * @default { size: "sm" , color: "current" }
   */
  spinnerProps?: Partial<SpinnerProps>;
  /**
   * Function to render the value of the select. It renders the selected item by default.
   * @param value
   * @returns
   */
  renderValue?: (items: SelectedItems<T>) => ReactNode;
  /**
   * Callback fired when the select menu is closed.
   */
  onClose?: () => void;
  /**
   * Classes object to style the select and its children.
   */
  classNames?: SlotsToClasses<SelectSlots>;
  /**
   * Handler that is called when the selection changes.
   */
  onSelectionChange?: (keys: SharedSelection) => void;
  /**
   * A function that returns an error message if a given value is invalid.
   * Validation errors are displayed to the user when the form is submitted
   * if `validationBehavior="native"`. For realtime validation, use the `isInvalid`
   * prop instead.
   */
  validate?: (value: string | string[]) => ValidationError | true | null | undefined;
}

interface SelectData {
  isDisabled?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  name?: string;
  validationBehavior?: "aria" | "native";
}

export const selectData = new WeakMap<MultiSelectState<any>, SelectData>();

export type UseSelectProps<T> = Omit<
  Props<T>,
  keyof Omit<MultiSelectProps<T>, "onSelectionChange">
> &
  Omit<MultiSelectProps<T>, "onSelectionChange"> &
  SelectVariantProps & {
    /**
     * The height of each item in the listbox.
     * For dataset with sections, the itemHeight must be the height of each item (including padding, border, margin).
     * This is required for virtualized listboxes to calculate the height of each item.
     * @default 36
     */
    itemHeight?: number;
    /**
     * The max height of the listbox (which will be rendered in a popover).
     * This is required for virtualized listboxes to set the maximum height of the listbox.
     */
    maxListboxHeight?: number;
    /**
     * Whether to enable virtualization of the listbox items.
     * By default, virtualization is automatically enabled when the number of items is greater than 50.
     * @default undefined
     */
    isVirtualized?: boolean;
    /**
     * Whether the listbox will be prevented from opening when there are no items.
     * @default false
     */
    hideEmptyContent?: boolean;
  };

export function useSelect<T extends object>(originalProps: UseSelectProps<T>) {
  const globalContext = useProviderContext();
  const {validationBehavior: formValidationBehavior} = useSlottedContext(FormContext) || {};

  const [props, variantProps] = mapPropsVariants(originalProps, select.variantKeys);

  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false;

  const {
    ref,
    as,
    label,
    name,
    isLoading,
    selectorIcon,
    isOpen,
    defaultOpen,
    onOpenChange,
    startContent,
    endContent,
    description,
    renderValue,
    onSelectionChange,
    placeholder,
    isVirtualized,
    itemHeight = 36,
    maxListboxHeight = 256,
    children,
    disallowEmptySelection = false,
    selectionMode = "single",
    spinnerRef,
    scrollRef: scrollRefProp,
    popoverProps = {},
    scrollShadowProps = {},
    listboxProps = {},
    spinnerProps = {},
    validationState,
    onChange,
    onClose,
    className,
    classNames,
    validationBehavior = formValidationBehavior ?? globalContext?.validationBehavior ?? "native",
    hideEmptyContent = false,
    ...otherProps
  } = props;

  const scrollShadowRef = useDOMRef(scrollRefProp);

  const slotsProps: {
    popoverProps: UseSelectProps<T>["popoverProps"];
    scrollShadowProps: UseSelectProps<T>["scrollShadowProps"];
    listboxProps: UseSelectProps<T>["listboxProps"];
  } = {
    popoverProps: mergeProps(
      {
        placement: "bottom",
        triggerScaleOnOpen: false,
        offset: 5,
        disableAnimation,
      },
      popoverProps,
    ),
    scrollShadowProps: mergeProps(
      {
        ref: scrollShadowRef,
        isEnabled: originalProps.showScrollIndicators ?? true,
        hideScrollBar: true,
        offset: 15,
      },
      scrollShadowProps,
    ),
    listboxProps: mergeProps(
      {
        disableAnimation,
      },
      listboxProps,
    ),
  };

  const Component = as || "button";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);
  const triggerRef = useRef<HTMLElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  let state = useMultiSelectState<T>({
    ...props,
    isOpen,
    selectionMode,
    disallowEmptySelection,
    validationBehavior,
    children: children as CollectionChildren<T>,
    isRequired: originalProps.isRequired,
    isDisabled: originalProps.isDisabled,
    isInvalid: originalProps.isInvalid,
    defaultOpen,
    hideEmptyContent,
    onOpenChange: (open) => {
      onOpenChange?.(open);
      if (!open) {
        onClose?.();
      }
    },
    onSelectionChange: (keys) => {
      onSelectionChange?.(keys);
      if (onChange && typeof onChange === "function") {
        onChange({
          target: {
            ...(domRef.current && {
              ...domRef.current,
              name: domRef.current.name,
            }),
            value: Array.from(keys).join(","),
          },
        } as React.ChangeEvent<HTMLSelectElement>);
      }
      state.commitValidation();
    },
  });

  state = {
    ...state,
    ...(originalProps.isDisabled && {
      disabledKeys: new Set([...state.collection.getKeys()]),
    }),
  };

  // if we use `react-hook-form`, it will set the native select value using the ref in register
  // i.e. setting ref.current.value to something which is uncontrolled
  // hence, sync the state with `ref.current.value`
  useSafeLayoutEffect(() => {
    if (!domRef.current?.value) return;

    state.setSelectedKeys(new Set([...state.selectedKeys, domRef.current.value]));
  }, [domRef.current]);

  const {
    labelProps,
    triggerProps,
    valueProps,
    menuProps,
    descriptionProps,
    errorMessageProps,
    isInvalid: isAriaInvalid,
    validationErrors,
    validationDetails,
  } = useMultiSelect(
    {...props, disallowEmptySelection, isDisabled: originalProps.isDisabled},
    state,
    triggerRef,
  );

  const isInvalid = originalProps.isInvalid || validationState === "invalid" || isAriaInvalid;

  const {isPressed, buttonProps} = useAriaButton(triggerProps, triggerRef);

  const {focusProps, isFocused, isFocusVisible} = useFocusRing();
  const {isHovered, hoverProps} = useHover({isDisabled: originalProps.isDisabled});

  const labelPlacement = useLabelPlacement({
    labelPlacement: originalProps.labelPlacement,
    label,
  });

  const hasPlaceholder = !!placeholder;
  const shouldLabelBeOutside =
    labelPlacement === "outside-left" ||
    (labelPlacement === "outside" &&
      (!(hasPlaceholder || !!description) || !!originalProps.isMultiline));
  const shouldLabelBeInside = labelPlacement === "inside";
  const isOutsideLeft = labelPlacement === "outside-left";

  const isFilled =
    state.isOpen ||
    hasPlaceholder ||
    !!state.selectedItems?.length ||
    !!startContent ||
    !!endContent ||
    !!originalProps.isMultiline;
  const hasValue = !!state.selectedItems?.length;
  const hasLabel = !!label;

  const baseStyles = clsx(classNames?.base, className);

  const slots = useMemo(
    () =>
      select({
        ...variantProps,
        isInvalid,
        labelPlacement,
        disableAnimation,
      }),
    [objectToDeps(variantProps), isInvalid, labelPlacement, disableAnimation],
  );

  // scroll the listbox to the selected item
  useEffect(() => {
    if (state.isOpen && popoverRef.current && listBoxRef.current) {
      let selectedItem = listBoxRef.current.querySelector("[aria-selected=true] [data-label=true]");
      let scrollShadow = scrollShadowRef.current;

      // scroll the listbox to the selected item
      if (selectedItem && scrollShadow && selectedItem.parentElement) {
        let scrollShadowRect = scrollShadow?.getBoundingClientRect();
        let scrollShadowHeight = scrollShadowRect.height;

        scrollShadow.scrollTop =
          selectedItem.parentElement.offsetTop -
          scrollShadowHeight / 2 +
          selectedItem.parentElement.clientHeight / 2;
      }
    }
  }, [state.isOpen, disableAnimation]);

  const errorMessage =
    typeof props.errorMessage === "function"
      ? props.errorMessage({isInvalid, validationErrors, validationDetails})
      : props.errorMessage || validationErrors?.join(" ");

  const hasHelper = !!description || !!errorMessage;

  // apply the same with to the popover as the select
  useEffect(() => {
    if (state.isOpen && popoverRef.current && triggerRef.current) {
      let selectRect = triggerRef.current.getBoundingClientRect();
      let popover = popoverRef.current;

      popover.style.width = selectRect.width + "px";
    }
  }, [state.isOpen]);

  const getBaseProps: PropGetter = useCallback(
    (props = {}) => ({
      "data-slot": "base",
      "data-filled": dataAttr(isFilled),
      "data-has-value": dataAttr(hasValue),
      "data-has-label": dataAttr(hasLabel),
      "data-has-helper": dataAttr(hasHelper),
      "data-invalid": dataAttr(isInvalid),
      className: slots.base({
        class: clsx(baseStyles, props.className),
      }),
      ...props,
    }),
    [slots, hasHelper, hasValue, hasLabel, isFilled, baseStyles],
  );

  const getTriggerProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: triggerRef,
        "data-slot": "trigger",
        "data-open": dataAttr(state.isOpen),
        "data-disabled": dataAttr(originalProps?.isDisabled),
        "data-focus": dataAttr(isFocused),
        "data-pressed": dataAttr(isPressed),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-hover": dataAttr(isHovered),
        className: slots.trigger({class: classNames?.trigger}),
        ...mergeProps(
          buttonProps,
          focusProps,
          hoverProps,
          filterDOMProps(otherProps, {
            enabled: shouldFilterDOMProps,
          }),
          filterDOMProps(props),
        ),
      };
    },
    [
      slots,
      triggerRef,
      state.isOpen,
      classNames?.trigger,
      originalProps?.isDisabled,
      isFocused,
      isPressed,
      isFocusVisible,
      isHovered,
      buttonProps,
      focusProps,
      hoverProps,
      otherProps,
      shouldFilterDOMProps,
    ],
  );

  const getHiddenSelectProps = useCallback(
    (props = {}) =>
      ({
        state,
        triggerRef,
        selectRef: domRef,
        selectionMode,
        label: originalProps?.label,
        name: originalProps?.name,
        isRequired: originalProps?.isRequired,
        autoComplete: originalProps?.autoComplete,
        isDisabled: originalProps?.isDisabled,
        onChange,
        ...props,
      } as HiddenSelectProps<T>),
    [
      state,
      selectionMode,
      originalProps?.label,
      originalProps?.autoComplete,
      originalProps?.name,
      originalProps?.isDisabled,
      triggerRef,
    ],
  );

  const getLabelProps: PropGetter = useCallback(
    (props = {}) => ({
      "data-slot": "label",
      className: slots.label({
        class: clsx(classNames?.label, props.className),
      }),
      ...labelProps,
      ...props,
    }),
    [slots, classNames?.label, labelProps],
  );

  const getValueProps: PropGetter = useCallback(
    (props = {}) => ({
      "data-slot": "value",
      className: slots.value({
        class: clsx(classNames?.value, props.className),
      }),
      ...valueProps,
      ...props,
    }),
    [slots, classNames?.value, valueProps],
  );

  const getListboxWrapperProps: PropGetter = useCallback(
    (props = {}) => ({
      "data-slot": "listboxWrapper",
      className: slots.listboxWrapper({
        class: clsx(classNames?.listboxWrapper, props?.className),
      }),
      style: {
        maxHeight: maxListboxHeight ?? 256,
        ...props.style,
      },
      ...mergeProps(slotsProps.scrollShadowProps, props),
    }),
    [
      slots.listboxWrapper,
      classNames?.listboxWrapper,
      slotsProps.scrollShadowProps,
      maxListboxHeight,
    ],
  );

  const getListboxProps = (props: any = {}) => {
    const shouldVirtualize = isVirtualized ?? state.collection.size > 50;

    return {
      state,
      ref: listBoxRef,
      isVirtualized: shouldVirtualize,
      virtualization: shouldVirtualize
        ? {
            maxListboxHeight,
            itemHeight,
          }
        : undefined,
      "data-slot": "listbox",
      className: slots.listbox({
        class: clsx(classNames?.listbox, props?.className),
      }),
      scrollShadowProps: slotsProps.scrollShadowProps,
      ...mergeProps(slotsProps.listboxProps, props, menuProps),
    } as ListboxProps;
  };

  const getPopoverProps = useCallback(
    (props: DOMAttributes = {}) => {
      const popoverProps = mergeProps(slotsProps.popoverProps, props);

      return {
        state,
        triggerRef,
        ref: popoverRef,
        "data-slot": "popover",
        scrollRef: listBoxRef,
        triggerType: "listbox",
        classNames: {
          content: slots.popoverContent({
            class: clsx(classNames?.popoverContent, props.className),
          }),
        },
        ...popoverProps,
        offset:
          state.selectedItems && state.selectedItems.length > 0
            ? // forces the popover to update its position when the selected items change
              state.selectedItems.length * 0.00000001 + (slotsProps.popoverProps?.offset || 0)
            : slotsProps.popoverProps?.offset,
        shouldCloseOnInteractOutside: popoverProps?.shouldCloseOnInteractOutside
          ? popoverProps.shouldCloseOnInteractOutside
          : (element: Element) => ariaShouldCloseOnInteractOutside(element, domRef, state),
      } as PopoverProps;
    },
    [
      slots,
      classNames?.popoverContent,
      slotsProps.popoverProps,
      triggerRef,
      state,
      state.selectedItems,
    ],
  );

  const getSelectorIconProps = useCallback(
    () => ({
      "data-slot": "selectorIcon",
      "aria-hidden": dataAttr(true),
      "data-open": dataAttr(state.isOpen),
      className: slots.selectorIcon({class: classNames?.selectorIcon}),
    }),
    [slots, classNames?.selectorIcon, state.isOpen],
  );

  const getInnerWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        "data-slot": "innerWrapper",
        className: slots.innerWrapper({
          class: clsx(classNames?.innerWrapper, props?.className),
        }),
      };
    },
    [slots, classNames?.innerWrapper],
  );

  const getHelperWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        "data-slot": "helperWrapper",
        className: slots.helperWrapper({
          class: clsx(classNames?.helperWrapper, props?.className),
        }),
      };
    },
    [slots, classNames?.helperWrapper],
  );

  const getDescriptionProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        ...descriptionProps,
        "data-slot": "description",
        className: slots.description({class: clsx(classNames?.description, props?.className)}),
      };
    },
    [slots, classNames?.description],
  );

  const getMainWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        "data-slot": "mainWrapper",
        className: slots.mainWrapper({
          class: clsx(classNames?.mainWrapper, props?.className),
        }),
      };
    },
    [slots, classNames?.mainWrapper],
  );

  const getErrorMessageProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        ...errorMessageProps,
        "data-slot": "error-message",
        className: slots.errorMessage({class: clsx(classNames?.errorMessage, props?.className)}),
      };
    },
    [slots, errorMessageProps, classNames?.errorMessage],
  );

  const getSpinnerProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        "aria-hidden": dataAttr(true),
        "data-slot": "spinner",
        color: "current",
        size: "sm",
        ...spinnerProps,
        ...props,
        ref: spinnerRef,
        className: slots.spinner({class: clsx(classNames?.spinner, props?.className)}),
      };
    },
    [slots, spinnerRef, spinnerProps, classNames?.spinner],
  );

  // store the data to be used in useHiddenSelect
  selectData.set(state, {
    isDisabled: originalProps?.isDisabled,
    isRequired: originalProps?.isRequired,
    name: originalProps?.name,
    isInvalid,
    validationBehavior,
  });

  return {
    Component,
    domRef,
    state,
    label,
    name,
    triggerRef,
    isLoading,
    placeholder,
    startContent,
    endContent,
    description,
    selectorIcon,
    hasHelper,
    labelPlacement,
    hasPlaceholder,
    renderValue,
    selectionMode,
    disableAnimation,
    isOutsideLeft,
    shouldLabelBeOutside,
    shouldLabelBeInside,
    isInvalid,
    errorMessage,
    getBaseProps,
    getTriggerProps,
    getLabelProps,
    getValueProps,
    getListboxProps,
    getPopoverProps,
    getSpinnerProps,
    getMainWrapperProps,
    getListboxWrapperProps,
    getHiddenSelectProps,
    getInnerWrapperProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getSelectorIconProps,
  };
}

export type UseSelectReturn = ReturnType<typeof useSelect>;
