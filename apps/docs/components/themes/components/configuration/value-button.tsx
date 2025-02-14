import {Button} from "@heroui/react";
import {clsx} from "@heroui/shared-utils";

interface ValueButtonProps<T extends string | number> {
  currentValue: T;
  value: T;
  setValue: (value: any) => void;
  endContent?: string;
}

const ValueButton = ({
  currentValue,
  value,
  setValue,
  endContent,
}: ValueButtonProps<string | number>) => {
  return (
    <Button
      isIconOnly
      aria-checked={value === currentValue}
      aria-label={`Select ${value}${endContent ?? ""}`}
      className={clsx(
        "group h-auto w-auto rounded-md p-0.5 px-1 text-sm font-normal border-black/20 dark:border-white/20",
        value === currentValue ? "border-black/60 dark:border-white/60" : "",
      )}
      role="radio"
      variant="bordered"
      onPress={() => {
        setValue(value);
      }}
    >
      {value}
      {endContent}
    </Button>
  );
};

export default ValueButton;
