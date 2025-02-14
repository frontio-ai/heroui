import {useMemo, useRef, useState} from "react";
import {mergeProps} from "@react-aria/utils";
import {useVirtualizer, VirtualItem} from "@tanstack/react-virtual";
import {isEmpty} from "@heroui/shared-utils";
import {Node} from "@react-types/shared";
import {ScrollShadowProps, useScrollShadow} from "@heroui/scroll-shadow";
import {filterDOMProps} from "@heroui/react-utils";

import ListboxItem from "./listbox-item";
import ListboxSection from "./listbox-section";
import {VirtualizationProps} from "./listbox";
import {UseListboxReturn} from "./use-listbox";

interface Props extends UseListboxReturn {
  isVirtualized?: boolean;
  virtualization?: VirtualizationProps;
  /* Here in virtualized listbox, scroll shadow needs custom implementation. Hence this is the only way to pass props to scroll shadow */
  scrollShadowProps?: Partial<ScrollShadowProps>;
}

const getItemSizesForCollection = (collection: Node<object>[], itemHeight: number) => {
  const sizes: number[] = [];

  for (const item of collection) {
    if (item.type === "section") {
      /* +1 for the section header */
      sizes.push(([...item.childNodes].length + 1) * itemHeight);
    } else {
      sizes.push(itemHeight);
    }
  }

  return sizes;
};

const getScrollState = (element: HTMLDivElement | null) => {
  if (
    !element ||
    element.scrollTop === undefined ||
    element.clientHeight === undefined ||
    element.scrollHeight === undefined
  ) {
    return {
      isTop: false,
      isBottom: false,
      isMiddle: false,
    };
  }

  const isAtTop = element.scrollTop === 0;
  const isAtBottom = Math.ceil(element.scrollTop + element.clientHeight) >= element.scrollHeight;
  const isInMiddle = !isAtTop && !isAtBottom;

  return {
    isTop: isAtTop,
    isBottom: isAtBottom,
    isMiddle: isInMiddle,
  };
};

const VirtualizedListbox = (props: Props) => {
  const {
    Component,
    state,
    color,
    variant,
    itemClasses,
    getBaseProps,
    topContent,
    bottomContent,
    hideEmptyContent,
    hideSelectedIcon,
    shouldHighlightOnFocus,
    disableAnimation,
    getEmptyContentProps,
    getListProps,
    scrollShadowProps,
  } = props;

  const {virtualization} = props;

  if (
    !virtualization ||
    (!isEmpty(virtualization) && !virtualization.maxListboxHeight && !virtualization.itemHeight)
  ) {
    throw new Error(
      "You are using a virtualized listbox. VirtualizedListbox requires 'virtualization' props with 'maxListboxHeight' and 'itemHeight' properties. This error might have originated from autocomplete components that use VirtualizedListbox. Please provide these props to use the virtualized listbox.",
    );
  }
  const {maxListboxHeight, itemHeight} = virtualization;

  const listHeight = Math.min(maxListboxHeight, itemHeight * state.collection.size);

  const parentRef = useRef<HTMLDivElement>(null);
  const itemSizes = useMemo(
    () => getItemSizesForCollection([...state.collection], itemHeight),
    [state.collection, itemHeight],
  );

  const rowVirtualizer = useVirtualizer({
    count: [...state.collection].length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => itemSizes[i],
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  const virtualScrollHeight = rowVirtualizer.getTotalSize();

  // Here we need the base props for scroll shadow,
  // contains the className (scrollbar-hide and scrollshadow config based on the user inputs on select props)
  const {getBaseProps: getBasePropsScrollShadow} = useScrollShadow({...scrollShadowProps});

  const renderRow = (virtualItem: VirtualItem) => {
    const item = [...state.collection][virtualItem.index];

    if (!item) {
      return null;
    }

    const itemProps = {
      color,
      item,
      state,
      variant,
      disableAnimation,
      hideSelectedIcon,
      ...item.props,
    };

    const virtualizerStyle = {
      position: "absolute" as const,
      top: 0,
      left: 0,
      width: "100%",
      height: `${virtualItem.size}px`,
      transform: `translateY(${virtualItem.start}px)`,
    };

    if (item.type === "section") {
      return (
        <ListboxSection
          key={item.key}
          {...itemProps}
          itemClasses={itemClasses}
          style={{...virtualizerStyle, ...itemProps.style}}
        />
      );
    }

    let listboxItem = (
      <ListboxItem
        key={item.key}
        {...itemProps}
        classNames={mergeProps(itemClasses, item.props?.classNames)}
        shouldHighlightOnFocus={shouldHighlightOnFocus}
        style={{...virtualizerStyle, ...itemProps.style}}
      />
    );

    if (item.wrapper) {
      listboxItem = item.wrapper(listboxItem);
    }

    return listboxItem;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollState, setScrollState] = useState({
    isTop: false,
    isBottom: true,
    isMiddle: false,
  });

  const content = (
    <Component
      {...getListProps()}
      data-virtual-scroll-height={virtualScrollHeight}
      data-virtual-scroll-top={parentRef?.current?.scrollTop}
    >
      {!state.collection.size && !hideEmptyContent && (
        <li>
          <div {...getEmptyContentProps()} />
        </li>
      )}
      <div
        {...filterDOMProps(getBasePropsScrollShadow())}
        ref={parentRef}
        style={{
          height: maxListboxHeight,
          overflow: "auto",
        }}
        onScroll={(e) => {
          setScrollState(getScrollState(e.target as HTMLDivElement));
        }}
      >
        {listHeight > 0 && itemHeight > 0 && (
          <div
            style={{
              height: `${virtualScrollHeight}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualItems.map((virtualItem) => renderRow(virtualItem))}
          </div>
        )}
      </div>
    </Component>
  );

  return (
    <div {...getBaseProps()}>
      {topContent}
      {content}
      {bottomContent}
    </div>
  );
};

export default VirtualizedListbox;
