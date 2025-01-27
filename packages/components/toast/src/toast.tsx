import {forwardRef} from "@heroui/system";
import {Button, ButtonProps} from "@heroui/button";
import {
  CloseIcon,
  DangerIcon,
  InfoFilledIcon,
  SuccessIcon,
  WarningIcon,
} from "@heroui/shared-icons";
import {AnimatePresence, m, LazyMotion} from "framer-motion";
import {cloneElement, isValidElement} from "react";
import {Spinner} from "@heroui/spinner";

import {UseToastProps, useToast} from "./use-toast";

const loadFeatures = () => import("framer-motion").then((res) => res.domMax);

export interface ToastProps extends UseToastProps {}

const iconMap = {
  primary: InfoFilledIcon,
  secondary: InfoFilledIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
} as const;

const Toast = forwardRef<"div", ToastProps>((props, ref) => {
  const {
    Component,
    icon,
    loadingIcon,
    domRef,
    endContent,
    color,
    hideIcon,
    disableAnimation,
    progressBarRef,
    classNames,
    slots,
    isProgressBarVisible,
    getToastProps,
    getContentProps,
    getTitleProps,
    getDescriptionProps,
    getCloseButtonProps,
    getIconProps,
    getMotionDivProps,
    getCloseIconProps,
    getLoadingIconProps,
    isLoading,
  } = useToast({
    ...props,
    ref,
  });

  const customIcon = icon && isValidElement(icon) ? cloneElement(icon, getIconProps()) : null;
  const IconComponent = iconMap[color] || iconMap.primary;
  const customLoadingIcon =
    loadingIcon && isValidElement(loadingIcon)
      ? cloneElement(loadingIcon, getLoadingIconProps())
      : null;
  const loadingIconComponent = isLoading
    ? customLoadingIcon || (
        <Spinner
          aria-label="loadingIcon"
          classNames={{wrapper: getLoadingIconProps().className}}
          color={color ?? "default"}
        />
      )
    : null;

  const toastContent = (
    <Component ref={domRef} {...getToastProps()}>
      <main {...getContentProps()}>
        {hideIcon && !isLoading
          ? null
          : loadingIconComponent || customIcon || <IconComponent {...getIconProps()} />}
        <div>
          <div {...getTitleProps()}>{props.toast.content.title}</div>
          <div {...getDescriptionProps()}>{props.toast.content.description}</div>
        </div>
      </main>
      {isProgressBarVisible && (
        <div className={slots.progressTrack({class: classNames?.progressTrack})}>
          <div
            ref={progressBarRef}
            className={slots.progressIndicator({class: classNames?.progressIndicator})}
          />
        </div>
      )}
      <Button isIconOnly {...(getCloseButtonProps() as ButtonProps)}>
        <CloseIcon {...getCloseIconProps()} />
      </Button>
      {endContent}
    </Component>
  );

  return (
    <>
      {disableAnimation ? (
        toastContent
      ) : (
        <LazyMotion features={loadFeatures}>
          <AnimatePresence>
            <m.div {...getMotionDivProps()}>
              <m.div
                key={"inner-div"}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                initial={{opacity: 0}}
                transition={{duration: 0.25, ease: "easeOut", delay: 0.1}}
              >
                {toastContent}
              </m.div>
            </m.div>
          </AnimatePresence>
        </LazyMotion>
      )}
    </>
  );
});

Toast.displayName = "NextUI.Toast";

export default Toast;
