import {DateRangePicker} from "@heroui/react";
import {parseZonedDateTime} from "@heroui/internationalized-date";

export default function App() {
  return (
    <div className="w-full max-w-xl flex flex-row gap-4">
      <DateRangePicker
        hideTimeZone
        defaultValue={{
          start: parseZonedDateTime("2024-04-01T00:45[America/Los_Angeles]"),
          end: parseZonedDateTime("2024-04-08T11:15[America/Los_Angeles]"),
        }}
        label="Event duration"
        visibleMonths={2}
      />
    </div>
  );
}
