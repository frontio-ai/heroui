import {useThemeBuilder} from "../../provider";
import {ConfigSection} from "../config-section";

import EditableButton from "./editable-button";

import {Crop} from "@/components/icons/crop";

const BORDER_WIDTHS = [
  {title: "thin", className: "rounded-tl-md border-t-1 border-l-1"},
  {title: "medium", className: "rounded-tl-md border-t-2 border-l-2"},
  {title: "thick", className: "rounded-tl-md border-t-4 border-l-4"},
] as const;

export function BorderWidths() {
  const {borderWidthValue, setBorderWidthValue} = useThemeBuilder();

  return (
    <ConfigSection icon={<Crop className="w-4 h-4" />} title="Border width">
      {BORDER_WIDTHS.map(({title, className}) => (
        <EditableButton
          key={title}
          aria-label={`Set border width to ${title}`}
          className={className}
          setValue={setBorderWidthValue}
          title={title}
          value={borderWidthValue}
        />
      ))}
    </ConfigSection>
  );
}
