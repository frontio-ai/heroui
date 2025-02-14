import {NumberInput} from "@heroui/react";

export default function App() {
  const variants = ["flat", "bordered", "underlined", "faded"];

  return (
    <div className="w-full flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <NumberInput label="Amount" variant={variant} />
          <NumberInput label="Amount" placeholder="Enter the amount" variant={variant} />
        </div>
      ))}
    </div>
  );
}
