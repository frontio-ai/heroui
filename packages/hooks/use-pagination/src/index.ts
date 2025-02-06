import {useMemo, useCallback, useState, useEffect} from "react";
import {useLocale} from "@heroui/react-aria-i18n";
import {range} from "@heroui/shared-utils";

export enum PaginationItemType {
  DOTS = "dots",
  PREV = "prev",
  NEXT = "next",
}

export interface UsePaginationProps {
  /**
   * The total number of pages.
   */
  total: number;
  /**
   * The selected page on initial render.
   * @default 1
   */
  initialPage?: number;
  /**
   * The controlled selected page.
   */
  page?: number;
  /**
   * The number of pages to show on each side of the current page.
   * @default 1
   */
  siblings?: number;
  /**
   * The number of pages to show at the beginning and end of the pagination.
   * @default 1
   */
  boundaries?: number;
  /**
   * If `true`, the range will include "prev" and "next" buttons.
   * @default false
   */
  showControls?: boolean;
  /**
   * Callback fired when the page changes.
   */
  onChange?: (page: number) => void;
}

export type PaginationItemValue = number | PaginationItemType;

export function usePagination(props: UsePaginationProps) {
  const {
    page,
    total,
    siblings = 1,
    boundaries = 1,
    initialPage = 1,
    showControls = false,
    onChange,
  } = props;
  const [activePage, setActivePage] = useState(page || initialPage);

  const {direction} = useLocale();

  const isRTL = direction === "rtl";

  const onChangeActivePage = (newPage: number) => {
    setActivePage(newPage);
    onChange && onChange(newPage);
  };

  useEffect(() => {
    if (page && page !== activePage) {
      setActivePage(page);
    }
  }, [page]);

  const setPage = useCallback(
    (pageNumber: number) => {
      if (pageNumber <= 0) {
        onChangeActivePage(1);
      } else if (pageNumber > total) {
        onChangeActivePage(total);
      } else {
        onChangeActivePage(pageNumber);
      }
    },
    [total, activePage, onChangeActivePage],
  );

  const next = () => (isRTL ? setPage(activePage - 1) : setPage(activePage + 1));
  const previous = () => (isRTL ? setPage(activePage + 1) : setPage(activePage - 1));
  const first = () => (isRTL ? setPage(total) : setPage(1));
  const last = () => (isRTL ? setPage(1) : setPage(total));

  const formatRange = useCallback(
    (range: PaginationItemValue[]) => {
      if (showControls) {
        return isRTL
          ? [PaginationItemType.NEXT, ...range, PaginationItemType.PREV]
          : [PaginationItemType.PREV, ...range, PaginationItemType.NEXT];
      }

      return range;
    },
    [isRTL, showControls],
  );

  const paginationRange = useMemo((): PaginationItemValue[] => {
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;

    if (totalPageNumbers >= total) {
      return formatRange(range(1, total));
    }
    const leftSiblingIndex = Math.max(activePage - siblings, boundaries);
    const rightSiblingIndex = Math.min(activePage + siblings, total - boundaries);

    /*
     * We do not want to show dots if there is only one position left
     * after/before the left/right page count as that would lead to a change if our Pagination
     * component size which we do not want
     */
    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots = rightSiblingIndex < total - (boundaries + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2;

      return formatRange([
        ...range(1, leftItemCount),
        PaginationItemType.DOTS,
        ...range(total - (boundaries - 1), total),
      ]);
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries + 1 + 2 * siblings;

      return formatRange([
        ...range(1, boundaries),
        PaginationItemType.DOTS,
        ...range(total - rightItemCount, total),
      ]);
    }

    return formatRange([
      ...range(1, boundaries),
      PaginationItemType.DOTS,
      ...range(leftSiblingIndex, rightSiblingIndex),
      PaginationItemType.DOTS,
      ...range(total - boundaries + 1, total),
    ]);
  }, [total, activePage, siblings, boundaries, formatRange]);

  return {
    range: paginationRange,
    activePage,
    setPage,
    next,
    previous,
    first,
    last,
  };
}

export type UsePaginationReturn = ReturnType<typeof usePagination>;
