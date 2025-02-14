import {NumberInput} from "@heroui/react";

export default function App() {
  return (
    <NumberInput
      hideStepper
      aria-label="Amount"
      className="max-w-xs"
      description="The value should be less than or equal to 100"
      maxValue={100}
      placeholder="Enter the amount"
    />
  );
}
