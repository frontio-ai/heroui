import {useThemeBuilder} from "../../provider";
import {ConfigSection} from "../config-section";

import EditableButton from "./editable-button";

import {CropMinimalistic} from "@/components/icons/crop";

export function Radiuses() {
  const {radiusValue, setRadiusValue} = useThemeBuilder();

  return (
    <ConfigSection icon={<CropMinimalistic className="h-4 w-4" />} title="Radius">
      <EditableButton
        aria-label="No border radius"
        className="rounded-tl-none"
        setValue={setRadiusValue}
        title="none"
        value={radiusValue}
      />
      <EditableButton
        aria-label="sm border radius"
        className="rounded-tl-sm"
        setValue={setRadiusValue}
        title="sm"
        value={radiusValue}
      />
      <EditableButton
        aria-label="md border radius"
        className="rounded-tl-md"
        setValue={setRadiusValue}
        title="md"
        value={radiusValue}
      />
      <EditableButton
        aria-label="lg border radius"
        className="rounded-tl-lg"
        setValue={setRadiusValue}
        title="lg"
        value={radiusValue}
      />
      <EditableButton
        aria-label="full border radius"
        className="rounded-tl-full"
        setValue={setRadiusValue}
        title="full"
        value={radiusValue}
      />
    </ConfigSection>
  );
}
