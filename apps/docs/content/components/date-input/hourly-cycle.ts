const AppTs = `import {Input} from "@nextui-org/react";
import {parseZonedDateTime} from "@internationalized/date";

export default function App() {
  return (
    <div className="w-full max-w-xl flex flex-row gap-4">
      <DateInput
        label="Appointment time"
        hourCycle={24}
        defaultValue={parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]")}
        granularity={"minute"}
      />
    </div>
  );
}`;

const react = {
  "/App.tsx": AppTs,
};

export default {
  ...react,
};
