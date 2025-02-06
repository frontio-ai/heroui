import {DateRangePicker} from "@heroui/react";
import {parseAbsoluteToLocal} from "@heroui/internationalized-date";

export default function App() {
  let [date, setDate] = React.useState({
    start: parseAbsoluteToLocal("2024-04-01T18:45:22Z"),
    end: parseAbsoluteToLocal("2024-04-08T19:15:22Z"),
  });

  return (
    <div className="w-full max-w-xl flex flex-col items-start gap-4">
      <DateRangePicker
        fullWidth
        granularity="second"
        label="Date and time range"
        value={date}
        onChange={setDate}
      />
      <DateRangePicker
        fullWidth
        granularity="day"
        label="Date range"
        value={date}
        onChange={setDate}
      />
    </div>
  );
}
