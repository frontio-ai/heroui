import {forwardRef} from "@nextui-org/system";
import {useMemo, ReactNode} from "react";
import {ChevronIcon} from "@nextui-org/shared-icons";
import {AnimatePresence, motion, useWillChange} from "framer-motion";
import {TRANSITION_VARIANTS} from "@nextui-org/framer-transitions";

import {UseAccordionItemProps, useAccordionItem} from "./use-accordion-item";

export interface AccordionItemProps extends UseAccordionItemProps {}

const AccordionItem = forwardRef<"button", AccordionItemProps>((props, ref) => {
  const {
    Component,
    HeadingComponent,
    classNames,
    slots,
    indicator,
    children,
    title,
    subtitle,
    startContent,
    isOpen,
    isDisabled,
    hideIndicator,
    keepContentMounted,
    disableAnimation,
    motionProps,
    getBaseProps,
    getHeadingProps,
    getButtonProps,
    getTitleProps,
    getSubtitleProps,
    getContentProps,
    getIndicatorProps,
  } = useAccordionItem({...props, ref});

  const willChange = useWillChange();

  const indicatorContent = useMemo<ReactNode | null>(() => {
    if (typeof indicator === "function") {
      return indicator({indicator: <ChevronIcon />, isOpen, isDisabled});
    }

    if (indicator) return indicator;

    return null;
  }, [indicator, isOpen, isDisabled]);

  const indicatorComponent = indicatorContent || <ChevronIcon />;

  const content = useMemo(() => {
    if (disableAnimation) {
      return <div {...getContentProps()}>{children}</div>;
    }

    return keepContentMounted ? (
      <motion.section
        key="accordion-content"
        animate={isOpen ? "enter" : "exit"}
        exit="exit"
        initial="exit"
        style={{overflowY: "hidden", willChange}}
        variants={TRANSITION_VARIANTS.collapse}
        {...motionProps}
      >
        <div {...getContentProps()}>{children}</div>
      </motion.section>
    ) : (
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="accordion-content"
            animate="enter"
            exit="exit"
            initial="exit"
            style={{overflowY: "hidden", willChange}}
            variants={TRANSITION_VARIANTS.collapse}
            {...motionProps}
          >
            <div {...getContentProps()}>{children}</div>
          </motion.section>
        )}
      </AnimatePresence>
    );
  }, [isOpen, disableAnimation, keepContentMounted, children, motionProps]);

  return (
    <Component {...getBaseProps()}>
      <HeadingComponent {...getHeadingProps()}>
        <button {...getButtonProps()}>
          {startContent && (
            <div className={slots.startContent({class: classNames?.startContent})}>
              {startContent}
            </div>
          )}
          <div className={slots.titleWrapper({class: classNames?.titleWrapper})}>
            {title && <span {...getTitleProps()}>{title}</span>}
            {subtitle && <span {...getSubtitleProps()}>{subtitle}</span>}
          </div>
          {!hideIndicator && indicatorComponent && (
            <span {...getIndicatorProps()}>{indicatorComponent}</span>
          )}
        </button>
      </HeadingComponent>
      {content}
    </Component>
  );
});

AccordionItem.displayName = "NextUI.AccordionItem";

export default AccordionItem;
