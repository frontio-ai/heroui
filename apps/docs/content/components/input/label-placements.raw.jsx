import {Input} from "@heroui/react";

export default function App() {
  const placements = ["inside", "outside", "outside-left", "outside-top"];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-small">Without placeholder</h3>
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          {placements.map((placement) => (
            <Input
              key={placement}
              description={placement}
              label="Email"
              labelPlacement={placement}
              type="email"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-small">With placeholder</h3>
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          {placements.map((placement) => (
            <Input
              key={placement}
              description={placement}
              label="Email"
              labelPlacement={placement}
              placeholder="Enter your email"
              type="email"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
