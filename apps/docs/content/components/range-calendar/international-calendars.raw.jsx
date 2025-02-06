import {RangeCalendar} from "@heroui/react";
import {I18nProvider} from "@heroui/react-aria-i18n";

export default function App() {
  return (
    <I18nProvider locale="zh-CN-u-ca-chinese">
      <RangeCalendar aria-label="Date (International RangeCalendar)" />
    </I18nProvider>
  );
}
