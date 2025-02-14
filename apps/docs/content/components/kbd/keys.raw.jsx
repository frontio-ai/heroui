import {Kbd} from "@heroui/react";

export default function App() {
  return (
    <div className="flex gap-4">
      <Kbd keys={["command"]}>K</Kbd>
      <Kbd keys={["command", "shift"]}>N</Kbd>
      <Kbd keys={["option", "command"]}>P</Kbd>
    </div>
  );
}
