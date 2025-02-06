import {DateInput} from "@heroui/react";
import {CalendarDate, parseDate} from "@heroui/internationalized-date";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DateInput
        isDisabled
        defaultValue={parseDate("2024-04-04")}
        label={"Birth date"}
        placeholderValue={new CalendarDate(1995, 11, 6)}
      />
    </div>
  );
}
