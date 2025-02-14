import {NumberInput} from "@heroui/react";

export default function App() {
  const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      {colors.map((color) => (
        <NumberInput
          key={color}
          className="max-w-[220px]"
          color={color}
          defaultValue={1024}
          label="Amount"
          placeholder="Enter the amount"
        />
      ))}
    </div>
  );
}
