import React from "react";
import {DateInput} from "@heroui/react";
import {DateValue, parseDate, getLocalTimeZone} from "@heroui/internationalized-date";
import {useDateFormatter} from "@heroui/react-aria-i18n";

export default function App() {
  const [value, setValue] = React.useState<DateValue | null>(parseDate("2024-04-04"));

  let formatter = useDateFormatter({dateStyle: "full"});

  return (
    <div className="w-full flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <DateInput label="Date (controlled)" value={value} onChange={setValue} />
        <p className="text-default-500 text-sm">
          Selected date: {value ? formatter.format(value.toDate(getLocalTimeZone())) : "--"}
        </p>
      </div>
    </div>
  );
}
