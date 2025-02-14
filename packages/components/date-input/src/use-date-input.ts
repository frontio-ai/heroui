import type {DateInputVariantProps, DateInputSlots, SlotsToClasses} from "@heroui/theme";
import type {AriaDateFieldProps} from "@react-types/datepicker";
import type {SupportedCalendars} from "@heroui/system";
import type {DateValue} from "@react-types/datepicker";
import type {Calendar} from "@internationalized/date";
import type {ReactRef} from "@heroui/react-utils";
import type {DOMAttributes, GroupDOMAttributes} from "@react-types/shared";
import type {DateInputGroupProps} from "./date-input-group";

import {useLocale} from "@react-aria/i18n";
import {createCalendar, CalendarDate, DateFormatter} from "@internationalized/date";
import {mergeProps} from "@react-aria/utils";
import {PropGetter, useLabelPlacement, useProviderContext} from "@heroui/system";
import {HTMLHeroUIProps, mapPropsVariants} from "@heroui/system";
import {useDOMRef} from "@heroui/react-utils";
import {useDateField as useAriaDateField} from "@react-aria/datepicker";
import {useDateFieldState} from "@react-stately/datepicker";
import {objectToDeps, clsx, dataAttr, getGregorianYearOffset} from "@heroui/shared-utils";
import {dateInput, cn} from "@heroui/theme";
import {useMemo} from "react";
import {FormContext, useSlottedContext} from "@heroui/form";

type HeroUIBaseProps<T extends DateValue> = Omit<
  HTMLHeroUIProps<"div">,
  keyof AriaDateFieldProps<T> | "onChange"
>;

interface Props<T extends DateValue> extends HeroUIBaseProps<T> {
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
  /** Props for the inner wrapper. */
  innerWrapperProps?: DOMAttributes;
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
   * This function helps to reduce the bundle size by providing a custom calendar system.
   *
   * In the example above, the createCalendar function from the `@internationalized/date` package
   * is passed to the useCalendarState hook. This function receives a calendar identifier string,
   * and provides Calendar instances to React Stately, which are used to implement date manipulation.
   *
   * By default, this includes all calendar systems supported by @internationalized/date. However,
   * if your application supports a more limited set of regions, or you know you will only be picking dates
   * in a certain calendar system, you can reduce your bundle size by providing your own implementation
   * of `createCalendar` that includes a subset of these Calendar implementations.
   *
   * For example, if your application only supports Gregorian dates, you could implement a `createCalendar`
   * function like this:
   *
   * @example
   *
   * import {GregorianCalendar} from '@internationalized/date';
   *
   * function createCalendar(identifier) {
   *  switch (identifier) {
   *    case 'gregory':
   *      return new GregorianCalendar();
   *    default:
   *      throw new Error(`Unsupported calendar ${identifier}`);
   *  }
   * }
   *
   * This way, only GregorianCalendar is imported, and the other calendar implementations can be tree-shaken.
   *
   * You can also use the HeroUIProvider to provide the createCalendar function to all nested components.
   *
   * @default all calendars
   */
  createCalendar?: (calendar: SupportedCalendars) => Calendar | null;
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

export type UseDateInputProps<T extends DateValue> = Props<T> &
  DateInputVariantProps &
  AriaDateFieldProps<T>;

export function useDateInput<T extends DateValue>(originalProps: UseDateInputProps<T>) {
  const globalContext = useProviderContext();
  const {validationBehavior: formValidationBehavior} = useSlottedContext(FormContext) || {};

  const [props, variantProps] = mapPropsVariants(originalProps, dateInput.variantKeys);

  const {locale} = useLocale();

  const calendarProp = createCalendar(new DateFormatter(locale).resolvedOptions().calendar);

  // by default, we are using gregorian calendar with possible years in [1900, 2099]
  // however, some locales such as `th-TH-u-ca-buddhist` using different calendar making the years out of bound
  // hence, add the corresponding offset to make sure the year is within the bound
  const gregorianYearOffset = getGregorianYearOffset(calendarProp.identifier);

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
    validationState,
    groupProps = {},
    labelProps: labelPropsProp,
    fieldProps: fieldPropsProp,
    innerWrapperProps: innerWrapperPropsProp,
    errorMessageProps: errorMessagePropsProp,
    descriptionProps: descriptionPropsProp,
    validationBehavior = formValidationBehavior ?? globalContext?.validationBehavior ?? "native",
    shouldForceLeadingZeros = true,
    minValue = globalContext?.defaultDates?.minDate ??
      new CalendarDate(calendarProp, 1900 + gregorianYearOffset, 1, 1),
    maxValue = globalContext?.defaultDates?.maxDate ??
      new CalendarDate(calendarProp, 2099 + gregorianYearOffset, 12, 31),
    createCalendar: createCalendarProp = globalContext?.createCalendar ?? null,
    isInvalid: isInvalidProp = validationState ? validationState === "invalid" : false,
    errorMessage,
  } = props;

  const domRef = useDOMRef(ref);
  const inputRef = useDOMRef(inputRefProp);

  const disableAnimation = originalProps.disableAnimation ?? globalContext?.disableAnimation;

  const state = useDateFieldState({
    ...originalProps,
    label,
    locale,
    minValue,
    maxValue,
    validationBehavior,
    shouldForceLeadingZeros,
    createCalendar:
      !createCalendarProp || typeof createCalendarProp !== "function"
        ? createCalendar
        : (createCalendarProp as typeof createCalendar),
  });

  const {
    labelProps,
    fieldProps,
    inputProps,
    validationErrors,
    validationDetails,
    descriptionProps,
    errorMessageProps,
    isInvalid: ariaIsInvalid,
  } = useAriaDateField({...originalProps, label, validationBehavior, inputRef}, state, domRef);

  const baseStyles = clsx(classNames?.base, className);

  const isInvalid = isInvalidProp || ariaIsInvalid;

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
    [objectToDeps(variantProps), disableAnimation, labelPlacement],
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
      "data-slot": "input-field",
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
    const innerWrapperProps = mergeProps(innerWrapperPropsProp, props);

    return {
      ...innerWrapperProps,
      "data-slot": "inner-wrapper",
      className: slots.innerWrapper({
        class: cn(classNames?.innerWrapper, innerWrapperProps?.className),
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

export type UseDateInputReturn = ReturnType<typeof useDateInput>;
