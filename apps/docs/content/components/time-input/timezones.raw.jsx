import {TimeInput} from "@heroui/react";
import {parseZonedDateTime, parseAbsoluteToLocal} from "@heroui/internationalized-date";

export default function App() {
  return (
    <div className="w-full max-w-xl flex flex-col items-end gap-4">
      <TimeInput
        defaultValue={parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]")}
        labelPlacement="outside"
      />
      <TimeInput
        defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")}
        labelPlacement="outside"
      />
    </div>
  );
}
