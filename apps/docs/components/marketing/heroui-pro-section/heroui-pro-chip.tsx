import {Chip} from "@heroui/react";

export const HeroUIProChip = () => (
  <Chip
    classNames={{
      base: "ml-0.5 transition-colors bg-linear-to-br from-cyan-600 to-blue-600",
      content: "text-tiny font-semibold",
    }}
    color="primary"
    size="sm"
  >
    PRO
  </Chip>
);
