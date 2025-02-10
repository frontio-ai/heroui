import {ForwardedRef, ReactElement, useId, useState, useEffect, useCallback} from "react";
import {LayoutGroup} from "framer-motion";
import {Button} from "@heroui/button";
import {forwardRef} from "@heroui/system";
import {EllipsisIcon} from "@heroui/shared-icons";
import {debounce} from "@heroui/shared-utils";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/dropdown";
import {clsx} from "@heroui/shared-utils";

import {UseTabsProps, useTabs} from "./use-tabs";
import Tab from "./tab";
import TabPanel from "./tab-panel";

interface Props<T> extends UseTabsProps<T> {}

export type TabsProps<T extends object = object> = Props<T>;

const Tabs = forwardRef(function Tabs<T extends object>(
  props: TabsProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    Component,
    values,
    state,
    destroyInactiveTabPanel,
    getBaseProps,
    getTabListProps,
    getWrapperProps,
  } = useTabs<T>({
    ...props,
    ref,
  });

  const layoutId = useId();
  const [showOverflow, setShowOverflow] = useState(false);
  const [hiddenTabs, setHiddenTabs] = useState<Array<{key: string; title: string}>>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const layoutGroupEnabled = !props.disableAnimation && !props.disableCursorAnimation;
  const tabListProps = getTabListProps();
  const tabList =
    tabListProps.ref && "current" in tabListProps.ref ? tabListProps.ref.current : null;

  const checkOverflow = useCallback(() => {
    if (!tabList) return;

    const isOverflowing = tabList.scrollWidth > tabList.clientWidth;

    setShowOverflow(isOverflowing);

    if (!isOverflowing) {
      setHiddenTabs([]);

      return;
    }

    const tabs = [...state.collection];
    const hiddenTabsList: Array<{key: string; title: string}> = [];
    const {left: containerLeft, right: containerRight} = tabList.getBoundingClientRect();

    tabs.forEach((item) => {
      const tabElement = tabList.querySelector(`[data-key="${item.key}"]`);

      if (!tabElement) return;

      const {left: tabLeft, right: tabRight} = tabElement.getBoundingClientRect();
      const isHidden = tabRight > containerRight || tabLeft < containerLeft;

      if (isHidden) {
        hiddenTabsList.push({
          key: String(item.key),
          title: item.textValue || "",
        });
      }
    });

    setHiddenTabs(hiddenTabsList);
  }, [state.collection, tabList]);

  const scrollToTab = useCallback(
    (key: string) => {
      if (!tabList) return;

      const tabElement = tabList.querySelector(`[data-key="${key}"]`);

      if (!tabElement) return;

      const tabBounds = tabElement.getBoundingClientRect();
      const tabListBounds = tabList.getBoundingClientRect();

      const targetScrollPosition =
        tabList.scrollLeft +
        (tabBounds.left - tabListBounds.left) -
        tabListBounds.width / 2 +
        tabBounds.width / 2;

      tabList.scrollTo({
        left: targetScrollPosition,
        behavior: "smooth",
      });
    },
    [tabList],
  );

  const handleTabSelect = useCallback(
    (key: string) => {
      state.setSelectedKey(key);
      setIsDropdownOpen(false);

      scrollToTab(key);
      checkOverflow();
    },
    [state, scrollToTab, checkOverflow],
  );

  useEffect(() => {
    if (!tabList) return;

    tabList.style.overflowX = isDropdownOpen ? "hidden" : "auto";
  }, [isDropdownOpen, tabListProps.ref]);

  useEffect(() => {
    const debouncedCheckOverflow = debounce(checkOverflow, 100);

    debouncedCheckOverflow();

    window.addEventListener("resize", debouncedCheckOverflow);

    return () => {
      window.removeEventListener("resize", debouncedCheckOverflow);
    };
  }, [checkOverflow]);

  const MoreIcon = props.moreIcon || EllipsisIcon;

  const tabsProps = {
    state,
    listRef: values.listRef,
    slots: values.slots,
    classNames: values.classNames,
    isDisabled: values.isDisabled,
    motionProps: values.motionProps,
    disableAnimation: values.disableAnimation,
    shouldSelectOnPressUp: values.shouldSelectOnPressUp,
    disableCursorAnimation: values.disableCursorAnimation,
  };

  const tabs = [...state.collection].map((item) => (
    <Tab key={item.key} item={item} {...tabsProps} {...item.props} />
  ));

  const renderTabs = (
    <>
      <div {...getBaseProps()}>
        <Component {...tabListProps} onScroll={checkOverflow}>
          {layoutGroupEnabled ? <LayoutGroup id={layoutId}>{tabs}</LayoutGroup> : tabs}
        </Component>
        {showOverflow && (
          <Dropdown>
            <DropdownTrigger>
              <Button
                aria-label="Show more tabs"
                className={clsx(values.slots.moreButton(), values.classNames?.moreButton)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setIsDropdownOpen(true);
                  }
                }}
              >
                <MoreIcon className={clsx(values.slots.moreIcon(), values.classNames?.moreIcon)} />
                <span className="sr-only">More tabs</span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Hidden tabs"
              className="max-h-[300px] overflow-y-auto"
              onAction={(key) => handleTabSelect(key as string)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setIsDropdownOpen(false);
                }
              }}
            >
              {hiddenTabs.map((tab) => (
                <DropdownItem key={tab.key}>{tab.title}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
      {[...state.collection].map((item) => (
        <TabPanel
          key={item.key}
          classNames={values.classNames}
          destroyInactiveTabPanel={destroyInactiveTabPanel}
          slots={values.slots}
          state={values.state}
          tabKey={item.key}
        />
      ))}
    </>
  );

  if ("placement" in props || "isVertical" in props) {
    return <div {...getWrapperProps()}>{renderTabs}</div>;
  }

  return renderTabs;
}) as <T extends object>(props: TabsProps<T>) => ReactElement;

export default Tabs;
