import {Button} from "@heroui/react";
import {clsx} from "@heroui/shared-utils";

interface EditableButtonProps {
  title: any;
  className: string;
  value: string;
  setValue: (value: any) => void;
}

const EditableButton = ({title, className, value, setValue}: EditableButtonProps) => {
  return (
    <Button
      className={clsx(
        "group h-auto py-4 flex flex-col justify-between gap-y-2 min-w-auto w-auto border-black/20 dark:border-white/20",
        value === title ? "border-black/60 dark:border-white/60" : "",
      )}
      variant="bordered"
      onPress={() => {
        setValue(title);
      }}
    >
      <div
        className={clsx(
          "h-7 w-7 border-t-2 border-l-2 border-blue-400 bg-gradient-to-b from-[#0077ff1A] to-[#92c5ff00]",
          className,
        )}
      />
      <div className="relative text-tiny font-medium leading-5 text-black/40 dark:text-white/40">
        <div className="">{title}</div>
      </div>
    </Button>
  );
};

export default EditableButton;
