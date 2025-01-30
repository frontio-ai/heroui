import {Button} from "@heroui/react";
import {clsx} from "@heroui/shared-utils";

import {FontName, FontType} from "../../types";

interface FontButtonProps {
  title: FontName;
  className: string;
  value: string;
  setValue: (value: FontType) => void;
}

interface FontStyle {
  fontFamily: string;
  letterSpacing?: string;
}

function getFontStyle(fontName: FontName): FontStyle {
  switch (fontName) {
    case "inter":
      return {fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em"};
    case "roboto":
      return {fontFamily: "'Roboto', sans-serif"};
    case "outfit":
      return {fontFamily: "'Outfit', sans-serif", letterSpacing: "0.05em"};
    case "lora":
      return {fontFamily: "'Lora', serif"};
    default:
      return {fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em"};
  }
}

const FontButton = ({title, value, setValue}: FontButtonProps) => {
  const style = getFontStyle(title);

  return (
    <Button
      className={clsx(
        "group h-24 flex flex-col justify-center items-center gap-y-2 px-0",
        value === title ? "border-foreground" : "",
      )}
      variant="bordered"
      onPress={() => {
        setValue(title);
      }}
    >
      <div className="font-medium text-2xl" style={style}>
        Ag12
      </div>
      <div className="relative text-sm text-default-500">
        <div className="">{title}</div>
      </div>
    </Button>
  );
};

export default FontButton;
