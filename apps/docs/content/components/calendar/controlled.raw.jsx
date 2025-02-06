import {Calendar} from "@heroui/react";
import {parseDate} from "@heroui/internationalized-date";

export default function App() {
  let [value, setValue] = React.useState(parseDate("2024-03-07"));

  return <Calendar aria-label="Date (Controlled)" value={value} onChange={setValue} />;
}
