import {TimeInput} from "@heroui/react";
import {Time} from "@heroui/internationalized-date";

export default function App() {
  return (
    <div className="w-full max-w-xl flex flex-col items-end gap-4">
      <TimeInput
        defaultValue={new Time(11, 45)}
        description="inside"
        label="Event Time"
        labelPlacement="inside"
      />
      <TimeInput
        defaultValue={new Time(11, 45)}
        description="outside"
        label="Event Time"
        labelPlacement="outside"
      />
      <TimeInput
        defaultValue={new Time(11, 45)}
        description="outside-left"
        label="Event Time"
        labelPlacement="outside-left"
      />
    </div>
  );
}
