import type {DateValue} from "@heroui/internationalized-date";
import type {ForwardedRef, ReactElement} from "react";

import {forwardRef} from "@heroui/system";

import {UseDateInputProps, useDateInput} from "./use-date-input";
import {DateInputGroup} from "./date-input-group";
import {DateInputField} from "./date-input-field";

export interface Props<T extends DateValue> extends UseDateInputProps<T> {}

export type DateInputProps<T extends DateValue = DateValue> = Props<T>;

const DateInput = forwardRef(function DateInput<T extends DateValue>(
  props: DateInputProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {state, slots, classNames, getBaseGroupProps, getInputProps, getFieldProps} =
    useDateInput<T>({...props, ref});

  return (
    <DateInputGroup {...getBaseGroupProps()}>
      <DateInputField
        classNames={classNames}
        inputProps={getInputProps()}
        slots={slots}
        state={state}
        {...getFieldProps()}
      />
    </DateInputGroup>
  );
}) as <T extends DateValue>(props: DateInputProps<T>) => ReactElement;

export default DateInput;
