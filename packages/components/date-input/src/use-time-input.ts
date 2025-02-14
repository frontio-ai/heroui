import type {DateInputVariantProps, DateInputSlots, SlotsToClasses} from "@heroui/theme";
import type {AriaTimeFieldProps, TimeValue} from "@react-types/datepicker";
import type {ReactRef} from "@heroui/react-utils";
import type {DOMAttributes, GroupDOMAttributes} from "@react-types/shared";
import type {DateInputGroupProps} from "./date-input-group";

import {useLocale} from "@react-aria/i18n";
import {mergeProps} from "@react-aria/utils";
import {PropGetter, useLabelPlacement, useProviderContext} from "@heroui/system";
import {HTMLHeroUIProps, mapPropsVariants} from "@heroui/system";
import {useDOMRef} from "@heroui/react-utils";
import {useTimeField as useAriaTimeField} from "@react-aria/datepicker";
import {useTimeFieldState} from "@react-stately/datepicker";
import {objectToDeps, clsx, dataAttr} from "@heroui/shared-utils";
import {dateInput} from "@heroui/theme";
import {useMemo} from "react";
import {FormContext, useSlottedContext} from "@heroui/form";

type HeroUIBaseProps<T extends TimeValue> = Omit<
  HTMLHeroUIProps<"div">,
  keyof AriaTimeFieldProps<T> | "onChange"
>;

