import {PaginationItemValue} from "@heroui/use-pagination";
import {useCallback} from "react";
import {useLocale} from "@heroui/react-aria-i18n";
import {forwardRef} from "@heroui/system";
import {PaginationItemType} from "@heroui/use-pagination";
import {ChevronIcon, EllipsisIcon, ForwardIcon} from "@heroui/shared-icons";
import {clsx, dataAttr} from "@heroui/shared-utils";

import {UsePaginationProps, usePagination} from "./use-pagination";
import PaginationItem from "./pagination-item";
import PaginationCursor from "./pagination-cursor";

export interface PaginationProps extends UsePaginationProps {}

const Pagination = forwardRef<"nav", PaginationProps>((props, ref) => {
  const {
    Component,
    dotsJump,
    slots,
    classNames,
    total,
    range,
    loop,
    activePage,
    disableCursorAnimation,
    disableAnimation,
    renderItem: renderItemProp,
    onNext,
    onPrevious,
    setPage,
    getItemAriaLabel,
    getItemRef,
    getBaseProps,
    getWrapperProps,
    getItemProps,
    getCursorProps,
  } = usePagination({...props, ref});

  const {direction} = useLocale();

  const isRTL = direction === "rtl";

  const renderItem = useCallback(
    (value: PaginationItemValue, index: number) => {
      const isBefore = index < range.indexOf(activePage);

      if (renderItemProp && typeof renderItemProp === "function") {
        let page = typeof value == "number" ? value : index;

        if (value === PaginationItemType.NEXT) {
          page = activePage + 1;
        }

        if (value === PaginationItemType.PREV) {
          page = activePage - 1;
        }

        if (value === PaginationItemType.DOTS) {
          page = isBefore
            ? activePage - dotsJump >= 1
              ? activePage - dotsJump
              : 1
            : activePage + dotsJump <= total
            ? activePage + dotsJump
            : total;
        }

        const itemChildren: Record<PaginationItemType, React.ReactNode> = {
          [PaginationItemType.PREV]: <ChevronIcon />,
          [PaginationItemType.NEXT]: (
            <ChevronIcon
              className={slots.chevronNext({
                class: classNames?.chevronNext,
              })}
            />
          ),
          [PaginationItemType.DOTS]: (
            <>
              <EllipsisIcon className={slots?.ellipsis({class: classNames?.ellipsis})} />
              <ForwardIcon
                className={slots?.forwardIcon({class: classNames?.forwardIcon})}
                data-before={dataAttr(isBefore)}
              />
            </>
          ),
        };

        return renderItemProp({
          value,
          index,
          key: `${value}-${index}`,
          page,
          total,
          children: typeof value === "number" ? value : itemChildren[value],
          activePage,
          dotsJump,
          isBefore,
          isActive: value === activePage,
          isPrevious: value === activePage - 1,
          isNext: value === activePage + 1,
          isFirst: value === 1,
          isLast: value === total,
          onNext,
          onPrevious,
          setPage,
          onPress: () => setPage(page),
          ref: typeof value === "number" ? (node) => getItemRef(node, value) : undefined,
          className: slots.item({class: classNames?.item}),
          getAriaLabel: getItemAriaLabel,
        });
      }

      if (value === PaginationItemType.PREV) {
        return (
          <PaginationItem
            key={PaginationItemType.PREV}
            className={slots.prev({
              class: classNames?.prev,
            })}
            data-slot="prev"
            getAriaLabel={getItemAriaLabel}
            isDisabled={!loop && activePage === (isRTL ? total : 1)}
            value={value}
            onPress={onPrevious}
          >
            <ChevronIcon />
          </PaginationItem>
        );
      }
      if (value === PaginationItemType.NEXT) {
        return (
          <PaginationItem
            key={PaginationItemType.NEXT}
            className={slots.next({
              class: clsx(classNames?.next),
            })}
            data-slot="next"
            getAriaLabel={getItemAriaLabel}
            isDisabled={!loop && activePage === (isRTL ? 1 : total)}
            value={value}
            onPress={onNext}
          >
            <ChevronIcon
              className={slots.chevronNext({
                class: classNames?.chevronNext,
              })}
            />
          </PaginationItem>
        );
      }

      if (value === PaginationItemType.DOTS) {
        return (
          <PaginationItem
            key={PaginationItemType.DOTS + isBefore}
            className={slots.item({
              class: clsx(classNames?.item, "group"),
            })}
            data-slot="item"
            getAriaLabel={getItemAriaLabel}
            value={value}
            onPress={() =>
              isBefore
                ? setPage(activePage - dotsJump >= 1 ? activePage - dotsJump : 1)
                : setPage(activePage + dotsJump <= total ? activePage + dotsJump : total)
            }
          >
            <EllipsisIcon className={slots?.ellipsis({class: classNames?.ellipsis})} />
            <ForwardIcon
              className={slots?.forwardIcon({class: classNames?.forwardIcon})}
              data-before={dataAttr(isRTL ? !isBefore : isBefore)}
            />
          </PaginationItem>
        );
      }

      return (
        <PaginationItem {...getItemProps({value})} key={value} getAriaLabel={getItemAriaLabel}>
          {value}
        </PaginationItem>
      );
    },
    [
      isRTL,
      activePage,
      dotsJump,
      getItemProps,
      loop,
      range,
      renderItemProp,
      slots,
      classNames,
      total,
    ],
  );

  return (
    <Component {...getBaseProps()}>
      <ul {...getWrapperProps()}>
        {!disableCursorAnimation && !disableAnimation && <PaginationCursor {...getCursorProps()} />}
        {range.map(renderItem)}
      </ul>
    </Component>
  );
});

Pagination.displayName = "HeroUI.Pagination";

export default Pagination;
