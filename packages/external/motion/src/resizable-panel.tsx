import type {Ref} from "react";

import {forwardRef} from "react";
import {domAnimation, LazyMotion, m} from "motion/react";
import {useMeasure} from "@heroui/use-measure";

// extracted from `@heroui/system` to avoid circular dependencies
type As<Props = any> = React.ElementType<Props>;

type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

type HTMLHeroUIProps<T extends As = "div", OmitKeys extends keyof any = never> = Omit<
  PropsOf<T>,
  "ref" | "color" | "slot" | "size" | "defaultChecked" | "defaultValue" | OmitKeys
> & {
  as?: As;
};

/**
 * Props for the ResizablePanel component.
 */
export interface ResizablePanelProps extends HTMLHeroUIProps<"div"> {}

const ResizablePanel = forwardRef(
  (originalProps: ResizablePanelProps, ref: Ref<HTMLDivElement>) => {
    const {children, ...props} = originalProps;

    let [measureRef, bounds] = useMeasure();

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          ref={ref}
          animate={{
            width: bounds.width && bounds?.width > 0 ? bounds.width : "auto",
            height: bounds.height && bounds.height > 0 ? bounds.height : "auto",
          }}
        >
          <div ref={measureRef} {...props}>
            {children}
          </div>
        </m.div>
      </LazyMotion>
    );
  },
);

ResizablePanel.displayName = "HeroUI - ResizablePanel";

export {ResizablePanel};
