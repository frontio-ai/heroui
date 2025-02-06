import {DateInput} from "@heroui/react";
import {now, parseAbsoluteToLocal} from "@heroui/internationalized-date";

export default function App() {
  let [date, setDate] = React.useState(parseAbsoluteToLocal("2021-04-07T18:45:22Z"));

  return (
    <div className="w-full max-w-xl flex flex-col items-start gap-4">
      <DateInput granularity="second" label="Date and time" value={date} onChange={setDate} />
      <DateInput granularity="day" label="Date" value={date} onChange={setDate} />
      <DateInput granularity="second" label="Event date" />
      <DateInput
        granularity="second"
        label="Event date"
        placeholderValue={now("America/New_York")}
      />
    </div>
  );
}
