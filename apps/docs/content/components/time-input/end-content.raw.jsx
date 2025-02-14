import {TimeInput} from "@heroui/react";
import {Time} from "@internationalized/date";

export const ClockCircleLinearIcon = (props) => {
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
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
};

export default function App() {
  return (
    <TimeInput
      defaultValue={new Time(11, 45)}
      endContent={
        <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none shrink-0" />
      }
      label="Event Time"
      labelPlacement="outside"
    />
  );
}
