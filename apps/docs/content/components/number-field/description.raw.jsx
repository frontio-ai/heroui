import {NumberField} from "@nextui-org/react";

export default function App() {
  return (
    <NumberField
      className="max-w-xs"
      defaultValue={1024}
      description="Enter the width of the element"
      label="Width"
    />
  );
}
