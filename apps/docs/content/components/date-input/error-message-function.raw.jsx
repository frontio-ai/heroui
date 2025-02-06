import {DateInput} from "@heroui/react";
import {CalendarDate, parseDate} from "@heroui/internationalized-date";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DateInput
        isInvalid
        className="max-w-xs"
        defaultValue={parseDate("2024-04-04")}
        description={"This is my birth date."}
        errorMessage={(value) => {
          if (value.isInvalid) {
            return "Please enter a valid date.";
          }
        }}
        label={"Birth date"}
        placeholderValue={new CalendarDate(1995, 11, 6)}
      />
    </div>
  );
}
