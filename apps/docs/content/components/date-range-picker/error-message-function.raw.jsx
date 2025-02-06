import {DateRangePicker} from "@heroui/react";
import {parseDate} from "@heroui/internationalized-date";

export default function App() {
  return (
    <DateRangePicker
      isInvalid
      className="max-w-xs"
      defaultValue={{
        start: parseDate("2024-04-01"),
        end: parseDate("2024-04-08"),
      }}
      errorMessage={(value) => {
        if (value.isInvalid) {
          return "Please enter your stay duration";
        }
      }}
      label="Stay duration"
      variant="bordered"
    />
  );
}
