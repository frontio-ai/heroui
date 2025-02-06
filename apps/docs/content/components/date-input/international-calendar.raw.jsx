import {DateInput} from "@heroui/react";
import {parseAbsoluteToLocal} from "@heroui/internationalized-date";
import {I18nProvider} from "@heroui/react-aria-i18n";

export default function App() {
  const [date, setDate] = React.useState(parseAbsoluteToLocal("2021-04-07T18:45:22Z"));

  return (
    <div className="flex flex-col gap-4">
      <I18nProvider locale="hi-IN-u-ca-indian">
        <DateInput label="Appointment date" value={date} onChange={setDate} />
      </I18nProvider>
    </div>
  );
}
