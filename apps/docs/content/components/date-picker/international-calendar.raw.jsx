import {DatePicker} from "@heroui/react";
import {parseAbsoluteToLocal} from "@heroui/internationalized-date";
import {I18nProvider} from "@heroui/react-aria-i18n";

export default function App() {
  let [date, setDate] = React.useState(parseAbsoluteToLocal("2021-04-07T18:45:22Z"));

  return (
    <div className="flex flex-col gap-4">
      <I18nProvider locale="hi-IN-u-ca-indian">
        <DatePicker
          showMonthAndYearPickers
          className="max-w-md"
          label="Appointment date"
          value={date}
          variant="bordered"
          onChange={setDate}
        />
      </I18nProvider>
    </div>
  );
}
