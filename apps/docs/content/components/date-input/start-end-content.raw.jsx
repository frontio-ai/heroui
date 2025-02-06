import {DateInput} from "@heroui/react";
import {CalendarDate, parseDate} from "@heroui/internationalized-date";

export const CalendarIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M7.75 2.5a.75.75 0 0 0-1.5 0v1.58c-1.44.115-2.384.397-3.078 1.092c-.695.694-.977 1.639-1.093 3.078h19.842c-.116-1.44-.398-2.384-1.093-3.078c-.694-.695-1.639-.977-3.078-1.093V2.5a.75.75 0 0 0-1.5 0v1.513C15.585 4 14.839 4 14 4h-4c-.839 0-1.585 0-2.25.013z"
        fill="currentColor"
      />
      <path
        clipRule="evenodd"
        d="M2 12c0-.839 0-1.585.013-2.25h19.974C22 10.415 22 11.161 22 12v2c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14zm15 2a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function App() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <DateInput
          defaultValue={parseDate("2024-04-04")}
          label="Date Input"
          labelPlacement="outside"
          placeholderValue={new CalendarDate(1995, 11, 6)}
          startContent={
            <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <DateInput
          defaultValue={parseDate("2024-04-04")}
          endContent={
            <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Date Input"
          labelPlacement="outside"
          placeholderValue={new CalendarDate(1995, 11, 6)}
        />
      </div>
    </div>
  );
}
