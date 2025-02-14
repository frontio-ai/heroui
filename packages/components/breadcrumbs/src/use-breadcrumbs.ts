import type {BreadcrumbsVariantProps, SlotsToClasses, BreadcrumbsSlots} from "@heroui/theme";
import type {AriaBreadcrumbsProps} from "@react-types/breadcrumbs";

import {Children, ReactNode, Key, ReactElement} from "react";
import {HTMLHeroUIProps, mapPropsVariants, PropGetter, useProviderContext} from "@heroui/system";
import {breadcrumbs} from "@heroui/theme";
import {filterDOMProps, pickChildren, ReactRef, useDOMRef} from "@heroui/react-utils";
import {mergeProps} from "@react-aria/utils";
import {useBreadcrumbs as useAriaBreadcrumbs} from "@react-aria/breadcrumbs";
import {useMemo} from "react";
import {clsx, dataAttr, objectToDeps} from "@heroui/shared-utils";

import BreadcrumbItem, {BreadcrumbItemProps} from "./breadcrumb-item";

type RenderEllipsisItemProps = {
  /**
   * The collapsed items.
   */
  items: BreadcrumbItemProps[];
  /**
   * The max number of items.
   */
  maxItems: number;
  /**
   * The picked item to render the ellipsis.
   */
  collapsedItem: ReactNode;
  /**
   * The default ellipsis icon.
   */
  ellipsisIcon: ReactNode;
  /**
   * Number of items to show before the ellipsis.
   */
  itemsBeforeCollapse: number;
  /**
   * Number of items to show after the ellipsis.
   */
  itemsAfterCollapse: number;
  /**
   * The separator between each breadcrumb. It is a chevron by default.
   */
  separator: ReactNode;
};

interface Props extends HTMLHeroUIProps<"nav">, AriaBreadcrumbsProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * If max items is exceeded, the number of items to show before the ellipsis.
   * @default 1
   */
  itemsBeforeCollapse?: number;
  /**
   * If max items is exceeded, the number of items to show after the ellipsis.
   * @default 2
   */
  itemsAfterCollapse?: number;
  /**
   * Specifies the maximum number of breadcrumbs to display. When there are more
   * than the maximum number, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse`
   * will be shown, with an ellipsis in between.
   * @default 8
   */
  maxItems?: number;
  /**
   * The separator between each breadcrumb. It is a chevron by default.
   */
  separator?: ReactNode;
  /**
   * Breadcrumbs in a disabled state shows items, but indicates that navigation is
   * not available. This can be used to maintain layout continuity.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * The breadcrumbs classNames.
   */
  classNames?: SlotsToClasses<BreadcrumbsSlots>;
  /**
   * The breadcrumbs items classNames.
   */
  itemClasses?: BreadcrumbItemProps["classNames"];
  /**
   * A function that allows to render the ellipsis when the number of items is exceeded.
   *
   * @param props RenderEllipsisItemProps
   */
  renderEllipsis?: (props: RenderEllipsisItemProps) => ReactNode;
  /**
   * Callback when any of the breadcrumbs is pressed.
   * @param key string
   */
  onAction?: (key: Key) => void;
}

export type UseBreadcrumbsProps = Props &
  BreadcrumbsVariantProps &
  Partial<
    Pick<BreadcrumbItemProps, "color" | "size" | "underline" | "hideSeparator" | "disableAnimation">
  >;

export function useBreadcrumbs(originalProps: UseBreadcrumbsProps) {
  const globalContext = useProviderContext();

  const disableAnimation =
    originalProps?.disableAnimation ?? globalContext?.disableAnimation ?? false;

  const [props, variantProps] = mapPropsVariants(originalProps, breadcrumbs.variantKeys);

  const {
    ref,
    as,
    color,
    underline,
    isDisabled,
    separator,
    children: childrenProp,
    itemsBeforeCollapse = 1,
    itemsAfterCollapse = 2,
    maxItems = 8,
    hideSeparator,
    renderEllipsis,
    className,
    classNames,
    itemClasses,
    onAction,
    ...otherProps
  } = props;

  const Component = as || "nav";
  const shouldFilterDOMProps = typeof Component === "string";

  const {navProps} = useAriaBreadcrumbs(originalProps);

  const [, children] = pickChildren<ReactElement>(childrenProp as ReactElement, BreadcrumbItem);

  const childCount = Children.count(children);

  const domRef = useDOMRef(ref);

  const slots = useMemo(
    () =>
      breadcrumbs({
        ...variantProps,
      }),
    [objectToDeps(variantProps)],
  );

  const baseStyles = clsx(classNames?.base, className);

  const itemProps: Partial<BreadcrumbItemProps> = {
    color,
    underline,
    disableAnimation,
    hideSeparator,
    size: originalProps?.size,
    classNames: itemClasses,
  };

  const getBaseProps: PropGetter = () => ({
    ref: domRef,
    "data-slot": "base",
    className: slots.base({class: baseStyles}),
    ...mergeProps(
      navProps,
      filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps,
      }),
    ),
  });

  const getListProps = () => ({
    "data-slot": "list",
    className: slots.list({class: classNames?.list}),
  });

  const getEllipsisProps = () => ({
    "data-slot": "ellipsis",
    className: slots.ellipsis({class: classNames?.ellipsis}),
  });

  const getSeparatorProps = () => ({
    "data-slot": "separator",
    "aria-hidden": dataAttr(true),
    className: slots.separator({class: classNames?.separator}),
  });

  return {
    Component,
    children,
    slots,
    separator,
    childCount,
    itemsAfterCollapse,
    itemsBeforeCollapse,
    maxItems,
    classNames,
    isDisabled,
    itemProps,
    renderEllipsis,
    getBaseProps,
    getListProps,
    getEllipsisProps,
    getSeparatorProps,
    onAction,
  };
}

export type UseBreadcrumbsReturn = ReturnType<typeof useBreadcrumbs>;
