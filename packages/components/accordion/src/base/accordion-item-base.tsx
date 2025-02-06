import type {AccordionItemVariantProps, AccordionItemSlots, SlotsToClasses} from "@heroui/theme";
import type {HTMLMotionProps} from "@heroui/motion";

import {As} from "@heroui/system";
import {ItemProps, BaseItem} from "@heroui/aria-utils";
import {FocusableProps, PressEvents} from "@react-types/shared";
import {ReactNode, MouseEventHandler} from "react";

export type AccordionItemIndicatorProps = {
  /**
   * The current indicator, usually an arrow icon.
   */
  indicator?: ReactNode;
  /**
   * The current open status.
   */
  isOpen?: boolean;
  /**
   * The current disabled status.
   * @default false
   */
  isDisabled?: boolean;
};

export interface Props<T extends object = {}>
  extends Omit<ItemProps<"button", T>, "children" | "title" | keyof FocusableProps>,
    FocusableProps,
    PressEvents {
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * The accordion item title.
   */
  title?: ReactNode;
  /**
   * The accordion item subtitle.
   */
  subtitle?: ReactNode;
  /**
   * The accordion item `expanded` indicator, it's usually an arrow icon.
   * If you pass a function, HeroUI will expose the current indicator and the open status,
   * In case you want to use a custom indicator or modify the current one.
   */
  indicator?: ReactNode | ((props: AccordionItemIndicatorProps) => ReactNode) | null;
  /**
   * The accordion item start content, it's usually an icon or avatar.
   */
  startContent?: ReactNode;
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: Omit<HTMLMotionProps<"section">, "ref">;
  /**
   * Whether to keep the accordion content mounted when collapsed.
   * @default false
   */
  keepContentMounted?: boolean;
  /**
   * The native button click event handler.
   * @deprecated - use `onPress` instead.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <AccordionItem classNames={{
   *    base:"base-classes",
   *    heading: "heading-classes",
   *    trigger: "trigger-classes",
   *    startContent: "start-indicator-classes",
   *    indicator: "indicator-classes",
   *    titleWrapper: "title-wrapper-classes", // this wraps the title and subtitle
   *    title: "title-classes",
   *    subtitle: "subtitle-classes",
   *    content: "content-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<AccordionItemSlots>;
  /**
   * Customizable heading tag for Web accessibility:
   * use headings to describe content and use them consistently and semantically.
   * This will help all users to better find the content they are looking for.
   */
  HeadingComponent?: As;
}

export type AccordionItemBaseProps<T extends object = {}> = Props<T> & AccordionItemVariantProps;

const AccordionItemBase = BaseItem as (props: AccordionItemBaseProps) => JSX.Element;

export default AccordionItemBase;
