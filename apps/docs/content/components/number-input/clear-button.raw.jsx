import {NumberInput} from "@heroui/react";

export default function App() {
  return (
    <NumberInput
      isClearable
      className="max-w-xs"
      defaultValue={1024}
      label="Amount"
      placeholder="Enter the amount"
      variant="bordered"
      // eslint-disable-next-line no-console
      onClear={() => console.log("number input cleared")}
    />
  );
}
