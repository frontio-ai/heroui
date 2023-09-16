import {Spinner} from "@nextui-org/spinner";
import {Ripple} from "@nextui-org/ripple";
import {forwardRef} from "@nextui-org/system";

import {UseButtonProps, useButton} from "./use-button";

export interface ButtonProps extends UseButtonProps {}

const Button = forwardRef<"button", ButtonProps>((props, ref) => {
  const {
    Component,
    domRef,
    children,
    styles,
    spinnerSize,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    startContent,
    endContent,
    isLoading,
    disableRipple,
    getButtonProps,
    getRippelProps,
  } = useButton({...props, ref});

  return (
    <Component ref={domRef} className={styles} {...getButtonProps()}>
      {startContent}
      {isLoading && spinnerPlacement === "start" && spinner}
      {children}
      {isLoading && spinnerPlacement === "end" && spinner}
      {endContent}
      {!disableRipple && <Ripple {...getRippelProps()} />}
    </Component>
  );
});

Button.displayName = "NextUI.Button";

export default Button;
