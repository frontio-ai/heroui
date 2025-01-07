import type {AriaTabPanelProps} from "@react-aria/tabs";

import {Key} from "@react-types/shared";
import {forwardRef, HTMLHeroUIProps} from "@heroui/system";
import {useDOMRef} from "@heroui/react-utils";
import {clsx, getInertValue} from "@heroui/shared-utils";
import {mergeProps} from "@react-aria/utils";
import {useTabPanel} from "@react-aria/tabs";
import {useFocusRing} from "@react-aria/focus";

import {ValuesType} from "./use-tabs";

interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Whether to destroy inactive tab panel when switching tabs.
   * Inactive tab panels are inert and cannot be interacted with.
   */
  destroyInactiveTabPanel: boolean;
  /**
   * The current tab key.
   */
  tabKey: Key;
  /**
   * The tab list state.
   */
  state: ValuesType["state"];
  /**
   * Component slots classes
   */
  slots: ValuesType["slots"];
  /**
   * User custom classnames
   */
  classNames?: ValuesType["classNames"];
}

export type TabPanelProps = Props & AriaTabPanelProps;

/**
 * @internal
 */
const TabPanel = forwardRef<"div", TabPanelProps>((props, ref) => {
  const {as, tabKey, destroyInactiveTabPanel, state, className, slots, classNames, ...otherProps} =
    props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const {tabPanelProps} = useTabPanel({...props, id: String(tabKey)}, state, domRef);

  const {focusProps, isFocused, isFocusVisible} = useFocusRing();

  const selectedItem = state.selectedItem;

  const content = state.collection.getItem(tabKey)!.props.children;

  const tabPanelStyles = clsx(classNames?.panel, className, selectedItem?.props?.className);

  const isSelected = tabKey === selectedItem?.key;

  if (!content || (!isSelected && destroyInactiveTabPanel)) {
    return null;
  }

  return (
    <Component
      ref={domRef}
      data-focus={isFocused}
      data-focus-visible={isFocusVisible}
      data-inert={!isSelected ? "true" : undefined}
      // makes the browser ignore the element and its children when tabbing
      // @ts-ignore
      inert={getInertValue(!isSelected)}
      {...(isSelected && mergeProps(tabPanelProps, focusProps, otherProps))}
      className={slots.panel?.({class: tabPanelStyles})}
      data-slot="panel"
    >
      {content}
    </Component>
  );
});

TabPanel.displayName = "HeorUI.TabPanel";

export default TabPanel;
