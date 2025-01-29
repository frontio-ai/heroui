import {forwardRef} from "@heroui/system";
import {ChevronIcon} from "@heroui/shared-icons";
import {ReactNode, useMemo} from "react";

import {UseDisclosureProps, useDisclosure} from "./use-disclosure";

export interface DisclosureProps extends UseDisclosureProps {}

const Disclosure = forwardRef<"div", DisclosureProps>((props, ref) => {
  const {
    Component,
    HeadingComponent,
    domRef,
    slots,
    classNames,
    startContent,
    title,
    subtitle,
    children,
    isExpanded,
    isDisabled,
    indicator,
    hideIndicator,
    keepContentMounted,
    getBaseProps,
    getTriggerProps,
    getContentProps,
    getHeadingProps,
    getTitleProps,
    getSubtitleProps,
    getIndicatorProps,
  } = useDisclosure({...props, ref});

  const indicatorContent = useMemo<ReactNode | null>(() => {
    if (typeof indicator === "function") {
      return indicator({indicator: <ChevronIcon />, isExpanded: isExpanded, isDisabled});
    }

    if (indicator) return indicator;

    return null;
  }, [indicator, isExpanded, isDisabled]);

  const indicatorComponent = indicatorContent || <ChevronIcon />;

  return (
    <Component ref={domRef} {...getBaseProps()}>
      <HeadingComponent {...getHeadingProps()}>
        <button {...getTriggerProps()}>
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
      <div {...getContentProps()}>{keepContentMounted || isExpanded ? children : null}</div>
    </Component>
  );
});

Disclosure.displayName = "NextUI.Disclosure";

export default Disclosure;
