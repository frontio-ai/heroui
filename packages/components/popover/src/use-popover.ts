import type {PopoverVariantProps, SlotsToClasses, PopoverSlots} from "@heroui/theme";
import type {PressEvent} from "@react-types/shared";
import type {HTMLMotionProps} from "@heroui/motion";

import {RefObject, Ref, useEffect} from "react";
import {ReactRef, useDOMRef} from "@heroui/react-utils";
import {OverlayTriggerState, useOverlayTriggerState} from "@react-stately/overlays";
import {useFocusRing} from "@react-aria/focus";
import {ariaHideOutside, useOverlayTrigger, usePreventScroll} from "@react-aria/overlays";
import {OverlayTriggerProps} from "@react-types/overlays";
import {getShouldUseAxisPlacement} from "@heroui/aria-utils";
import {HTMLHeroUIProps, mapPropsVariants, PropGetter, useProviderContext} from "@heroui/system";
import {getArrowPlacement} from "@heroui/aria-utils";
import {popover} from "@heroui/theme";
import {mergeProps, mergeRefs} from "@react-aria/utils";
import {clsx, dataAttr, objectToDeps} from "@heroui/shared-utils";
import {useMemo, useCallback, useRef} from "react";
import {AriaDialogProps} from "@react-aria/dialog";

import {useReactAriaPopover, ReactAriaPopoverProps} from "./use-aria-popover";

export interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * The controlled state of the popover.
   */
  state?: OverlayTriggerState;
  /**
   * The ref for the element which the overlay positions itself with respect to.
   */
  triggerRef?: RefObject<HTMLElement>;
  /**
   * Whether the scroll event should be blocked when the overlay is open.
   * @default true
   */
  shouldBlockScroll?: boolean;
  /**
   * Custom props to be passed to the dialog container.
   *
   * @default {}
   */
  dialogProps?: AriaDialogProps;
  /**
   * Type of overlay that is opened by the trigger.
   */
  triggerType?: "dialog" | "menu" | "listbox" | "tree" | "grid";
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: Omit<HTMLMotionProps<"div">, "ref">;
  /**
   * The container element in which the overlay portal will be placed.
   * @default document.body
   */
  portalContainer?: Element;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Popover classNames={{
   *    base:"base-classes",
   *    content: "content-classes",
   *    trigger: "trigger-classes",
   *    backdrop: "backdrop-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<PopoverSlots>;
  /**
   *  Callback fired when the popover is closed.
   */
  onClose?: () => void;
}

const DEFAULT_PLACEMENT = "top";

export type UsePopoverProps = Props &
  Omit<ReactAriaPopoverProps, "triggerRef" | "popoverRef"> &
  OverlayTriggerProps &
  PopoverVariantProps;

export function usePopover(originalProps: UsePopoverProps) {
  const globalContext = useProviderContext();

  const [props, variantProps] = mapPropsVariants(originalProps, popover.variantKeys);

  const {
    as,
    ref,
    children,
    state: stateProp,
    triggerRef: triggerRefProp,
    scrollRef,
    defaultOpen,
    onOpenChange,
    isOpen: isOpenProp,
    isNonModal = true,
    shouldFlip = true,
    containerPadding = 12,
    shouldBlockScroll = false,
    isDismissable = true,
    shouldCloseOnBlur,
    portalContainer,
    updatePositionDeps,
    dialogProps: dialogPropsProp,
    placement: placementProp = DEFAULT_PLACEMENT,
    triggerType = "dialog",
    showArrow = false,
    offset = 7,
    crossOffset = 0,
    boundaryElement,
    isKeyboardDismissDisabled,
    shouldCloseOnInteractOutside,
    shouldCloseOnScroll,
    motionProps,
    className,
    classNames,
    onClose,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const domTriggerRef = useRef<HTMLElement>(null);
  const wasTriggerPressedRef = useRef(false);
  const triggerRef = triggerRefProp || domTriggerRef;

  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false;

  const innerState = useOverlayTriggerState({
    isOpen: isOpenProp,
    defaultOpen,
    onOpenChange: (isOpen) => {
      onOpenChange?.(isOpen);
      if (!isOpen) {
        onClose?.();
      }
    },
  });

  const state = stateProp || innerState;

  const {
    popoverProps,
    underlayProps,
    placement: ariaPlacement,
  } = useReactAriaPopover(
    {
      triggerRef,
      isNonModal,
      popoverRef: domRef,
      placement: placementProp,
      offset,
      scrollRef,
      isDismissable,
      shouldCloseOnBlur,
      boundaryElement,
      crossOffset,
      shouldFlip,
      containerPadding,
      updatePositionDeps,
      isKeyboardDismissDisabled,
      shouldCloseOnScroll,
      shouldCloseOnInteractOutside,
    },
    state,
  );

  const placement = useMemo(() => {
    // If ariaPlacement is null, popoverProps.style isn't set,
    // so we return null to avoid an incorrect animation value.
    if (!ariaPlacement) {
      return null;
    }

    return getShouldUseAxisPlacement(ariaPlacement, placementProp) ? ariaPlacement : placementProp;
  }, [ariaPlacement, placementProp]);

  const {triggerProps} = useOverlayTrigger({type: triggerType}, state, triggerRef);

  const {isFocusVisible, isFocused, focusProps} = useFocusRing();

  const slots = useMemo(
    () =>
      popover({
        ...variantProps,
      }),
    [objectToDeps(variantProps)],
  );

  const baseStyles = clsx(classNames?.base, className);

  usePreventScroll({
    isDisabled: !(shouldBlockScroll && state.isOpen),
  });

  const getPopoverProps: PropGetter = (props = {}) => ({
    ref: domRef,
    ...mergeProps(popoverProps, otherProps, props),
    style: mergeProps(popoverProps.style, otherProps.style, props.style),
  });

  const getDialogProps: PropGetter = (props = {}) => ({
    // `ref` and `dialogProps` from `useDialog` are passed from props
    // if we use `useDialog` here, dialogRef won't be focused on mount
    "data-slot": "base",
    "data-open": dataAttr(state.isOpen),
    "data-focus": dataAttr(isFocused),
    "data-arrow": dataAttr(showArrow),
    "data-focus-visible": dataAttr(isFocusVisible),
    "data-placement": ariaPlacement ? getArrowPlacement(ariaPlacement, placementProp) : undefined,
    ...mergeProps(focusProps, dialogPropsProp, props),
    className: slots.base({class: clsx(baseStyles)}),
    style: {
      // this prevent the dialog to have a default outline
      outline: "none",
    },
  });

  const getContentProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "content",
      "data-open": dataAttr(state.isOpen),
      "data-arrow": dataAttr(showArrow),
      "data-placement": ariaPlacement ? getArrowPlacement(ariaPlacement, placementProp) : undefined,
      className: slots.content({class: clsx(classNames?.content, props.className)}),
    }),
    [slots, state.isOpen, showArrow, placement, placementProp, classNames, ariaPlacement],
  );

  const onPress = useCallback(
    (e: PressEvent) => {
      let pressTimer: ReturnType<typeof setTimeout>;

      // Artificial delay to prevent the underlay to be triggered immediately after the onPress
      // this only happens when the backdrop is blur or opaque & pointerType === "touch"
      // TODO: find a better way to handle this
      if (
        e.pointerType === "touch" &&
        (originalProps?.backdrop === "blur" || originalProps?.backdrop === "opaque")
      ) {
        pressTimer = setTimeout(() => {
          wasTriggerPressedRef.current = true;
        }, 100);
      } else {
        wasTriggerPressedRef.current = true;
      }

      triggerProps.onPress?.(e);

      return () => {
        clearTimeout(pressTimer);
      };
    },
    [triggerProps?.onPress],
  );

  const getTriggerProps = useCallback<PropGetter>(
    (props = {}, _ref: Ref<any> | null | undefined = null) => {
      const {isDisabled, ...otherProps} = props;

      return {
        "data-slot": "trigger",
        ...mergeProps({"aria-haspopup": "dialog"}, triggerProps, otherProps),
        onPress,
        isDisabled,
        className: slots.trigger({
          class: clsx(classNames?.trigger, props.className),
          // apply isDisabled class names to make the trigger child disabled
          // e.g. for elements like div or HeroUI elements that don't have `isDisabled` prop
          isTriggerDisabled: isDisabled,
        }),
        ref: mergeRefs(_ref, triggerRef),
      };
    },
    [state, triggerProps, onPress, triggerRef],
  );

  const getBackdropProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "backdrop",
      className: slots.backdrop({class: classNames?.backdrop}),
      onClick: (e) => {
        if (!wasTriggerPressedRef.current) {
          e.preventDefault();

          return;
        }

        state.close();
        wasTriggerPressedRef.current = false;
      },
      ...underlayProps,
      ...props,
    }),
    [slots, state.isOpen, classNames, underlayProps],
  );

  useEffect(() => {
    if (state.isOpen && domRef?.current) {
      return ariaHideOutside([domRef?.current]);
    }
  }, [state.isOpen, domRef]);

  return {
    state,
    Component,
    children,
    classNames,
    showArrow,
    triggerRef,
    placement,
    isNonModal,
    popoverRef: domRef,
    portalContainer,
    isOpen: state.isOpen,
    onClose: state.close,
    disableAnimation,
    shouldBlockScroll,
    backdrop: originalProps.backdrop ?? "transparent",
    motionProps,
    getBackdropProps,
    getPopoverProps,
    getTriggerProps,
    getDialogProps,
    getContentProps,
  };
}

export type UsePopoverReturn = ReturnType<typeof usePopover>;
