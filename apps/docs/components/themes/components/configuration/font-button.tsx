import {Button} from "@heroui/react";
import {clsx} from "@heroui/shared-utils";

import {FontName, FontType} from "../../types";

interface FontButtonProps {
  title: FontName;
  className: string;
  value: string | undefined;
  setValue: (value: FontType) => void;
}

interface FontStyle {
  fontFamily: string;
  letterSpacing?: string;
}

function getFontStyle(fontName: FontName | undefined): FontStyle {
  if (!fontName) {
    return {fontFamily: "'Inter', sans-serif"};
  }
  switch (fontName) {
    case "Inter":
      return {fontFamily: "'Inter', sans-serif"};
    case "Roboto":
      return {fontFamily: "'Roboto', sans-serif"};
    case "Outfit":
      return {fontFamily: "'Outfit', sans-serif"};
    case "Lora":
      return {fontFamily: "'Lora', serif"};
    default:
      return {fontFamily: "'Inter', sans-serif"};
  }
}

const FontButton = ({title, value, setValue}: FontButtonProps) => {
  const style = getFontStyle(title);

  return (
    <Button
      className={clsx(
        "group h-24 flex flex-col justify-center items-center gap-y-2 px-0 border-black/20 dark:border-white/20",
        value === title ? "border-black/60 dark:border-white/60" : "",
      )}
      variant="bordered"
      onPress={() => {
        setValue(title);
      }}
    >
      <div className="font-medium text-2xl text-black/60 dark:text-white/80" style={style}>
        Ag12
      </div>
      <div className="relative text-tiny text-black/40 dark:text-white/60">
        <div className="">{title}</div>
      </div>
    </Button>
  );
};

export default FontButton;
