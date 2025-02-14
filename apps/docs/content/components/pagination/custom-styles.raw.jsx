import {Pagination} from "@heroui/react";

export default function App() {
  return (
    <Pagination
      classNames={{
        wrapper: "gap-0 overflow-visible h-8 rounded-sm border border-divider",
        item: "w-8 h-8 text-small rounded-none bg-transparent",
        cursor:
          "bg-linear-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
      }}
      total={10}
    />
  );
}
