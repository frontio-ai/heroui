import {Chip} from "@heroui/react";

export default function App() {
  return (
    <Chip
      classNames={{
        base: "bg-linear-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
        content: "drop-shadow-xs shadow-black text-white",
      }}
      variant="shadow"
    >
      New
    </Chip>
  );
}
