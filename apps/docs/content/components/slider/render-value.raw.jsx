import {Slider, Tooltip} from "@heroui/react";

export default function App() {
  const [value, setValue] = React.useState(0.2);
  const [inputValue, setInputValue] = React.useState("0.2");

  const handleChange = (value) => {
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
              onChange={(e) => {
                const v = e.target.value;

                setInputValue(v);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isNaN(Number(inputValue))) {
                  setValue(Number(inputValue));
                }
              }}
            />
          </Tooltip>
        </output>
      )}
      size="sm"
      // we extract the default children to render the input
      step={0.01}
      value={value}
      onChange={handleChange}
    />
  );
}
