import type {
  MultiSelectProps as MultiSelectStateProps,
  MultiSelectState,
} from "./use-multiselect-state";
import type {AriaButtonProps} from "@react-types/button";

import {useCollator} from "@heroui/react-aria-i18n";
import {setInteractionModality} from "@react-aria/interactions";
import {useField} from "@react-aria/label";
import {AriaListBoxOptions} from "@react-aria/listbox";
import {useMenuTrigger} from "@react-aria/menu";
import {ListKeyboardDelegate, useTypeSelect} from "@react-aria/selection";
import {chain, filterDOMProps, mergeProps, useId} from "@react-aria/utils";
import {FocusEvent, HTMLAttributes, RefObject, useMemo, Key} from "react";
import {ValidationResult} from "@react-types/shared";

export type MultiSelectProps<T> = MultiSelectStateProps<T>;

export interface MultiSelectAria<T> extends ValidationResult {
  /** Props for the label element. */
  labelProps: HTMLAttributes<HTMLElement>;
  /** Props for the popup trigger element. */
  triggerProps: AriaButtonProps;
  /** Props for the element representing the selected value. */
  valueProps: HTMLAttributes<HTMLElement>;
  /** Props for the popup. */
  menuProps: AriaListBoxOptions<T>;
  /** Props for the select's description element, if any. */
  descriptionProps: HTMLAttributes<HTMLElement>;
  /** Props for the select's error message element, if any. */
  errorMessageProps: HTMLAttributes<HTMLElement>;
}

export function useMultiSelect<T>(
  props: MultiSelectProps<T>,
  state: MultiSelectState<T>,
  ref: RefObject<HTMLElement>,
): MultiSelectAria<T> {
  const {disallowEmptySelection, isDisabled} = props;

  const collator = useCollator({usage: "search", sensitivity: "base"});
  const delegate = useMemo(
    () => new ListKeyboardDelegate(state.collection, state.disabledKeys, null as never, collator),
    [state.collection, state.disabledKeys, collator],
  );

  const {menuTriggerProps, menuProps} = useMenuTrigger<T>(
    {
      isDisabled,
      type: "listbox",
    },
    state,
    ref,
  );

  const triggerOnKeyDown = (e: KeyboardEvent) => {
    // Select items when trigger has focus - imitating default `<select>` behavior.
    // In multi selection mode it does not make sense.
    if (state.selectionMode === "single") {
      switch (e.key) {
        case "ArrowLeft": {
          // prevent scrolling containers
          e.preventDefault();

          const key =
            state.selectedKeys.size > 0
              ? delegate.getKeyAbove(state.selectedKeys.values().next().value as Key)
              : delegate.getFirstKey();

          if (key) {
            state.setSelectedKeys([key]);
          }
          break;
        }
        case "ArrowRight": {
          // prevent scrolling containers
          e.preventDefault();

          const key =
            state.selectedKeys.size > 0
              ? delegate.getKeyBelow(state.selectedKeys.values().next().value as Key)
              : delegate.getFirstKey();

          if (key) {
            state.setSelectedKeys([key]);
          }
          break;
        }

        // no default
      }
    }
  };

  // Typeahead functionality - imitating default `<select>` behavior.
  const {typeSelectProps} = useTypeSelect({
    keyboardDelegate: delegate,
    selectionManager: state.selectionManager,
    onTypeSelect(key) {
      state.setSelectedKeys([key]);
    },
  });
  const {isInvalid, validationErrors, validationDetails} = state.displayValidation;

  const {labelProps, fieldProps, descriptionProps, errorMessageProps} = useField({
    ...props,
    labelElementType: "span",
    isInvalid,
    errorMessage: props.errorMessage || validationErrors,
  });

  typeSelectProps.onKeyDown = typeSelectProps.onKeyDownCapture;
  delete typeSelectProps.onKeyDownCapture;

  const domProps = filterDOMProps(props, {labelable: true});
  const triggerProps = mergeProps(typeSelectProps, menuTriggerProps, fieldProps);

  const valueId = useId();

  return {
    labelProps: {
      ...labelProps,
      onClick: () => {
        if (!props.isDisabled) {
          ref.current?.focus();

          // Show the focus ring so the user knows where focus went
          setInteractionModality("keyboard");
        }
      },
    },
    triggerProps: mergeProps(domProps, {
      ...triggerProps,
      onKeyDown: chain(triggerProps.onKeyDown, triggerOnKeyDown, props.onKeyDown),
      onKeyUp: props.onKeyUp,
      "aria-labelledby": [
        valueId,
        domProps["aria-label"] !== undefined
          ? domProps["aria-labelledby"] !== undefined
            ? domProps["aria-labelledby"]
            : triggerProps.id
          : triggerProps["aria-labelledby"],
      ].join(" "),
      onFocus(e: FocusEvent) {
        if (state.isFocused) {
          return;
        }

        if (props.onFocus) {
          props.onFocus(e);
        }

        state.setFocused(true);
      },
      onBlur(e: FocusEvent) {
        if (state.isOpen) {
          return;
        }

        if (props.onBlur) {
          props.onBlur(e);
        }

        state.setFocused(false);
      },
    }),
    valueProps: {
      id: valueId,
    },
    menuProps: {
      ...menuProps,
      disallowEmptySelection,
      autoFocus: state.focusStrategy || true,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
      onBlur: (e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node)) {
          return;
        }

        if (props.onBlur) {
          props.onBlur(e);
        }
        state.setFocused(false);
      },
      // @ts-ignore
      onFocus: menuProps?.onFocus,
      "aria-labelledby": [
        fieldProps["aria-labelledby"],
        triggerProps["aria-label"] && !fieldProps["aria-labelledby"] ? triggerProps.id : null,
      ]
        .filter(Boolean)
        .join(" "),
    },
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
    validationDetails,
  };
}
