import {DateInput} from "@heroui/react";
import {CalendarDate} from "@heroui/internationalized-date";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DateInput
        className="max-w-sm"
        label={"Birth date"}
        placeholderValue={new CalendarDate(1995, 11, 6)}
      />
    </div>
  );
}
