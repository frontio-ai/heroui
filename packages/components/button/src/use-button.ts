import type {ButtonVariantProps} from "@heroui/theme";
import type {AriaButtonProps} from "@heroui/use-aria-button";
import type {ReactNode} from "react";
import type {RippleProps} from "@heroui/ripple";
import type {HTMLHeroUIProps, PropGetter} from "@heroui/system";

import {useProviderContext} from "@heroui/system";
import {dataAttr} from "@heroui/shared-utils";
import {ReactRef} from "@heroui/react-utils";
import {MouseEventHandler, useCallback} from "react";
import {useFocusRing} from "@react-aria/focus";
import {chain, mergeProps} from "@react-aria/utils";
import {useDOMRef, filterDOMProps} from "@heroui/react-utils";
import {button} from "@heroui/theme";
import {isValidElement, cloneElement, useMemo} from "react";
import {useAriaButton} from "@heroui/use-aria-button";
import {PressEvent, useHover} from "@react-aria/interactions";
import {SpinnerProps} from "@heroui/spinner";
import {useRipple} from "@heroui/ripple";

import {useButtonGroupContext} from "./button-group-context";

interface Props extends HTMLHeroUIProps<"button"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLButtonElement | null>;
  /**
   * Whether the button should display a ripple effect on press.
   * @default false
   */
  disableRipple?: boolean;
  /**
   * The button start content.
   */
  startContent?: ReactNode;
  /**
   * The button end content.
   */
  endContent?: ReactNode;
  /**
   * Spinner to display when loading.
   * @see https://heroui.com/components/spinner
   */
  spinner?: ReactNode;
  /**
   * The spinner placement.
   * @default "start"
   */
  spinnerPlacement?: "start" | "end";
  /**
   * Whether the button should display a loading spinner.
   * @default false
   */
  isLoading?: boolean;
  /**
   * The native button click event handler.
   * use `onPress` instead.
   * @deprecated
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export type UseButtonProps = Props &
  Omit<AriaButtonProps, keyof ButtonVariantProps> &
  Omit<ButtonVariantProps, "isInGroup">;

export function useButton(props: UseButtonProps) {
  const groupContext = useButtonGroupContext();
  const globalContext = useProviderContext();
  const isInGroup = !!groupContext;

  const {
    ref,
    as,
    children,
    startContent: startContentProp,
    endContent: endContentProp,
    autoFocus,
    className,
    spinner,
    isLoading = false,
    disableRipple: disableRippleProp = false,
    fullWidth = groupContext?.fullWidth ?? false,
    radius = groupContext?.radius,
    size = groupContext?.size ?? "md",
    color = groupContext?.color ?? "default",
    variant = groupContext?.variant ?? "solid",
    disableAnimation = groupContext?.disableAnimation ?? globalContext?.disableAnimation ?? false,
    isDisabled: isDisabledProp = groupContext?.isDisabled ?? false,
    isIconOnly = groupContext?.isIconOnly ?? false,
    spinnerPlacement = "start",
    onPress,
    onClick,
    ...otherProps
  } = props;

  const Component = as || "button";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);

  const disableRipple = (disableRippleProp || globalContext?.disableRipple) ?? disableAnimation;

  const {isFocusVisible, isFocused, focusProps} = useFocusRing({
    autoFocus,
  });

  const isDisabled = isDisabledProp || isLoading;

  const styles = useMemo(
    () =>
      button({
        size,
        color,
        variant,
        radius,
        fullWidth,
        isDisabled,
        isInGroup,
        disableAnimation,
        isIconOnly,
        className,
      }),
    [
      size,
      color,
      variant,
      radius,
      fullWidth,
      isDisabled,
      isInGroup,
      isIconOnly,
      disableAnimation,
      className,
    ],
  );

  const {onPress: onRipplePressHandler, onClear: onClearRipple, ripples} = useRipple();

  const handlePress = useCallback(
    (e: PressEvent) => {
      if (disableRipple || isDisabled || disableAnimation) return;
      domRef.current && onRipplePressHandler(e);
    },
    [disableRipple, isDisabled, disableAnimation, domRef, onRipplePressHandler],
  );

  const {buttonProps: ariaButtonProps, isPressed} = useAriaButton(
    {
      elementType: as,
      isDisabled,
      onPress: chain(onPress, handlePress),
      onClick,
      ...otherProps,
    } as AriaButtonProps,
    domRef,
  );

  const {isHovered, hoverProps} = useHover({isDisabled});

  const getButtonProps: PropGetter = useCallback(
    (props = {}) => ({
      "data-disabled": dataAttr(isDisabled),
      "data-focus": dataAttr(isFocused),
      "data-pressed": dataAttr(isPressed),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-hover": dataAttr(isHovered),
      "data-loading": dataAttr(isLoading),
      ...mergeProps(
        ariaButtonProps,
        focusProps,
        hoverProps,
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps,
        }),
        filterDOMProps(props),
      ),
      className: styles,
    }),
    [
      isLoading,
      isDisabled,
      isFocused,
      isPressed,
      shouldFilterDOMProps,
      isFocusVisible,
      isHovered,
      ariaButtonProps,
      focusProps,
      hoverProps,
      otherProps,
      styles,
    ],
  );

  const getIconClone = (icon: ReactNode) =>
    isValidElement(icon)
      ? cloneElement(icon, {
          // @ts-ignore
          "aria-hidden": true,
          focusable: false,
          tabIndex: -1,
        })
      : null;

  const startContent = getIconClone(startContentProp);
  const endContent = getIconClone(endContentProp);

  const spinnerSize = useMemo(() => {
    const buttonSpinnerSizeMap: Record<string, SpinnerProps["size"]> = {
      sm: "sm",
      md: "sm",
      lg: "md",
    };

    return buttonSpinnerSizeMap[size];
  }, [size]);

  const getRippleProps = useCallback<() => RippleProps>(
    () => ({ripples, onClear: onClearRipple}),
    [ripples, onClearRipple],
  );

  return {
    Component,
    children,
    domRef,
    spinner,
    styles,
    startContent,
    endContent,
    isLoading,
    spinnerPlacement,
    spinnerSize,
    disableRipple,
    getButtonProps,
    getRippleProps,
    isIconOnly,
  };
}

export type UseButtonReturn = ReturnType<typeof useButton>;
