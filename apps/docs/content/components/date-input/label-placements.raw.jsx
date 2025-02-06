import {DateInput} from "@heroui/react";
import {CalendarDate} from "@heroui/internationalized-date";

export default function App() {
  const placements = ["inside", "outside", "outside-left"];

  return (
    <div className="w-full flex flex-col max-w-sm gap-4">
      {placements.map((placement) => (
        <DateInput
          key={placement}
          description={placement}
          label="Birth date"
          labelPlacement={placement}
          placeholderValue={new CalendarDate(1995, 11, 6)}
        />
      ))}
    </div>
  );
}
