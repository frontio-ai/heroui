import {forwardRef} from "@nextui-org/system";
import {Button, ButtonProps} from "@nextui-org/button";
import {
  CloseIcon,
  DangerIcon,
  InfoFilledIcon,
  SuccessIcon,
  WarningIcon,
} from "@nextui-org/shared-icons";
import {motion, AnimatePresence} from "framer-motion";
import {cloneElement, isValidElement, useState} from "react";
import {clsx} from "@nextui-org/shared-utils";

import {UseToastProps, useToast} from "./use-toast";

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
    domRef,
    endContent,
    color,
    hideIcon,
    position,
    toast,
    state,
    disableAnimation,
    progressBarRef,
    classNames,
    slots,
    isProgressBarVisible,
    total,
    index,
    isRegionHovered,
    getToastProps,
    getContentProps,
    getTitleProps,
    getDescriptionProps,
    getCloseButtonProps,
    getIconProps,
    liftHeight,
    initialHeight,
    frontHeight,
  } = useToast({
    ...props,
    ref,
  });

  const toastVariants = position.includes("bottom")
    ? {
        hidden: {opacity: 0, y: 50},
        visible: {opacity: 1, y: 0},
        exit: {opacity: 0, y: 50},
      }
    : {
        hidden: {opacity: 0, y: -50},
        visible: {opacity: 1, y: 0},
        exit: {opacity: 0, y: -50},
      };

  const customIcon = icon && isValidElement(icon) ? cloneElement(icon, getIconProps()) : null;
  const IconComponent = iconMap[color] || iconMap.primary;

  const handleDragEnd = (offsetX: number, offsetY: number) => {
    const isRight = position.includes("right");
    const isLeft = position.includes("left");
    const isTop = position === "center-top";
    const isBottom = position === "center-bottom";

    if (
      (isRight && offsetX >= 50) ||
      (isLeft && offsetX <= -50) ||
      (isTop && offsetY <= -50) ||
      (isBottom && offsetY >= 50)
    ) {
      state.close(toast.key);
    }
  };

  const toastContent = (
    <Component ref={domRef} {...getToastProps()}>
      <main {...getContentProps()}>
        {hideIcon ? null : customIcon || <IconComponent {...getIconProps()} />}
        <div>
          <div {...getTitleProps()}>{props.toast.content.title}</div>
          <div {...getDescriptionProps()}>{props.toast.content.description}</div>
          {isProgressBarVisible && (
            <div className={slots.progressTrack({class: classNames?.progressTrack})}>
              <div
                ref={progressBarRef}
                className={slots.progressIndicator({class: classNames?.progressIndicator})}
              />
            </div>
          )}
        </div>
      </main>
      <Button {...(getCloseButtonProps() as ButtonProps)} isIconOnly variant="bordered">
        <CloseIcon />
      </Button>
      {endContent}
    </Component>
  );

  const positionStyles: Record<string, string> = {
    "right-bottom": "bottom-0 right-0 mx-auto w-max",
    "left-bottom": "bottom-0 left-0 mx-auto w-max",
    "center-bottom": "bottom-0 left-0 right-0 w-max mx-auto",
    "right-top": "top-0 right-0 mx-auto w-max",
    "left-top": "top-0 left-0 mx-auto w-max",
    "center-top": "top-0 left-0 right-0 w-max mx-auto",
  };
  const positionStyle = position ? positionStyles[position] : positionStyles["right-bottom"];
  const multiplier = position.includes("top") ? 1 : -1;
  const [drag, setDrag] = useState(false);

  return (
    <>
      {disableAnimation ? (
        toastContent
      ) : (
        <AnimatePresence>
          <motion.div
            animate={{
              opacity: total - index - 1 <= 2 ? 1 : 0,
              y: isRegionHovered ? liftHeight * multiplier : (total - 1 - index) * 8 * multiplier,
              scaleX: isRegionHovered ? 1 : 1 - (total - 1 - index) * 0.1,
              height: isRegionHovered ? initialHeight : frontHeight,
            }}
            className={clsx(
              "fixed",
              positionStyle,
              drag
                ? "before:content-[''] before:absolute before:left-0 before:right-0 before:h-full before:-z-10"
                : "",
            )}
            drag={position.includes("center") ? "y" : "x"}
            dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}
            exit={{opacity: 0, y: 100}}
            initial={{opacity: 0, y: -40 * multiplier, scale: 1}}
            transition={{duration: 0.3, ease: "easeOut"}}
            variants={toastVariants}
            onDragEnd={(_, info) => {
              setDrag(false);
              const offsetX = info.offset.x;
              const offsetY = info.offset.y;

              handleDragEnd(offsetX, offsetY);
            }}
            onDragStart={() => {
              setDrag(true);
            }}
          >
            {toastContent}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
});

Toast.displayName = "NextUI.Toast";

export default Toast;
