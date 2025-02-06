import {forwardRef} from "@heroui/system";
import {LayoutGroup} from "@heroui/motion";
import {Divider} from "@heroui/divider";
import {Fragment, Key, useCallback, useMemo} from "react";

import {UseAccordionProps, useAccordion} from "./use-accordion";
import AccordionItem from "./accordion-item";

export interface AccordionProps extends UseAccordionProps {}

const AccordionGroup = forwardRef<"div", AccordionProps>((props, ref) => {
  const {
    Component,
    values,
    state,
    isSplitted,
    showDivider,
    getBaseProps,
    disableAnimation,
    handleFocusChanged: handleFocusChangedProps,
    itemClasses,
    dividerProps,
  } = useAccordion({
    ...props,
    ref,
  });
  const handleFocusChanged = useCallback(
    (isFocused: boolean, key: Key) => handleFocusChangedProps(isFocused, key),
    [handleFocusChangedProps],
  );

  const content = useMemo(() => {
    return [...state.collection].map((item, index) => {
      const classNames = {...itemClasses, ...(item.props.classNames || {})};

      return (
        <Fragment key={item.key}>
          <AccordionItem
            item={item}
            variant={props.variant}
            onFocusChange={handleFocusChanged}
            {...values}
            {...item.props}
            classNames={classNames}
          />
          {!item.props.hidden &&
            !isSplitted &&
            showDivider &&
            index < state.collection.size - 1 && <Divider {...dividerProps} />}
        </Fragment>
      );
    });
  }, [values, itemClasses, handleFocusChanged, isSplitted, showDivider, state.collection]);

  return (
    <Component {...getBaseProps()}>
      {disableAnimation ? content : <LayoutGroup>{content}</LayoutGroup>}
    </Component>
  );
});

AccordionGroup.displayName = "HeroUI.Accordion";

export default AccordionGroup;
