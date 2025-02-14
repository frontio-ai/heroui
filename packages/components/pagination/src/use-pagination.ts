import type {PaginationSlots, PaginationVariantProps, SlotsToClasses} from "@heroui/theme";
import type {Key, ReactNode, Ref} from "react";
import type {HTMLHeroUIProps, PropGetter} from "@heroui/system";

import {objectToDeps, Timer} from "@heroui/shared-utils";
import {useLocale} from "@react-aria/i18n";
import {
  UsePaginationProps as UseBasePaginationProps,
  PaginationItemValue,
  PaginationItemType,
} from "@heroui/use-pagination";
import {useEffect, useRef, useMemo} from "react";
import {mapPropsVariants, useProviderContext} from "@heroui/system";
import {usePagination as useBasePagination} from "@heroui/use-pagination";
import scrollIntoView from "scroll-into-view-if-needed";
import {pagination} from "@heroui/theme";
import {useDOMRef} from "@heroui/react-utils";
import {clsx, dataAttr} from "@heroui/shared-utils";
import {PressEvent} from "@react-types/shared";
import {useIntersectionObserver} from "@heroui/use-intersection-observer";

export type PaginationItemRenderProps = {
  /**
   * The pagination item ref.
   */
  ref?: Ref<any>;
  /**
   * React key.
   */
  key?: Key;
  /**
   * The pagination item value.
   */
  children?: ReactNode;
  /**
   * The pagination item value.
   */
  value: PaginationItemValue;
  /**
   * The pagination item index.
   */
  index: number;
  /**
   * Calculated pagination item position. This includes the dots.
   */
  page: number;
  /**
   * The pagination total number of pages.
   */
  total: number;
  /**
   * The active page number.
   */
  activePage: number;
  /**
   * Whether the pagination item is active.
   */
  isActive: boolean;
  /**
   * Whether the item is before the active page.
   */
  isBefore: boolean;
  /**
   * Whether the pagination item is the first item in the pagination.
   */
  isFirst: boolean;
  /**
   * Whether the pagination item is the last item in the pagination.
   */
  isLast: boolean;
  /**
   * Whether the pagination item is the next item in the pagination.
   */
  isNext: boolean;
  /**
   * Number of pages that are added or subtracted on the '...' button.
   * @default 5
   */
  dotsJump: number;
  /**
   * Whether the pagination item is the previous item in the pagination.
   */
  isPrevious: boolean;
  /**
   * The pagination item className.
   */
  className: string;
  /**
   * Callback to go to the next page.
   */
  onNext: () => void;
  /**
   * Callback to go to the previous page.
   */
  onPrevious: () => void;
  /**
   * Callback to go to the page.
   */
  setPage: (page: number) => void;
  /**
   * Callback fired when the item is clicked.
   * @param e PressEvent
   */
  onPress?: (e: PressEvent) => void;
  /**
   * Function to get the aria-label of the item.
   */
  getAriaLabel?: (page?: PaginationItemValue) => string | undefined;
};

interface Props extends Omit<HTMLHeroUIProps<"nav">, "onChange"> {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLElement>;
  /**
   * Number of pages that are added or subtracted on the '...' button.
   * @default 5
   */
  dotsJump?: number;
  /**
   * Non disable next/previous controls
   * @default false
   */
  loop?: boolean;
  /**
   * Whether the pagination should display controls (left/right arrows).
   * @default true
   */
  showControls?: boolean;
  /**
   * Render a custom pagination item.
   * @param props Pagination item props
   * @returns ReactNode
   */
  renderItem?: (props: PaginationItemRenderProps) => ReactNode;
  /**
   * Function to get the aria-label of the item. If not provided, pagination will use the default one.
   */
  getItemAriaLabel?: (page?: string | PaginationItemValue) => string;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Pagination classNames={{
   *    base:"base-classes",
   *    prev: "prev-classes", // prev button classes
   *    item: "item-classes",
   *    next: "next-classes", // next button classes
   *    cursor: "cursor-classes", // this is the one that moves when an item is selected
   *    forwardIcon: "forward-icon-classes", // forward icon
   *    ellipsis: "ellipsis-classes", // ellipsis icon
   *    chevronNext: "chevron-next-classes", // chevron next icon
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<PaginationSlots>;
}

export type UsePaginationProps = Props & UseBasePaginationProps & PaginationVariantProps;

export const CURSOR_TRANSITION_TIMEOUT = 300; // in ms

export function usePagination(originalProps: UsePaginationProps) {
  const globalContext = useProviderContext();

  const [props, variantProps] = mapPropsVariants(originalProps, pagination.variantKeys);

  const {
    as,
    ref,
    classNames,
    dotsJump = 5,
    loop = false,
    showControls = false,
    total = 1,
    initialPage = 1,
    page,
    siblings,
    boundaries,
    onChange,
    className,
    renderItem,
    getItemAriaLabel: getItemAriaLabelProp,
    ...otherProps
  } = props;

  const Component = as || "nav";

  const domRef = useDOMRef(ref);
  const cursorRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<Map<number, HTMLElement>>();

  const cursorTimer = useRef<Timer>();

  const {direction} = useLocale();

  const isRTL = direction === "rtl";

  const disableAnimation =
    originalProps?.disableAnimation ?? globalContext?.disableAnimation ?? false;
  const disableCursorAnimation = originalProps?.disableCursorAnimation ?? disableAnimation ?? false;

  function getItemsRefMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }

    return itemsRef.current;
  }

