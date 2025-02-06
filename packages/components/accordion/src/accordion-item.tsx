import type {Variants} from "@heroui/motion";

import {forwardRef} from "@heroui/system";
import {useMemo, ReactNode} from "react";
import {ChevronIcon} from "@heroui/shared-icons";
import {AnimatePresence, LazyMotion, m, useWillChange, TRANSITION_VARIANTS} from "@heroui/motion";

import {UseAccordionItemProps, useAccordionItem} from "./use-accordion-item";

export interface AccordionItemProps extends UseAccordionItemProps {}

const domAnimation = () => import("@heroui/dom-animation").then((res) => res.default);

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

  const indicatorContent = useMemo<ReactNode>(() => {
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

    const transitionVariants: Variants = {
      exit: {...TRANSITION_VARIANTS.collapse.exit, overflowY: "hidden"},
      enter: {...TRANSITION_VARIANTS.collapse.enter, overflowY: "unset"},
    };

    return keepContentMounted ? (
      <LazyMotion features={domAnimation}>
        <m.section
          key="accordion-content"
          animate={isOpen ? "enter" : "exit"}
          exit="exit"
          initial="exit"
          style={{willChange}}
          variants={transitionVariants}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          {...motionProps}
        >
          <div {...getContentProps()}>{children}</div>
        </m.section>
      </LazyMotion>
    ) : (
      <AnimatePresence initial={false}>
        {isOpen && (
          <LazyMotion features={domAnimation}>
            <m.section
              key="accordion-content"
              animate="enter"
              exit="exit"
              initial="exit"
              style={{willChange}}
              variants={transitionVariants}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              {...motionProps}
            >
              <div {...getContentProps()}>{children}</div>
            </m.section>
          </LazyMotion>
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

AccordionItem.displayName = "HeroUI.AccordionItem";

export default AccordionItem;
