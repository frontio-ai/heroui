const AppTs = `import {Input} from "@nextui-org/react";
import {DateValue, now, parseAbsoluteToLocal} from "@internationalized/date";
import {I18nProvider} from "@react-aria/i18n";

export default function App() {
  const [date, setDate] = React.useState<DateValue>(parseAbsoluteToLocal("2021-04-07T18:45:22Z"));

  return (
    <div className="flex flex-col gap-4">
      <I18nProvider locale="hi-IN-u-ca-indian">
        <DateInput label="Appointment date" value={date} onChange={setDate} />
      </I18nProvider>
    </div>
  );
}`;

const react = {
  "/App.tsx": AppTs,
};

export default {
  ...react,
};
