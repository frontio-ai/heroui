import {TimeInput} from "@heroui/react";
import {parseAbsoluteToLocal, Time, ZonedDateTime} from "@heroui/internationalized-date";
import {useDateFormatter} from "@heroui/react-aria-i18n";

export default function App() {
  let [value, setValue] = React.useState(parseAbsoluteToLocal("2024-04-08T18:45:22Z"));

  let formatter = useDateFormatter({dateStyle: "short", timeStyle: "long"});

  return (
    <div className="w-full flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <TimeInput label="Time (controlled)" value={value} onChange={setValue} />
        <p className="text-default-500 text-sm">
          {value instanceof ZonedDateTime
            ? (value.toDate && formatter.format(value.toDate())) ||
              (value && value.toString()) ||
              "--"
            : ""}
        </p>
      </div>

      <TimeInput defaultValue={new Time(11, 45)} label="Time (uncontrolled)" />
    </div>
  );
}
