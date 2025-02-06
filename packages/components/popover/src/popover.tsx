import {Children, ReactNode} from "react";
import {forwardRef} from "@heroui/system";
import {Overlay} from "@react-aria/overlays";
import {AnimatePresence} from "@heroui/motion";

import {UsePopoverProps, usePopover} from "./use-popover";
import {PopoverProvider} from "./popover-context";

export interface PopoverProps extends UsePopoverProps {
  /**
   * The content of the popover. It is usually the `PopoverTrigger`,
   * and `PopoverContent`
   */
  children: ReactNode[];
}

const Popover = forwardRef<"div", PopoverProps>((props, ref) => {
  const {children, ...otherProps} = props;
  const context = usePopover({...otherProps, ref});

  const [trigger, content] = Children.toArray(children);

  const overlay = <Overlay portalContainer={context.portalContainer}>{content}</Overlay>;

  return (
    <PopoverProvider value={context}>
      {trigger}
      {context.disableAnimation && context.isOpen ? (
        overlay
      ) : (
        <AnimatePresence>{context.isOpen ? overlay : null}</AnimatePresence>
      )}
    </PopoverProvider>
  );
});

Popover.displayName = "HeroUI.Popover";

export default Popover;
