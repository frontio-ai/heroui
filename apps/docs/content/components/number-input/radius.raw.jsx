import {NumberInput} from "@heroui/react";

export default function App() {
  const radius = ["full", "lg", "md", "sm", "none"];

  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      {radius.map((r) => (
        <NumberInput
          key={r}
          aria-label={`${r} radius`}
          className="max-w-[220px]"
          defaultValue={1024}
          label="Amount"
          placeholder="Enter the amount"
          radius={r}
        />
      ))}
    </div>
  );
}
