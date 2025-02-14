import React, {forwardRef, useMemo} from "react";
import {useAlert} from "@heroui/react";

export const InfoCircleIcon = (props) => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22ZM12.75 16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16L11.25 11C11.25 10.59 11.59 10.25 12 10.25C12.41 10.25 12.75 10.59 12.75 11L12.75 16ZM11.08 7.62C11.13 7.49 11.2 7.39 11.29 7.29C11.39 7.2 11.5 7.13 11.62 7.08C11.74 7.03 11.87 7 12 7C12.13 7 12.26 7.03 12.38 7.08C12.5 7.13 12.61 7.2 12.71 7.29C12.8 7.39 12.87 7.49 12.92 7.62C12.97 7.74 13 7.87 13 8C13 8.13 12.97 8.26 12.92 8.38C12.87 8.5 12.8 8.61 12.71 8.71C12.61 8.8 12.5 8.87 12.38 8.92C12.14 9.02 11.86 9.02 11.62 8.92C11.5 8.87 11.39 8.8 11.29 8.71C11.2 8.61 11.13 8.5 11.08 8.38C11.03 8.26 11 8.13 11 8C11 7.87 11.03 7.74 11.08 7.62Z" />
    </svg>
  );
};

export const CloseIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
};

const styles = {
  base: [
    "bg-slate-100",
    "border",
    "shadow-sm",
    "hover:bg-slate-200",
    "focus-within:bg-slate-100!",
    "dark:bg-slate-900",
    "dark:hover:bg-slate-800",
    "dark:border-slate-800",
    "dark:focus-within:bg-slate-900!",
    "cursor-pointer",
  ],
  title: ["text-base", "text-slate-500", "font-bold"],
  description: ["text-base", "text-slate-500"],
};

const MyAlert = forwardRef((props, ref) => {
  const {
    title,
    description,
    isClosable,
    domRef,
    handleClose,
    getBaseProps,
    getMainWrapperProps,
    getDescriptionProps,
    getTitleProps,
    getCloseButtonProps,
    color,
    isVisible,
    onClose,
    getAlertIconProps,
  } = useAlert({
    ...props,
    ref,
    // this is just for the example, the props bellow should be passed by the parent component
    title: "Email Sent!!",
    description: "You will get a reply soon",
    // custom styles
    classNames: {
      ...styles,
    },
  });

  const mainWrapper = useMemo(() => {
    return (
      <div {...getMainWrapperProps()}>
        {title && <div {...getTitleProps()}>{title}</div>}
        <div {...getDescriptionProps()}>{description}</div>
      </div>
    );
  }, [title, description, getMainWrapperProps, getTitleProps, getDescriptionProps]);

  const baseWrapper = useMemo(() => {
    return isVisible ? (
      <div ref={domRef} {...getBaseProps()}>
        <InfoCircleIcon {...getAlertIconProps()} />
        {mainWrapper}
        {(isClosable || onClose) && (
          <button onClick={handleClose} {...getCloseButtonProps()}>
            <CloseIcon />
          </button>
        )}
      </div>
    ) : null;
  }, [
    mainWrapper,
    isClosable,
    getCloseButtonProps,
    isVisible,
    domRef,
    getBaseProps,
    handleClose,
    color,
    onClose,
    getAlertIconProps,
  ]);

  return <>{baseWrapper}</>;
});

MyAlert.displayName = "MyAlert";

export default MyAlert;
