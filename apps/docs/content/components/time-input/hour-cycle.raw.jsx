import {TimeInput} from "@heroui/react";
import {parseZonedDateTime} from "@heroui/internationalized-date";

export default function App() {
  return (
    <TimeInput
      defaultValue={parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]")}
      granularity="minute"
      hourCycle={24}
      label="Meeting time"
    />
  );
}
