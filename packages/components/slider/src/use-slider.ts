import type {SliderSlots, SliderVariantProps, SlotsToClasses} from "@heroui/theme";

import {
  DOMAttributes,
  HTMLHeroUIProps,
  mapPropsVariants,
  PropGetter,
  useProviderContext,
} from "@heroui/system";
import {slider} from "@heroui/theme";
import {ReactRef, useDOMRef, filterDOMProps} from "@heroui/react-utils";
import {useSliderState} from "@react-stately/slider";
import {ReactNode, useCallback, useMemo, useRef} from "react";
import {useNumberFormatter, useLocale} from "@react-aria/i18n";
import {mergeProps} from "@react-aria/utils";
import {AriaSliderProps, useSlider as useAriaSlider} from "@react-aria/slider";
import {clsx, objectToDeps} from "@heroui/shared-utils";
import {TooltipProps} from "@heroui/tooltip";
import {useHover} from "@react-aria/interactions";
import {ValueBase} from "@react-types/shared";

import {SliderThumbProps} from "./slider-thumb";

export type SliderValue = number | number[];
export type SliderStepMark = {
  value: number;
  label: string;
};

export type SliderRenderThumbProps = DOMAttributes<HTMLDivElement> & {index?: number};

interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The content to display as the label.
   */
  label?: ReactNode;
  /**
   * The input name.
   */
  name?: string;
  /**
   * The offset from which to start the fill.
   */
  fillOffset?: number;
  /**
   * The display format of the value label.
   */
  formatOptions?: Intl.NumberFormatOptions;
  /**
   * The display format of the tooltip value label.
   * @default formatOptions
   */
  tooltipValueFormatOptions?: Intl.NumberFormatOptions;
  /**
   * Whether to show the step indicators.
   * @default false
   */
  showSteps?: boolean;
  /**
   * Whether the thumbs should have a tooltip with the value on hover the slider.
   * @default false
   */
  showTooltip?: boolean;
  /**
   * Custom steps labels.
   * @example [{value: 0, label: "0"}, {value: 50, label: "50"}, {value: 100, label: "100"}]
   * @default []
   */
  marks?: SliderStepMark[];
  /**
   * Element to be rendered in the start side of the slider.
   */
  startContent?: React.ReactNode;
  /**
   * Element to be rendered in the end side of the slider.
   */
  endContent?: React.ReactNode;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Slider classNames={{
   *    base:"base-classes",
   *    step: "step-classes",
   *    labelWrapper: "label-wrapper-classes",
   *    label: "label-classes",
   *    value: "value-classes",
   *    trackWrapper: "track-wrapper-classes",
   *    track: "track-classes",
   *    filler: "filler-classes",
   *    thumb: "thumb-classes",
   *    mark: "mark-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<SliderSlots>;
  /**
   * Tooltip props.
   * @see [Tooltip](https://heroui.com/components/tooltip) for more details.
   * @default {
   *  offset: 15,
   *  delay: 0,
   *  size: "sm",
   *  showArrow: true,
   *  placement: "top", // "right" for vertical slider
   *  content: [sliderValue],
   *  color: sliderProps?.color, // same as the slider color
   *  isDisabled: sliderProps?.isDisabled,
   * }
   */
  tooltipProps?: Partial<TooltipProps>;
  /**
   * A function that returns the content to display as the value label.
   * Overrides default formatted number.
   */
  getValue?: (value: SliderValue) => string;
  /**
   * Function to render the label.
   */
  renderLabel?: (props: DOMAttributes<HTMLLabelElement>) => React.ReactNode;
  /**
   * Function to render the value label.
   */
  renderValue?: (props: DOMAttributes<HTMLOutputElement>) => React.ReactNode;
  /**
   * Function to render the thumb. It can be used to add a tooltip or custom icon.
   */
  renderThumb?: (props: SliderRenderThumbProps) => React.ReactNode;
}

export type UseSliderProps = Omit<Props, keyof ValueBase<SliderValue>> &
  AriaSliderProps &
  SliderVariantProps;

export function useSlider(originalProps: UseSliderProps) {
  const globalContext = useProviderContext();

  const [props, variantProps] = mapPropsVariants(originalProps, slider.variantKeys);

  const {
    ref,
    as,
    name,
    label,
    formatOptions,
    value: valueProp,
    maxValue = 100,
    minValue = 0,
    step = 1,
    showSteps = false,
    showTooltip = false,
    orientation = "horizontal",
    marks = [],
    startContent,
    endContent,
    fillOffset,
    className,
    classNames,
    renderThumb,
    renderLabel,
    renderValue,
    onChange,
    onChangeEnd,
    getValue,
    tooltipValueFormatOptions = formatOptions,
    tooltipProps: userTooltipProps = {},
    ...otherProps
  } = props;

  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";
  const disableAnimation =
    originalProps?.disableAnimation ?? globalContext?.disableAnimation ?? false;

  const domRef = useDOMRef(ref);
  const trackRef = useRef<HTMLDivElement>(null);

  const numberFormatter = useNumberFormatter(formatOptions);
  const {direction} = useLocale();

  const clampValue = useCallback(
    (valueToClamp: number) => Math.min(Math.max(valueToClamp, minValue), maxValue),
    [minValue, maxValue],
  );

  const validatedValue = useMemo(() => {
    if (valueProp === undefined) return undefined;

    if (Array.isArray(valueProp)) {
      return valueProp.map(clampValue);
    }

    return clampValue(valueProp);
  }, [valueProp, clampValue]);

  const state = useSliderState({
    ...otherProps,
    value: validatedValue,
    isDisabled: originalProps?.isDisabled ?? false,
    orientation,
    step,
    minValue,
    maxValue,
    numberFormatter,
    onChange,
    onChangeEnd,
  });

  const tooltipProps: Partial<TooltipProps> = {
    offset: 5,
    delay: 0,
    size: "sm",
    showArrow: true,
    color: originalProps?.color
      ? originalProps?.color
      : (slider.defaultVariants?.color as TooltipProps["color"]),
    isDisabled: originalProps.isDisabled,
    ...userTooltipProps,
  };

  const {groupProps, trackProps, labelProps, outputProps} = useAriaSlider(
    originalProps,
    state,
    trackRef,
  );
  const {isHovered, hoverProps} = useHover({isDisabled: originalProps.isDisabled});

  const baseStyles = clsx(classNames?.base, className);
  const isVertical = orientation === "vertical";
  const hasMarks = marks?.length > 0;
  const hasSingleThumb = fillOffset === undefined ? state.values.length === 1 : false;

  const slots = useMemo(
    () =>
      slider({
        ...variantProps,
        hasMarks,
        disableAnimation,
        hasSingleThumb,
        isVertical,
      }),
    [objectToDeps(variantProps), isVertical, disableAnimation, hasSingleThumb, hasMarks],
  );

  const [startOffset, endOffset] = [
    state.values.length > 1
      ? state.getThumbPercent(0)
      : fillOffset !== undefined
      ? state.getValuePercent(fillOffset)
      : 0,
    state.getThumbPercent(state.values.length - 1),
  ].sort();

  const value =
    state.values.length === 1
      ? numberFormatter.format(state.values[0])
      : numberFormatter.formatRange(state.values[0], state.values[state.values.length - 1]);

  const steps = showSteps ? Math.floor((maxValue - minValue) / step) + 1 : 0;

  const getBaseProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      "data-orientation": state.orientation,
      "data-slot": "base",
      "data-hover": isHovered,
      className: slots.base({class: baseStyles}),
      ...mergeProps(
        groupProps,
        hoverProps,
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps,
        }),
        filterDOMProps(props),
      ),
    };
  };

  const getLabelWrapperProps: PropGetter = (props = {}) => {
    return {
      className: slots.labelWrapper({class: classNames?.labelWrapper}),
      "data-slot": "labelWrapper",
      ...props,
    };
  };

  const getLabelProps: PropGetter = (props = {}) => {
    return {
      "data-slot": "label",
      className: slots.label({class: classNames?.label}),
      children: label,
      ...labelProps,
      ...props,
    };
  };

  const getValueProps: PropGetter = (props = {}) => {
    return {
      "data-slot": "value",
      className: slots.value({class: classNames?.value}),
      children: getValue && typeof getValue === "function" ? getValue(state.values) : value,
      ...outputProps,
      ...props,
    };
  };

  const getTrackProps: PropGetter = (props = {}) => {
    return {
      ref: trackRef,
      "data-slot": "track",
      "data-thumb-hidden": !!originalProps?.hideThumb,
      "data-vertical": isVertical,
      className: slots.track({class: classNames?.track}),
      ...trackProps,
      ...props,
    };
  };

  const getTrackWrapperProps: PropGetter = (props = {}) => {
    return {
      "data-slot": "track-wrapper",
      className: slots.trackWrapper({class: classNames?.trackWrapper}),
      ...props,
    };
  };

  const getFillerProps: PropGetter = (props = {}) => {
    return {
      "data-slot": "filler",
      className: slots.filler({class: classNames?.filler}),
      ...props,
      style: {
        ...props.style,
        [isVertical ? "bottom" : direction === "rtl" ? "right" : "left"]: `${startOffset * 100}%`,
        ...(isVertical
          ? {
              height: `${(endOffset - startOffset) * 100}%`,
            }
          : {
              width: `${(endOffset - startOffset) * 100}%`,
            }),
      },
    };
  };

  const getThumbProps = (index: number) => {
    return {
      name,
      index,
      state,
      trackRef,
      orientation,
      isVertical,
      tooltipProps,
      showTooltip,
      renderThumb,
      formatOptions: tooltipValueFormatOptions,
      className: slots.thumb({class: classNames?.thumb}),
    } as SliderThumbProps;
  };

  const getStepProps = (index: number) => {
    const percent = state.getValuePercent(index * step + minValue);

    return {
      className: slots.step({class: classNames?.step}),
      "data-slot": "step",
      "data-in-range": percent <= endOffset && percent >= startOffset,
      style: {
        [isVertical ? "bottom" : direction === "rtl" ? "right" : "left"]: `${percent * 100}%`,
      },
    };
  };

  const getMarkProps = (mark: SliderStepMark) => {
    const percent = state.getValuePercent(mark.value);

    return {
      className: slots.mark({class: classNames?.mark}),
      "data-slot": "mark",
      "data-in-range": percent <= endOffset && percent >= startOffset,
      style: {
        [isVertical ? "bottom" : direction === "rtl" ? "right" : "left"]: `${percent * 100}%`,
      },
      // avoid `onDownTrack` is being called since when you click the mark,
      // `onDownTrack` will calculate the percent based on the position you click
      // the calculated value will be set instead of the actual value defined in `marks`
      onMouseDown: (e: React.MouseEvent) => e.stopPropagation(),
      onPointerDown: (e: React.PointerEvent) => e.stopPropagation(),
      onClick: (e: any) => {
        e.stopPropagation();
        if (state.values.length === 1) {
          state.setThumbPercent(0, percent);
        } else {
          const leftThumbVal = state.values[0];
          const rightThumbVal = state.values[1];

          if (mark.value < leftThumbVal) {
            state.setThumbPercent(0, percent);
          } else if (mark.value > rightThumbVal) {
            state.setThumbPercent(1, percent);
          } else if (Math.abs(mark.value - leftThumbVal) < Math.abs(mark.value - rightThumbVal)) {
            state.setThumbPercent(0, percent);
          } else {
            state.setThumbPercent(1, percent);
          }
        }
      },
    };
  };

  const getStartContentProps: PropGetter = (props = {}) => ({
    "data-slot": "startContent",
    className: slots.startContent({class: classNames?.startContent}),
    ...props,
  });

  const getEndContentProps: PropGetter = (props = {}) => ({
    "data-slot": "endContent",
    className: slots.endContent({class: classNames?.endContent}),
    ...props,
  });

  return {
    Component,
    state,
    value,
    domRef,
    label,
    steps,
    marks,
    startContent,
    endContent,
    getStepProps,
    getBaseProps,
    getValue,
    renderLabel,
    renderValue,
    getTrackWrapperProps,
    getLabelWrapperProps,
    getLabelProps,
    getValueProps,
    getTrackProps,
    getFillerProps,
    getThumbProps,
    getMarkProps,
    getStartContentProps,
    getEndContentProps,
  };
}

export type UseSliderReturn = ReturnType<typeof useSlider>;
