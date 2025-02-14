import {Progress} from "@heroui/react";

export default function App() {
  return (
    <Progress
      classNames={{
        base: "max-w-md",
        track: "drop-shadow-md border border-default",
        indicator: "bg-linear-to-r from-pink-500 to-yellow-500",
        label: "tracking-wider font-medium text-default-600",
        value: "text-foreground/60",
      }}
      label="Lose weight"
      radius="sm"
      showValueLabel={true}
      size="sm"
      value={65}
    />
  );
}
