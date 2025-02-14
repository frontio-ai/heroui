import type {ListboxItemVariantProps, ListboxItemSlots, SlotsToClasses} from "@heroui/theme";
import type {AriaOptionProps} from "@react-aria/listbox";
import type {FocusableProps, PressEvents} from "@react-types/shared";

import {BaseItem, ItemProps} from "@heroui/aria-utils";
import {ReactNode} from "react";

export type ListboxItemSelectedIconProps = {
  /**
   * The current icon, usually an checkmark icon.
   */
  icon?: ReactNode;
  /**
   * The current selected status.
   */
  isSelected?: boolean;
  /**
   * The current disabled status.
   * @default false
   */
  isDisabled?: boolean;
};

interface Props<T extends object = {}> extends Omit<ItemProps<"li", T>, "children" | "title"> {
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * The listbox item title.
   */
  title?: ReactNode;
  /**
   * The listbox item subtitle.
   */
  description?: ReactNode;
  /**
   * The listbox item start content.
   */
  startContent?: ReactNode;
  /**
   * The listbox item end content.
   */
  endContent?: ReactNode;
  /**
   * Whether the listbox press events are disabled.
   * @default false
   */
  isReadOnly?: boolean;
  /**
   * Whether to hide the check icon when the items are selected.
   * @default false
   */
  hideSelectedIcon?: boolean;
  /**
   * The listbox item `selected` icon, it's usually an checkmark icon.
   * If you pass a function, HeroUI will expose the current selected icon and the selected status,
   * In case you want to use a custom indicator or modify the current one.
   *
   * Important: The selected icon will be rendered only if the listbox selection mode is different than `none`.
   */
  selectedIcon?: ReactNode | ((props: ListboxItemSelectedIconProps) => ReactNode) | null;
  /**
   * Whether the item should be highlighted on focus.
   * @default false
   */
  shouldHighlightOnFocus?: boolean;
  /**
   * Whether to disable the items animation.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <ListboxItem classNames={{
   *    base:"base-classes",
   *    title:"label-classes",
   *    wrapper:"wrapper-classes", // title and description wrapper
   *    description:"description-classes",
   *    selectedIcon:"selected-icon-classes",
   *    shortcut:"shortcut-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<ListboxItemSlots>;
}

export type ListboxItemBaseProps<T extends object = {}> = Omit<Props<T>, "onClick"> &
  Omit<ListboxItemVariantProps, "hasDescriptionTextChild" | "hasTitleTextChild"> &
  Omit<AriaOptionProps, "key"> &
  FocusableProps &
  PressEvents & {
    /**
     * The native click event handler.
     * use `onPress` instead.
     * @deprecated
     */
    onClick?: (e: React.MouseEvent<HTMLLIElement | HTMLAnchorElement>) => void;
  };

const ListboxItemBase = BaseItem as <T extends object>(
  props: Omit<ListboxItemBaseProps<T>, "value">,
) => JSX.Element;

export default ListboxItemBase;
