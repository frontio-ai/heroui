import {NumberInput} from "@heroui/react";

export default function App() {
  const placements = ["inside", "outside", "outside-left"];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-small">Without placeholder</h3>
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          {placements.map((placement) => (
            <NumberInput
              key={placement}
              description={placement}
              label="Amount"
              labelPlacement={placement}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-small">With placeholder</h3>
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          {placements.map((placement) => (
            <NumberInput
              key={placement}
              description={placement}
              label="Amount"
              labelPlacement={placement}
              placeholder="Enter a number"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
