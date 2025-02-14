import type {HTMLHeroUIProps} from "@heroui/system";

import {forwardRef} from "react";
import {useDOMRef} from "@heroui/react-utils";
import {clsx} from "@heroui/shared-utils";
import {useTableRowGroup} from "@react-aria/table";
import {mergeProps} from "@react-aria/utils";

import {ValuesType} from "./use-table";

export interface TableRowGroupProps extends HTMLHeroUIProps<"thead"> {
  slots: ValuesType["slots"];
  classNames?: ValuesType["classNames"];
}

const TableRowGroup = forwardRef<HTMLTableSectionElement, TableRowGroupProps>((props, ref) => {
  const {as, className, children, slots, classNames, ...otherProps} = props;

  const Component = as || "thead";

  const domRef = useDOMRef(ref);

  const {rowGroupProps} = useTableRowGroup();

  const theadStyles = clsx(classNames?.thead, className);

  return (
    <Component
      ref={domRef}
      className={slots.thead?.({class: theadStyles})}
      {...mergeProps(rowGroupProps, otherProps)}
    >
      {children}
    </Component>
  );
});

TableRowGroup.displayName = "HeroUI.TableRowGroup";

export default TableRowGroup;
