import {DatePicker} from "@heroui/react";
import {parseZonedDateTime, parseAbsoluteToLocal} from "@heroui/internationalized-date";

export default function App() {
  return (
    <div className="w-full max-w-xl flex flex-col items-start gap-4">
      <DatePicker
        className="max-w-xs"
        defaultValue={parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]")}
        label="Zoned Date Time"
        labelPlacement="outside"
      />
      <DatePicker
        className="max-w-xs"
        defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")}
        label="Zoned Date Time"
        labelPlacement="outside"
      />
    </div>
  );
}
