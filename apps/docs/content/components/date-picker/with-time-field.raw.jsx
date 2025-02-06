import {DatePicker} from "@heroui/react";
import {now, getLocalTimeZone} from "@heroui/internationalized-date";

export default function App() {
  return (
    <div className="w-full max-w-xl flex flex-row gap-4">
      <DatePicker
        hideTimeZone
        showMonthAndYearPickers
        defaultValue={now(getLocalTimeZone())}
        label="Event Date"
        variant="bordered"
      />
    </div>
  );
}
