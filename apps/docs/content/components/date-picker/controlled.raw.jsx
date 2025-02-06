import {DatePicker} from "@heroui/react";
import {parseDate, getLocalTimeZone} from "@heroui/internationalized-date";
import {useDateFormatter} from "@heroui/react-aria-i18n";

export default function App() {
  const [value, setValue] = React.useState(parseDate("2024-04-04"));

  let formatter = useDateFormatter({dateStyle: "full"});

  return (
    <div className="flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <DatePicker
          className="max-w-[284px]"
          label="Date (controlled)"
          value={value}
          onChange={setValue}
        />
        <p className="text-default-500 text-sm">
          Selected date: {value ? formatter.format(value.toDate(getLocalTimeZone())) : "--"}
        </p>
      </div>
      <DatePicker
        className="max-w-[284px]"
        defaultValue={parseDate("2024-04-04")}
        label="Date (uncontrolled)"
      />
    </div>
  );
}
