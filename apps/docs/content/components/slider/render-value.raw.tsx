import type {SliderValue} from "@heroui/react";

import React from "react";
import {Tooltip, Slider} from "@heroui/react";

export default function App() {
  const [value, setValue] = React.useState<SliderValue>(0.2);
  const [inputValue, setInputValue] = React.useState<string>("0.2");

  const handleChange = (value: SliderValue) => {
    if (isNaN(Number(value))) return;

    setValue(value);
    setInputValue(value.toString());
  };

  return (
    <Slider
      classNames={{
        base: "max-w-md",
        label: "text-medium",
      }}
      color="foreground"
      label="Temperature"
      maxValue={1}
      minValue={0}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderValue={({children, ...props}) => (
        <output {...props}>
          <Tooltip
            className="text-tiny text-default-500 rounded-md"
            content="Press Enter to confirm"
            placement="left"
          >
            <input
              aria-label="Temperature value"
              className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-hidden transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
              type="text"
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const v = e.target.value;

                setInputValue(v);
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && !isNaN(Number(inputValue))) {
                  setValue(Number(inputValue));
                }
              }}
            />
          </Tooltip>
        </output>
      )}
      size="sm"
      step={0.01}
      // we extract the default children to render the input
      value={value}
      onChange={handleChange}
    />
  );
}