  function getItemRef(node: HTMLElement | null, value: number) {
    const map = getItemsRefMap();

    if (node) {
      map.set(value, node);
    } else {
      map.delete(value);
    }
  }

  function scrollTo(value: number, skipAnimation: boolean) {
    const map = getItemsRefMap();

    const node = map.get(value);

    if (!node || !cursorRef.current) return;

    // clean up the previous cursor timer (if any)
    cursorTimer.current && clearTimeout(cursorTimer.current);

    // scroll parent to the item
    scrollIntoView(node, {
      scrollMode: "always",
      behavior: "smooth",
      block: "start",
      inline: "start",
      boundary: domRef.current,
    });

    // get position of the item
    const {offsetLeft} = node;

    // only shows the animation when the page changes, not on intial render or layout shift
    if (skipAnimation) {
      cursorRef.current.setAttribute("data-moving", "false");
      cursorRef.current.style.transform = `translateX(${offsetLeft}px) scale(1)`;

      return;
    }

    // move the cursor to the item
    cursorRef.current.setAttribute("data-moving", "true");
    cursorRef.current.style.transform = `translateX(${offsetLeft}px) scale(1.1)`;

    cursorTimer.current = setTimeout(() => {
      // reset the scale of the cursor
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translateX(${offsetLeft}px) scale(1)`;
      }
      cursorTimer.current = setTimeout(() => {
        // remove the data-moving attribute
        cursorRef.current?.setAttribute("data-moving", "false");
        cursorTimer.current && clearTimeout(cursorTimer.current);
      }, CURSOR_TRANSITION_TIMEOUT);
    }, CURSOR_TRANSITION_TIMEOUT);
  }

  const {range, activePage, setPage, previous, next, first, last} = useBasePagination({
    page,
    total,
    initialPage,
    siblings,
    boundaries,
    showControls,
    onChange,
  });

  // check if the pagination component is visible
  const [setRef, isVisible] = useIntersectionObserver();

  useEffect(() => {
    if (domRef.current) {
      setRef(domRef.current);
    }
  }, [domRef.current]);

  const activePageRef = useRef(activePage);

  useEffect(() => {
    // when the pagination component is invisible, scroll offset will be wrong
    // thus, only scroll to the active page if the pagination component is visible
    if (activePage && !disableAnimation && isVisible) {
      scrollTo(activePage, activePage === activePageRef.current);
    }
    activePageRef.current = activePage;
  }, [
    page,
    activePage,
    disableAnimation,
    disableCursorAnimation,
    isVisible,
    originalProps.dotsJump,
    originalProps.isCompact,
    originalProps.showControls,
  ]);

  const slots = useMemo(
    () =>
      pagination({
        ...variantProps,
        disableAnimation,
        disableCursorAnimation,
      }),
    [objectToDeps(variantProps), disableCursorAnimation, disableAnimation],
  );

  const baseStyles = clsx(classNames?.base, className);

  const onNext = () => {
    if (loop && activePage === (isRTL ? 1 : total)) {
      return first();
    }

    return next();
  };

  const onPrevious = () => {
    if (loop && activePage === (isRTL ? total : 1)) {
      return last();
    }

    return previous();
  };

  const getBaseProps: PropGetter = (props = {}) => {
    return {
      ...props,
      ref: domRef,
      role: "navigation",
      "aria-label": props["aria-label"] || "pagination navigation",
      "data-slot": "base",
      "data-controls": dataAttr(showControls),
      "data-loop": dataAttr(loop),
      "data-dots-jump": dotsJump,
      "data-total": total,
      "data-active-page": activePage,
      className: slots.base({class: clsx(baseStyles, props?.className)}),
      ...otherProps,
    };
  };

  const getWrapperProps: PropGetter = (props = {}) => {
    return {
      ...props,
      "data-slot": "wrapper",
      className: slots.wrapper({class: clsx(classNames?.wrapper, props?.className)}),
    };
  };

  const getItemAriaLabel = (page?: string | PaginationItemValue) => {
    if (!page) return;

    if (getItemAriaLabelProp) {
      return getItemAriaLabelProp(page);
    }

    switch (page) {
      case PaginationItemType.DOTS:
        return "dots element";
      case PaginationItemType.PREV:
        return "previous page button";
      case PaginationItemType.NEXT:
        return "next page button";
      case "first":
        return "first page button";
      case "last":
        return "last page button";
      default:
        return `pagination item ${page}`;
    }
  };

  const getItemProps: PropGetter = (props = {}) => {
    return {
      ...props,
      ref: (node) => getItemRef(node, props.value),
      "data-slot": "item",
      isActive: props.value === activePage,
      className: slots.item({class: clsx(classNames?.item, props?.className)}),
      onPress: () => {
        if (props.value !== activePage) {
          setPage(props.value);
        }
      },
    };
  };

  const getCursorProps: PropGetter = (props = {}) => {
    return {
      ...props,
      ref: cursorRef,
      activePage,
      "data-slot": "cursor",
      className: slots.cursor({class: clsx(classNames?.cursor, props?.className)}),
    };
  };

  return {
    Component,
    showControls,
    dotsJump,
    slots,
    classNames,
    loop,
    total,
    range,
    activePage,
    getItemRef,
    disableAnimation,
    disableCursorAnimation,
    setPage,
    onPrevious,
    onNext,
    renderItem,
    getBaseProps,
    getWrapperProps,
    getItemProps,
    getCursorProps,
    getItemAriaLabel,
  };
}

export type UsePaginationReturn = ReturnType<typeof usePagination>;
