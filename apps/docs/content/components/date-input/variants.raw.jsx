import {DateInput} from "@heroui/react";
import {CalendarDate} from "@heroui/internationalized-date";

export default function App() {
  const variants = ["flat", "bordered", "underlined", "faded"];

  return (
    <div className="w-full flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <DateInput
            label={"Birth date"}
            placeholderValue={new CalendarDate(1995, 11, 6)}
            variant={variant}
          />
        </div>
      ))}
    </div>
  );
}
