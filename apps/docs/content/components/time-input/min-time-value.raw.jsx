import {TimeInput} from "@heroui/react";
import {Time} from "@heroui/internationalized-date";

export default function App() {
  return <TimeInput defaultValue={new Time(8)} minValue={new Time(9)} />;
}
