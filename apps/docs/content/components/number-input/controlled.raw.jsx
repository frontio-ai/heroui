import React from "react";
import {NumberInput} from "@heroui/react";

export default function App() {
  const [value, setValue] = React.useState();

  return (
    <div className="w-full flex flex-col gap-2 max-w-[240px]">
      <NumberInput
        label="Amount"
        placeholder="Enter the amount"
        value={value}
        onValueChange={setValue}
      />
      <p className="text-default-500 text-small">NumberInput value: {value}</p>
    </div>
  );
}
