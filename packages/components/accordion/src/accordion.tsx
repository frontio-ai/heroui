import {forwardRef} from "@heroui/system";

import {useAccordion, UseAccordionProps} from "./use-accordion";
import {AccordianContext} from "./accordian-context";

export interface AccordionProps extends UseAccordionProps {}

const AccordionGroup = forwardRef<"div", AccordionProps>((props, ref) => {
  const {state, values, children, Component, getBaseProps} = useAccordion({...props, ref});

  return (
    <AccordianContext value={{state, values}}>
      <Component {...getBaseProps()}>{children}</Component>
    </AccordianContext>
  );
});

AccordionGroup.displayName = "HeroUI.Accordion";

export default AccordionGroup;
