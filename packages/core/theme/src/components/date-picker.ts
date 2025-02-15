import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

/**
 * DatePicker wrapper **Tailwind Variants** component
 *
 * @example
 */
const datePicker = tv({
  slots: {
    base: "group w-full",
    selectorButton: "text-inherit justify-end max-h-full",
    selectorIcon: "text-lg text-inherit pointer-events-none flex-shrink-0",
    popoverContent: "p-0 w-full",
    calendar: "w-[calc(var(--visible-months)_*_var(--calendar-width))] shadow-none",
    calendarContent: "w-[calc(var(--visible-months)_*_var(--calendar-width))]",
    timeInputLabel: "font-medium",
    timeInput: "px-5 pb-4 flex-wrap gap-x-6",
  },
});

const dateRangePicker = tv({
  extend: datePicker,
  slots: {
    calendar: "group",
    bottomContent: "flex flex-col gap-y-2",
    timeInputWrapper: "flex flex-col group-data-[has-multiple-months=true]:flex-row",
    separator: "-mx-1 text-inherit",
  },
});

/** Base */
export type DatePickerReturnType = ReturnType<typeof datePicker>;
export type DatePickerVariantProps = VariantProps<typeof datePicker>;
export type DatePickerSlots = keyof ReturnType<typeof datePicker>;

/** Range */
export type DateRangePickerReturnType = ReturnType<typeof dateRangePicker>;
export type DateRangePickerVariantProps = VariantProps<typeof dateRangePicker>;
export type DateRangePickerSlots = keyof ReturnType<typeof dateRangePicker>;

export {datePicker, dateRangePicker};
