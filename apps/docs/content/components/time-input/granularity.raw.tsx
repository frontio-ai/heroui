import type {TimeInputValue} from "@heroui/react";

import React from "react";
import {TimeInput} from "@heroui/react";
import {parseAbsoluteToLocal} from "@heroui/internationalized-date";

export default function App() {
  let [date, setDate] = React.useState<TimeInputValue | null>(
    parseAbsoluteToLocal("2021-04-07T18:45:22Z"),
  );

  return (
    <div className="w-full max-w-xl flex flex-col items-start gap-4">
      <TimeInput granularity="hour" label="Hour" value={date} onChange={setDate} />
      <TimeInput granularity="minute" label="Minute" value={date} onChange={setDate} />
      <TimeInput granularity="second" label="Second" value={date} onChange={setDate} />
    </div>
  );
}
