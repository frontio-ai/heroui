import {forwardRef, HTMLHeroUIProps} from "@heroui/system";
import {useDOMRef} from "@heroui/react-utils";
import {clsx, dataAttr} from "@heroui/shared-utils";
import {useTableRowGroup} from "@react-aria/table";
import {filterDOMProps} from "@heroui/react-utils";
import {mergeProps} from "@react-aria/utils";
import {Virtualizer} from "@tanstack/react-virtual";

import TableRow from "./table-row";
import TableCell from "./table-cell";
import TableCheckboxCell from "./table-checkbox-cell";
import {ValuesType} from "./use-table";

// @internal
export interface VirtualizedTableBodyProps extends HTMLHeroUIProps<"tbody"> {
  slots: ValuesType["slots"];
  collection: ValuesType["collection"];
  state: ValuesType["state"];
  isSelectable: ValuesType["isSelectable"];
  color: ValuesType["color"];
  disableAnimation: ValuesType["disableAnimation"];
  checkboxesProps: ValuesType["checkboxesProps"];
  selectionMode: ValuesType["selectionMode"];
  classNames?: ValuesType["classNames"];
  rowVirtualizer: Virtualizer<any, Element>;
}

const VirtualizedTableBody = forwardRef<"tbody", VirtualizedTableBodyProps>((props, ref) => {
  const {
    as,
    className,
    slots,
    state,
    collection,
    isSelectable,
    color,
    disableAnimation,
    checkboxesProps,
    selectionMode,
    classNames,
    rowVirtualizer,
    ...otherProps
  } = props;

  const Component = as || "tbody";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);

  const {rowGroupProps} = useTableRowGroup();

  const tbodyStyles = clsx(classNames?.tbody, className);
  const bodyProps = collection?.body.props;

  const isLoading =
    bodyProps?.isLoading ||
    bodyProps?.loadingState === "loading" ||
    bodyProps?.loadingState === "loadingMore";

  const items = [...collection.body.childNodes];

  const virtualItems = rowVirtualizer.getVirtualItems();

  let emptyContent;
  let loadingContent;

  if (collection.size === 0 && bodyProps.emptyContent) {
    emptyContent = (
      <tr role="row">
        <td
          className={slots?.emptyWrapper({class: classNames?.emptyWrapper})}
          colSpan={collection.columnCount}
          role="gridcell"
        >
          {!isLoading && bodyProps.emptyContent}
        </td>
      </tr>
    );
  }

  if (isLoading && bodyProps.loadingContent) {
    loadingContent = (
      <tr role="row">
        <td
          className={slots?.loadingWrapper({class: classNames?.loadingWrapper})}
          colSpan={collection.columnCount}
          role="gridcell"
        >
          {bodyProps.loadingContent}
        </td>
        {!emptyContent && collection.size === 0 ? (
          <td className={slots?.emptyWrapper({class: classNames?.emptyWrapper})} />
        ) : null}
      </tr>
    );
  }

  return (
    <Component
      ref={domRef}
      {...mergeProps(
        rowGroupProps,
        filterDOMProps(bodyProps, {
          enabled: shouldFilterDOMProps,
        }),
        otherProps,
      )}
      className={slots.tbody?.({class: tbodyStyles})}
      data-empty={dataAttr(collection.size === 0)}
      data-loading={dataAttr(isLoading)}
    >
      {virtualItems.map((virtualRow, index) => {
        const row = items[virtualRow.index];

        if (!row) {
          return null;
        }

        return (
          <TableRow
            key={String(row.key)}
            classNames={classNames}
            isSelectable={isSelectable}
            node={row}
            slots={slots}
            state={state}
            style={{
              transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
              height: `${virtualRow.size}px`,
            }}
          >
            {[...row.childNodes].map((cell) =>
              cell.props.isSelectionCell ? (
                <TableCheckboxCell
                  key={String(cell.key)}
                  checkboxesProps={checkboxesProps}
                  classNames={classNames}
                  color={color}
                  disableAnimation={disableAnimation}
                  node={cell}
                  rowKey={row.key}
                  selectionMode={selectionMode}
                  slots={slots}
                  state={state}
                />
              ) : (
                <TableCell
                  key={String(cell.key)}
                  classNames={classNames}
                  node={cell}
                  rowKey={row.key}
                  slots={slots}
                  state={state}
                />
              ),
            )}
          </TableRow>
        );
      })}

      {loadingContent}
      {emptyContent}
    </Component>
  );
});

VirtualizedTableBody.displayName = "HeroUI.VirtualizedTableBody";

export default VirtualizedTableBody;
