import {useEffect, useState} from "react";
import {Button, Popover, PopoverContent, PopoverTrigger} from "@heroui/react";
import {HexColorInput, HexColorPicker} from "react-colorful";
import Values from "values.js";
import {readableColor} from "color2k";
import {useTheme} from "next-themes";
import {clsx} from "@heroui/shared-utils";

import {ColorPickerType, ThemeType} from "../types";
import {colorValuesToRgb, getColorWeight} from "../utils/colors";

interface ColorPickerProps {
  hexColor: string;
  type: ColorPickerType;
  onChange: (hexColor: string) => void;
  onClose: (hexColor: string) => void;
}

export function ColorPicker({hexColor, type, onChange, onClose}: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(hexColor);

  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme().theme as ThemeType;
  const selectedColorWeight = getColorWeight(type, theme);
  const selectedColorValues = new Values(selectedColor).all(selectedColorWeight);

  function handleChange(updatedHexColor: string) {
    onChange(updatedHexColor);
    setSelectedColor(updatedHexColor);
  }

  /**
   * Update the selected color when the popover is opened.
   */
  useEffect(() => {
    setSelectedColor(hexColor);
  }, [hexColor, isOpen]);

  return (
    <div className="flex">
      <Popover
        isOpen={isOpen}
        placement="bottom"
        onClose={() => onClose(selectedColor)}
        onOpenChange={setIsOpen}
      >
        <PopoverTrigger>
          <Button
            fullWidth
            aria-label={`Change ${type} color`}
            className={clsx(
              getColor(type),
              "rounded-lg min-w-9 w-9 h-9",
              "border border-black/10 dark:border-white/10",
            )}
            size="sm"
            style={{
              color: ["background", "foreground", "focus", "overlay"].includes(type)
                ? readableColor(selectedColor)
                : undefined,
            }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2 max-w-48 my-2">
            <div className="grid grid-cols-5 gap-2">
              {selectedColorValues
                ?.slice(0, selectedColorValues.length - 1)
                .map((colorValue, index: number) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="h-6 w-6 rounded"
                      style={{backgroundColor: colorValuesToRgb(colorValue)}}
                    />
                    <span className="text-xs mt-1">{index === 0 ? 50 : index * 100}</span>
                  </div>
                ))}
            </div>
            <HexColorPicker className="!w-full" color={selectedColor} onChange={handleChange} />
            <HexColorInput
              prefixed
              className="px-2 py-1 w-full rounded-md"
              color={selectedColor}
              onChange={handleChange}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function getColor(type: ColorPickerType) {
  switch (type) {
    case "primary":
      return "bg-primary text-primary-foreground";
    case "secondary":
      return "bg-secondary text-secondary-foreground";
    case "success":
      return "bg-success text-success-foreground";
    case "warning":
      return "bg-warning text-warning-foreground";
    case "danger":
      return "bg-danger text-danger-foreground";
    case "background":
      return "bg-background text-foreground";
    case "foreground":
      return "bg-foreground text-black";
    case "default":
      return "bg-default";
    case "content1":
      return "bg-content1 text-content1-foreground";
    case "content2":
      return "bg-content2 text-content2-foreground";
    case "content3":
      return "bg-content3 text-content3-foreground";
    case "content4":
      return "bg-content4 text-content4-foreground";
    case "divider":
      return "bg-divider";
    case "focus":
      return "bg-focus";
    case "overlay":
      return "bg-overlay";
    default:
      return undefined;
  }
}
