import {useCallback, useLayoutEffect, useRef, useState} from "react";
import {Spacer} from "@heroui/spacer";
import {forwardRef} from "@heroui/system";
import {useVirtualizer} from "@tanstack/react-virtual";

import {UseTableProps, useTable} from "./use-table";
import TableRowGroup from "./table-row-group";
import TableHeaderRow from "./table-header-row";
import TableColumnHeader from "./table-column-header";
import TableSelectAllCheckbox from "./table-select-all-checkbox";
import VirtualizedTableBody from "./virtualized-table-body";

export interface TableProps<T = object>
  extends Omit<UseTableProps<T>, "isSelectable" | "isMultiSelectable"> {
  isVirtualized?: boolean;
  rowHeight?: number;
  maxTableHeight?: number;
}

const VirtualizedTable = forwardRef<"table", TableProps>((props, ref) => {
  const {
    BaseComponent,
    Component,
    collection,
    values,
    topContent,
    topContentPlacement,
    bottomContentPlacement,
    bottomContent,
    removeWrapper,
    getBaseProps,
    getWrapperProps,
    getTableProps,
  } = useTable({
    ...props,
    ref,
  });

  const {rowHeight = 40, maxTableHeight = 600} = props;

  const Wrapper = useCallback(
    ({children}: {children: JSX.Element}) => {
      if (removeWrapper) {
        return children;
      }

      return (
        <BaseComponent
          {...getWrapperProps()}
          ref={parentRef}
          /* Display must be block to maintain the scroll "progress" */
          style={{height: maxTableHeight, display: "block"}}
        >
          {children}
        </BaseComponent>
      );
    },
    [removeWrapper, getWrapperProps, maxTableHeight],
  );

  const items = [...collection.body.childNodes];

  const count = items.length;

  const parentRef = useRef(null);

  const [headerHeight, setHeaderHeight] = useState(0);

  const headerRef = useRef<HTMLTableSectionElement>(null);

  useLayoutEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.getBoundingClientRect().height);
    }
  }, [headerRef]);

  const rowVirtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 5,
  });

  return (
    <div {...getBaseProps()}>
      {/* We need to add p-1 to make the shadow-sm visible */}
      <Wrapper>
        <>
          {topContentPlacement === "outside" && topContent}
          <div style={{height: `calc(${rowVirtualizer.getTotalSize() + headerHeight}px)`}}>
            <>
              {topContentPlacement === "inside" && topContent}
              <Component {...getTableProps()}>
                <TableRowGroup ref={headerRef} classNames={values.classNames} slots={values.slots}>
                  {collection.headerRows.map((headerRow) => (
                    <TableHeaderRow
                      key={headerRow?.key}
                      classNames={values.classNames}
                      node={headerRow}
                      slots={values.slots}
                      state={values.state}
                    >
                      {[...headerRow.childNodes].map((column) =>
                        column?.props?.isSelectionCell ? (
                          <TableSelectAllCheckbox
                            key={column?.key}
                            checkboxesProps={values.checkboxesProps}
                            classNames={values.classNames}
                            color={values.color}
                            disableAnimation={values.disableAnimation}
                            node={column}
                            selectionMode={values.selectionMode}
                            slots={values.slots}
                            state={values.state}
                          />
                        ) : (
                          <TableColumnHeader
                            key={column?.key}
                            classNames={values.classNames}
                            node={column}
                            slots={values.slots}
                            state={values.state}
                          />
                        ),
                      )}
                    </TableHeaderRow>
                  ))}
                  <Spacer as="tr" tabIndex={-1} y={1} />
                </TableRowGroup>
                <VirtualizedTableBody
                  checkboxesProps={values.checkboxesProps}
                  classNames={values.classNames}
                  collection={values.collection}
                  color={values.color}
                  disableAnimation={values.disableAnimation}
                  isSelectable={values.isSelectable}
                  rowVirtualizer={rowVirtualizer}
                  selectionMode={values.selectionMode}
                  slots={values.slots}
                  state={values.state}
                />
              </Component>
              {bottomContentPlacement === "inside" && bottomContent}
            </>
          </div>
          {bottomContentPlacement === "outside" && bottomContent}
        </>
      </Wrapper>
    </div>
  );
});

VirtualizedTable.displayName = "HeroUI.VirtualizedTable";

export default VirtualizedTable;
