import type {SliderVariantProps} from "@heroui/theme";

import {HTMLHeroUIProps, PropGetter} from "@heroui/system";
import {useSliderThumb as useAriaSliderThumb} from "@react-aria/slider";
import {ReactRef, useDOMRef} from "@heroui/react-utils";
import {RefObject, useRef} from "react";
import {AriaSliderThumbProps} from "@react-aria/slider";
import {SliderState} from "@react-stately/slider";
import {useHover, usePress} from "@react-aria/interactions";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";
import {dataAttr} from "@heroui/shared-utils";
import {TooltipProps} from "@heroui/tooltip";
import {useNumberFormatter} from "@heroui/react-aria-i18n";

import {UseSliderProps} from "./use-slider";

interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * slider state, created via `useSliderState`.
   */
  state: SliderState;
  /**
   * A ref to the track element.
   */
  trackRef: RefObject<HTMLDivElement>;
  /**
   * @internal
   */
  isVertical: boolean;
  /**
   * @internal
   */
  showTooltip?: boolean;
  /**
   * @internal
   */
  formatOptions?: Intl.NumberFormatOptions;
  /**
   * @internal
   */
  tooltipProps?: UseSliderProps["tooltipProps"];
  /**
   * Function to render the thumb. It can be used to add a tooltip or custom icon.
   */
  renderThumb?: UseSliderProps["renderThumb"];
}

export type UseSliderThumbProps = Props & AriaSliderThumbProps & SliderVariantProps;

export function useSliderThumb(props: UseSliderThumbProps) {
  const {
    ref,
    as,
    state,
    index,
    name,
    trackRef,
    className,
    tooltipProps,
    isVertical,
    showTooltip,
    formatOptions,
    renderThumb,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);
  const inputRef = useRef<HTMLInputElement>(null);

  const numberFormatter = useNumberFormatter(formatOptions);

  const {thumbProps, inputProps, isDragging, isFocused} = useAriaSliderThumb(
    {
      index,
      trackRef,
      inputRef,
      name,
      ...otherProps,
    },
    state,
  );

  const {hoverProps, isHovered} = useHover({
    isDisabled: state.isDisabled,
  });
  const {focusProps, isFocusVisible} = useFocusRing();
  const {pressProps, isPressed} = usePress({
    isDisabled: state.isDisabled,
  });

  const getThumbProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      "data-slot": "thumb",
      "data-hover": dataAttr(isHovered),
      "data-pressed": dataAttr(isPressed),
      "data-dragging": dataAttr(isDragging),
      "data-focused": dataAttr(isFocused),
      "data-focus-visible": dataAttr(isFocusVisible),
      ...mergeProps(thumbProps, pressProps, hoverProps, otherProps),
      className,
      ...props,
    };
  };

  const getTooltipProps = () => {
    const value = numberFormatter
      ? numberFormatter.format(state.values[index ?? 0])
      : state.values[index ?? 0];

    return {
      ...tooltipProps,
      placement: tooltipProps?.placement ? tooltipProps?.placement : isVertical ? "right" : "top",
      content: tooltipProps?.content ? tooltipProps?.content : value,
      updatePositionDeps: [isDragging, isHovered, value],
      isOpen: tooltipProps?.isOpen !== undefined ? tooltipProps?.isOpen : isHovered || isDragging,
    } as TooltipProps;
  };

  const getInputProps: PropGetter = (props = {}) => {
    return {
      ref: inputRef,
      ...mergeProps(inputProps, focusProps),
      ...props,
    };
  };

  return {
    Component,
    index,
    showTooltip,
    renderThumb,
    getThumbProps,
    getTooltipProps,
    getInputProps,
  };
}

export type UseSliderThumbReturn = ReturnType<typeof useSliderThumb>;
