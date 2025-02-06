import type {RangeValue} from "@react-types/shared";
import type {DateValue} from "@react-types/datepicker";

import React from "react";
import {DateRangePicker} from "@heroui/react";
import {parseAbsoluteToLocal} from "@heroui/internationalized-date";
import {I18nProvider} from "@heroui/react-aria-i18n";

export default function App() {
  let [date, setDate] = React.useState<RangeValue<DateValue> | null>({
    start: parseAbsoluteToLocal("2021-04-01T18:45:22Z"),
    end: parseAbsoluteToLocal("2021-04-14T19:15:22Z"),
  });

  return (
    <div className="flex flex-col gap-4">
      <I18nProvider locale="hi-IN-u-ca-indian">
        <DateRangePicker label="Stay duration" value={date} onChange={setDate} />
      </I18nProvider>
    </div>
  );
}
