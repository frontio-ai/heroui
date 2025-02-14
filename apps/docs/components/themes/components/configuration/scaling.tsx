import {useThemeBuilder} from "../../provider";
import {ConfigSection} from "../config-section";

import ValueButton from "./value-button";

import {Scaling as ScalingIcon} from "@/components/icons/scaling";

export function Scaling() {
  const {scaling, setScaling} = useThemeBuilder();
  const scaleValues = [90, 95, 100, 105, 110];

  return (
    <ConfigSection icon={<ScalingIcon className="h-4 w-4" />} title="Scaling">
      {scaleValues.map((value) => (
        <ValueButton
          key={value}
          currentValue={scaling}
          endContent="%"
          setValue={setScaling}
          value={value}
        />
      ))}
    </ConfigSection>
  );
}
