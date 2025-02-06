/**
 * FreeSoloPopover
 *
 * This is a popover that is not tied to a trigger. It is used for the free solo
 * select component.
 *
 * @internal
 */

import type {HTMLMotionProps} from "@heroui/motion";

import * as React from "react";
import {DismissButton, Overlay} from "@react-aria/overlays";
import {forwardRef} from "@heroui/system";
import {LazyMotion, m, TRANSITION_VARIANTS} from "@heroui/motion";
import {mergeProps} from "@react-aria/utils";
import {getTransformOrigins} from "@heroui/aria-utils";
import {useDialog} from "@react-aria/dialog";

import {usePopover, UsePopoverProps, UsePopoverReturn} from "./use-popover";

const domAnimation = () => import("@heroui/dom-animation").then((res) => res.default);

export interface FreeSoloPopoverProps extends Omit<UsePopoverProps, "children"> {
  children: React.ReactNode | ((titleProps: React.DOMAttributes<HTMLElement>) => React.ReactNode);
  transformOrigin?: {
    originX?: number;
    originY?: number;
  };
  disableDialogFocus?: boolean;
}

type FreeSoloPopoverWrapperProps = {
  children: React.ReactNode;
  disableAnimation: boolean;
  transformOrigin?: FreeSoloPopoverProps["transformOrigin"];
  placement: UsePopoverReturn["placement"];
  motionProps?: UsePopoverProps["motionProps"];
} & React.HTMLAttributes<HTMLDivElement>;

const FreeSoloPopoverWrapper = forwardRef<"div", FreeSoloPopoverWrapperProps>(
  (
    {
      children,
      motionProps,
      placement,
      disableAnimation,
      style: styleProp = {},
      transformOrigin = {},
      ...otherProps
    },
    ref,
  ) => {
    let style = styleProp;

    if (transformOrigin.originX !== undefined || transformOrigin.originY !== undefined) {
      style = {
        ...style,
        // @ts-ignore
        transformOrigin,
      };
    } else if (placement) {
      style = {
        ...style,
        ...getTransformOrigins(placement === "center" ? "top" : placement),
      };
    }

    return disableAnimation ? (
      <div {...otherProps} ref={ref}>
        {children}
      </div>
    ) : (
      <LazyMotion features={domAnimation}>
        <m.div
          ref={ref}
          animate="enter"
          exit="exit"
          initial="initial"
          style={style}
          variants={TRANSITION_VARIANTS.scaleSpringOpacity}
          {...mergeProps(otherProps, motionProps)}
        >
          {children}
        </m.div>
      </LazyMotion>
    );
  },
);

FreeSoloPopoverWrapper.displayName = "HeroUI.FreeSoloPopoverWrapper";

const FreeSoloPopover = forwardRef<"div", FreeSoloPopoverProps>(
  ({children, transformOrigin, disableDialogFocus = false, ...props}, ref) => {
    const {
      Component,
      state,
      placement,
      backdrop,
      portalContainer,
      disableAnimation,
      motionProps,
      isNonModal,
      getPopoverProps,
      getBackdropProps,
      getDialogProps,
      getContentProps,
    } = usePopover({
      ...props,
      ref,
    });

    const dialogRef = React.useRef(null);
    const {dialogProps: ariaDialogProps, titleProps} = useDialog({}, dialogRef);
    const dialogProps = getDialogProps({
      // by default, focus is moved into the dialog on mount
      // we can use `disableDialogFocus` to disable this behaviour
      // e.g. in autocomplete, the focus should be moved to the input (handled in autocomplete hook) instead of the dialog first
      ...(!disableDialogFocus && {ref: dialogRef}),
      ...ariaDialogProps,
    });

    const backdropContent = React.useMemo(() => {
      if (backdrop === "transparent") {
        return null;
      }

      if (disableAnimation) {
        return <div {...getBackdropProps()} />;
      }

      return (
        <LazyMotion features={domAnimation}>
          <m.div
            animate="enter"
            exit="exit"
            initial="exit"
            variants={TRANSITION_VARIANTS.fade}
            {...(getBackdropProps() as Omit<HTMLMotionProps<"div">, "ref">)}
          />
        </LazyMotion>
      );
    }, [backdrop, disableAnimation, getBackdropProps]);

    return (
      <Overlay portalContainer={portalContainer}>
        {!isNonModal && backdropContent}
        <Component {...getPopoverProps()}>
          <FreeSoloPopoverWrapper
            disableAnimation={disableAnimation}
            motionProps={motionProps}
            placement={placement}
            tabIndex={-1}
            transformOrigin={transformOrigin}
            {...dialogProps}
          >
            {!isNonModal && <DismissButton onDismiss={state.close} />}
            <div {...getContentProps()}>
              {typeof children === "function" ? children(titleProps) : children}
            </div>
            <DismissButton onDismiss={state.close} />
          </FreeSoloPopoverWrapper>
        </Component>
      </Overlay>
    );
  },
);

FreeSoloPopover.displayName = "HeroUI.FreeSoloPopover";

export default FreeSoloPopover;
