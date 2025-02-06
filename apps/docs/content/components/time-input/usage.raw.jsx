import {TimeInput} from "@heroui/react";
import {Time} from "@heroui/internationalized-date";

export default function App() {
  return (
    <div className="flex flex-wrap gap-4">
      <TimeInput label="Event Time" />
      <TimeInput defaultValue={new Time(11, 45)} label="Event Time" />
    </div>
  );
}
