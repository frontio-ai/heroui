import {NumberInput} from "@heroui/react";

export default function App() {
  return (
    <NumberInput
      isDisabled
      aria-label="Amount"
      className="max-w-xs"
      defaultValue={1024}
      placeholder="Enter the amount"
    />
  );
}
