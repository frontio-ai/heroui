import {RefObject, useEffect} from "react";
import {
  useOverlay,
  AriaPopoverProps,
  PopoverAria,
  useOverlayPosition,
  AriaOverlayProps,
} from "@react-aria/overlays";
import {
  OverlayPlacement,
  ariaHideOutside,
  toReactAriaPlacement,
  ariaShouldCloseOnInteractOutside,
} from "@heroui/aria-utils";
import {OverlayTriggerState} from "@react-stately/overlays";
import {mergeProps} from "@react-aria/utils";
import {useSafeLayoutEffect} from "@heroui/use-safe-layout-effect";

export interface Props {
  /**
   * Whether the element should render an arrow.
   * @default false
   */
  showArrow?: boolean;
  /**
   * The placement of the element with respect to its anchor element.
   * @default 'top'
   */
  placement?: OverlayPlacement;
  /**
   * A ref for the scrollable region within the overlay.
   * @default popoverRef
   */
  scrollRef?: RefObject<HTMLElement>;
  /**
   * List of dependencies to update the position of the popover.
   * @default []
   */
  updatePositionDeps?: any[];
  /**
   * Whether the popover should close on scroll.
   * @default true
   */
  shouldCloseOnScroll?: boolean;
  /**
   * Whether to close the overlay when the user interacts outside it.
   * @default true
   */
  isDismissable?: boolean;
}

export type ReactAriaPopoverProps = Props &
  Omit<AriaPopoverProps, "placement"> &
  Omit<AriaOverlayProps, "isDismissable">;

/**
 * Provides the behavior and accessibility implementation for a popover component.
 * A popover is an overlay element positioned relative to a trigger.
 */
export function useReactAriaPopover(
  props: ReactAriaPopoverProps,
  state: OverlayTriggerState,
): PopoverAria {
  const {
    triggerRef,
    popoverRef,
    showArrow,
    offset = 7,
    crossOffset = 0,
    scrollRef,
    shouldFlip,
    boundaryElement,
    isDismissable = true,
    shouldCloseOnBlur = true,
    shouldCloseOnScroll = true,
    placement: placementProp = "top",
    containerPadding,
    shouldCloseOnInteractOutside,
    isNonModal: isNonModalProp,
    isKeyboardDismissDisabled,
    updatePositionDeps = [],
    ...otherProps
  } = props;

  const isNonModal = isNonModalProp ?? true;

  const {overlayProps, underlayProps} = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: state.close,
      shouldCloseOnBlur,
      isDismissable,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside: shouldCloseOnInteractOutside
        ? shouldCloseOnInteractOutside
        : (element: Element) => ariaShouldCloseOnInteractOutside(element, triggerRef, state),
    },
    popoverRef,
  );

  const {
    overlayProps: positionProps,
    arrowProps,
    placement,
    updatePosition,
  } = useOverlayPosition({
    ...otherProps,
    shouldFlip,
    crossOffset,
    targetRef: triggerRef,
    overlayRef: popoverRef,
    isOpen: state.isOpen,
    scrollRef,
    boundaryElement,
    containerPadding,
    placement: toReactAriaPlacement(placementProp),
    offset: showArrow ? offset + 3 : offset,
    onClose: isNonModal && shouldCloseOnScroll ? state.close : () => {},
  });

  useSafeLayoutEffect(() => {
    if (!updatePositionDeps.length) return;
    // force update position when deps change
    updatePosition();
  }, updatePositionDeps);

  useEffect(() => {
    if (state.isOpen && !isNonModal && popoverRef.current) {
      return ariaHideOutside([popoverRef.current]);
    }
  }, [isNonModal, state.isOpen, popoverRef]);

  return {
    popoverProps: mergeProps(overlayProps, positionProps),
    arrowProps,
    underlayProps,
    placement,
  };
}
