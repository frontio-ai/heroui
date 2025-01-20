import {forwardRef} from "@nextui-org/system";
import {ChevronIcon} from "@nextui-org/shared-icons";
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
    height,
    keepContentMounted,
    state,
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
      return indicator({indicator: <ChevronIcon />, isExpanded: state.isExpanded, isDisabled});
    }

    if (indicator) return indicator;

    return null;
  }, [indicator, state.isExpanded, isDisabled]);

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
      <div {...getContentProps()} style={{height}}>
        {keepContentMounted || isExpanded ? children : null}
      </div>
    </Component>
  );
});

Disclosure.displayName = "NextUI.Disclosure";

export default Disclosure;
