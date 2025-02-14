import {Popover, PopoverTrigger, PopoverContent, Button} from "@heroui/react";

export default function App() {
  return (
    <Popover
      showArrow
      backdrop="opaque"
      classNames={{
        base: [
          // arrow color
          "before:bg-default-200",
        ],
        content: [
          "py-3 px-4 border border-default-200",
          "bg-linear-to-br from-white to-default-300",
          "dark:from-default-100 dark:to-default-50",
        ],
      }}
      placement="right"
    >
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        {(titleProps) => (
          <div className="px-1 py-2">
            <h3 className="text-small font-bold" {...titleProps}>
              Popover Content
            </h3>
            <div className="text-tiny">This is the popover content</div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
