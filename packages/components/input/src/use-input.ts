import type {InputVariantProps, SlotsToClasses, InputSlots} from "@heroui/theme";
import type {AriaTextFieldOptions} from "@react-aria/textfield";

import {
  HTMLHeroUIProps,
  mapPropsVariants,
  PropGetter,
  useLabelPlacement,
  useProviderContext,
} from "@heroui/system";
import {useSafeLayoutEffect} from "@heroui/use-safe-layout-effect";
import {AriaTextFieldProps} from "@react-types/textfield";
import {useFocusRing} from "@react-aria/focus";
import {input} from "@heroui/theme";
import {useDOMRef, filterDOMProps} from "@heroui/react-utils";
import {useFocusWithin, useHover, usePress} from "@react-aria/interactions";
import {clsx, dataAttr, isEmpty, objectToDeps, safeAriaLabel} from "@heroui/shared-utils";
import {useControlledState} from "@react-stately/utils";
import {useMemo, Ref, useCallback, useState} from "react";
import {chain, mergeProps} from "@react-aria/utils";
import {useTextField} from "@react-aria/textfield";
import {FormContext, useSlottedContext} from "@heroui/form";

export interface Props<T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement>
  extends Omit<HTMLHeroUIProps<"input">, keyof InputVariantProps> {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<T>;
  /**
   * Ref to the container DOM node.
   */
  baseRef?: Ref<HTMLDivElement>;
  /**
   * Ref to the input wrapper DOM node.
   * This is the element that wraps the input label and the innerWrapper when the labelPlacement="inside"
   * and the input has start/end content.
   */
  wrapperRef?: Ref<HTMLDivElement>;
  /**
   * Ref to the input inner wrapper DOM node.
   * This is the element that wraps the input and the start/end content when passed.
   */
  innerWrapperRef?: Ref<HTMLDivElement>;
  /**
   * Element to be rendered in the left side of the input.
   */
  startContent?: React.ReactNode;
  /**
   * Element to be rendered in the right side of the input.
   * if you pass this prop and the `onClear` prop, the passed element
   * will have the clear button props and it will be rendered instead of the
   * default clear button.
   */
  endContent?: React.ReactNode;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Input classNames={{
   *    base:"base-classes",
   *    label: "label-classes",
   *    mainWrapper: "main-wrapper-classes",
   *    inputWrapper: "input-wrapper-classes",
   *    innerWrapper: "inner-wrapper-classes",
   *    input: "input-classes",
   *    clearButton: "clear-button-classes",
   *    helperWrapper: "helper-wrapper-classes",
   *    description: "description-classes",
   *    errorMessage: "error-message-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<InputSlots>;
  /**
   * Callback fired when the value is cleared.
   * if you pass this prop, the clear button will be shown.
   */
  onClear?: () => void;
  /**
   * React aria onChange event.
   */
  onValueChange?: (value: string) => void;
}

type AutoCapitalize = AriaTextFieldOptions<"input">["autoCapitalize"];

export type UseInputProps<T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement> =
  Props<T> & Omit<AriaTextFieldProps, "onChange"> & InputVariantProps;

export function useInput<T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement>(
  originalProps: UseInputProps<T>,
) {
  const globalContext = useProviderContext();
  const {validationBehavior: formValidationBehavior} = useSlottedContext(FormContext) || {};

  const [props, variantProps] = mapPropsVariants(originalProps, input.variantKeys);

  const {
    ref,
    as,
    type,
    label,
    baseRef,
    wrapperRef,
    description,
    className,
    classNames,
    autoFocus,
    startContent,
    endContent,
    onClear,
    onChange,
    validationState,
    validationBehavior = formValidationBehavior ?? globalContext?.validationBehavior ?? "native",
    innerWrapperRef: innerWrapperRefProp,
    onValueChange = () => {},
    ...otherProps
  } = props;

  const handleValueChange = useCallback(
    (value: string | undefined) => {
      onValueChange(value ?? "");
    },
    [onValueChange],
  );

  const [isFocusWithin, setFocusWithin] = useState(false);

  const Component = as || "div";

  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false;

  const domRef = useDOMRef<T>(ref);

  const baseDomRef = useDOMRef<HTMLDivElement>(baseRef);
  const inputWrapperRef = useDOMRef<HTMLDivElement>(wrapperRef);
  const innerWrapperRef = useDOMRef<HTMLDivElement>(innerWrapperRefProp);

  const [inputValue, setInputValue] = useControlledState<string | undefined>(
    props.value,
    props.defaultValue ?? "",
    handleValueChange,
  );

  const isFileTypeInput = type === "file";
  const hasUploadedFiles = ((domRef?.current as HTMLInputElement)?.files?.length ?? 0) > 0;
  const isFilledByDefault = ["date", "time", "month", "week", "range"].includes(type!);
  const isFilled = !isEmpty(inputValue) || isFilledByDefault || hasUploadedFiles;
  const isFilledWithin = isFilled || isFocusWithin;
  const isHiddenType = type === "hidden";
  const isMultiline = originalProps.isMultiline;

  const baseStyles = clsx(classNames?.base, className, isFilled ? "is-filled" : "");

  const handleClear = useCallback(() => {
    if (isFileTypeInput) {
      (domRef.current as HTMLInputElement).value = "";
    } else {
      setInputValue("");
    }

    onClear?.();
    domRef.current?.focus();
  }, [setInputValue, onClear, isFileTypeInput]);

  // if we use `react-hook-form`, it will set the input value using the ref in register
  // i.e. setting ref.current.value to something which is uncontrolled
  // hence, sync the state with `ref.current.value`
  useSafeLayoutEffect(() => {
    if (!domRef.current) return;

    setInputValue(domRef.current.value);
  }, [domRef.current]);

  const {
    labelProps,
    inputProps,
    isInvalid: isAriaInvalid,
    validationErrors,
    validationDetails,
    descriptionProps,
    errorMessageProps,
  } = useTextField<any>(
    {
      ...originalProps,
      validationBehavior,
      autoCapitalize: originalProps.autoCapitalize as AutoCapitalize,
      value: inputValue,
      "aria-label": safeAriaLabel(
        originalProps["aria-label"],
        originalProps.label,
        originalProps.placeholder,
      ),
      inputElementType: isMultiline ? "textarea" : "input",
      onChange: setInputValue,
    },
    domRef,
  );

  if (isFileTypeInput) {
    // for input[type="file"], we don't need `value` and `onChange` from `useTextField`
    // otherwise, the default value with empty string will block the first attempt of file upload
    // hence, remove `value` and `onChange` attribute here
    delete inputProps.value;
    delete inputProps.onChange;
  }

  const {isFocusVisible, isFocused, focusProps} = useFocusRing({
    autoFocus,
    isTextInput: true,
  });

  const {isHovered, hoverProps} = useHover({isDisabled: !!originalProps?.isDisabled});

  const {isHovered: isLabelHovered, hoverProps: labelHoverProps} = useHover({
    isDisabled: !!originalProps?.isDisabled,
  });

  const {focusProps: clearFocusProps, isFocusVisible: isClearButtonFocusVisible} = useFocusRing();

  const {focusWithinProps} = useFocusWithin({
    onFocusWithinChange: setFocusWithin,
  });

  const {pressProps: clearPressProps} = usePress({
    isDisabled: !!originalProps?.isDisabled || !!originalProps?.isReadOnly,
    onPress: handleClear,
  });

  const isInvalid = validationState === "invalid" || isAriaInvalid;

  const labelPlacement = useLabelPlacement({
    labelPlacement: originalProps.labelPlacement,
    label,
  });

  const errorMessage =
    typeof props.errorMessage === "function"
      ? props.errorMessage({isInvalid, validationErrors, validationDetails})
      : props.errorMessage || validationErrors?.join(" ");
  const isClearable = !!onClear || originalProps.isClearable;
  const hasElements = !!label || !!description || !!errorMessage;
  const hasPlaceholder = !!props.placeholder;
  const hasLabel = !!label;
  const hasHelper = !!description || !!errorMessage;
  const shouldLabelBeOutside = labelPlacement === "outside" || labelPlacement === "outside-left";
  const shouldLabelBeInside = labelPlacement === "inside";
  const isPlaceholderShown = domRef.current
    ? (!domRef.current.value || domRef.current.value === "" || !inputValue || inputValue === "") &&
      hasPlaceholder
    : false;
  const isOutsideLeft = labelPlacement === "outside-left";

  const hasStartContent = !!startContent;
  const isLabelOutside = shouldLabelBeOutside
    ? labelPlacement === "outside-left" ||
      hasPlaceholder ||
      (labelPlacement === "outside" && hasStartContent)
    : false;
  const isLabelOutsideAsPlaceholder =
    labelPlacement === "outside" && !hasPlaceholder && !hasStartContent;

  const slots = useMemo(
    () =>
      input({
        ...variantProps,
        isInvalid,
        labelPlacement,
        isClearable,
        disableAnimation,
      }),
    [
      objectToDeps(variantProps),
      isInvalid,
      labelPlacement,
      isClearable,
      hasStartContent,
      disableAnimation,
    ],
  );

  const getBaseProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: baseDomRef,
        className: slots.base({class: baseStyles}),
        "data-slot": "base",
        "data-filled": dataAttr(
          isFilled || hasPlaceholder || hasStartContent || isPlaceholderShown || isFileTypeInput,
        ),
        "data-filled-within": dataAttr(
          isFilledWithin ||
            hasPlaceholder ||
            hasStartContent ||
            isPlaceholderShown ||
            isFileTypeInput,
        ),
        "data-focus-within": dataAttr(isFocusWithin),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-readonly": dataAttr(originalProps.isReadOnly),
        "data-focus": dataAttr(isFocused),
        "data-hover": dataAttr(isHovered || isLabelHovered),
        "data-required": dataAttr(originalProps.isRequired),
        "data-invalid": dataAttr(isInvalid),
        "data-disabled": dataAttr(originalProps.isDisabled),
        "data-has-elements": dataAttr(hasElements),
        "data-has-helper": dataAttr(hasHelper),
        "data-has-label": dataAttr(hasLabel),
        "data-has-value": dataAttr(!isPlaceholderShown),
        "data-hidden": dataAttr(isHiddenType),
        ...focusWithinProps,
        ...props,
      };
    },
    [
      slots,
      baseStyles,
      isFilled,
      isFocused,
      isHovered,
      isLabelHovered,
      isInvalid,
      hasHelper,
      hasLabel,
      hasElements,
      isPlaceholderShown,
      hasStartContent,
      isFocusWithin,
      isFocusVisible,
      isFilledWithin,
      hasPlaceholder,
      focusWithinProps,
      isHiddenType,
      originalProps.isReadOnly,
      originalProps.isRequired,
      originalProps.isDisabled,
    ],
  );

  const getLabelProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        "data-slot": "label",
        className: slots.label({class: classNames?.label}),
        ...mergeProps(labelProps, labelHoverProps, props),
      };
    },
    [slots, isLabelHovered, labelProps, classNames?.label],
  );

  const getInputProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        "data-slot": "input",
        "data-filled": dataAttr(isFilled),
        "data-filled-within": dataAttr(isFilledWithin),
        "data-has-start-content": dataAttr(hasStartContent),
        "data-has-end-content": dataAttr(!!endContent),
        className: slots.input({
          class: clsx(classNames?.input, isFilled ? "is-filled" : "", isMultiline ? "pe-0" : ""),
        }),
        ...mergeProps(
          focusProps,
          inputProps,
          filterDOMProps(otherProps, {
            enabled: true,
            labelable: true,
            omitEventNames: new Set(Object.keys(inputProps)),
          }),
          props,
        ),
        "aria-readonly": dataAttr(originalProps.isReadOnly),
        onChange: chain(inputProps.onChange, onChange),
        ref: domRef,
      };
    },
    [
      slots,
      inputValue,
      focusProps,
      inputProps,
      otherProps,
      isFilled,
      isFilledWithin,
      hasStartContent,
      endContent,
      classNames?.input,
      originalProps.isReadOnly,
      originalProps.isRequired,
      onChange,
    ],
  );

  const getInputWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: inputWrapperRef,
        "data-slot": "input-wrapper",
        "data-hover": dataAttr(isHovered || isLabelHovered),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-focus": dataAttr(isFocused),
        className: slots.inputWrapper({
          class: clsx(classNames?.inputWrapper, isFilled ? "is-filled" : ""),
        }),
        ...mergeProps(props, hoverProps),
        onClick: (e) => {
          if (domRef.current && e.currentTarget === e.target) {
            domRef.current.focus();
          }
        },
        style: {
          cursor: "text",
          ...props.style,
        },
      };
    },
    [
      slots,
      isHovered,
      isLabelHovered,
      isFocusVisible,
      isFocused,
      inputValue,
      classNames?.inputWrapper,
    ],
  );

  const getInnerWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        ref: innerWrapperRef,
        "data-slot": "inner-wrapper",
        onClick: (e) => {
          if (domRef.current && e.currentTarget === e.target) {
            domRef.current.focus();
          }
        },
        className: slots.innerWrapper({
          class: clsx(classNames?.innerWrapper, props?.className),
        }),
      };
    },
    [slots, classNames?.innerWrapper],
  );

  const getMainWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        "data-slot": "main-wrapper",
        className: slots.mainWrapper({
          class: clsx(classNames?.mainWrapper, props?.className),
        }),
      };
    },
    [slots, classNames?.mainWrapper],
  );

  const getHelperWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        "data-slot": "helper-wrapper",
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

  const getClearButtonProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        type: "button",
        tabIndex: -1,
        disabled: originalProps.isDisabled,
        "aria-label": "clear input",
        "data-slot": "clear-button",
        "data-focus-visible": dataAttr(isClearButtonFocusVisible),
        className: slots.clearButton({
          class: clsx(classNames?.clearButton, props?.className),
        }),
        ...mergeProps(clearPressProps, clearFocusProps),
      };
    },
    [slots, isClearButtonFocusVisible, clearPressProps, clearFocusProps, classNames?.clearButton],
  );

  return {
    Component,
    classNames,
    domRef,
    label,
    description,
    startContent,
    endContent,
    labelPlacement,
    isClearable,
    hasHelper,
    hasStartContent,
    isLabelOutside,
    isOutsideLeft,
    isLabelOutsideAsPlaceholder,
    shouldLabelBeOutside,
    shouldLabelBeInside,
    hasPlaceholder,
    isInvalid,
    errorMessage,
    getBaseProps,
    getLabelProps,
    getInputProps,
    getMainWrapperProps,
    getInputWrapperProps,
    getInnerWrapperProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getClearButtonProps,
  };
}

export type UseInputReturn = ReturnType<typeof useInput>;
