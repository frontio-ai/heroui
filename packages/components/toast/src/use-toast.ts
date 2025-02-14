import type {SlotsToClasses, ToastSlots, ToastVariantProps} from "@heroui/theme";

import {HTMLHeroUIProps, PropGetter, mapPropsVariants, useProviderContext} from "@heroui/system";
import {toast as toastTheme} from "@heroui/theme";
import {ReactRef, useDOMRef} from "@heroui/react-utils";
import {clsx, dataAttr, isEmpty, objectToDeps} from "@heroui/shared-utils";
import {ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {useToast as useToastAria, AriaToastProps} from "@react-aria/toast";
import {chain, mergeProps} from "@react-aria/utils";
import {QueuedToast, ToastState} from "@react-stately/toast";
import {MotionProps} from "framer-motion";
import {useHover} from "@react-aria/interactions";
import {useIsMobile} from "@heroui/use-is-mobile";

export type ToastPlacement =
  | "bottom-right"
  | "bottom-left"
  | "bottom-center"
  | "top-right"
  | "top-left"
  | "top-center";

export interface ToastProps extends ToastVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * title of the toast
   */
  title?: ReactNode;
  /**
   * description of the toast
   */
  description?: string;
  /**
   * Promise based on which the notification will be styled.
   */
  promise?: Promise<any>;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * addToast({
   *   classNames={{
   *    base:"base-classes",
   *    content: "content-classes"
   *    description: "description-classes"
   *    title: "title-classes"
   *    loadingIcon: "loading-icon-classes",
   *    icon: "icon-classes",
   *    progressTrack: "progress-track-classes",
   *    progressIndicator: "progress-indicator-classes",
   *    closeButton: "closeButton-classes"
   *    closeIcon: "closeIcon-classes"
   *   }}
   * })
   * ```
   */
  classNames?: SlotsToClasses<ToastSlots>;
  /**
   * Content to be displayed in the end side of the toast
   */
  endContent?: ReactNode;
  /**
   * Icon to be displayed in the toast - overrides the default icon
   */
  icon?: ReactNode;
  /**
   * Icon to be displayed in the close button - overrides the default close icon
   */
  closeIcon?: ReactNode | ((props: any) => ReactNode);
  /**
   * Icon to be displayed in the loading toast - overrides the loading icon
   */
  loadingIcon?: ReactNode;
  /**
   * Whether the toast-icon should be hidden.
   * @default false
   */
  hideIcon?: boolean;
  /**
   * Time to auto-close the toast.
   */
  timeout?: number;
  /**
   * hides the close button
   */
  hideCloseButton?: boolean;
  /**
   * function which is called when toast is closed.
   */
  onClose?: () => void;
  /**
   * props that will be passed to the m.div
   */
  motionProps?: MotionProps;
  /**
   * should apply styles to indicate timeout progress
   */
  shouldShowTimeoutProgess?: boolean;
  /**
   * The severity of the toast. This changes the icon without having to change the color.
   * @default "default"
   */
  severity?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
}

interface Props<T> extends Omit<HTMLHeroUIProps<"div">, "title">, ToastProps {
  toast: QueuedToast<T>;
  index: number;
  total: number;
  state: ToastState<T>;
  heights: number[];
  setHeights: (val: number[]) => void;
  disableAnimation?: boolean;
  isRegionExpanded: boolean;
  placement?: ToastPlacement;
  toastOffset?: number;
}

export type UseToastProps<T = ToastProps> = Props<T> &
  ToastVariantProps &
  Omit<AriaToastProps<T>, "div">;

const SWIPE_THRESHOLD_X = 100;
const SWIPE_THRESHOLD_Y = 20;
const INITIAL_POSITION = 50;

export function useToast<T extends ToastProps>(originalProps: UseToastProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, toastTheme.variantKeys);
  const {
    ref,
    as,
    title,
    description,
    className,
    classNames,
    toast,
    endContent,
    closeIcon,
    hideIcon = false,
    placement: placementProp = "bottom-right",
    isRegionExpanded,
    hideCloseButton = false,
    state,
    total = 1,
    index = 0,
    heights,
    promise: promiseProp,
    setHeights,
    toastOffset = 0,
    motionProps,
    timeout = 6000,
    shouldShowTimeoutProgess = false,
    icon,
    onClose,
    severity,
    ...otherProps
  } = props;

  const {isHovered: isToastHovered, hoverProps} = useHover({
    isDisabled: false,
  });

  const globalContext = useProviderContext();
  const disableAnimation =
    originalProps?.disableAnimation ?? globalContext?.disableAnimation ?? false;

  const isMobile = useIsMobile();
  let placement = placementProp;

  if (isMobile) {
    if (placementProp.includes("top")) {
      placement = "top-center";
    } else {
      placement = "bottom-center";
    }
  }

  const animationRef = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);
  const progressRef = useRef<number>(0);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const pausedTime = useRef<number>(0);
  const timeElapsed = useRef<number>(0);

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = "0%";
    }
  }, []);

  useEffect(() => {
    const updateProgress = (timestamp: number) => {
      if (!timeout) {
        return;
      }

      if (startTime.current === null) {
        startTime.current = timestamp;
      }

      if (isToastHovered || isRegionExpanded || index != total - 1) {
        pausedTime.current += timestamp - startTime.current;
        startTime.current = null;
        animationRef.current = requestAnimationFrame(updateProgress);

        return;
      }

      const elapsed = timestamp - startTime.current + pausedTime.current;

      timeElapsed.current = elapsed;
      if (timeElapsed.current >= timeout) {
        state.close(toast.key);
      }

      progressRef.current = Math.min((elapsed / timeout) * 100, 100);

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${
          shouldShowTimeoutProgess ? progressRef.current : 0
        }%`;
      }

      if (progressRef.current < 100) {
        animationRef.current = requestAnimationFrame(updateProgress);
      }
    };

    animationRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [timeout, shouldShowTimeoutProgess, state, isToastHovered, index, total, isRegionExpanded]);

  const [isLoading, setIsLoading] = useState<boolean>(!!promiseProp);

  useEffect(() => {
    if (!promiseProp) return;
    promiseProp.finally(() => {
      setIsLoading(false);
    });
  }, [promiseProp]);

  const Component = as || "div";
  const loadingIcon: ReactNode = icon;

  const domRef = useDOMRef(ref);
  const baseStyles = clsx(className, classNames?.base);
  const {toastProps, contentProps, titleProps, descriptionProps, closeButtonProps} = useToastAria(
    props,
    state,
    domRef,
  );

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [initialHeight, setInitialHeight] = useState<number>(0);

  // Following was inspired from sonner ❤️
  useLayoutEffect(() => {
    if (!domRef.current || !mounted) {
      return;
    }
    const toastNode = domRef.current;
    const originalHeight = toastNode.style.height;

    toastNode.style.height = "auto";
    const computedStyle = getComputedStyle(toastNode);
    const marginTop = parseFloat(computedStyle.marginTop);
    const marginBottom = parseFloat(computedStyle.marginBottom);
    const newHeight = toastNode.getBoundingClientRect().height + marginTop + marginBottom;

    toastNode.style.height = originalHeight;

    setInitialHeight((prevHeight) => (prevHeight !== newHeight ? newHeight : prevHeight));
    const updatedHeights = [...heights];

    if (updatedHeights.length > index) {
      updatedHeights[index] = newHeight;
    } else {
      updatedHeights.push(newHeight);
    }
    setHeights(updatedHeights);
  }, [mounted, total, setHeights, index]);

  let liftHeight = 4;

  for (let idx = index + 1; idx < total; idx++) {
    liftHeight += heights[idx];
  }

  const frontHeight = heights[heights.length - 1];

  const slots = useMemo(
    () =>
      toastTheme({
        ...variantProps,
        disableAnimation,
      }),
    [objectToDeps(variantProps)],
  );

  const multiplier = placement.includes("top") ? 1 : -1;
  const toastVariants = {
    hidden: {opacity: 0, y: -INITIAL_POSITION * multiplier},
    visible: {opacity: 1, y: 0},
    exit: {opacity: 0, y: -INITIAL_POSITION * multiplier},
  };

  const [drag, setDrag] = useState(false);
  const [dragValue, setDragValue] = useState(0);

  const shouldCloseToast = (offsetX: number, offsetY: number) => {
    const isRight = placement.includes("right");
    const isLeft = placement.includes("left");
    const isCenterTop = placement === "top-center";
    const isCenterBottom = placement === "bottom-center";

    if (
      (isRight && offsetX >= SWIPE_THRESHOLD_X) ||
      (isLeft && offsetX <= -SWIPE_THRESHOLD_X) ||
      (isCenterTop && offsetY <= -SWIPE_THRESHOLD_Y) ||
      (isCenterBottom && offsetY >= SWIPE_THRESHOLD_Y)
    ) {
      return true;
    }
  };

  const getDragElasticConstraints = (placement: string) => {
    const elasticConstraint = {top: 0, bottom: 0, right: 0, left: 0};

    if (placement === "center-bottom") {
      elasticConstraint.bottom = 1;

      return elasticConstraint;
    }
    if (placement === "center-top") {
      elasticConstraint.top = 1;

      return elasticConstraint;
    }
    if (placement.includes("right")) {
      elasticConstraint.right = 1;

      return elasticConstraint;
    }
    if (placement.includes("left")) {
      elasticConstraint.left = 1;

      return elasticConstraint;
    }

    elasticConstraint.left = 1;
    elasticConstraint.right = 1;

    return elasticConstraint;
  };

  let opacityValue: undefined | number = undefined;

  if ((drag && placement === "bottom-center") || placement === "top-center") {
    opacityValue = Math.max(0, 1 - dragValue / (SWIPE_THRESHOLD_Y + 5));
  } else if (drag) {
    opacityValue = Math.max(0, 1 - dragValue / (SWIPE_THRESHOLD_X + 20));
  }

  const getToastProps: PropGetter = useCallback(
    (props = {}) => ({
      ref: domRef,
      className: slots.base({class: clsx(baseStyles, classNames?.base)}),
      "data-has-title": dataAttr(!isEmpty(title)),
      "data-has-description": dataAttr(!isEmpty(description)),
      "data-placement": placement,
      "data-drag-value": dragValue,
      "data-toast": true,
      "data-animation": toast.animation,
      "aria-label": "toast",
      onTransitionEnd: () => {
        if (toast.animation === "exiting") {
          const updatedHeights = heights;

          updatedHeights.splice(index, 1);
          setHeights([...updatedHeights]);

          state.remove(toast.key);
        }
      },
      style: {
        opacity: opacityValue,
      },
      ...mergeProps(props, otherProps, toastProps, hoverProps),
    }),
    [slots, classNames, toastProps, hoverProps, toast, toast.animation, toast.key, opacityValue],
  );

  const getIconProps: PropGetter = useCallback(
    (props = {}) => ({
      "aria-label": "descriptionIcon",
      className: slots.icon({class: classNames?.icon}),
      ...props,
    }),
    [],
  );

  const getLoadingIconProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.loadingIcon({class: classNames?.loadingIcon}),
      ...props,
    }),
    [],
  );

  const getContentProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.content({class: classNames?.content}),
      ...mergeProps(props, otherProps, contentProps),
    }),
    [contentProps],
  );

  const getTitleProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.title({class: classNames?.title}),
      ...mergeProps(props, otherProps, titleProps),
    }),
    [titleProps],
  );

  const getDescriptionProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.description({class: classNames?.description}),
      ...mergeProps(props, otherProps, descriptionProps),
    }),
    [descriptionProps],
  );

  const getCloseButtonProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.closeButton({class: classNames?.closeButton}),
      "aria-label": "closeButton",
      "data-hidden": dataAttr(hideCloseButton),
      ...mergeProps(props, closeButtonProps, {
        onPress: chain(() => {
          setTimeout(() => document.body.focus(), 0);
        }, onClose),
      }),
    }),
    [closeButtonProps, onClose],
  );

  const getCloseIconProps: PropGetter = useCallback(
    (props = {}) => ({
      className: slots.closeIcon({class: classNames?.closeIcon}),
      "aria-label": "closeIcon",
      ...props,
    }),
    [],
  );

  const getMotionDivProps = useCallback(
    (
      props = {},
    ): MotionProps & {
      "data-drag": string | boolean;
      "data-placement": string;
      "data-drag-value": number;
      className: string;
    } => {
      const isCloseToEnd = total - index - 1 <= 2;
      const dragDirection = placement === "bottom-center" || placement === "top-center" ? "y" : "x";
      const dragConstraints = {left: 0, right: 0, top: 0, bottom: 0};
      const dragElastic = getDragElasticConstraints(placement);

      const animateProps = (() => {
        if (placement.includes("top")) {
          return {
            top:
              isRegionExpanded || drag
                ? liftHeight + toastOffset
                : (total - 1 - index) * 8 + toastOffset,
            bottom: "auto",
          };
        } else if (placement.includes("bottom")) {
          return {
            bottom:
              isRegionExpanded || drag
                ? liftHeight + toastOffset
                : (total - 1 - index) * 8 + toastOffset,
            top: "auto",
          };
        }

        return {};
      })();

      return {
        animate: {
          opacity: isCloseToEnd ? 1 : 0,
          pointerEvents: isCloseToEnd ? "all" : "none",
          scaleX: isRegionExpanded || drag ? 1 : 1 - (total - 1 - index) * 0.1,
          height: isRegionExpanded || drag ? initialHeight : frontHeight,
          y: 0,
          ...animateProps,
        },
        drag: dragDirection,
        dragConstraints,
        exit: {opacity: 0},
        initial: {opacity: 0, scale: 1, y: -40 * multiplier},
        transition: {duration: 0.3, ease: "easeOut"},
        variants: toastVariants,
        dragElastic,
        onDragEnd: (_, info) => {
          const {x: offsetX, y: offsetY} = info.offset;

          setDrag(false);

          if (shouldCloseToast(offsetX, offsetY)) {
            const updatedHeights = heights;

            updatedHeights.splice(index, 1);
            setHeights([...updatedHeights]);

            state.close(toast.key);
            state.remove(toast.key);

            return;
          }
          setDragValue(0);
        },
        onDrag: (_, info) => {
          let updatedDragValue = 0;

          if (placement === "top-center") {
            updatedDragValue = -info.offset.y;
          } else if (placement === "bottom-center") {
            updatedDragValue = info.offset.y;
          } else if (placement.includes("right")) {
            updatedDragValue = info.offset.x;
          } else if (placement.includes("left")) {
            updatedDragValue = -info.offset.x;
          }

          if (updatedDragValue >= 0) {
            setDragValue(updatedDragValue);
          }
        },
        onDragStart: () => {
          setDrag(true);
        },
        "data-drag": dataAttr(drag),
        "data-placement": placement,
        "data-drag-value": dragValue,
        className: slots.motionDiv({class: classNames?.motionDiv}),
        ...props,
        ...motionProps,
      };
    },
    [
      closeButtonProps,
      total,
      index,
      placement,
      isRegionExpanded,
      liftHeight,
      multiplier,
      initialHeight,
      frontHeight,
      toastVariants,
      classNames,
      drag,
      dataAttr,
      setDrag,
      shouldCloseToast,
      slots,
      toastOffset,
    ],
  );

  return {
    Component,
    title,
    description,
    icon,
    loadingIcon,
    domRef,
    severity,
    closeIcon,
    classNames,
    color: variantProps["color"],
    hideIcon,
    placement,
    state,
    toast,
    disableAnimation,
    isProgressBarVisible: !!timeout,
    total,
    index,
    getToastProps,
    getTitleProps,
    getContentProps,
    getDescriptionProps,
    getCloseButtonProps,
    getIconProps,
    getMotionDivProps,
    getCloseIconProps,
    getLoadingIconProps,
    progressBarRef,
    endContent,
    slots,
    isRegionExpanded,
    liftHeight,
    frontHeight,
    initialHeight,
    isLoading,
  };
}

export type UseToastReturn = ReturnType<typeof useToast>;