interface Props<T extends TimeValue> extends HeroUIBaseProps<T> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /** Props for the grouping element containing the date field and button. */
  groupProps?: GroupDOMAttributes;
  /** Props for the date picker's visible label element, if any. */
  labelProps?: DOMAttributes;
  /** Props for the date field. */
  fieldProps?: DOMAttributes;
  /** Props for the description element, if any. */
  descriptionProps?: DOMAttributes;
  /** Props for the error message element, if any. */
  errorMessageProps?: DOMAttributes;
  /**
   * The value of the hidden input.
   */
  inputRef?: ReactRef<HTMLInputElement | null>;
  /**
   * Element to be rendered in the left side of the input.
   */
  startContent?: React.ReactNode;
  /**
   * Element to be rendered in the right side of the input.
   */
  endContent?: React.ReactNode;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <DateInput classNames={{
   *    base:"base-classes",
   *    label: "label-classes",
   *    inputWrapper: "input-wrapper-classes",
   *    input: "input-classes",
   *    segment: "segment-classes",
   *    helperWrapper: "helper-wrapper-classes",
   *    description: "description-classes",
   *    errorMessage: "error-message-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<DateInputSlots>;
}

export type UseTimeInputProps<T extends TimeValue> = Props<T> &
  DateInputVariantProps &
  AriaTimeFieldProps<T>;

export function useTimeInput<T extends TimeValue>(originalProps: UseTimeInputProps<T>) {
  const globalContext = useProviderContext();
  const {validationBehavior: formValidationBehavior} = useSlottedContext(FormContext) || {};

  const [props, variantProps] = mapPropsVariants(originalProps, dateInput.variantKeys);

  const {
    ref,
    as,
    label,
    inputRef: inputRefProp,
    description,
    startContent,
    endContent,
    className,
    classNames,
    groupProps = {},
    labelProps: labelPropsProp,
    fieldProps: fieldPropsProp,
    errorMessageProps: errorMessagePropsProp,
    descriptionProps: descriptionPropsProp,
    validationBehavior = formValidationBehavior ?? globalContext?.validationBehavior ?? "native",
    shouldForceLeadingZeros = true,
    minValue,
    maxValue,
    isInvalid: isInvalidProp,
    errorMessage,
  } = props;

  const domRef = useDOMRef(ref);
  const inputRef = useDOMRef(inputRefProp);

  const {locale} = useLocale();

  const disableAnimation = originalProps.disableAnimation ?? globalContext?.disableAnimation;

  const state = useTimeFieldState({
    ...originalProps,
    label,
    locale,
    minValue,
    maxValue,
    validationBehavior,
    isInvalid: isInvalidProp,
    shouldForceLeadingZeros,
  });

  const {
    labelProps,
    fieldProps,
    inputProps,
    validationErrors,
    validationDetails,
    descriptionProps,
    errorMessageProps,
    isInvalid,
  } = useAriaTimeField({...originalProps, label, validationBehavior, inputRef}, state, domRef);

  const baseStyles = clsx(classNames?.base, className);

  const labelPlacement = useLabelPlacement({
    labelPlacement: originalProps.labelPlacement,
    label,
  });

  const shouldLabelBeOutside = labelPlacement === "outside" || labelPlacement === "outside-left";

  const slots = useMemo(
    () =>
      dateInput({
        ...variantProps,
        disableAnimation,
        labelPlacement,
      }),
    [objectToDeps(variantProps), labelPlacement, disableAnimation],
  );

  const getLabelProps: PropGetter = (props) => {
    return {
      ...mergeProps(labelProps, labelPropsProp, props),
      "data-slot": "label",
      className: slots.label({
        class: clsx(classNames?.label, props?.className),
      }),
    };
  };

  const getInputProps: PropGetter = (props) => {
    return {
      ...props,
      ...inputProps,
      ref: inputRef,
    };
  };

  const getFieldProps = (props: DOMAttributes = {}) => {
    return {
      ref: domRef,
      "data-slot": "input",
      ...mergeProps(fieldProps, fieldPropsProp, props),
      className: slots.input({
        class: clsx(classNames?.input, props?.className),
      }),
    } as GroupDOMAttributes;
  };

  const getInputWrapperProps = (props = {}) => {
    return {
      ...props,
      ...groupProps,
      "data-slot": "input-wrapper",
      className: slots.inputWrapper({
        class: classNames?.inputWrapper,
      }),
      onClick: fieldProps.onClick,
    } as GroupDOMAttributes;
  };

  const getInnerWrapperProps: PropGetter = (props) => {
    return {
      ...props,
      "data-slot": "inner-wrapper",
      className: slots.innerWrapper({
        class: classNames?.innerWrapper,
      }),
    };
  };

  const getHelperWrapperProps: PropGetter = (props) => {
    return {
      ...props,
      "data-slot": "helper-wrapper",
      className: slots.helperWrapper({
        class: clsx(classNames?.helperWrapper, props?.className),
      }),
    };
  };

  const getErrorMessageProps: PropGetter = (props = {}) => {
    return {
      ...mergeProps(errorMessageProps, errorMessagePropsProp, props),
      "data-slot": "error-message",
      className: slots.errorMessage({class: clsx(classNames?.errorMessage, props?.className)}),
    };
  };

  const getDescriptionProps: PropGetter = (props = {}) => {
    return {
      ...mergeProps(descriptionProps, descriptionPropsProp, props),
      "data-slot": "description",
      className: slots.description({class: clsx(classNames?.description, props?.className)}),
    };
  };

  const getBaseGroupProps = () => {
    return {
      as,
      label,
      description,
      endContent,
      errorMessage,
      isInvalid,
      startContent,
      validationDetails,
      validationErrors,
      shouldLabelBeOutside,
      "data-slot": "base",
      "data-required": dataAttr(originalProps.isRequired),
      "data-disabled": dataAttr(originalProps.isDisabled),
      "data-readonly": dataAttr(originalProps.isReadOnly),
      "data-invalid": dataAttr(isInvalid),
      "data-has-start-content": dataAttr(!!startContent),
      "data-has-end-content": dataAttr(!!endContent),
      descriptionProps: getDescriptionProps(),
      errorMessageProps: getErrorMessageProps(),
      groupProps: getInputWrapperProps(),
      helperWrapperProps: getHelperWrapperProps(),
      labelProps: getLabelProps(),
      wrapperProps: getInnerWrapperProps(),
      className: slots.base({class: baseStyles}),
    } as DateInputGroupProps;
  };

  return {
    state,
    domRef,
    slots,
    classNames,
    labelPlacement,
    getBaseGroupProps,
    getFieldProps,
    getInputProps,
  };
}

export type UseTimeInputReturn = ReturnType<typeof useTimeInput>;
