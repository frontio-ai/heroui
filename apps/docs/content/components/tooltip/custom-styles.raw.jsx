import {Tooltip, Button} from "@heroui/react";

export default function App() {
  return (
    <Tooltip
      showArrow
      classNames={{
        base: [
          // arrow color
          "before:bg-neutral-400 dark:before:bg-white",
        ],
        content: ["py-2 px-4 shadow-xl", "text-black bg-linear-to-br from-white to-neutral-400"],
      }}
      content="I am a tooltip"
      placement="right"
    >
      <Button variant="flat">Hover me</Button>
    </Tooltip>
  );
}
